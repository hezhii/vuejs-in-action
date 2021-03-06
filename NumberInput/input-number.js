Vue.component('input-number', {
  props: {
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    }
  },
  template: '\
    <div class="input-number"> \
      <input type="text" :value="currentValue" @change="handleChange" @keydown.up.prevent="handleUp" @keydown.down.prevent="handleDown"> \
      <button @click="handleDown" :disabled="currentValue <= min">-</button> \
      <button @click="handleUp" :disabled="currentValue >= max">+</button> \
    </div>',
  computed: {
    currentValue: function () {
      if (this.value > this.max) return this.max
      if (this.value < this.min) return this.min
      return this.value
    }
  },
  methods: {
    handleDown: function () {
      this.$emit('input', Math.max(this.currentValue - this.step, this.min))
    },
    handleUp: function () {
      this.$emit('input', Math.min(this.currentValue + this.step, this.max))
    },
    handleChange: function (e) {
      let v = e.target.value.trim()
      if (isValueNumber(v)) {
        v = Number(v)
        v = v > this.max ? this.max : (v < this.min ? this.min : v)
        this.$emit('input', v)
      }
      e.target.value = this.currentValue
    }
  },
})

function isValueNumber(value) {
  return /(^-?[0-9]+\.\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1})/.test('' + value)
}