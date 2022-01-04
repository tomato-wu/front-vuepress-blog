module.exports = {
  // 站点配置 无论你使用什么主题，这些配置项都可以生效。
  lang: 'zh-CN',
  title: 'Tomato\'Blog',
  description: '每天进步一点点',
  base: './' ,

  // 主题配置 主题配置将会被 VuePress 主题来处理，所以它取决于你使用的主题是什么。
  themeConfig: {
    logo: './public/1.jpg',
    navbar: [
      // web前端面试题====================================================================
      {
        text: '面试',
        children: [
          {
            text: 'web前端面试题',
            link:"/eslint/"
          },
          {
            text:'eslint',
            link:'/eslint/'
          }
        ],
      },
      // vue====================================================================
      {
        text: 'vue',
        children: [
          {
            text: 'ant-design-vue',
            link:'/vue/ant-design-vue.md'
          },
          {
            text: 'Vue组件通信方式 props/$emit',
            link:'/vue/PropsAndEmit.md'
          },
          {
            text: 'vue3+vite+ts搭建项目',
            link:'/vue/CreateProject.md'
          }
        
        ],
      },
      // js/ts====================================================================

      {
        text: 'js/ts',
        children: [
          {
            text: 'eslint配置',
            link:'/other/eslintConfig.md'
          },
          {
            text:'git和github',
            link:'/other/gitUse.md'
          },
          {
            text:'vscode插件推荐',
            link:'/other/vscodePlugins.md'
          }
        ],
      },
      // flutter相关的模块====================================================================
      {
        text: 'flutter',
        link: '/foo/',
      },
      {
        text: 'css',
        children:[
          {
            text:"css定位",
            link:'/css/Positioning.md'
          }
        ]
      },
      // flutter相关的模块====================================================================
      {
        text: '我的CSDN',
        link: 'https://i.csdn.net/#/user-center/profile?spm=1000.2115.3001.5111',
      },
      {
        text: '其他',
        children: [
          {
            text: 'eslint配置',
            link:'/other/eslintConfig.md'
          },
          {
            text:'git和github',
            link:'/other/gitUse.md'
          },
          {
            text:'vscode插件推荐',
            link:'/other/vscodePlugins.md'
          },
          {
            text:'linux学习',
            link:'/other/linuxStudy.md'
          }
        ],
      },
    ],
  },
}