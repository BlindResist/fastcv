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
                </section>
                <section class="theme-one__section">
                    <h2 v-if="data.personal.name">Personal information</h2>
                    <div class="info-block">
                        <div
                            class="info-block__item"
                            v-if="data.personal.address"
                        >
                            <span class="block info-block__caption">Address</span>
                            <span class="block margin-top--xxs">{{ data.personal.address }}</span>
                        </div>
                        <div
                            class="info-block__item"
                            v-if="data.personal.phone"
                        >
                            <span class="block info-block__caption">Phone number</span>
                            <span class="block margin-top--xxs">{{ data.personal.phone }}</span>
                        </div>
                        <div
                            class="info-block__item"
                            v-if="data.personal.maritalStatus"
                        >
                            <span class="block info-block__caption">Marital status</span>
                            <span class="block margin-top--xxs">{{ data.personal.maritalStatus }}</span>
                        </div>
                        <div
                            class="info-block__item"
                            v-if="data.personal.dateOfBirth"
                        >
                            <span class="block info-block__caption">Date of birth</span>
                            <span class="block margin-top--xxs">{{ data.personal.dateOfBirth }}</span>
                        </div>
                        <div
                            class="info-block__item"
                            v-if="data.personal.email"
                        >
                            <span class="block info-block__caption">Email</span>
                            <span class="block margin-top--xxs">{{ data.personal.email }}</span>
                        </div>
                        <div
                            class="info-block__item"
                            v-if="data.personal.site"
                        >
                            <span class="block info-block__caption">Personal site</span>
                            <span class="block margin-top--xxs">{{ data.personal.site }}</span>
                        </div>
                    </div>
                </section>
                <section
                    v-if="data.qualities"
                    class="theme-one__section"
                >
                    <h2>Personal qualities</h2>
                    <div class="info-block">
                        <div class="info-block__item">
                            <p v-html="$options.filters.breakLine(data.qualities)"></p>
                        </div>
                    </div>
                </section>
                <section
                    v-if="data.skills"
                    class="theme-one__section"
                >
                    <h2>Special skills</h2>
                    <div class="info-block">
                        <div class="info-block__item">
                            <p v-html="$options.filters.breakLine(data.skills)"></p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div class="theme-one__col theme-one__col--right">
            <div class="theme-one__inner">
                <section class="theme-one__section">
                    <h2>Objective</h2>
                    <div class="info-block">
                        <div class="info-block__item">
                            <span class="info-block__caption block margin-bottom--xxs">{{ data.objective.position }}</span>
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
                    <h2>Education</h2>
                    <div class="info-block">
                        <div
                            :key="index"
                            class="info-block__item"
                            v-for="(item, index) in data.education"
                        >
                            <span class="block info-block__caption">{{ item.degree }}</span>
                            <span class="block margin-top--xxs">{{ item.period[0] }} — {{ item.period[1] }}</span>
                            <span class="block margin-top--xxs">{{ item.university }}</span>
                        </div>
                    </div>
                </section>
                <section
                    class="theme-one__section"
                    v-if="data.experience.length"
                >
                    <h2>Work experience</h2>
                    <div class="info-block">
                        <div
                            :key="index"
                            class="info-block__item"
                            v-for="(item, index) in data.experience"
                        >
                            <span class="block info-block__caption">{{ item.position }}</span>
                            <span class="block margin-top--xxs">{{ item.company }} | {{ experiencePeriod(item) }}</span>
                            <span class="block margin-top--xxs margin-bottom--xxs">{{ item.country }}, {{ item.city }}</span>
                            <p
                                v-if="item.duties"
                                v-html="$options.filters.breakLine(item.duties)"
                            ></p>
                            <p
                                v-if="item.achievements"
                                v-html="$options.filters.breakLine(item.achievements)"
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
    },
    methods: {
        experiencePeriod (item) {
            let result = ''

            result += item.from ? item.from : ''
            result += item.from && (item.to || item.currently) ? ' — ' : ''
            result += item.currently ? 'present' : item.to

            return result
        }
    }
}
</script>

<style lang="scss">
.theme-one {
    $width: 700px;

    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    width: $width;
    height: calc(#{$width}*1.4142);
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
        letter-spacing: .125px;
        font-family: Roboto-Bold, Arial, sans-serif;
    }

    h2 {
        padding: .25rem .5rem .5rem;
        color: $white;
        line-height: 1.2;
        font-weight: 700;
        font-size: .875rem;
        letter-spacing: .125px;
        font-family: Roboto-Bold, Arial, sans-serif;
        background-color: $blue-dark;
    }

    h3 {
        margin-bottom: .5rem;
        font-weight: 700;
        line-height: 1.2;
        font-size: .75rem;
        letter-spacing: .125px;
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
        padding: 1.25rem 1rem 1.5rem;
        background-color: $blue-dark;
    }

    &__inner {
        padding: 1.5rem 1rem;
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
        padding-bottom: 100%;
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

    .table {

        table {
            width: 100%;

            tbody {

                td {
                    padding: .3rem 0;
                }
            }
        }

        &--padding {

            table {

                tbody {

                    tr:not(:first-of-type) {

                        td {
                            padding: 1rem 0 .3rem;
                        }
                    }
                }
            }
        }
    }

    .list {

        li+li {
            margin-top: .75rem;
        }
    }

    .info-block {

        &__item {
            padding: .5rem 0;

            &:not(:first-of-type) {
                border-top: 1px solid $blue-middle;
            }
        }

        &__caption {
            font-weight: 700;
            font-family: Roboto-Bold, Arial, sans-serif;
        }
    }
}
</style>
