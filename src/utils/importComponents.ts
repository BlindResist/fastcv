import Vue from 'vue'

declare var require: any

export default (): void => {
    const requireComponent = require.context('@/components', true, /App[\w-]+\/index\.vue$/)

    requireComponent.keys().forEach((fileName: string) => {
        const componentConfig: Object = requireComponent(fileName)
        const componentName: string = fileName.split('/')[1]

        Vue.component(componentName, componentConfig)
    })
}
