const app = new Vue({
  el: '#app',
  data: {
    selected: [],
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
  computed: {
    totalPrice: function () {
      let total = 0
      for (let i = 0; i < this.list.length; i++) {
        const item = this.list[i]
        if (this.selected.indexOf(item.id) >= 0) {
          total += item.price * item.count
        }
      }
      return total.toString().replace(/\B(?=(\d{3})+$)/g, ',')
    },
    selectedAll: function () {
      return this.selected.length === this.list.length
    }
  },
  methods: {
    handleReduce: function (index) {
      if (this.list[index].count === 1) return
      this.list[index].count--
    },
    handleAdd: function (index) {
      this.list[index].count++
    },
    handleRemove: function (index) {
      this.list.splice(index, 1)
    },
    toggleSelectAll: function () {
      const selected = []
      if (this.selected.length !== this.list.length) {
        this.list.forEach(item => {
          selected.push(item.id)
        })
      }
      this.selected = selected
    }
  },
})