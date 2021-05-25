<template>
    <div class="theme-three">
        <div class="theme-three__content">
            <section class="theme-three__section">
                <h1 v-if="data.personal.name">{{ data.personal.name }}</h1>
                <h2 v-if="data.objective.position">{{ data.objective.position }}</h2>
                <p
                    v-if="data.objective.about"
                    v-html="$options.filters.breakLine(data.objective.about)"
                ></p>
            </section>
            <section class="theme-three__section">
                <div class="theme-three__photo">
                    <img :src="data.personal.photo" />
                </div>
                <div class="theme-three__info">
                    <div class="theme-three__table">
                        <table>
                            <colgroup>
                                <col span="1" style="width: 30%;">
                                <col span="1" style="width: 70%;">
                            </colgroup>
                            <tbody>
                                <tr v-if="data.personal.address">
                                    <td>{{ $t('fields.address') }}</td>
                                    <td>{{ data.personal.address }}</td>
                                </tr>
                                <tr v-if="data.personal.phone">
                                    <td>{{ $t('fields.phone') }}</td>
                                    <td>{{ data.personal.phone }}</td>
                                </tr>
                                <tr v-if="data.personal.maritalStatus">
                                    <td>{{ $t('fields.maritalStatus') }}</td>
                                    <td>{{ data.personal.maritalStatus }}</td>
                                </tr>
                                <tr v-if="data.personal.dateOfBirth">
                                    <td>{{ $t('fields.dateOfBirth') }}</td>
                                    <td>{{ data.personal.dateOfBirth }}</td>
                                </tr>
                                <tr v-if="data.personal.email">
                                    <td>{{ $t('fields.email') }}</td>
                                    <td>{{ data.personal.email }}</td>
                                </tr>
                                <tr v-if="data.personal.site">
                                    <td>{{ $t('fields.site') }}</td>
                                    <td>{{ data.personal.site }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <section class="theme-three__section">
                <div class="theme-three__col">
                    <section
                        v-if="data.qualities"
                        class="theme-three__inner"
                    >
                        <h3>{{ $t('infoBlocks.qualities') }}</h3>
                        <div class="theme-three__info-block">
                            <div class="theme-three__info-block-item">
                                <p v-html="$options.filters.breakLine(data.qualities)"></p>
                            </div>
                        </div>
                    </section>
                    <section
                        class="theme-three__inner"
                        v-if="data.education.length"
                    >
                        <h3>{{ $t('infoBlocks.education') }}</h3>
                        <div class="theme-three__info-block">
                            <div
                                :key="index"
                                class="theme-three__info-block-item"
                                v-for="(item, index) in data.education"
                            >
                                <span class="block theme-three__info-block-caption">{{ item.degree }}</span>
                                <span class="block margin-top--xxs">{{ item.period[0] }} — {{ item.period[1] }}</span>
                                <span class="block margin-top--xxs">{{ item.university }}</span>
                            </div>
                        </div>
                    </section>
                </div>
                <div class="theme-three__col">
                    <section
                        v-if="data.skills"
                        class="theme-three__inner"
                    >
                        <h3>{{ $t('infoBlocks.skills') }}</h3>
                        <div class="theme-three__info-block">
                            <div class="theme-three__info-block-item">
                                <p v-html="$options.filters.breakLine(data.skills)"></p>
                            </div>
                        </div>
                    </section>
                    <section
                        class="theme-three__inner"
                        v-if="data.experience.length"
                    >
                        <h3>{{ $t('infoBlocks.work') }}</h3>
                        <div class="theme-three__info-block">
                            <div
                                :key="index"
                                class="theme-three__info-block-item"
                                v-for="(item, index) in data.experience"
                            >
                                <span class="block theme-three__info-block-caption">{{ item.position }}</span>
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
            <watermark />
        </div>
    </div>
</template>

<script>
import Watermark from '@/components/Watermark/index.vue'

export default {
    name: 'theme-three',
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
.theme-three {
    $col-left: 200px;
    $color1: #d3ecbc;
    $color2: #b1d697;
    $color3: #97ce7d;
    $color4: #6db474;
    $color5: #8db670;

    width: 100%;
    height: 100%;
    padding: 24px;
    position: relative;
    line-height: 1;
    font-size: 12px;
    letter-spacing: .5px;
    font-family: Roboto-Regular, Arial, sans-serif;
    background-color: $color1;

    h1 {
        width: 100%;
        margin-bottom: 8px;
        line-height: 1;
        color: $color5;
        font-size: 28px;
        font-weight: 700;
        line-height: 1.2;
        letter-spacing: .25px;
        font-family: Roboto-Bold, Arial, sans-serif;
    }

    h2 {
        width: 100%;
        margin-bottom: 8px;
        color: $color3;
        font-size: 18px;
        line-height: 1.2;
        font-weight: 700;
        letter-spacing: .25px;
        font-family: Roboto-Bold, Arial, sans-serif;
    }

    h3 {
        padding: 8px 0;
        margin-bottom: 8px;
        font-size: 14px;
        font-weight: 700;
        line-height: 1.2;
        text-transform: uppercase;
        font-family: Roboto-Bold, Arial, sans-serif;
        border-bottom: 2px solid $color2;
    }

    p {
        line-height: 1.5;

        &+p {
            margin-top: 16px;
        }
    }

    &__content {
        height: 100%;
        border: 1px solid $color2;
        background-color: $white;
    }

    &__photo {
        width: 160px;
        height: 160px;
        flex-shrink: 0;
        overflow: hidden;
        position: relative;
        border: 1px solid $color2;

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
        width: calc(100% - 160px - 16px);
        margin-left: 16px;
    }

    &__section {
        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;
        justify-content: space-between;
        padding: 16px 16px 0;
    }

    &__inner {

        &+& {
            margin-top: 16px;
        }
    }

    &__col {
        width: calc(50% - 16px);
    }

    &__table {
        width: 100%;

        table {
            width: 100%;

            tbody {

                td {
                    padding: 6px 0;

                    &:first-of-type {
                        font-weight: 700;
                        font-family: Roboto-Bold, Arial, sans-serif;
                    }
                }
            }
        }
    }
}
</style>
