Vue.directive('clickoutside', {
  bind(el, binding) {
    function documentHandler(e) {
      if (el.contains(e.target)) {
        return false
      }
      if (binding.expression) {
        binding.value(e)
      }
    }

    el.__vueClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  update(el, binding) {
    if (binding.oldValue !== binding.value) {
      function documentHandler(e) {
        if (el.contains(e.target)) {
          return false
        }
        if (binding.expression) {
          binding.value(e)
        }
      }
      document.removeEventListener('click', el.__vueClickOutside__)
      el.__vueClickOutside__ = documentHandler
      document.addEventListener('click', documentHandler)
    }
  },
  unbind(el) {
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
})