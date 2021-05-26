<template>
    <div
        class="app-preview"
        :style="{ transform }"
    >
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
            },
            padding: 128,
            transform: ''
        }
    },
    mounted () {
        this.fitPreview()

        window.addEventListener('resize', () => this.fitPreview())
    },
    computed: {
        component () {
            return this.themes[this.type]
        }
    },
    methods: {
        fitPreview () {
            const parent = {
                width: this.$parent.$refs.preview.offsetWidth,
                height: this.$parent.$refs.preview.offsetHeight
            }

            const width = parent.width / (this.$el.offsetWidth + this.padding)
            const height = parent.height / (this.$el.offsetHeight + this.padding)
            const scale = Math.min(width, height)

            this.transform = `translate(-50%, -50%) scale(${scale})`
        }
    }
}
</script>

<style lang="scss">
.app-preview {
    display: inline-flex;
    flex-shrink: 0;
    width: $pdf-width;
    height: calc(#{$pdf-width}*#{$pdf-ratio});
    overflow: hidden;
    padding: 1px;
    position: relative;
    left: 50%;
    top: 50%;
    border: 1px solid rgba($black, .2);
    background-color: $white;
    box-shadow: .5rem .5rem 0 0 rgba($black, .1);
    transform-origin: center center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-background-clip: content-box;
    background-clip: content-box;
}
</style>
