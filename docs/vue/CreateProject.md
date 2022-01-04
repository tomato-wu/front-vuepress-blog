@[toc]
## 一，介绍
Vite（法语单词，“快” 的意思）是一种新型的前端构建工具

最初是配合 Vue3.0 一起使用的，后来适配了各种前端项目，目前提供了 Vue、React、Preact 框架模板

vite —— 一个由 vue 作者尤雨溪开发的 web 开发工具，它具有以下特点：

 - 快速的冷启动
 - 即时的模块热更新
 - 真正的按需编译
从作者在微博上的发言：

> Vite，一个基于浏览器原生 ES imports 的开发服务器。利用浏览器去解析 imports，在服务器端按需编译返回，完全跳过了打包这个概念，服务器随起随用。同时不仅有 Vue 文件支持，还搞定了热更新，而且热更新的速度不会随着模块增多而变慢。针对生产环境则可以把同一份代码用 rollup 打。虽然现在还比较粗糙，但这个方向我觉得是有潜力的，做得好可以彻底解决改一行代码等半天热更新的问题


中可以看出 vite 主要特点是基于浏览器 native 的 ES module 来开发，省略打包这个步骤，因为需要什么资源直接在浏览器里引入即可

## 二，搭建项目

通过在终端中运行以下命令，可以使用 Vite 快速构建 Vue 项目。
使用 npm：

```powershell
$ npm init @vitejs/app <project-name>
$ cd <project-name>
$ npm install
$ npm run dev
```

或者 yarn：

```powershell
$ yarn create @vitejs/app <project-name>
$ cd <project-name>
$ yarn
$ yarn dev
```

## 三，安装vue-router4.0

```powershell
npm install vue-router@4
```

> 在components目录下创建两个文件即可

```powershell
//router目录下的index.js
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../components/Home.vue') },
  { path: '/about', component: () => import('../components/About.vue') }
]

const router = createRouter({
  // hash 或者 history 模式
  // history: createWebHashHistory(),
  history: createWebHistory(),
  routes
})
// 全局路由守卫的方法跟vue-router3一样
//路由全局前置守卫
router.beforeEach((to,from,next)=>{
  console.log('路由全局前置守卫', to, from);
  next()
})
//路由全局后置守卫
router.afterEach((to,from,next)=>{
  console.log('路由全局后置守卫', to, from);
  next()
})

export default router

```
引入router

```powershell
//main.js
import { createApp } from 'vue'
import App from './App.vue'
// 引入router
import router from './router'

createApp(App)
.use(router)
.mount('#app')

```

```powershell
//App.vue
<template>
  <div> 
    <router-link to="/">home</router-link>
    <router-link to="/about">about</router-link>
    <router-view></router-view>
  </div>
</template>

```

## 四，安装vuex

```javascript
npm install vuex@next --save
```
src目录下新建store/index.js

```javascript
import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```
main.ts文件引入

```javascript
import { createApp } from 'vue'
import App from './App.vue'
// 引入router
import router from './router'
// 引入store
import store from './store'

createApp(App).use(router).use(store).mount('#app')

```

## 五，安装 Element plus
官网地址：https://element-plus.gitee.io/#/zh-CN/component/quickstart

```javascript
npm install element-plus --save
```
然后在main.ts里面

```javascript
import { createApp } from 'vue'
import App from './App.vue'
// 引入router
import router from './router'
// 引入store
import store from './store'
// 引入 ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')

```
页面上使用
About.vue

```javascript
<template>
  <el-button type="success">成功按钮</el-button>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { ElButton } from 'element-plus'

  export default defineComponent({
    name: 'app',
    components: {
      ElButton,
    },
  })
</script>
```
