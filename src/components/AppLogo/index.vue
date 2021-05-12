<template>
    <div :class="classObject">
        <span class="app-logo--0">Fast</span>!<span class="app-logo--1"></span><span class="app-logo--2">CV</span>
    </div>
</template>

<script>
export default {
    name: 'app-logo',
    props: {
        big: Boolean
    },
    computed: {
        classObject () {
            return [
                'app-logo',
                {
                    'app-logo--big': this.big
                }
            ]
        }
    }
}
</script>

<style lang="scss">
.app-logo {
    font-weight: 700;
    color: $blue-dark;
    font-size: 2.5rem;
    letter-spacing: -.25rem;

    &--big {
        font-size: 4em;
    }
}
</style>
