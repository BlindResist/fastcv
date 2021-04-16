<template>
    <div class="constructor page content">
        <aside class="constructor-aside">
            <div class="constructor-aside__logo">
                <app-logo />
            </div>
            <div class="constructor-aside__header">
                <div class="row">
                    <div class="col-default-4">
                        <app-button
                            rounded
                            theme="yellow"
                            @click="clearData"
                        >Clear all</app-button>
                    </div>
                    <div class="col-default-4">
                        <app-button
                            rounded
                            theme="yellow"
                            @click="previewPDF"
                        >Preview</app-button>
                    </div>
                    <div class="col-default-4">
                        <app-button
                            rounded
                            theme="yellow"
                            @click="createPDF"
                        >Generate</app-button>
                    </div>
                </div>
            </div>
            <div class="constructor-aside__body">
                <app-accordion>
                    <app-accordion-item id="personal-information">
                        <template v-slot:header>Personal information</template>
                        <template v-slot:body>
                            <div class="row">
                                <div class="col-default-12">
                                    <app-input-file
                                        name="photo"
                                        button="Upload photo"
                                        v-model="formData.photo"
                                    />
                                </div>
                                <div class="col-default-12">
                                    <app-input
                                        name="name"
                                        placeholder="Name"
                                        v-model="formData.personal.name"
                                    />
                                </div>
                                <div class="col-default-12">
                                    <app-input
                                        name="address"
                                        placeholder="Address"
                                        v-model="formData.personal.address"
                                    />
                                </div>
                                <div class="col-default-12">
                                    <app-input
                                        name="phone"
                                        v-model="formData.personal.phone"
                                        placeholder="Phone number"
                                    />
                                </div>
                                <div class="col-default-6">
                                    <app-select
                                        name="maritalStatus"
                                        :data="data.maritalStatus"
                                        placeholder="Marital status"
                                        v-model="formData.personal.maritalStatus"
                                    />
                                </div>
                                <div class="col-default-6">
                                    <app-input
                                        name="dateOfBirth"
                                        placeholder="Date of birth"
                                        v-model="formData.personal.dateOfBirth"
                                    />
                                </div>
                                <div class="col-default-12">
                                    <app-input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        v-model="formData.personal.email"
                                    />
                                </div>
                            </div>
                        </template>
                    </app-accordion-item>
                    <app-accordion-item id="objective">
                        <template v-slot:header>Objective</template>
                        <template v-slot:body>
                            <div class="row">
                                <div class="col-default-12">
                                    <app-input
                                        name="objective"
                                        placeholder="Your objective"
                                        v-model="formData.objective.position"
                                    />
                                </div>
                                <div class="col-default-12">
                                    <app-textarea
                                        name="aboutObjective"
                                        v-model="formData.objective.about"
                                        placeholder="Describe your advantages in this position"
                                    />
                                </div>
                            </div>
                        </template>
                    </app-accordion-item>
                    <app-accordion-item id="education">
                        <template v-slot:header>Education</template>
                        <template v-slot:body>
                            <div
                                class="row"
                                v-if="components.education.length"
                            >
                                <div class="col-default-12">
                                    <component
                                        :id="index"
                                        :key="index"
                                        :is="component"
                                        @remove="removeComponent"
                                        :data="formData.education[index]"
                                        v-model="formData.education[index]"
                                        v-for="(component, index) in components.education"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-default-12">
                                    <app-button
                                        rounded
                                        theme="yellow"
                                        @click="addComponent('education')"
                                    >+ Add new</app-button>
                                </div>
                            </div>
                        </template>
                    </app-accordion-item>
                    <!-- <app-accordion-item id="qualifications">
                        <template v-slot:header>Qualifications</template>
                        <template v-slot:body>Qualifications</template>
                    </app-accordion-item> -->
                    <app-accordion-item id="work-experience">
                        <template v-slot:header>Work experience</template>
                        <template v-slot:body>
                            <div
                                class="row"
                                v-if="components.experience.length"
                            >
                                <div class="col-default-12">
                                    <component
                                        :id="index"
                                        :key="index"
                                        :is="component"
                                        @remove="removeComponent"
                                        :data="formData.experience[index]"
                                        v-model="formData.experience[index]"
                                        v-for="(component, index) in components.experience"
                                    />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-default-12">
                                    <app-button
                                        rounded
                                        theme="yellow"
                                        @click="addComponent('experience')"
                                    >+ Add new</app-button>
                                </div>
                            </div>
                        </template>
                    </app-accordion-item>
                    <app-accordion-item id="personal-qualities">
                        <template v-slot:header>Personal qualities</template>
                        <template v-slot:body>
                            <div class="row">
                                <div class="col-default-12">
                                    <app-textarea
                                        name="qualities"
                                        v-model="formData.qualities"
                                        placeholder="Write about your personal qualities"
                                    />
                                </div>
                            </div>
                        </template>
                    </app-accordion-item>
                    <app-accordion-item id="special-skills">
                        <template v-slot:header>Special skills</template>
                        <template v-slot:body>
                            <div class="row">
                                <div class="col-default-12">
                                    <app-textarea
                                        name="skills"
                                        v-model="formData.skills"
                                        placeholder="Write about your special skills"
                                    />
                                </div>
                            </div>
                        </template>
                    </app-accordion-item>

                    <!-- <app-accordion-item id="awards">
                        <template v-slot:header>Awards</template>
                        <template v-slot:body>Awards</template>
                    </app-accordion-item>
                    <app-accordion-item id="research-experience">
                        <template v-slot:header>Research experience</template>
                        <template v-slot:body>Research experience</template>
                    </app-accordion-item>
                    <app-accordion-item id="publications">
                        <template v-slot:header>Publications</template>
                        <template v-slot:body>Publications</template>
                    </app-accordion-item>
                    <app-accordion-item id="memberships">
                        <template v-slot:header>Memberships</template>
                        <template v-slot:body>Memberships</template>
                    </app-accordion-item>
                    <app-accordion-item id="references">
                        <template v-slot:header>References</template>
                        <template v-slot:body>References</template>
                    </app-accordion-item> -->
                </app-accordion>
            </div>
        </aside>
        <section class="constructor-preview">
            <app-preview
                ref="document"
                :data="formData"
            />
        </section>
    </div>
