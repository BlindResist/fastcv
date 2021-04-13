<template>
    <div class="app-logo">
        <span class="app-logo--first">Resume</span>&#124;<span class="app-logo--second">Constructor</span>
    </div>
</template>

<script>
export default {
    name: 'app-logo',
    data () {
        return {}
    }
}
</script>

<style lang="scss">
.app-logo {
    font-weight: 700;
    color: $dark-blue;
    font-size: 1.5rem;
    text-transform: uppercase;
}
</style>
