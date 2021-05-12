<template>
    <div class="app-preview">
        <component
            ref="page"
            :data="data"
            :is="component"
            v-if="component"
        />
    </div>
</template>

<script>
import One from '@/views/Themes/one.vue'
import Two from '@/views/Themes/two.vue'
import Three from '@/views/Themes/three.vue'
import Default from '@/views/Themes/default.vue'

export default {
    name: 'app-preview',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        data: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            themes: {
                one: One,
                two: Two,
                three: Three,
                default: Default
            }
        }
    },
    computed: {
        component () {
            return this.themes[this.type]
        }
    }
}
</script>

<style lang="scss">
.app-preview {
    display: inline-flex;
    margin: 0 auto;
    border: 1px solid rgba($black, .2);
    background-color: $white;
    box-shadow: .5rem .5rem 0 0 rgba($black, .1);
}
</style>
