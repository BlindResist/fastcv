<template>
    <div class="default-theme">
        <div class="row">
            <div class="col-default-12">
                <h1>Resume</h1>
            </div>
        </div>
        <div class="row">
            <div class="col-default-4">
                <div
                    v-if="data.photo"
                    class="photo-wrapper"
                >
                    <img :src="data.photo" />
                </div>
            </div>
            <div class="col-default-8">
                <h2 v-if="data.personal.name">Personal information</h2>
                <div class="table-wrapper">
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
        <div
            class="row"
            v-if="data.objective.position"
        >
            <div class="col-default-12">
                <h2>Objective</h2>
                <h3>{{ data.objective.position }}</h3>
                <p
                    v-if="data.objective.about"
                    v-html="data.objective.about"
                ></p>
            </div>
        </div>
        <div
            class="row"
            v-if="data.education.length"
        >
            <div class="col-default-12">
                <h2>Education</h2>
                <div class="table-wrapper">
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
                                <td>{{ item.period }}</td>
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
    </div>
</template>

<script>
export default {
    name: 'default-theme',
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
.default-theme {
    $width: 700px;

    width: $width;
    height: calc(#{$width}*1.4142);
    padding: 2rem;
    line-height: 1;
    font-size: .75rem;
    font-family: Arial, sans-serif;

    h1 {
        margin-bottom: 1rem;
        font-size: 1rem;
        font-weight: 700;
        text-align: center;
    }

    h2 {
        padding: 0 0 .5rem;
        margin-bottom: 1rem;
        font-weight: 700;
        font-size: .875rem;
        border-bottom: 1px solid rgba($black, .1);
    }

    h3 {
        padding: 0 0 .5rem;
        margin-bottom: .5rem;
        font-size: .75rem;
    }

    .photo-wrapper {
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

    .table-wrapper {

        table {
            width: 100%;

            tbody {

                td {
                    padding: .3rem 0;
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