</template>

<script>
import jsPDF from 'jspdf'
import 'jspdf/dist/polyfills.es.js'
// eslint-disable-next-line no-unused-vars
import html2canvas from 'html2canvas'
import pdfFonts from '@/utils/pdfFonts'
import Education from './education.vue'
import Experience from './experience.vue'

export default {
    name: 'constructor',
    components: {
        Education,
        Experience
    },
    data () {
        return {
            jsPDF: Object,
            counter: 1,
            dimensions: {
                width: 700,
                ratio: 1.4142
            },
            formData: {
                photo: '',
                objective: {
                    position: 'Middle Frontend developer',
                    about: 'Some of my cool advantages'
                },
                personal: {
                    name: 'Anpilov Artem',
                    phone: '89045166555',
                    email: 'blind.resist@gmail.com',
                    address: 'Perevozniy pereulok 19/1',
                    dateOfBirth: '21.05.1987',
                    maritalStatus: ''
                },
                education: [
                    {
                        id: 'education-0',
                        university: 'Voronezh Institute of Economics and Law',
                        degree: 'Information Technology Specialist',
                        period: '2004 - 2009'
                    }
                ],
                experience: [
                    {
                        id: 'experience-0',
                        company: 'Zebra Ltd',
                        from: '2018',
                        to: 'present',
                        country: 'Russia',
                        city: 'Moscow',
                        position: 'Frontend developer',
                        duties: '- разработка библиотеки компонентов на VueJS\n- написание javascript ES5+\n- поиск вариантов решения поставленных задач\n- code review\n- поддержка и рефакторинг legacy-кода\n- adaptive, responsive\n- работа в команде с backend\n- верстка html, scss\n- работа с Docker',
                        achievements: ''
                    }
                ],
                skills: 'My special skills',
                qualities: 'My personal qualities'
            },
            data: {
                maritalStatus: [
                    {
                        id: 'married',
                        text: 'Married',
                        disabled: false,
                        selected: false
                    },
                    {
                        id: 'single',
                        text: 'Single',
                        disabled: false,
                        selected: false
                    },
                    {
                        id: 'divorced',
                        text: 'Divorced',
                        disabled: false,
                        selected: false
                    }
                ]
            },
            components: {
                education: [
                    Education
                ],
                experience: [
                    Experience
                ]
            }
        }
    },
    computed: {
        format () {
            return [
                this.dimensions.width,
                this.dimensions.width * this.dimensions.ratio
            ]
        }
    },
    methods: {
        createPDF () {
            const contentHtml = this.$refs.document.$refs.page.$el
            const pdfName = this.formData.personal.name.split(' ').join('-')

            // eslint-disable-next-line new-cap
            this.jsPDF = new jsPDF({
                unit: 'px',
                format: this.format,
                orientation: 'portrait'
            })

            this.jsPDF.addFileToVFS('Roboto-Bold-bold.ttf', pdfFonts.roboto.bold)
            this.jsPDF.addFileToVFS('Roboto-Light-normal.ttf', pdfFonts.roboto.light)
            this.jsPDF.addFileToVFS('Roboto-Regular-normal.ttf', pdfFonts.roboto.regular)

            this.jsPDF.addFont('Roboto-Bold-bold.ttf', 'Roboto-Bold', 'bold')
            this.jsPDF.addFont('Roboto-Light-normal.ttf', 'Roboto-Light', 'normal')
            this.jsPDF.addFont('Roboto-Regular-normal.ttf', 'Roboto-Regular', 'normal')

            this.jsPDF.html(contentHtml, {
                callback: pdf => {
                    pdf.save(pdfName + '.pdf')
                }
            })
        },
        previewPDF () {},
        uploadJSON () {},
        clearData () {
            this.recursiveClearing(this.formData)
        },
        recursiveClearing (data) {
            for (const key in data) {
                if (typeof data[key] === 'object') {
                    this.recursiveClearing(data[key])
                } else if (Array.isArray(data[key])) {
                    data[key] = []
                } else {
                    data[key] = ''
                }
            }
        },
        addComponent (type) {
            const id = `${type}-${this.counter++}`

            this.formData[type].push({
                id,
                period: '',
                degree: '',
                university: ''
            })

            this.components[type].push(type)
        },
        removeComponent (data) {
            const formData = this.formData[data.type]
            const components = this.components[data.type]

            for (let i = 0; i < formData.length; i++) {
                if (formData[i].id === data.id) {
                    const index = formData.indexOf(formData[i])

                    formData.splice(index, 1)
                    components.splice(index, 1)
                }
            }
        }
    }
}
</script>

<style lang="scss">
.constructor {
    display: flex;
    flex-flow: row nowrap;
}

.constructor-aside {
    width: 30rem;
    min-height: 100%;
    background-color: $gray-lite;

    &__logo {
        padding: 2rem;
        position: relative;
        text-align: center;
        user-select: none;

        &:after {
            content: '';
            display: block;
            width: 0;
            height: 0;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1;
            border: 20px solid transparent;
            border-right-color: $white;
            border-top-color: $white;
            border-left-color: $gray-dark;
            border-bottom-color: $gray-dark;
        }
    }

    &__header {
        padding: 1rem 2rem 1.5rem;
    }
}

.constructor-preview {
    display: flex;
    flex-flow: row nowrap;
    width: calc(100% - 30rem);
    padding: 4rem 0;
}
</style>
