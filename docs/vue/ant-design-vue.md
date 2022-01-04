首先，在百度到ant design官网之后，要在右上角调整版本
![在这里插入图片描述](https://img-blog.csdnimg.cn/68d0c4b833394ad4b9d63c758ad1aa90.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBA55Wq6IyEd2t5,size_20,color_FFFFFF,t_70,g_se,x_16)
不然会有大坑
下载使用
```typescript
npm i --save ant-design-vue@next
```

## 完整引入

```typescript
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';

const app = createApp();
app.config.productionTip = false;

app.use(Antd);
```

## 按需加载
使用 babel-plugin-import 来进行按需加载
babel-plugin-import插件的作用其实就是帮我们在打包的时候删除掉我们没有用到的组件的css
1，安装

```typescript
npm i babel-plugin-import -D
```
2，添加.babelrc文件
3，在.babelrc中加入


```typescript
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "ant-design-vue",
        "libraryDirectory": "es",
        "style": true // `style: true` 会加载 less 文件
      }
    ]
  ]
}
```
在main.ts中

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Card } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App).use(store).use(router).use(Card).mount('#app')

```
> 注意，babel-plugin-import 的 style 属性除了引入对应组件的样式，也会引入一些必要的全局样式。如果你不需要它们，建议不要使用此属性。你可以 import 'ant-design-vue/dist/antd.css 手动引入，并覆盖全局样式。

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.ts'

import {
    Button, Pagination, Layout, Card,
    Divider, Input, Menu, Modal,
    Collapse, Spin, List, Popconfirm,
    Avatar, Select, Form, PageHeader
} from 'ant-design-vue'

import 'ant-design-vue/dist/antd.css';

createApp(App)
.use(router)
.use(store)
.use(Button).use(Pagination).use(Layout)
.use(Card).use(Divider).use(Input)
.use(Menu).use(Modal).use(Collapse)
.use(Spin).use(List).use(Popconfirm)
.use(Avatar).use(Select).use(Form).use(PageHeader)
.mount('#app')
```
在main.ts中引入的组件还是全局的，意思就是不上全局引入整个组件库，而是全局引入这个组件，引入的组件在所有的页面都可以用
例如这样就是全局引入了Button这个组件

```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App).use(store).use(router).use(Button).mount('#app')
```
 我看到别人是一些常用的组件全局引用 然后把一些个别使用到的组件放在vue文件去引入，这样子可能资源损耗就稍微少点
 在具体页面引入的话，可以这样写
 

```typescript
<template>

</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { LeftSquareFilled, UpCircleFilled } from '@ant-design/icons-vue'
import { BackTop } from 'ant-design-vue'

export default defineComponent({
  name: 'Waterfall',
  components: {
    LeftSquareFilled,
    UpCircleFilled,
    'a-back-top': BackTop
  },
  setup () {
   

    return {
    }
  }

})
</script>

<style scoped>

</style>

```
