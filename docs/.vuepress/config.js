module.exports = {
  // 站点配置 无论你使用什么主题，这些配置项都可以生效。
  lang: 'zh-CN',
  title: 'Tomato\'Blog',
  description: '每天进步一点点',
  base: './' ,


  plugins: {
    '@vuepress/back-to-top': true
},

  // 主题配置 主题配置将会被 VuePress 主题来处理，所以它取决于你使用的主题是什么。
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
    navbar: [
      // javaScript相关的模块====================================================================
      {
        text: 'js',
        children: [
          {
            text: 'SubGroup',
            children: ['/group/sub/foo.md', '/group/sub/bar.md'],
          },
          {
            text:'eslint',
            link:'/eslint/'
          }
        ],
      },
      // 前端模块化相关的模块====================================================================
      {
        text: '前端工程化',
        children: [
          {
            text: 'eslint配置',
            link:'/eslintPage/eslintConfig.md'
          },
          {
            text:'eslint',
            link:'/eslint/'
          }
        ],
      },
      // vue相关的模块====================================================================

      {
        text: 'vue',
        children: [
          {
            text: 'SubGroup',
            children: ['/group/sub/foo.md', '/group/sub/bar.md'],
          },
          {
            text:'eslint',
            link:'/eslint/'
          }
        ],
      },
      // flutter相关的模块====================================================================
      {
        text: 'flutter',
        link: '/foo/',
      },
      {
        text: 'vscode',
        link: '/foo/',
      },
      {
        text: '我的CSDN',
        link: 'https://i.csdn.net/#/user-center/profile?spm=1000.2115.3001.5111',
      },
      {
        text: '其他',
        children: ['/group/foo.md', '/group/bar.md'],
      },
    ],
  },
}