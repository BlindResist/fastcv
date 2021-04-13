<template>
    <div class="constructor page">
        <aside class="constructor-aside">
            <div class="constructor-aside__header">
                <app-logo />
            </div>
            <div class="constructor-aside__body"></div>
        </aside>
        <section class="constructor-preview"></section>
    </div>
</template>

<script>
export default {
    name: 'constructor',
    data () {
        return {}
    }
}
</script>

<style lang="scss">
.constructor {
    display: flex;
    flex-flow: row nowrap;
}

.constructor-aside {
    width: 30%;
    min-height: 100%;
    min-width: 30rem;
    max-width: 36rem;
    background-color: $lite-grey;

    &__header {
        padding: 2rem;
        position: relative;
        text-align: center;
        user-select: none;

        &:after {
            content: '';
            display: block;
            width: 0;
            height: 0;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1;
            border: 20px solid transparent;
            border-right-color: $white;
            border-top-color: $white;
            border-left-color: $dark-grey;
            border-bottom-color: $dark-grey;
        }
    }
}
</style>
