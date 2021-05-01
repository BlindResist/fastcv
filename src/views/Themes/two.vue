<template>
    <div class="theme-two">
        <!-- <h1>Theme 2</h1> -->
        <section class="theme-two__section">
            <div class="row">
                <div class="col-default-4">
                    <div
                        v-if="data.personal.photo"
                        class="photo"
                    >
                        <img :src="data.personal.photo" />
                    </div>
                </div>
                <div class="col-default-8">
                    <section class="theme-two__section">
                        <div class="row">
                            <div class="col-default-12">
                                <h2 v-if="data.personal.name">Personal information</h2>
                                <div class="table">
                                    <table>
                                        <colgroup span="9" align="center" width="50">
                                            <col span="1" style="width: 30%;">
                                            <col span="1" style="width: 70%;">
                                        </colgroup>
                                        <tbody>
                                            <tr v-if="data.personal.name">
                                                <td>Name</td>
                                                <td>{{ data.personal.name }}</td>
                                            </tr>
                                            <tr v-if="data.personal.address">
                                                <td>Address</td>
                                                <td>{{ data.personal.address }}</td>
                                            </tr>
                                            <tr v-if="data.personal.phone">
                                                <td>Phone number</td>
                                                <td>{{ data.personal.phone }}</td>
                                            </tr>
                                            <tr v-if="data.personal.maritalStatus">
                                                <td>Marital status</td>
                                                <td>{{ data.personal.maritalStatus }}</td>
                                            </tr>
                                            <tr v-if="data.personal.dateOfBirth">
                                                <td>Date of birth</td>
                                                <td>{{ data.personal.dateOfBirth }}</td>
                                            </tr>
                                            <tr v-if="data.personal.email">
                                                <td>Email</td>
                                                <td>{{ data.personal.email }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section class="theme-two__section">
                        <div class="row">
                            <div
                                class="col-default-12"
                                v-if="data.objective.position"
                            >
                                <h2>Objective</h2>
                                <h3>{{ data.objective.position }}</h3>
                                <p
                                    v-if="data.objective.about"
                                    v-html="$options.filters.breakLine(data.objective.about)"
                                ></p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
        <section class="theme-two__section">
            <div
                class="row"
                v-if="data.education.length"
            >
                <div class="col-default-12">
                    <h2>Education</h2>
                    <div class="table table--padding">
                        <table>
                            <colgroup span="9" align="center" width="50">
                                <col span="1" style="width: 20%;">
                                <col span="1" style="width: 80%;">
                            </colgroup>
                            <tbody>
                                <tr
                                    :key="index"
                                    v-for="(item, index) in data.education"
                                >
                                    <td>{{ item.period[0] }} — {{ item.period[1] }}</td>
                                    <td>
                                        <span class="block">{{ item.university }}</span>
                                        <span class="block margin-top--xs">{{ item.degree }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        <section class="theme-two__section">
            <div
                class="row"
                v-if="data.experience.length"
            >
                <div class="col-default-12">
                    <h2>Work experience</h2>
                    <div class="table table--padding">
                        <table>
                            <colgroup span="9" align="center" width="50">
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
                                        <span class="block margin-top--xs">{{ experiencePeriod(item) }}</span>
                                        <span class="block">{{ item.country }}, {{ item.city }}</span>
                                        <span class="block margin-top--xs">{{ item.position }}</span>
                                    </td>
                                    <td>
                                        <p
                                            v-if="item.duties"
                                            v-html="$options.filters.breakLine(item.duties)"
                                        ></p>
                                        <p
                                            v-if="item.achievements"
                                            v-html="$options.filters.breakLine(item.achievements)"
                                        ></p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
        <section class="theme-two__section">
            <div class="row">
                <div
                    v-if="data.qualities"
                    class="col-default-6"
                >
                    <h2>Personal qualities</h2>
                    <p v-html="$options.filters.breakLine(data.qualities)"></p>
                </div>
                <div
                    v-if="data.skills"
                    class="col-default-6"
                >
                    <h2>Special skills</h2>
                    <p v-html="$options.filters.breakLine(data.skills)"></p>
                </div>
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
.theme-two {
    $width: 700px;

    width: $width;
    height: calc(#{$width}*1.4142);
    padding: 2rem;
    line-height: 1;
    font-size: .75rem;
    font-family: Roboto-Regular, Arial, sans-serif;

    h1 {
        margin-bottom: 2rem;
        font-size: 1rem;
        text-align: center;
        font-weight: 700;
        font-family: Roboto-Bold, Arial, sans-serif;
    }

    h2 {
        padding: 0 0 .5rem;
        margin-bottom: .5rem;
        font-weight: 700;
        font-size: .875rem;
        font-family: Roboto-Bold, Arial, sans-serif;
        border-bottom: 1px solid rgba($black, .2);
    }

    h3 {
        padding: 0 0 .5rem;
        margin-bottom: .5rem;
        font-size: .75rem;
        font-weight: 700;
        font-family: Roboto-Bold, Arial, sans-serif;
    }

    p {
        line-height: 1.5;

        &+p {
            margin-top: 1rem;
        }
    }

    &__section {

        &:not(:first-of-type) {
            margin-top: 2rem;
        }
    }

    .photo {
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
}
</style>
