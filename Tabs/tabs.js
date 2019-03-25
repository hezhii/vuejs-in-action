Vue.component('tabs', {
  template: '\
    <div class="tabs"> \
      <div class="tabs-bar"> \
        <div \
          :class="tabCls(item)" \
          v-for="(item, index) in navList" \
          @click="handleChange(index)"> \
          {{item.label}} \
        </div> \
      </div> \
      <div class="tabs-content"> \
        <slot></slot> \
      </div> \
    </div>',
  props: {
    value: {
      type: [String, Number]
    }
  },
  data: function () {
    return {
      navList: [],
      currentValue: this.value
    }
  },
  methods: {
    tabCls(item) {
      return [
        'tabs-tab',
        {
          'tabs-tab-active': item.name === this.currentValue
        }
      ]
    },
    getTabs() {
      return this.$children.filter(item => item.$options.name === 'pane')
    },
    updateNav() {
      this.navList = []
      const tabs = this.getTabs()
      tabs.forEach((pane, index) => {
        this.navList.push({
          label: pane.label,
          name: pane.name || index
        })
        if (!pane.name) pane.name = index
      })
      if (this.currentValue == null) {
        this.currentValue = tabs[0].name
      }
    },
    updateStatus() {
      const tabs = this.getTabs()
      tabs.forEach(tab => tab.show = tab.name === this.currentValue)
    },
    handleChange(index) {
      const nav = this.navList[index]
      const name = nav.name
      this.currentValue = name
      this.$emit('input', name)
      this.$emit('on-click', name)
    }
  },
  watch: {
    value: function (val) {
      this.currentValue = val
    },
    currentValue: function () {
      this.updateStatus()
    }
  }
})