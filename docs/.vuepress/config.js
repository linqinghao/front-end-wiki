module.exports = {
  base: '/front-end-wiki/',
  title: 'Front-End-Wiki',
  description: '前端知识库',
  // permalink: '/:year/:month/:day/:slug', // 永久链接
  themeConfig: {
    sidebarDepth: 3,
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '进阶', link: '/advance/' },
      { text: '参考', link: '/refer/' },
    ],
    sidebar: [
      {
        title: '指南',
        collapsable: false,
        children: [
          ['/guide/html/', 'HTML'],
          ['/guide/css/', 'CSS'],
          ['/guide/javascript/', 'Javascript'],
        ],
      },
      {
        title: '进阶',
        children: [
          ['/advance/frontend/', '前端'],
          ['/advance/performance/', '前端性能优化'],
          ['/advance/nodejs/', 'Node.js'],
          ['/advance/algorithm/', '数据结构与算法'],
          ['/advance/design-pattern/', '设计模式'],
        ],
      },
      {
        title: '运维',
        children: [
          ['/op/git/', 'Git'],
          ['/op/nginx/', 'Nginx'],
          ['/op/linux/', '常用 linux 命令'],
        ],
      },
      {
        title: '工具',
        children: [
          ['/tool/', 'VSCode'],
          ['/tool/', 'Chrome'],
        ],
      },
    ],
    lastUpdated: '上次更新',
  },
  markdown: {
    lineNumbers: true,
    toc: { includeLevel: [1, 2, 3] },
  },
};
