<template>
    <div class="addition-block">
        <div class="addition-block__header">
            <span class="addition-block__title">{{ $t('infoBlocks.work') }} #{{ id + 1 }}</span>
            <app-button
                rounded
                auto-width
                theme="red"
                @click="remove"
            >{{ $t('buttons.delete') }}</app-button>
        </div>
        <div class="row">
            <div class="col-default-12">
                <app-input
                    v-model="innerData.company"
                    :name="`experience-${id}-company`"
                    :placeholder="$t('fields.company')"
                />
            </div>
            <div class="col-default-6">
                <app-date-picker
                    lang="en"
                    type="year"
                    format="YYYY"
                    value-type="format"
                    v-model="innerData.from"
                    :placeholder="$t('fields.from')"
                />
            </div>
            <div class="col-default-6">
                <app-date-picker
                    lang="en"
                    type="year"
                    format="YYYY"
                    value-type="format"
                    v-model="innerData.to"
                    :disabled="innerData.currently"
                    :placeholder="$t('fields.to')"
                />
            </div>
            <div class="col-default-12">
                <app-checkbox
                    v-model="innerData.currently"
                    :name="`experience-${id}-currently`"
                >{{ $t('checkboxes.currentWork') }}</app-checkbox>
            </div>
            <div class="col-default-6">
                <app-input
                    v-model="innerData.country"
                    :name="`experience-${id}-country`"
                    :placeholder="$t('fields.country')"
                />
            </div>
            <div class="col-default-6">
                <app-input
                    v-model="innerData.city"
                    :name="`experience-${id}-city`"
                    :placeholder="$t('fields.city')"
                />
            </div>
            <div class="col-default-12">
                <app-input
                    v-model="innerData.position"
                    :name="`experience-${id}-position`"
                    :placeholder="$t('fields.position')"
                />
            </div>
            <div class="col-default-12">
                <app-textarea
                    v-model="innerData.about"
                    :name="`experience-${id}-about`"
                    :placeholder="$t('fields.duties')"
                />
            </div>
        </div>
    </div>
</template>

<script>
import dynamicComponentEmitters from '@/mixins/dynamicComponentEmitters'

export default {
    name: 'experience',
    mixins: [dynamicComponentEmitters('experience')],
    props: {
        id: {
            type: Number,
            default: 0
        },
        data: {
            type: Object,
            default: () => ({
                to: '',
                from: '',
                city: '',
                about: '',
                company: '',
                country: '',
                position: '',
                currently: ''
            })
        }
    },
    data () {
        return {
            innerData: this.data
        }
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
