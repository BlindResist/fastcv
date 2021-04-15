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
                                        name="About objective"
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
                            <div class="row">
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
                    <app-accordion-item id="qualifications">
                        <template v-slot:header>Qualifications</template>
                        <template v-slot:body>Qualifications</template>
                    </app-accordion-item>
                    <app-accordion-item id="work-experience">
                        <template v-slot:header>Work experience</template>
                        <template v-slot:body>Work experience</template>
                    </app-accordion-item>
                    <app-accordion-item id="personal-qualities">
                        <template v-slot:header>Personal qualities</template>
                        <template v-slot:body>Personal qualities</template>
                    </app-accordion-item>
                    <app-accordion-item id="special-skills">
                        <template v-slot:header>Special skills</template>
                        <template v-slot:body>Special skills</template>
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
import html2canvas from 'html2canvas'
import Education from './education.vue'

export default {
    name: 'constructor',
    components: {
        Education
    },
    data () {
        return {
            counter: 1,
            dimensions: {
                width: 700,
                ratio: 1.4142
            },
            formData: {
                photo: '',
                objective: {
                    position: 'Middle Frontend developer',
                    about: 'Some of my advantages'
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
                        university: 'Московский государственный университет приборостроения и информатики, Москва',
                        degree: 'Степень магистра по направлению «информатика»',
                        period: '2001—2006'
                    }
                ]
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
            // eslint-disable-next-line new-cap
            const pdf = new jsPDF({
                unit: 'px',
                format: this.format,
                orientation: 'portrait'
            })
            const pdfName = this.formData.name.split(' ').join('-')
            const contentHtml = this.$refs.document.$refs.page.$el

            pdf.html(contentHtml, {
                callback: pdf => {
                    pdf.save(pdfName + '.pdf')
                }
            })
        },
        previewPDF () {
            console.log('preview!')
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
            const education = this.formData.education

            for (let i = 0; i < education; i++) {
                if (education[i].id === data.id) delete education[i]
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
