<template>
    <div class="theme-default">
        <section class="theme-default__section">
            <div class="theme-default__col theme-default__col--left">
                <div
                    class="theme-default__photo"
                    v-if="data.personal.photo"
                >
                    <img :src="data.personal.photo" />
                </div>
            </div>
            <div class="theme-default__col theme-default__col--right">
                <h1>{{ data.personal.name }}</h1>
                <h2 v-if="
                        data.personal.address ||
                        data.personal.phone ||
                        data.personal.maritalStatus ||
                        data.personal.dateOfBirth ||
                        data.personal.email ||
                        data.personal.site
                    ">{{ $t('infoBlocks.personal') }}</h2>
                <div class="theme-default__table">
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
        <section
            class="theme-default__section"
            v-if="data.objective.position || data.objective.about"
        >
            <div class="theme-default__col">
                <h2>{{ $t('infoBlocks.objective') }}</h2>
                <h3 v-if="data.objective.position">{{ data.objective.position }}</h3>
                <p
                    v-if="data.objective.about"
                    v-html="$options.filters.breakLine(data.objective.about)"
                ></p>
            </div>
        </section>
        <section
            v-if="data.education.length"
            class="theme-default__section"
        >
            <div class="theme-default__col">
                <h2>{{ $t('infoBlocks.education') }}</h2>
                <div class="theme-default__table theme-default__table--padding">
                    <table>
                        <colgroup>
                            <col span="1" style="width: 30%;">
                            <col span="1" style="width: 70%;">
                        </colgroup>
                        <tbody>
                            <tr
                                :key="index"
                                v-for="(item, index) in data.education"
                            >
                                <td>{{ item.period[0] }} — {{ item.period[1] }}</td>
                                <td>
                                    <span class="block">{{ item.university }}</span>
                                    <span class="block margin-top--xxs">{{ item.degree }}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section
            v-if="data.experience.length"
            class="theme-default__section"
        >
            <div class="theme-default__col">
                <h2>{{ $t('infoBlocks.work') }}</h2>
                <div class="theme-default__table theme-default__table--padding">
                    <table>
                        <colgroup>
                            <col span="1" style="width: 30%;">
                            <col span="1" style="width: 70%;">
                        </colgroup>
                        <tbody>
                            <tr
                                :key="index"
                                v-for="(item, index) in data.experience"
                            >
                                <td>
                                    <span class="block">{{ item.company }}</span>
                                    <span class="block margin-top--xxs">{{ item | period() }}</span>
                                    <span class="block">{{ item.country }}, {{ item.city }}</span>
                                    <span class="block margin-top--xxs">{{ item.position }}</span>
                                </td>
                                <td>
                                    <p
                                        v-if="item.about"
                                        v-html="$options.filters.breakLine(item.about)"
                                    ></p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section class="theme-default__section">
            <div
                v-if="data.qualities"
                class="theme-default__col"
            >
                <h2>{{ $t('infoBlocks.qualities') }}</h2>
                <p v-html="$options.filters.breakLine(data.qualities)"></p>
            </div>
            <div
                v-if="data.skills"
                class="theme-default__col"
            >
                <h2>{{ $t('infoBlocks.skills') }}</h2>
                <p v-html="$options.filters.breakLine(data.skills)"></p>
            </div>
        </section>
        <watermark />
    </div>
</template>

<script>
import Watermark from '@/components/Watermark/index.vue'

export default {
    name: 'theme-default',
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
.theme-default {
    $width: 700px;
    $ratio: 1.41;
    $black: #212121;

    width: $width;
    height: calc(#{$width}*#{$ratio});
    position: relative;
    color: $black;
    line-height: 1;
    font-size: .75rem;
    font-family: Roboto-Regular, Arial, sans-serif;

    h1 {
        margin-bottom: 1rem;
        font-weight: 700;
        font-size: 1.75rem;
        letter-spacing: .25px;
        font-family: Roboto-Bold, Arial, sans-serif;
    }

    h2 {
        padding: 0 0 .5rem;
        margin-bottom: .5rem;
        font-weight: 700;
        font-size: .875rem;
        letter-spacing: .25px;
        font-family: Roboto-Bold, Arial, sans-serif;
        border-bottom: 1px solid rgba($black, .2);
    }

    h3 {
        margin-bottom: .5rem;
        font-weight: 700;
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
        width: 100%;
        height: 100%;
        flex-shrink: 1;
        flex-grow: 1;
        padding: 0 1rem;

        &--left {
            width: 30%;
        }

        &--right {
            width: 70%;
        }
    }

    &__section {
        display: flex;
        flex-flow: row nowrap;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 1rem 0;
    }

    &__photo {
        width: 100%;
        height: 0;
        overflow: hidden;
        padding-bottom: 100%;
        position: relative;

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

    &__table {

        table {
            width: 99%;

            tbody {

                td {
                    padding: .25rem 0;
                }
            }
        }

        &--padding {

            table {

                tbody {

                    tr:not(:first-of-type) {

                        td {
                            padding: .5rem 0 .25rem;
                        }
                    }
                }
            }
        }
    }
}
</style>
