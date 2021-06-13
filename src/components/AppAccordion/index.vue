<template>
    <div class="app-accordion">
        <slot />
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component

export default class AppAccordion extends Vue {}
</script>
