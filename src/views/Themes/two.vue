<template>
    <div class="theme-two">
        <section class="theme-two__section theme-two__section--header">
            <div class="theme-two__photo">
                <img :src="data.personal.photo" />
            </div>
            <div class="theme-two__info">
                <h1 :data-text="data.personal.name">{{ data.personal.name }}</h1>
                <div class="theme-two__info-block theme-two__info-block--columns">
                    <div
                        class="theme-two__info-block-item"
                        v-if="data.personal.address"
                    >
                        <span class="block theme-two__info-block-caption">{{ $t('fields.address') }}</span>
                        <span class="block margin-top--xxs">{{ data.personal.address }}</span>
                    </div>
                    <div
                        class="theme-two__info-block-item"
                        v-if="data.personal.phone"
                    >
                        <span class="block theme-two__info-block-caption">{{ $t('fields.phone') }}</span>
                        <span class="block margin-top--xxs">{{ data.personal.phone }}</span>
                    </div>
                    <div
                        class="theme-two__info-block-item"
                        v-if="data.personal.maritalStatus"
                    >
                        <span class="block theme-two__info-block-caption">{{ $t('fields.maritalStatus') }}</span>
                        <span class="block margin-top--xxs">{{ data.personal.maritalStatus }}</span>
                    </div>
                    <div
                        class="theme-two__info-block-item"
                        v-if="data.personal.dateOfBirth"
                    >
                        <span class="block theme-two__info-block-caption">{{ $t('fields.dateOfBirth') }}</span>
                        <span class="block margin-top--xxs">{{ data.personal.dateOfBirth }}</span>
                    </div>
                    <div
                        class="theme-two__info-block-item"
                        v-if="data.personal.email"
                    >
                        <span class="block theme-two__info-block-caption">{{ $t('fields.email') }}</span>
                        <span class="block margin-top--xxs">{{ data.personal.email }}</span>
                    </div>
                    <div
                        class="theme-two__info-block-item"
                        v-if="data.personal.site"
                    >
                        <span class="block theme-two__info-block-caption">{{ $t('fields.site') }}</span>
                        <span class="block margin-top--xxs">{{ data.personal.site }}</span>
                    </div>
                </div>
            </div>
        </section>
        <section class="theme-two__section theme-two__section--second">
            <div class="theme-two__col">
                <section class="theme-two__advantages">
                    <h2 v-if="data.objective.position">{{ data.objective.position }}</h2>
                    <p
                        v-if="data.objective.about"
                        v-html="$options.filters.breakLine(data.objective.about)"
                    ></p>
                </section>
            </div>
        </section>
        <section class="theme-two__section">
            <div class="theme-two__col theme-two__col--half">
                <section
                    v-if="data.qualities"
                    class="theme-two__inner"
                >
                    <h3>{{ $t('infoBlocks.qualities') }}</h3>
                    <div class="theme-two__info-block">
                        <div class="theme-two__info-block-item">
                            <p v-html="$options.filters.breakLine(data.qualities)"></p>
                        </div>
                    </div>
                </section>
                <section
                    class="theme-two__inner"
                    v-if="data.education.length"
                >
                    <h3>{{ $t('infoBlocks.education') }}</h3>
                    <div class="theme-two__info-block">
                        <div
                            :key="index"
                            class="theme-two__info-block-item"
                            v-for="(item, index) in data.education"
                        >
                            <span class="block theme-two__info-block-caption">{{ item.degree }}</span>
                            <span class="block margin-top--xxs">{{ item.period[0] }} — {{ item.period[1] }}</span>
                            <span class="block margin-top--xxs">{{ item.university }}</span>
                        </div>
                    </div>
                </section>
            </div>
            <div class="theme-two__col theme-two__col--half">
                <section
                    v-if="data.skills"
                    class="theme-two__inner"
                >
                    <h3>{{ $t('infoBlocks.skills') }}</h3>
                    <div class="theme-two__info-block">
                        <div class="theme-two__info-block-item">
                            <p v-html="$options.filters.breakLine(data.skills)"></p>
                        </div>
                    </div>
                </section>
                <section
                    class="theme-two__inner"
                    v-if="data.experience.length"
                >
                    <h3>{{ $t('infoBlocks.work') }}</h3>
                    <div class="theme-two__info-block">
                        <div
                            :key="index"
                            class="theme-two__info-block-item"
                            v-for="(item, index) in data.experience"
                        >
                            <span class="block theme-two__info-block-caption">{{ item.position }}</span>
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
        </section>
    </div>
</template>

<script>
export default {
    name: 'theme-two',
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="scss">
.theme-two {
    $col-left: 200px;
    $color1: #f4af09;
    $color2: #d27211;
    $color3: #db880a;
    $color4: #e7c332;

    width: 100%;
    height: 100%;
    position: relative;
    line-height: 1;
    font-size: 12px;
    letter-spacing: .5px;
    font-family: Roboto-Regular, Arial, sans-serif;

    @mixin h1 {
        width: 100%;
        margin-bottom: 8px;
        line-height: 1;
        font-size: 32px;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: .25px;
        font-family: Roboto-Bold, Arial, sans-serif;
    }

    h1 {
        @include h1;
        position: relative;
        z-index: 1;
        color: $white;

        &:before {
            content: attr(data-text);
            @include h1;
            position: absolute;
            top: 2px;
            left: 2px;
            z-index: -1;
            color: $color2;
        }
    }

    h2 {
        width: 100%;
        margin-bottom: 8px;
        font-size: 24px;
        line-height: 1.2;
        font-weight: 700;
        letter-spacing: .25px;
        font-family: Roboto-Bold, Arial, sans-serif;
    }

    h3 {
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: 700;
        line-height: 1.2;
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
        width: 100%;
        height: 100%;
        flex-shrink: 0;

        &--left {
            width: $col-left;
        }

        &--right {
            width: calc(100% - #{$col-left} - 16px);
            margin-left: 16px;
        }

        &--half {
            width: 50%;
        }
    }

    &__header {
        padding: 16px;
    }

    &__section {
        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;
        justify-content: flex-start;

        &--header {
            padding: 16px;
            color: $white;
            background-color: $color1;
        }

        &--second {
            padding: 16px;
            color: $white;
            background-color: $color2;
        }
    }

    &__inner {
        padding: 16px;
    }

    &__photo {
        width: $col-left;
        height: $col-left;
        flex-shrink: 0;
        overflow: hidden;
        position: relative;

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

    &__info {
        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;
        flex-grow: 1;
        width: calc(100% - 216px);
        margin-left: 16px;
    }

    &__table {

        table {
            width: 100%;

            tbody {

                td {
                    padding: 4px 0;
                }
            }
        }

        &--padding {

            table {

                tbody {

                    tr:not(:first-of-type) {

                        td {
                            padding: 16px 0 4px;
                        }
                    }
                }
            }
        }
    }

    &__list {

        li+li {
            margin-top: 12px;
        }
    }

    &__info-block {
        flex-grow: 1;
        flex-shrink: 1;

        &-item {
            break-inside: avoid;
            padding: 8px 0;

            &:not(:first-of-type) {}
        }

        &-caption {
            font-size: 14px;
            font-weight: 700;
            font-family: Roboto-Bold, Arial, sans-serif;
        }

        &--columns {
            columns: 2 auto;
        }
    }
}
</style>
