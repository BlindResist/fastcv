<template>
    <div class="constructor">
        <aside class="constructor-aside">
            <div class="constructor-aside__logo">
                <app-logo />
            </div>
            <div class="constructor-aside__body">
                <app-tabs>
                    <template v-slot:label>
                        <app-tabs-label id="cv">CV</app-tabs-label>
                        <app-tabs-label id="options">Options</app-tabs-label>
                    </template>
                    <template v-slot:additional>
                        <app-button
                            rounded
                            theme="yellow"
                            @click="createPDF"
                        >Generate</app-button>
                    </template>
                    <template v-slot:content>
                        <app-tabs-content id="cv">
                            <app-accordion initial="first">
                                <app-accordion-item id="personal-information">
                                    <template v-slot:header>Personal information</template>
                                    <template v-slot:body>
                                        <personal
                                            type="personal"
                                            :data="formData.personal"
                                            v-model="formData.personal"
                                        />
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
                            </app-accordion>
                        </app-tabs-content>
                        <app-tabs-content id="options">
                            <div class="constructor-aside__option">
                                <span class="constructor-aside__caption">Choose theme:</span>
                                <app-radio
                                    name="theme"
                                    v-model="theme"
                                    :options="themes"
                                />
                            </div>
                            <div class="constructor-aside__option">
                                <span class="constructor-aside__caption">Download CV data JSON</span>
                                <app-button
                                    rounded
                                    tag="a"
                                    download
                                    theme="yellow"
                                    :href="JSONUrl"
                                    :download-name="`${cvName}.json`"
                                >Download</app-button>
                            </div>
                            <div class="constructor-aside__option">
                                <span class="constructor-aside__caption">Upload CV data JSON</span>
                                <app-input-file
                                    emit="file"
                                    name="json"
                                    accept="json"
                                    v-model="uploadedJSON"
                                    button-text="Upload JSON"
                                />
                                <app-button
                                    rounded
                                    theme="yellow"
                                    class="margin-top--xs"
                                    @click="applyUploadedData"
                                    :disabled="Object.getOwnPropertyNames(uploadedJSON).length !== 0"
                                >Apply new data</app-button>
                            </div>
                        </app-tabs-content>
                    </template>
                </app-tabs>
            </div>
        </aside>
        <section class="constructor-preview">
            <div class="constructor-preview__title">
                <app-title tag="h3">{{ headerTitle }}</app-title>
            </div>
            <app-preview
                :type="theme"
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
import Personal from './personal.vue'
import pdfFonts from '@/utils/pdfFonts'
import Education from './education.vue'
import Experience from './experience.vue'

