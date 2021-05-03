<template>
    <div class="theme-one">
        <div class="theme-one__col theme-one__col--left">
            <div class="theme-one__header">
                <h1>{{ data.personal.name }}</h1>
            </div>
            <div class="theme-one__photo">
                <img :src="data.personal.photo" />
            </div>
            <div class="theme-one__inner">
                <section class="theme-one__section">
                    <h2 v-if="
                        data.personal.address ||
                        data.personal.phone ||
                        data.personal.maritalStatus ||
                        data.personal.dateOfBirth ||
                        data.personal.email ||
                        data.personal.site
                    ">{{ $t('infoBlocks.personal') }}</h2>
                    <div class="theme-one__info-block">
                        <div
                            v-if="data.personal.address"
                            class="theme-one__info-block-item"
                        >
                            <span class="block theme-one__info-block-caption">{{ $t('fields.address') }}</span>
                            <span class="block margin-top--xxs">{{ data.personal.address }}</span>
                        </div>
                        <div
                            v-if="data.personal.phone"
                            class="theme-one__info-block-item"
                        >
                            <span class="block theme-one__info-block-caption">{{ $t('fields.phone') }}</span>
                            <span class="block margin-top--xxs">{{ data.personal.phone }}</span>
                        </div>
                        <div
                            v-if="data.personal.maritalStatus"
                            class="theme-one__info-block-item"
                        >
                            <span class="block theme-one__info-block-caption">{{ $t('fields.maritalStatus') }}</span>
                            <span class="block margin-top--xxs">{{ data.personal.maritalStatus }}</span>
                        </div>
                        <div
                            v-if="data.personal.dateOfBirth"
                            class="theme-one__info-block-item"
                        >
                            <span class="block theme-one__info-block-caption">{{ $t('fields.dateOfBirth') }}</span>
                            <span class="block margin-top--xxs">{{ data.personal.dateOfBirth }}</span>
                        </div>
                        <div
                            v-if="data.personal.email"
                            class="theme-one__info-block-item"
                        >
                            <span class="block theme-one__info-block-caption">{{ $t('fields.email') }}</span>
                            <span class="block margin-top--xxs">{{ data.personal.email }}</span>
                        </div>
                        <div
                            v-if="data.personal.site"
                            class="theme-one__info-block-item"
                        >
                            <span class="block theme-one__info-block-caption">{{ $t('fields.site') }}</span>
                            <span class="block margin-top--xxs">{{ data.personal.site }}</span>
                        </div>
                    </div>
                </section>
                <section
                    v-if="data.qualities"
                    class="theme-one__section"
                >
                    <h2>{{ $t('infoBlocks.qualities') }}</h2>
                    <div class="theme-one__info-block">
                        <div class="theme-one__info-block-item">
                            <p v-html="$options.filters.breakLine(data.qualities)"></p>
                        </div>
                    </div>
                </section>
                <section
                    v-if="data.skills"
                    class="theme-one__section"
                >
                    <h2>{{ $t('infoBlocks.skills') }}</h2>
                    <div class="theme-one__info-block">
                        <div class="theme-one__info-block-item">
                            <p v-html="$options.filters.breakLine(data.skills)"></p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div class="theme-one__col theme-one__col--right">
            <div class="theme-one__inner">
                <section class="theme-one__section">
                    <h2 v-if="data.objective.position || data.objective.about">{{ $t('infoBlocks.objective') }}</h2>
                    <div class="theme-one__info-block">
                        <div class="theme-one__info-block-item">
                            <span class="theme-one__info-block-caption block margin-bottom--xxs">{{ data.objective.position }}</span>
                            <p
                                v-if="data.objective.about"
                                v-html="$options.filters.breakLine(data.objective.about)"
                            ></p>
                        </div>
                    </div>
                </section>
                <section
                    class="theme-one__section"
                    v-if="data.education.length"
                >
                    <h2>{{ $t('infoBlocks.education') }}</h2>
                    <div class="theme-one__info-block">
                        <div
                            :key="index"
                            class="theme-one__info-block-item"
                            v-for="(item, index) in data.education"
                        >
                            <span class="block theme-one__info-block-caption">{{ item.degree }}</span>
                            <span class="block margin-top--xxs">{{ item.period[0] }} — {{ item.period[1] }}</span>
                            <span class="block margin-top--xxs">{{ item.university }}</span>
                        </div>
                    </div>
                </section>
                <section
                    class="theme-one__section"
                    v-if="data.experience.length"
                >
                    <h2>{{ $t('infoBlocks.work') }}</h2>
                    <div class="theme-one__info-block">
                        <div
                            :key="index"
                            class="theme-one__info-block-item"
                            v-for="(item, index) in data.experience"
                        >
                            <span class="block theme-one__info-block-caption">{{ item.position }}</span>
                            <span class="block margin-top--xxs margin-bottom--xxs">{{ item.company }} | {{ item | period() }} | {{ item.country }}, {{ item.city }}</span>
                            <p
                                v-if="item.about"
                                v-html="$options.filters.breakLine(item.about)"
                            ></p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <watermark />
    </div>
</template>

<script>
import Watermark from '@/components/Watermark/index.vue'

export default {
    name: 'theme-one',
    components: {
        Watermark
    },
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="scss">
.theme-one {
    $width: 700px;
    $ratio: 1.41;
    $white: #fff;
    $black: #212121;
    $gray-dark: #d7e9f0;
    $blue-dark: #003755;
    $blue-middle: #a1bdc9;

    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: $width;
    height: calc(#{$width}*#{$ratio});
    position: relative;
    line-height: 1;
    font-size: .75rem;
    font-family: Roboto-Regular, Arial, sans-serif;

    h1 {
        color: $white;
        line-height: 1;
        font-weight: 700;
        line-height: 1.2;
        font-size: 1.75rem;
        letter-spacing: .25px;
        font-family: Roboto-Bold, Arial, sans-serif;
    }

    h2 {
        padding: .25rem .5rem .5rem;
        color: $white;
        line-height: 1.2;
        font-weight: 700;
        font-size: .875rem;
        letter-spacing: .25px;
        font-family: Roboto-Bold, Arial, sans-serif;
        background-color: $blue-dark;
    }

    h3 {
        margin-bottom: .5rem;
        font-weight: 700;
        line-height: 1.2;
        font-size: .75rem;
        letter-spacing: .25px;
        font-family: Roboto-Bold, Arial, sans-serif;
    }

    p {
        line-height: 1.5;

        &+p {
            margin-top: 1rem;
        }
    }

    &__col {
        height: 100%;

        &--left {
            width: 40%;
            color: $blue-dark;
            background-color: $gray-dark;
        }

        &--right {
            width: 60%;
        }
    }

    &__header {
        padding: 1rem;
        background-color: $blue-dark;
    }

    &__inner {
        padding: 1rem;
    }

    &__section {

        &:not(:last-of-type) {
            margin-bottom: 1rem;
        }
    }

    &__photo {
        width: 100%;
        height: 0;
        overflow: hidden;
        padding-bottom: 80%;
        position: relative;
        background-color: $blue-middle;

        img {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            object-fit: cover;
        }
    }

    &__info-block {

        &-item {
            padding: .5rem 0;

            &:not(:first-of-type) {
                border-top: 1px solid $blue-middle;
            }
        }

        &-caption {
            font-weight: 700;
            font-family: Roboto-Bold, Arial, sans-serif;
        }
    }
}
</style>
