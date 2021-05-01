<template>
    <div class="watermark">
        <span>This CV created in &laquo;{{ $root.brand.name }}&raquo; - {{ $root.brand.url }}</span>
    </div>
</template>

<script>
export default {
    name: 'watermark'
}
</script>

<style lang="scss">
.watermark {
    padding: .25rem .5rem;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
    font-size: .5rem;
    letter-spacing: .1px;
    color: rgba($black, .2);
    transform-origin: 100% 0;
}
</style>
