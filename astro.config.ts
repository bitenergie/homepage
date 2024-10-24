import path from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import icon from 'astro-icon';
import compress from 'astro-compress';
import type { AstroIntegration } from 'astro';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex'
import astrowind from './vendor/integration';

import { readingTimeRemarkPlugin, responsiveTablesRehypePlugin, lazyImagesRehypePlugin } from './src/utils/frontmatter';

import starlight from '@astrojs/starlight';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const hasExternalScripts = false;
const whenExternalScripts = (items: (() => AstroIntegration) | (() => AstroIntegration)[] = []) =>
  hasExternalScripts ? (Array.isArray(items) ? items.map((item) => item()) : [items()]) : [];

export default defineConfig({
  output: 'static',
  server: { port: 1234, host: true },
  integrations: [tailwind({
    applyBaseStyles: false,
  }), starlight({
    title: 'BitEnergie Docs',
    disable404Route: true,
    logo: {
      src: './src/assets/favicons/favicon.svg',
    },
  }), sitemap(), mdx(), icon({
    iconDir: "public/icons",
    include: {
      tabler: ['*'],
      'flat-color-icons': [
        'template',
        'gallery',
        'approval',
        'document',
        'advertising',
        'currency-exchange',
        'voice-presentation',
        'business-contact',
        'database',
      ],
    },
  }), ...whenExternalScripts(() =>
    partytown({
      config: { forward: ['dataLayer.push'] },
    })
    
  ), compress({
    CSS: true,
    HTML: {
      'html-minifier-terser': {
        removeAttributeQuotes: false,
      },
    },
    Image: false,
    JavaScript: true,
    SVG: false,
    Logger: 1,
  }), astrowind({
    config: './src/config.yaml',
  }), ],
  image: {
    domains: ['cdn.pixabay.com'],
  },

  markdown: {
    remarkPlugins: [readingTimeRemarkPlugin, remarkMath],
    rehypePlugins: [responsiveTablesRehypePlugin, lazyImagesRehypePlugin, rehypeKatex],
  },

  vite: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
  },
});
