<template>
    <div class="addition-block">
        <div class="addition-block__header">
            <span class="addition-block__title">Education #{{ id + 1 }}</span>
            <app-button
                rounded
                auto-width
                theme="red"
                @click="remove"
            >Delete</app-button>
        </div>
        <div class="row">
            <div class="col-default-12">
                <app-date-picker
                    range
                    lang="en"
                    type="year"
                    format="YYYY"
                    value-type="format"
                    placeholder="Period"
                    v-model="innerData.period"
                />
            </div>
            <div class="col-default-12">
                <app-input
                    v-model="innerData.university"
                    :name="`education-${id}-university`"
                    placeholder="Educational institution"
                />
            </div>
            <div class="col-default-12">
                <app-input
                    placeholder="Degree"
                    v-model="innerData.degree"
                    :name="`education-${id}-degree`"
                />
            </div>
        </div>
    </div>
</template>

<script>
import dynamicComponentEmitters from '@/mixins/dynamicComponentEmitters'

export default {
    name: 'education',
    mixins: [dynamicComponentEmitters('education')],
    props: {
        id: {
            type: Number,
            default: 0
        },
        data: {
            type: Object,
            default: () => ({
                period: '',
                degree: '',
                university: ''
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
