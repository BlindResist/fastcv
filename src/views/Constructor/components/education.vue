<template>
    <div class="addition-block">
        <div class="addition-block__header">
            <span class="addition-block__title">{{ $t('infoBlocks.education') }} #{{ id + 1 }}</span>
            <app-button
                rounded
                auto-width
                theme="red"
                @click="remove"
            >{{ $t('buttons.delete') }}</app-button>
        </div>
        <div class="row">
            <div class="col-default-12">
                <app-date-picker
                    range
                    lang="en"
                    type="year"
                    format="YYYY"
                    value-type="format"
                    v-model="innerData.period"
                    :placeholder="$t('fields.period')"
                />
            </div>
            <div class="col-default-12">
                <app-input
                    v-model="innerData.university"
                    :name="`education-${id}-university`"
                    :placeholder="$t('fields.university')"
                />
            </div>
            <div class="col-default-12">
                <app-input
                    v-model="innerData.degree"
                    :name="`education-${id}-degree`"
                    :placeholder="$t('fields.degree')"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AppInput from '@/components/AppInput/index.vue'
import AppButton from '@/components/AppButton/index.vue'
import AppDatePicker from '@/components/AppDatePicker/index.vue'
import { Component, Prop, PropSync, Vue } from 'vue-property-decorator'

type Data = {
    period: string
    degree: string
    university: string
}

@Component({
    components: {
        AppInput,
        AppButton,
        AppDatePicker
    }
})

export default class Education extends Vue {
    @Prop({
        type: [String, Number],
        default: 0
    }) readonly id!: string

    @PropSync('data', {
        type: Object,
        default: () => ({
            period: '',
            degree: '',
            university: ''
        })
    }) readonly innerData!: Data

    type: string

    constructor () {
        super()
        this.type = 'education'
    }

    remove (): void {
        this.$emit('remove', {
            type: this.type,
            id: `${this.type}-${this.id}`
        })
    }
}
</script>

<style lang="scss">
.addition-block {
    border-top: 2px solid rgba($blue-dark, .5);

    &+& {
        margin-top: 2rem;
    }

    &__header {
        display: flex;
        align-items: center;
        flex-flow: row nowrap;
        justify-content: space-between;
        padding: 1rem 0;
    }

    &__title {
        font-size: 1rem;
        font-weight: 700;
    }
}
</style>
