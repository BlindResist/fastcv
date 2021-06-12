import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'

interface Data {
    site: string
    name: string
    photo: string
    phone: string
    email: string
    address: string
    dateOfBirth: string
    maritalStatus: string
}

@Component
class ComponentEmitters extends Vue {
    componentType: string

    constructor (componentType: string) {
        super()
        this.componentType = componentType
    }

    @Watch('innerData', { deep: true })
    onInnerDataChanged (data: Data): void {
        this.$emit('input', {
            ...data,
            type: this.componentType
        })
    }
}

export { ComponentEmitters, Data }
