Vue.component('pane', {
  name: 'pane',
  template: '\
    <div :class="className"> \
      <slot></slot> \
    </div>',
  props: {
    name: {
      type: String
    },
    label: {
      type: String,
      default: ''
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      show: true
    }
  },
  computed: {
    className() {
      return ['pane', this.show ? '' : 'hide']
    }
  },
  methods: {
    updateNav() {
      this.$parent.updateNav()
    }
  },
  watch: {
    label() {
      this.updateNav()
    }
  },
  mounted() {
    this.updateNav()
  },
  destroyed() {
    this.updateNav()
  }
})