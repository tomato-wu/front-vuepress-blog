
@[toc]
## 一，简介
`props`和$`emit`相信大家十分的熟悉了，这是我们最常用的vue通信方式。

`props：props`可以是数组或对象，用于接收来自父组件通过`v-bind`传递的数据。当`props`为数组时，直接接收父组件传递的属性；当 props 为对象时，可以通过`type、default、required、validator`等配置来设置属性的类型、默认值、是否必传和校验规则。

`$emit`：在父子组件通信时，我们通常会使用$emit来触发父组件v-on在子组件上绑定相应事件的监听。

下面通过代码来实现一下props和$emit的父子组件通信，在这个实例中，我们都实现了以下的通信：

 - **父向子传值**：父组件通过:messageFromParent="message"将父组件 message 值传递给子组件，当父组件的
   input 标签输入时，子组件p标签中的内容就会相应改变。
 - **子向父传值**：父组件通过@on-receive="receive"在子组件上绑定了 receive 事件的监听，子组件 input
   标签输入时，会触发 receive 回调函数， 通过this.$emit('on-receive', this.message)将子组件
   message 的值赋值给父组件 messageFromChild ，改变父组件p标签的内容。
   

```typescript
// 子组件代码
<template>
  <div class="child">
    <h4>this is child component</h4>
    <input type="text" v-model="message" @keyup="send" />
    <p>收到来自父组件的消息：{{ messageFromParent }}</p>
  </div>
</template>
<script>
export default {
  name: 'Child',
  props: ['messageFromParent'],  // 通过props接收父组件传过来的消息
  data() {
    return {
      message: '',
    }
  },
  methods: {
    send() {
      this.$emit('on-receive', this.message)  // 通过$emit触发on-receive事件，调用父组件中receive回调，并将this.message作为参数
    },
  },
}
</script>
```

```typescript
// 父组件代码
<template>
  <div class="parent">
    <h3>this is parent component</h3>
    <input type="text" v-model="message" />
    <p>收到来自子组件的消息：{{ messageFromChild }}</p>
    <Child :messageFromParent="message" @on-receive="receive" />
  </div>
</template>
<script>
import Child from './child'
export default {
  name: 'Parent',
  data() {
    return {
      message: '', // 传递给子组件的消息
      messageFromChild: '',
    }
  },
  components: {
    Child,
  },
  methods: {
    receive(msg) { // 接受子组件的信息，并将其赋值给messageFromChild
      this.messageFromChild = msg
    },
  },
}
</script>
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/6306772130784bac8007e214e4425cf7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA55Wq6IyEd2t5,size_20,color_FFFFFF,t_70,g_se,x_16)
## 二，setup script 语法糖下使用props
官方提供了一个实验性的写法，直接在script里面写setup的内容，即：setup script。

之前我们写组件是这样的：

```typescript
<template>
  <div>
    {{count}}
    <ImgReview></ImgReview >
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from "vue";
import ImgReview from "./components/ImgReview.vue";

export default defineComponent({
  components: {
    ImgReview,
  },
  setup() {
    const count = ref(0);
    return { count };
  }
});
</script>
```
启用setup script后：在script上加上setup

```typescript
<template>
  <div>
    {{count}}
    <ImgReview></ImgReview>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import ImgReview from "./components/ImgReview.vue";
const count = ref(0);
</script>
```
是不是看起来简洁了很多，组件直接导入就行了，不用注册组件，数据定义了就可以用。其实我们可以简单的理解为script包括的内容就是setup中的，并做了return。
## 定义props
使用props需要用到defineProps来定义，具体用法跟之前的props写法类似：

**基础用法**

```typescript
<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps(['userInfo', 'gameId']);
</script>
```
构造函数进行检查 给props定义类型：

```typescript
onst props = defineProps({
  gameId: Number,
  userInfo: {
      type: Object,
      required: true
  }
});
```
使用类型注解进行检查

```typescript
defineProps<{
  name: string
  phoneNumber: number
  userInfo: object
  tags: string[]
}>()
```
可以先定义好类型：

```typescript
interface UserInfo {
  id: number,
  name: string,
  age: number
}

defineProps<{
  name: string
  userInfo: UserInfo
}>()
```
## defineEmit

```typescript
<script lang="ts" setup>
import { defineEmit } from 'vue';

// expects emits options
const emit = defineEmit(['kk', 'up']);
const handleClick = () => {
  emit('kk', '点了我');
};
</script>
```

```typescript
<Comp @kk="handleClick"/>

<script lang="ts" setup>
const handleClick = (data) => {
  console.log(data)
}
</script>
```
在标准组件写法里，setup 函数默认支持两个入参：
![在这里插入图片描述](https://img-blog.csdnimg.cn/6a1cec7f9cfe4438bf3b762032996cf8.png)

在setup script 中使用useContext获取上下文：

```typescript
<script lang="ts" setup>
 import { useContext } from 'vue'
 const { slots, attrs } = useContext();
</script>
```
获取到的slots,attrs跟setup里面的是一样的。

