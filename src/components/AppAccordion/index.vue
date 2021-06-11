<template>
    <div class="app-accordion">
        <slot />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

@Component

export default class AppAccordion extends Vue {
    @Prop(Boolean) readonly multiple!: boolean
    @Prop({
        type: String,
        default: 'closed',
        validator (value: string): boolean {
            return ['closed', 'opened', 'first'].includes(value)
        }
    }) readonly initial!: string

    openedItemID!: string

    mounted (): void {
        this.defaultState()
        this.$on('toggle-item', (data: { itemId: string }) => this.openHandler(data))
    }

    @Watch
    onInitialChanged (): void {
        this.defaultState()
    }

    openHandler (data: { itemId: string }): void | null {
        if (!this.openedItemID.length || this.openedItemID !== data.itemId) {
            this.openedItemID = data.itemId
        }

        if (this.multiple) return null

        for (let i = 0; i < this.$children.length; i++) {
            if (this.$children[i].itemId !== this.openedItemID) this.$children[i].state = false
        }
    }

    defaultState (): void {
        if (this.initial === 'opened') this.toggleAll(true)
        if (this.initial === 'closed') this.toggleAll(false)
        if (this.initial === 'first') this.openByIndex(0)
    }

    toggleAll (state: boolean): void {
        for (let i = 0; i < this.$children.length; i++) {
            this.$children[i].state = state
        }
    }

    openByIndex (index: number): void {
        this.toggleAll(false)
        this.$nextTick((): void => {
            this.$children[index].state = true
            this.openedItemID = this.$children[index].itemId
        })
    }
}
</script>
