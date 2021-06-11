// import Vue, { VNode } from 'vue'
// import { DirectiveBinding, DirectiveFunction } from 'vue/types/options'
//
// Vue.directive('processing', {
//     bind (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) {
//         el.addEventListener('click', (): void => {
//             const data = binding.value.data
//
//             vnode.componentInstance.$bus.$emit('processing', true)
//
//             setTimeout((): void => {
//                 binding.value.callback(data)
//                 vnode.componentInstance.$bus.$emit('processing', false)
//             }, 2000)
//         })
//     }
// })
