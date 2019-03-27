var app = new Vue({
  el: '#app',
  data: {
    activeKey: '2',
    panes: [
      {
        label: '标签一',
        name: '0',
        closable: true,
        content: '标签一的内容'
      },
      {
        label: '标签二',
        name: '1',
        closable: true,
        content: '标签二的内容'
      },
      {
        label: '标签三',
        name: '2',
        content: '标签三的内容'
      }
    ]
  },
  methods: {
    handleRemove(index) {
      this.panes.splice(index, 1)
    }
  }
})