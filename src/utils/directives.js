import Vue from 'vue'

Vue.directive('reload', {
    bind (el, binding, vnode) {
        if (binding.value) {
            el.addEventListener('click', e => {
                e.preventDefault()
                window.location.href = e.target.href || el.href
            })
        }
    }
})

Vue.directive('processing', {
    bind (el, binding, vnode) {
        el.addEventListener('click', e => {
            const data = binding.value.data

            vnode.componentInstance.$bus.$emit('processing', true)

            setTimeout(() => {
                binding.value.callback(data)
                vnode.componentInstance.$bus.$emit('processing', false)
            }, 2000)
        })
    }
})
