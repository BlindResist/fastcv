<template>
    <div class="app-preview">
        <div class="app-preview__page">
            <div class="row">
                <div class="col-default-4">
                    <div class="photo-wrapper">
                        <img
                            :src="data.photo"
                            v-if="data.photo"
                        />
                    </div>
                </div>
                <div class="col-default-8">
                    <h1 v-if="data.name">{{ data.name }}</h1>
                    <ul>
                        <li>{{ data.dateOfBirth }}</li>
                        <li>{{ data.address }}</li>
                        <li>{{ data.phone }}</li>
                        <li>{{ data.email }}</li>
                        <li>{{ data.maritalStatus }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'app-preview',
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {}
    }
}
</script>

<style lang="scss">
.app-preview {

    &__page {
        min-height: calc(100vh - 8rem);
        padding: 2rem;
        line-height: 1;
        font-size: .75rem;
        border: 1px solid rgba($black, .2);
        box-shadow: .5rem .5rem 0 0 rgba($black, .1);

        h1 {
            font-weight: 700;
            font-size: 1.25rem;
        }

        h2 {
            font-weight: 700;
            font-size: 1.15rem;
        }

        h3 {
            font-size: 1rem;
        }

        h4 {
            font-size: .875rem;
        }

        .photo-wrapper {

            img {
                max-width: 100%;
            }
        }
    }
}
</style>
