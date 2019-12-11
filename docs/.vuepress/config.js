module.exports = {
  title: 'Front-End-Wiki',
  description: '前端知识库',
  // permalink: '/:year/:month/:day/:slug', // 永久链接
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '进阶', link: '/advance/' },
      { text: '工具与运维', link: '/dev/' },
      { text: '参考', link: '/refer/' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: '指南',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            'html', 'css', 'javascript'
          ],
        },
      ],
      '/advance/': [
        {
          title: '进阶',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['/advance/frontend/', '前端与浏览器'],
            ['/advance/performance/', '前端性能优化'],
            ['/advance/nodejs/', 'Node.js'],
            ['/advance/algorithm/', '数据结构与算法'],
            ['/advance/design-pattern/', '设计模式'],
          ],
        },
      ],
      '/dev/': [
        {
          title: '运维',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['/op/git/', 'Git'],
            ['/op/nginx/', 'Nginx'],
            ['/op/linux/', '常用 linux 命令'],
          ],
        },
        {
          title: '工具',
          sidebarDepth: 2,
          children: [
            ['/tool/', 'VSCode'],
            ['/tool/', 'Chrome'],
          ],
        },
      ],
      // fallback
      '/': ['', 'guide', 'advance', 'dev', 'refer'],
    },
    lastUpdated: '上次更新',
  },
  markdown: {
    lineNumbers: true,
  },
};
