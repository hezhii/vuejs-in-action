const app = new Vue({
  el: '#app',
  data: {
    selected: [],
    list: [
      {
        type: 'electronic',
        name: '电子产品',
        list: [
          {
            id: 1,
            name: 'iPhone 7',
            price: 6188,
            count: 1
          },
          {
            id: 2,
            name: 'iPad Pro',
            price: 5888,
            count: 1
          },
          {
            id: 3,
            name: 'MacBook Pro',
            price: 21488,
            count: 1
          }
        ]
      },
      {
        type: 'fruit',
        name: '水果',
        list: [
          {
            id: 4,
            name: '苹果',
            price: 4,
            count: 2
          },
          {
            id: 5,
            name: '西瓜',
            price: 20,
            count: 1
          }
        ]
      }
    ]
  },
  computed: {
    totalPrice: function () {
      let total = 0
      for (let i = 0; i < this.list.length; i++) {
        const group = this.list[i]
        for (let j = 0; j < group.list.length; j++) {
          const item = group.list[j];
          if (this.selected.indexOf(item.id) >= 0) {
            total += item.price * item.count
          }
        }
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
    },
    productCount: function () {
      let count = 0
      this.list.forEach(group => group.list.forEach(() => count++))
      return count
    },
    selectedAll: function () {
      return this.selected.length === this.productCount
    }
  },
  methods: {
    handleReduce: function (groupIndex, index) {
      const group = this.list[groupIndex]
      if (group.list[index].count === 1) return
      group.list[index].count--
    },
    handleAdd: function (groupIndex, index) {
      const group = this.list[groupIndex]
      group.list[index].count++
    },
    handleRemove: function (groupIndex, index) {
      const group = this.list[groupIndex]
      if (group.list.length === 1) {
        // 只剩最后一项了，移除所有
        this.list.splice(groupIndex, 1)
      } else {
        group.list.splice(index, 1)
      }
    },
    toggleSelectAll: function () {
      const selected = []
      if (this.selected.length !== this.productCount) {
        this.list.forEach(group => group.list.forEach(item => selected.push(item.id)))
      }
      this.selected = selected
    }
  },
})