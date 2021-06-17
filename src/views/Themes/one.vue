<template>
    <div class="theme-one">
        <div class="theme-one__col theme-one__col--left">
            <div class="theme-one__header">
                <h1>{{ data.personal.name }}</h1>
            </div>
            <div class="theme-one__photo">
                <img
                    :src="data.personal.photo"
                    :alt="data.personal.name"
                />
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
                            <span class="block margin-top--xxs margin-bottom--xxs">
                                {{ item.company }}
                                <span v-if="item.company && (item.from || item.to)">|</span>
                                {{ item | period() }}
                                <span v-if="(item.from || item.to) && item.country">|</span>
                                {{ item.country }}<span v-if="item.country && item.city">, </span>{{ item.city }}
                            </span>
                            <p
                                v-if="item.about"
                                v-html="$options.filters.breakLine(item.about)"
                            ></p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

type FormData = {
    objective: {
        position: string,
        about: string
    },
    personal: {
        site: string,
        photo: string,
        name: string,
        phone: string,
        email: string,
        address: string,
        dateOfBirth: string,
        maritalStatus: string,
    },
    education: ObjectConstructor[],
    experience: ObjectConstructor[],
    skills: string,
    qualities: string
}

@Component
export default class One extends Vue {
    @Prop(Object) readonly data!: FormData
}
</script>

<style lang="scss">
.theme-one {
    $white: #fff;
    $black: #212121;
    $color1: #1c6fae;
    $color2: #90d1ea;
    $color3: #4195c9;
    $color4: #d3eaef;
    $color5: #69b6de;

    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: $pdf-width;
    height: calc(#{$pdf-width}*#{$pdf-ratio});
    position: relative;
    line-height: 1;
    font-size: 12px;
    letter-spacing: .25px;
    font-family: Roboto-Regular, Arial, sans-serif;

    h1 {
        color: $white;
        line-height: 1;
        font-weight: 700;
        font-size: 24px;
        letter-spacing: .25px;
        font-family: Roboto-Bold, Arial, sans-serif;
    }

    h2 {
        padding: 6px 24px 8px;
        position: relative;
        color: $white;
        line-height: 1.2;
        font-weight: 700;
        font-size: 14px;
        letter-spacing: .25px;
        font-family: Roboto-Bold, Arial, sans-serif;
        border-radius: 4px;
        background-color: $color1;

        &:before,
        &:after {
            content: '';
            display: block;
            width: 8px;
            height: 8px;
            margin: auto;
            position: absolute;
            top: 0;
            bottom: 0;
            z-index: 1;
            border-radius: 50%;
            background-color: $white;
        }

        &:before {
            left: 8px;
        }

        &:after {
            right: 8px;
        }
    }

    h3 {
        margin-bottom: 8px;
        font-weight: 700;
        line-height: 1.2;
        font-size: 12px;
        letter-spacing: .25px;
        font-family: Roboto-Bold, Arial, sans-serif;
    }

    p {
        line-height: 1.5;

        &+p {
            margin-top: 16px;
        }
    }

    &__col {
        height: 100%;

        &--left {
            width: 40%;
            color: $white;
            background-color: $color3;
        }

        &--right {
            width: 60%;
        }
    }

    &__header {
        padding: 16px;
    }

    &__inner {
        padding: 16px;
    }

    &__section {

        &:not(:last-of-type) {
            margin-bottom: 16px;
        }
    }

    &__photo {
        width: calc(100% - 32px);
        height: 0;
        overflow: hidden;
        padding-bottom: 70%;
        margin: 0 16px;
        position: relative;
        border-radius: 4px;

        img {
            // max-width: 100%;
            // max-height: 100%;
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
        word-break: break-all;

        &-item {
            padding: 8px 0;

            &:not(:first-of-type) {
                border-top: 1px solid $white;
            }
        }

        &-caption {
            font-weight: 700;
            font-family: Roboto-Bold, Arial, sans-serif;
        }
    }
}
</style>
