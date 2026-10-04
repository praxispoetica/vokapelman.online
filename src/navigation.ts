import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    { text: 'Books', href: getPermalink('/books') },
    { text: 'About', href: getPermalink('/about') },
    { text: 'Journal', href: getBlogPermalink() },
    { text: 'Contact', href: getPermalink('/contact') },
  ],
  actions: [{ text: 'Join the reading list', href: getPermalink('/#newsletter') }],
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
    © ${new Date().getFullYear()} v. o. kapelman · All rights reserved.
  `,
};
