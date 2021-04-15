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
                <app-input
                    placeholder="From"
                    v-model="innerData.from"
                    :name="`experience-${id}-from`"
                />
            </div>
            <div class="col-default-6">
                <app-input
                    placeholder="To"
                    v-model="innerData.to"
                    :name="`experience-${id}-to`"
                />
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
export default {
    name: 'experience',
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
                achievements: ''
            })
        }
    },
    data () {
        return {
            innerData: this.data
        }
    },
    watch: {
        innerData: {
            deep: true,
            handler (data) {
                this.$emit('input', {
                    ...data,
                    id: `experience-${this.id}`
                })
            }
        }
    },
    methods: {
        remove () {
            this.$emit('remove', {
                type: 'experience',
                id: `experience-${this.id}`
            })
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