export default {
    name: 'constructor',
    components: {
        Personal,
        Education,
        Experience
    },
    props: {
        lang: {
            type: String,
            default: 'en'
        }
    },
    data () {
        return {
            counter: 1,
            jsPDF: Object,
            dimensions: {
                width: 700,
                ratio: 1.4142
            },
            theme: 'default',
            popupActive: false,
            uploadedJSON: Object,
            formData: {
                objective: {
                    position: 'Middle Frontend developer',
                    about: 'Some of my cool advantages'
                },
                personal: {
                    site: 'http://digama.online',
                    photo: './images/no-image.png',
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
                        period: ['2004', '2009']
                    }
                ],
                experience: [
                    {
                        id: 'experience-0',
                        company: 'Zebra Ltd',
                        from: '2018',
                        to: '',
                        country: 'Russia',
                        city: 'Moscow',
                        currently: true,
                        position: 'Frontend developer',
                        about: '- разработка библиотеки компонентов на VueJS\n- написание javascript ES5+\n- поиск вариантов решения поставленных задач\n- code review\n- поддержка и рефакторинг legacy-кода\n- adaptive, responsive\n- работа в команде с backend\n- верстка html, scss\n- работа с Docker'
                    }
                ],
                skills: 'My special skills',
                qualities: 'My personal qualities'
            },
            components: {
                education: [Education],
                experience: [Experience]
            },
            themes: [
                {
                    id: 'default',
                    text: 'Default theme',
                    disabled: false
                },
                {
                    id: 'one',
                    text: 'Theme "One"',
                    disabled: false
                },
                {
                    id: 'two',
                    text: 'Theme "Two"',
                    disabled: false
                },
                {
                    id: 'three',
                    text: 'Theme "Three"',
                    disabled: true
                },
                {
                    id: 'four',
                    text: 'Theme "Four"',
                    disabled: true
                },
                {
                    id: 'five',
                    text: 'Theme "Five"',
                    disabled: true
                }
            ],
            storage: window.localStorage
        }
    },
    created () {
        // this.setFromLocalStorage()
    },
    computed: {
        pdfFormat () {
            return [
                this.dimensions.width,
                this.dimensions.width * this.dimensions.ratio
            ]
        },
        headerTitle () {
            return this.themes.find(item => item.id === this.theme).text
        },
        JSONUrl () {
            return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.formData))}`
        },
        cvName () {
            let currentDate = new Date()
            const year = currentDate.getFullYear()
            const day = String(currentDate.getDate()).padStart(2, '0')
            const month = String(currentDate.getMonth() + 1).padStart(2, '0')

            if (this.lang === 'ru') {
                currentDate = `${day}-${month}-${year}`
            } else {
                currentDate = `${month}-${day}-${year}`
            }

            return `${this.formData.personal.name.split(' ').join('-')}-${currentDate}`
        }
    },
    // watch: {
    //     formData: {
    //         deep: true,
    //         handler (value) {
    //             this.storage.setItem('formData', JSON.stringify(value))
    //         }
    //     }
    // },
    methods: {
        setFromLocalStorage () {
            const formData = this.storage.getItem('formData')

            if (formData !== null) {
                this.formData = JSON.parse(formData)
            }
        },
        createPDF () {
            const contentHtml = this.$refs.document.$refs.page.$el

            // eslint-disable-next-line new-cap
            this.jsPDF = new jsPDF({
                unit: 'mm',
                format: this.pdfFormat,
                orientation: 'portrait',
                html2canvas: {
                    scale: 1,
                    useCORS: true,
                    allowTaint: true
                }
            })

            this.jsPDF.addFileToVFS('Roboto-Bold-bold.ttf', pdfFonts.roboto.bold)
            this.jsPDF.addFileToVFS('Roboto-Light-normal.ttf', pdfFonts.roboto.light)
            this.jsPDF.addFileToVFS('Roboto-Regular-normal.ttf', pdfFonts.roboto.regular)

            this.jsPDF.addFont('Roboto-Bold-bold.ttf', 'Roboto-Bold', 'bold')
            this.jsPDF.addFont('Roboto-Light-normal.ttf', 'Roboto-Light', 'normal')
            this.jsPDF.addFont('Roboto-Regular-normal.ttf', 'Roboto-Regular', 'normal')

            this.jsPDF.html(contentHtml, {
                callback: pdf => {
                    pdf.save(this.cvName + '.pdf')
                }
            })
        },
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
        },
        applyUploadedData () {
            const fileReader = new FileReader()

            fileReader.readAsText(this.uploadedJSON)

            fileReader.onload = e => {
                const result = JSON.parse(e.target.result)

                this.formData = result
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
    width: 25%;
    min-width: 400px;
    min-height: 100%;
    background-color: $gray-dark;

    &__logo {
        padding: 2rem;
        position: relative;
        text-align: center;
        user-select: none;
        background-color: $gray-lite;

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
            border-right-color: $gray-liter;
            border-top-color: $gray-liter;
            border-left-color: $gray-dark;
            border-bottom-color: $gray-dark;
        }
    }

    &__caption {
        display: block;
        margin-bottom: 1rem;
        font-size: 1rem;
        line-height: 1.4;
        font-weight: 700;
        color: $blue-dark;
        user-select: none;
    }

    &__option {
        padding: 2rem;

        &+& {
            border-top: 1px solid rgba($blue-dark, .2);
        }
    }
}

.constructor-preview {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    width: 75%;
    padding: 5rem 0 4rem;
    position: relative;
    background-color: $gray-liter;

    &__title {
        width: 100%;
        padding: 1.5rem;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        text-align: center;
    }
}
</style>
