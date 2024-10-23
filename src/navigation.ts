import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';
import { getStaticPaths }  from '@astrojs/starlight/routes/static/index.astro';


let paths = await getStaticPaths()

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'Calculator',
      href: getPermalink('/calculator'),
    },
    {
      text: 'Icons',
      href: getPermalink('/svg'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Docs',
      href: getPermalink('/docs'),
      target: '_blank'
    },
  ],
  actions: [],
};

export const footerData = {
  links: [

  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
/*     { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' }, */
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: `
     · All rights reserved.
  `,
};
