Vue.component('tabs', {
  template: '\
    <div class="tabs"> \
      <div class="tabs-bar"> \
        <div \
          :class="tabCls(item)" \
          v-for="(item, index) in navList" \
          @click="handleChange(index)"> \
          <span>{{item.label}}</span> \
          <img \
            class="icon-close" \
            src="close.png" \
            v-if="item.closable" \
            @click.stop="handleClose(index)" \
          /> \
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
          name: pane.name || index,
          closable: pane.closable
        })
        if (!pane.name) pane.name = index
      })
      if (this.currentValue == null) {
        this.currentValue = tabs[0].name
      }
      this.updateStatus()
    },
    updateStatus() {
      const tabs = this.getTabs()
      tabs.forEach(tab => tab.show = tab.name === this.currentValue)
    },
    handleChange(index) {
      const nav = this.navList[index]
      if (!nav) {
        return
      }
      const name = nav.name
      this.currentValue = name
      this.$emit('input', name)
      this.$emit('on-click', name)
    },
    handleClose(index) {
      this.$emit('on-remove', index)

      // 关闭了当前标签页
      const length = this.navList.length
      const nav = this.navList[index]
      if (this.currentValue === nav.name) {
        if (index === length - 1) {
          // 如果是最后一个则选中前一个
          this.handleChange(length - 2)
        } else {
          this.handleChange(index + 1)
        }
      }
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