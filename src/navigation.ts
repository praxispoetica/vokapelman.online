import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

const START_YEAR = '2017';
const currentYear = new Date().getFullYear();

export const headerData = {
  links: [
    { text: 'Books', href: getPermalink('/books') },
    { text: 'About', href: getPermalink('/about') },
    { text: 'Journal', href: getBlogPermalink() },
    { text: 'Contact', href: getPermalink('/contact') },
  ],
  actions: [{ text: 'Updates via Substack', href: getPermalink('/#newsletter') }],
};

export const footerData = {
  links: [
    {
      title: 'Read',
      links: [
        { text: 'Books', href: getPermalink('/books') },
        { text: 'Journal', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Author',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [{ ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') }],
  footNote: `
    <div class="text-center leading-relaxed">
      © ${START_YEAR}-${currentYear} v. o. kapelman. Works and content shared on vokapelman.online <br />under a <a class="underline hover:text-primary dark:hover:text-white" href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener noreferrer">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License (CC BY-NC-ND 4.0)</a>
    </div>
  `,
};
