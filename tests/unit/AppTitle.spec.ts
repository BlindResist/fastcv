import { shallowMount } from '@vue/test-utils'
import AppTitle from '@/components/AppTitle/index.vue'

describe('AppTitle', () => {
    const props = {
        tag: 'h1',
        text: 'Sample text',
        weight: 'bold'
    }

    test('Render AppTitle when prop.tag passed', () => {
        const wrapper = shallowMount(AppTitle, {
            propsData: { tag: props.tag }
        })
        expect(wrapper.vm.$el.tagName.toLowerCase()).toMatch(props.tag)
    })

    test('Render AppTitle when prop.text passed', () => {
        const wrapper = shallowMount(AppTitle, {
            propsData: { text: props.text }
        })
        expect(wrapper.text()).toBe(props.text)
    })
})
