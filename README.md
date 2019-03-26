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

## 组件通信

### 父子组件通信

父组件通过 `props` 向子组件传递数据，子组件通过 `$emit` 触发事件来向父组件传递数据。

在自定义组件行可以使用 `v-model` 指令，实质是添加了语法糖，监听了相应的 `change` 事件，并绑定到了父组件的 data 中。通过 `v-model` 指令可以创建自定义的表单输入组件，自定义表单组件需要接受 `value` 属性并在有新的 `value` 时触发 `change` 事件。

### 非父子组件通信

在 Vue.js 1.x 中提供了 `$dispatch` 和 `$broadcast` 方法，用于子组件向上级分发事件和父组件向下级广播事件，这两种方式在第一次接收到后停止冒泡，除非返回 true。缺点：无法解决兄弟组件通信的问题；不易于组件结构扩展。

在 Vue.js 2.x 中推荐使用一个空的 Vue 实例作为中央事件总线（bus）。通过 `bus.$on` 来监听事件，`bus.$emit` 来触发事件，并且可以 bus 实例添加 data、methods、computed 等。优点：轻松地实现了任何组件间的通信。

### 父链接和子组件索引

在子组件中，通过 `this.$parent` 可以直接访问该组件的父实例或组件，父组件也可以通过 `this.$children` 访问它所有的子组件。

通过，`this.$children` 来遍历出子组件是比较困难的，因此 Vue 提供了 ref 属性来为子组件指定一个索引名称，然后可以通过 `this.$refs[refName]` 来访问指定名称的子组件。

## Slot

组件内部可以定义好 `<slot>`，在使用时，组件标签内的内容会替代相应的 `<slot>` 标签及内容，这点和 React 中的 children 属性类似（Vue 中也可以通过 `$slots` 访问）。

### 单个 Slot

子组件内 `<slot>`，子组件标签内的内容会完全替代 `<slot>`及内容。

### 具名 Slot

子组件定义 `<slot>` 时可以设置 name，然后在使用时通过 `slot` 属性去匹配相应的 name，这点比 React 中要方便，如果 React 中这样做需要遍历 children 去进行匹配，不过 React 中可以通过不同的属性传递 slot 的内容。

### 作用于插槽

这个理解起来感觉和 React 中的 render props 类似，作用就是可以复用子组件内部的一些逻辑，同时又将内容的渲染交给父组件。

## DEMO

### 购物车

[源码](https://github.com/hezhii/vuejs-in-action/tree/master/ShoppingCart)

购物车 DEMO 主要用到了 `v-bind`、`v-for`、`v-if` 等指令、事件处理、计算属性。

练习一中的添加全选/取消全选功能涉及到表单输入的绑定。`v-model` 指令本质是个语法糖，相当于设置了元素的值并监听了相应的 change 事件，结合 `v-bind` 可以将输入框的值绑定到动态属性上。

练习二中，增加了商品分类的功能。在渲染时涉及到 `v-for` 指令的嵌套以及嵌套情况下的作用域相关问题（和 js 一样），逻辑部分由于数据结构的调整，有一些相应的修改，而修改后的全选功能依赖了 `productCount` 计算属性。

### 数字输入框

[源码](https://github.com/hezhii/vuejs-in-action/tree/master/NumberInput)

我没有按照书中示例代码来实现，书中在 input-number 内部也维护了一个状态。我这里的实现类似于 React 中的受控组件，数据来源于父组件传递过来的属性，修改时触发事件。Vue 中即使给表单输入元素绑定了 value，表单元素仍会保留内部状态，这点和 React 还是有区别的。

练习一中添加对键盘上下键的支持通过键盘事件及其修饰符即可实现。

### 标签页组件

[源码](https://github.com/hezhii/vuejs-in-action/tree/master/Tabs)

Tabs 组件由 Tabs 和 Pane 两个组件组成，Pane 作为 Tabs 的子组件来使用。其中，Pane 提供标题和内容，Tabs 负责控制。

练习一：添加了 closeable 属性后不起作用，找了半天没找到原因，最终原来是 navList 中 push 时没有加入该属性（不是直接 push 的 Pane 实例）。