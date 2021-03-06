module.exports = {
  title: 'Front-End-Wiki',
  description: '前端知识库',
  // permalink: '/:year/:month/:day/:slug', // 永久链接
  themeConfig: {
    author: 'Alin',
    smoothScroll: true,
    repo: 'heiyelin/front-end-wiki',
    nav: [
      { text: '首页', link: '/' },
      { text: '基础', link: '/guide/' },
      { text: '进阶', link: '/advance/' },
      { text: '全栈', link: '/dev/' },
      { text: '扩展', link: '/refer/' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'HTML',
          collapsable: false,
          children: ['html/introduce', 'html/web-storage'],
        },
        {
          title: 'CSS',
          children: ['css/base', 'css/layout', 'css/center-and-layout'],
        },
        {
          title: 'Javascript',
          children: [
            'js/variables-and-types',
            'js/prototype',
            'js/scope-and-closure',
            'js/generator',
            'js/promise',
            'js/async',
            'js/high-order-function',
          ],
        },
        {
          title: '数据结构',
          children: [
            'data-structures/Stack',
            'data-structures/Queue',
            'data-structures/LinkedList',
            'data-structures/Set',
            'data-structures/Dictionary',
            'data-structures/HashTable',
            'data-structures/Tree',
            'data-structures/Graph',
          ],
        },
        {
          title: '算法',
          children: ['algorithms/sort/'],
        },
      ],
      '/advance/': [
        {
          title: '深入',
          collapsable: false,
          children: [
            'web/dom',
            'web/browser',
            'web/browser-working-principle',
            'web/performance',
            'web/js-run-mechanism',
            'web/react-concept',
          ],
        },
        {
          title: 'Node.js',
          collapsable: false,
          children: ['nodejs/'],
        },
      ],
      '/dev/': [
        {
          title: '开发',
          collapsable: false,
          children: ['git', 'plugin'],
        },
        {
          title: '运维',
          children: ['common-use-linux'],
        },
      ],
      '/refer/': [''],
      '/': [''],
    },
    lastUpdated: '修订于',
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          const dayjs = require('dayjs');
          return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
        },
      },
    ],
    '@vuepress/medium-zoom',
    '@vuepress/back-to-top',
    [
      'seo',
      {
        siteTitle: (_, $site) => $site.title,
        title: $page => $page.title,
        description: $page => $page.frontmatter.description,
        author: (_, $site) => $site.themeConfig.author,
        tags: $page => $page.frontmatter.tags,
      },
    ],
    [
      '@vssue/vuepress-plugin-vssue',
      {
        platform: 'github',
        clientId: '2f2d8147f5bae91392e0',
        clientSecret: '0b9895d80de996ec351fd25799f716100ec77428',
        repo: 'front-end-wiki',
        owner: 'heiyelin',
      },
    ],
  ],
};
