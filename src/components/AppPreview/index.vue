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

<script lang="ts">
import One from '@/views/Themes/one.vue'
import Two from '@/views/Themes/two.vue'
import Three from '@/views/Themes/three.vue'
import Default from '@/views/Themes/default.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'

type FormData = {
    objective: {
        position: string,
        about: string
    },
    personal: {
        site: string,
        photo: string,
        name: string,
        phone: string,
        email: string,
        address: string,
        dateOfBirth: string,
        maritalStatus: string,
    },
    education: ObjectConstructor[],
    experience: ObjectConstructor[],
    skills: string,
    qualities: string
}

@Component
export default class AppPreview extends Vue {
    @Prop({
        type: String,
        default: 'default'
    }) readonly type!: string

    @Prop(Object) readonly data!: FormData

    themes: {
        one: typeof One,
        two: typeof Two,
        three: typeof Three,
        default: typeof Default
    }

    padding: number
    transform!: string

    constructor () {
        super()
        this.themes = {
            one: One,
            two: Two,
            three: Three,
            default: Default
        }
        this.transform = ''
        this.padding = 128
    }

    mounted () {
        this.fitPreview()

        window.addEventListener('resize', () => this.fitPreview())
    }

    get component (): ObjectConstructor {
        return this.themes[this.type]
    }

    fitPreview (): void {
        const parent: {width: number, height: number} = {
            width: (this.$parent.$refs.preview as HTMLElement).offsetWidth,
            height: (this.$parent.$refs.preview as HTMLElement).offsetHeight
        }

        const width: number = parent.width / ((this.$el as HTMLElement).offsetWidth + this.padding)
        const height: number = parent.height / ((this.$el as HTMLElement).offsetHeight + this.padding)
        const scale: number = Math.min(width, height)

        this.transform = `translate(-50%, -50%) scale(${scale})`
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
