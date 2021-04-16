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
            <div
                :key="item.name"
                class="col-default-12"
                v-for="item in elements"
            >
                <app-input
                    v-model="innerData[item.name]"
                    :placeholder="item.placeholder"
                    :name="`education-${id}-${item.name}`"
                />
            </div>
        </div>
    </div>
</template>

<script>
import dynamicComponentsEmmiters from '@/mixins/dynamicComponentsEmmiters'

export default {
    name: 'education',
    mixins: [dynamicComponentsEmmiters('education')],
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
            innerData: this.data,
            elements: [
                {
                    name: 'period',
                    placeholder: 'Period'
                },
                {
                    name: 'university',
                    placeholder: 'Educational institution'
                },
                {
                    name: 'degree',
                    placeholder: 'Degree'
                }
            ]
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
