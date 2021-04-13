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
                <app-accordion initial="first">
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
                                        v-model="formData.name"
                                    />
                                </div>
                                <div class="col-default-12">
                                    <app-input
                                        name="address"
                                        placeholder="Address"
                                        v-model="formData.address"
                                    />
                                </div>
                                <div class="col-default-12">
                                    <app-input
                                        name="phone"
                                        v-model="formData.phone"
                                        placeholder="Phone number"
                                    />
                                </div>
                                <div class="col-default-6">
                                    <!-- <app-input
                                        name="maritalStatus"
                                        placeholder="Marital status"
                                        v-model="formData.maritalStatus"
                                    /> -->
                                    <app-select
                                        name="maritalStatus"
                                        :data="[
                                            {
                                                'id': 'married',
                                                'text': 'Married',
                                                'disabled': false,
                                                'selected': false
                                            },
                                            {
                                                'id': 'single',
                                                'text': 'Single',
                                                'disabled': false,
                                                'selected': false
                                            },
                                            {
                                                'id': 'divorced',
                                                'text': 'Divorced',
                                                'disabled': false,
                                                'selected': false
                                            }
                                        ]"
                                        placeholder="Marital status"
                                        v-model="formData.maritalStatus"
                                    />
                                </div>
                                <div class="col-default-6">
                                    <app-input
                                        name="dateOfBirth"
                                        placeholder="Date of birth"
                                        v-model="formData.dateOfBirth"
                                    />
                                </div>
                                <div class="col-default-12">
                                    <app-input
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        v-model="formData.email"
                                    />
                                </div>
                            </div>
                        </template>
                    </app-accordion-item>
                    <app-accordion-item id="objective">
                        <template v-slot:header>Objective</template>
                        <template v-slot:body>Objective</template>
                    </app-accordion-item>
                    <app-accordion-item id="education">
                        <template v-slot:header>Education</template>
                        <template v-slot:body>Education</template>
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

export default {
    name: 'constructor',
    data () {
        return {
            formData: {
                name: '',
                phone: '',
                email: '',
                photo: '',
                address: '',
                dateOfBirth: '',
                maritalStatus: ''
            }
        }
    },
    methods: {
        createPDF () {
            // eslint-disable-next-line new-cap
            const pdf = new jsPDF()
            const pdfName = this.formData.name.split(' ').join('-')

            pdf.text('Hello World', 10, 10)
            pdf.save(pdfName + '.pdf')
        },
        previewPDF () {
            console.log('preview!')
        },
        clearData () {
            for (const key in this.formData) {
                this.formData[key] = ''
            }
        },
        addPhoto (event) {
            const file = event.target.files[0]

            this.formData.photo = URL.createObjectURL(file)
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
    width: calc(100% - 30rem);
    padding: 4rem;
}
</style>
