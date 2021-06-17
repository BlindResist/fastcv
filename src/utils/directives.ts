import Vue from 'vue'

Vue.directive('processing', {
    bind (el, binding, vnode): void {
        el.addEventListener('click', (): void => {
            const data = binding.value.data

            // eslint-disable-next-line no-unused-expressions
            vnode.context?.$store.commit('processing', true)

            setTimeout((): void => {
                binding.value.callback(data)
                // eslint-disable-next-line no-unused-expressions
                vnode.context?.$store.commit('processing', false)
            }, 2000)
        })
    }
})
