<template>
    <div :class="classObject">
        <span class="app-logo--part-0">Fast</span><span class="app-logo--part-1">!</span><span class="app-logo--part-2">CV</span>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component

export default class AppLogo extends Vue {
    @Prop(Boolean) readonly big!: boolean

    get classObject (): [string, { [elem: string]: boolean} ] {
        return [
            'app-logo',
            {
                'app-logo--big': this.big
            }
        ]
    }
}
</script>

<style lang="scss">
.app-logo {
    font-weight: 700;
    color: $blue-dark;
    font-size: 2.5rem;
    font-style: italic;
    letter-spacing: -.25rem;
    user-select: none;

    &--big {
        font-size: 4em;
    }

    &--part {

        &-1 {
            color: $yellow-dark;
            text-shadow: 2px 0 0 $blue-dark;
        }
    }
}
</style>
