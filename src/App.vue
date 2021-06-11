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

<script>
import verge from 'verge'

export default {
    name: 'app',
    data () {
        return {
            viewportW: 0,
            loaded: false,
            processing: false
        }
    },
    mounted () {
        this.loaded = true
        this.viewportW = verge.viewportW()

        this.$bus.$on('change-lang', lang => { this.lang = lang })
        this.$bus.$on('processing', state => { this.processing = state })
    },
    beforeDestroy () {
        this.$bus.$off('change-lang', lang => { this.lang = lang })
        this.$bus.$off('processing', state => { this.processing = state })
    }
}
</script>
