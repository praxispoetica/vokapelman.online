import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const slugOf = (id: string) => id.split('/').pop()!.replace(/^\d+-/, '');
  const works = (await getCollection('works')).filter((w) => w.data.readOnline);
  const allChapters = await getCollection('chapters', (c) => !c.data.draft);

  return works.map((work) => {
    const bookChapters = allChapters
      .filter((c) => c.data.book === work.id && c.data.readOnline !== false)
      .sort((a, b) => a.data.order - b.data.order);

    const eofIndex = bookChapters.findIndex((c) => c.data.eof);
    const chapters = eofIndex !== -1 ? bookChapters.slice(0, eofIndex + 1) : bookChapters;

    const items: Array<{
      id: string;
      chapterTitle: string;
      sceneTitle: string;
      url: string;
      text: string;
    }> = [];

    for (const chapter of chapters) {
      const cSlug = slugOf(chapter.id);
      const raw = chapter.body || '';
      // Split into sections by H2 headings ("## Heading")
      const sections = raw.split(/\n(?=##\s+)/);

      for (let sIdx = 0; sIdx < sections.length; sIdx++) {
        const sec = sections[sIdx];
        const headingMatch = sec.match(/^##\s+(.+)$/m);
        let sceneTitle = chapter.data.title;
        let anchor = '';
        let body = sec;

        if (headingMatch) {
          sceneTitle = headingMatch[1].trim();
          anchor = sceneTitle
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-');
          body = sec.replace(/^##\s+.+$/m, '').trim();
        }

        const cleanText = body
          .replace(/[*_#`~[\]()]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (cleanText.length > 0) {
          items.push({
            id: `${chapter.id}-${sIdx}`,
            chapterTitle: chapter.data.title,
            sceneTitle,
            url: `/books/${work.id}/read/${cSlug}${anchor ? `#${anchor}` : ''}`,
            text: cleanText,
          });
        }
      }
    }

    return {
      params: { slug: work.id },
      props: { items },
    };
  });
}

export async function GET({
  props,
}: {
  props: { items: Array<{ id: string; chapterTitle: string; sceneTitle: string; url: string; text: string }> };
}) {
  return new Response(JSON.stringify(props.items), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
