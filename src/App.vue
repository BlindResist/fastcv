<template>
    <div
        id="app"
        :class="{ loaded }"
        class="page-wrapper content"
    >
        <router-view></router-view>
        <app-preloader :active="processing"></app-preloader>
    </div>
</template>

<script lang="ts">
import verge from 'verge'
import AppPreloader from '@/components/AppPreloader/index.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
    components: {
        AppPreloader
    }
})

export default class App extends Vue {
    lang: string
    loaded: boolean
    viewportW: number
    processing: boolean

    constructor() {
        super()
        this.lang = 'en'
        this.loaded = false
        this.viewportW = 0
        this.processing = false
    }

    mounted (): void {
        this.loaded = true
        this.viewportW = verge.viewportW()
    }
}
</script>
