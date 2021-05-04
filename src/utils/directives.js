import Vue from 'vue'

Vue.directive('reload', {
    bind: function (el, binding, vnode) {
        if (binding.value) {
            el.addEventListener('click', e => {
                e.preventDefault()
                window.location.href = e.target.href || el.href
            })
        }
    }
})

Vue.directive('processing', {
    bind: function (el, binding, vnode) {
        el.addEventListener('click', e => {
            const data = binding.value.data

            vnode.componentInstance.$bus.$emit('loading', true)

            setTimeout(() => {
                binding.value.callback(data)
                vnode.componentInstance.$bus.$emit('loading', false)
            }, 2000)
        })
    }
})
