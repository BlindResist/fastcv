<template>
    <div class="addition-block">
        <div class="addition-block__header">
            <span class="addition-block__title">Work #{{ id + 1 }}</span>
            <app-button
                rounded
                auto-width
                theme="red"
                @click="remove"
            >Delete</app-button>
        </div>
        <div class="row">
            <div class="col-default-12">
                <app-input
                    placeholder="Company name"
                    v-model="innerData.company"
                    :name="`experience-${id}-company`"
                />
            </div>
            <div class="col-default-6">
                <app-date-picker
                    lang="en"
                    type="year"
                    format="YYYY"
                    placeholder="From"
                    value-type="format"
                    v-model="innerData.from"
                />
            </div>
            <div class="col-default-6">
                <app-date-picker
                    lang="en"
                    type="year"
                    format="YYYY"
                    placeholder="To"
                    value-type="format"
                    v-model="innerData.to"
                    :disabled="innerData.currently"
                />
            </div>
            <div class="col-default-12">
                <app-checkbox
                    v-model="innerData.currently"
                    :name="`experience-${id}-currently`"
                >I currently work here</app-checkbox>
            </div>
            <div class="col-default-6">
                <app-input
                    placeholder="Country"
                    v-model="innerData.country"
                    :name="`experience-${id}-country`"
                />
            </div>
            <div class="col-default-6">
                <app-input
                    placeholder="City"
                    v-model="innerData.city"
                    :name="`experience-${id}-city`"
                />
            </div>
            <div class="col-default-12">
                <app-input
                    placeholder="Position"
                    v-model="innerData.position"
                    :name="`experience-${id}-position`"
                />
            </div>
            <div class="col-default-12">
                <app-textarea
                    placeholder="Job duties"
                    v-model="innerData.duties"
                    :name="`experience-${id}-duties`"
                />
            </div>
            <div class="col-default-12">
                <app-textarea
                    placeholder="Achievements"
                    v-model="innerData.achievements"
                    :name="`experience-${id}-achievements`"
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
                company: '',
                from: '',
                to: '',
                country: '',
                city: '',
                position: '',
                duties: '',
                achievements: '',
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
