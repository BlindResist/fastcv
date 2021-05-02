import Vue from 'vue'

Vue.directive('reload', {
    bind: (element, binding, vnode) => {
        if (binding.value) {
            element.addEventListener('click', event => {
                event.preventDefault()
                window.location.href = event.target.href || element.href
            })
        }
    }
})
