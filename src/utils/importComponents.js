import Vue from 'vue'

export default () => {
    const requireComponent = require.context('@/components', true, /App[\w-]+\/index\.vue$/)

    requireComponent.keys().forEach(fileName => {
        const componentConfig = requireComponent(fileName)
        const componentName = fileName.split('/')[1]

        Vue.component(componentName, componentConfig.default || componentConfig)
    })
}
