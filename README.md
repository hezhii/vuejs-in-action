# Vue.js 实战

去年至今都是在从事 React 相关的开发工作，之前学习过的 Vue 相关知识逐渐开始淡忘。最近计划深入 Vue 的开发，这个项目用来保存一些 Demo 和笔记。

目前学习主要来源是 《Vue.js 实战》一书以及官方的文档。

## 指令

- `v-text`：更新元素的 `textContent`，如果要更新部分的 textContent ，需要使用 `{{ Mustache }}` 插值。
- `v-html`：更新元素的 `innerHTML`。
- `v-show`：通过 `display` 属性控制元素的显示隐藏。
- `v-if`：根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。
- `v-else` 和 `v-else-if`：配合 `v-if`，添加“else 块”或“else if 块”。
- `v-for`：循环渲染。此指令之值，必须使用特定语法 `alias in expression` ，为当前遍历的元素提供别名
- `v-on`：缩写`@`，绑定事件监听器。有多种修饰符
  - `.stop` - 调用 event.stopPropagation()。
  - `.prevent` - 调用 event.preventDefault()。
  - `.capture` - 添加事件侦听器时使用 capture 模式。
  - `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
  - `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
  - `.native` - 监听组件根元素的原生事件。
  - `.once` - 只触发一次回调。
  - `.left` - (2.2.0) 只当点击鼠标左键时触发。
  - `.right` - (2.2.0) 只当点击鼠标右键时触发。
  - `.middle` - (2.2.0) 只当点击鼠标中键时触发。
  - `.passive` - (2.3.0) 以 { passive: true } 模式添加侦听器
- `v-bind`：动态地绑定一个或多个特性，或一个组件 prop 到表达式。在绑定 class 或 style 特性时，支持其它类型的值，如数组或对象。
  - `.prop` - 被用于绑定 DOM 属性 (property)。
  - `.camel` - (2.1.0+) 将 kebab-case 特性名转换为 camelCase. (从 2.1.0 开始支持)
  - `.sync` (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。
- `v-model`：在表单控件或者组件上创建双向绑定。
  - `.lazy` - 取代 input 监听 change 事件。
  - `.number` - 输入字符串转为有效的数字。
  - `.trim` - 输入首尾空格过滤。
- `v-slot`：提供具名插槽或需要接收 prop 的插槽。
- `v-pre`：跳过这个元素和它的子元素的编译过程。
- `v-cloak`：这个指令保持在元素上直到关联实例结束编译。
- `v-once`：只渲染元素和组件**一次**。


## DEMO

### 购物车

[源码](https://github.com/hezhii/vuejs-in-action/tree/master/ShoppingCart)

购物车 DEMO 主要用到了 `v-bind`、`v-for`、`v-if` 等指令、事件处理、计算属性。其中，练习一中的添加全选/取消全选功能涉及到表单输入的绑定。`v-model` 指令本质是个语法糖，相当于设置了元素的值并监听了相应的 change 事件，结合 `v-bind` 可以将输入框的值绑定到动态属性上。