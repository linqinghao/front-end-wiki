module.exports = {
  title: 'Front-End-Wiki',
  description: '前端知识库',
  // permalink: '/:year/:month/:day/:slug', // 永久链接
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '进阶', link: '/advance/browser/' },
      { text: '工具与运维', link: '/dev/git/' },
      { text: '扩展', link: '/refer/' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          sidebarDepth: 2,
          children: ['', 'html', 'css', 'javascript'],
        },
      ],
      '/advance/': [
        {
          title: '进阶',
          collapsable: false,
          children: ['browser', 'performance', 'algorithm', 'design-pattern'],
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
      // fallback
      '/': ['', 'guide', 'advance', 'dev', 'refer'],
    },
    lastUpdated: '上次更新',
  },
  markdown: {
    lineNumbers: true,
  },
  plugins: ['@vuepress/medium-zoom'],
};
