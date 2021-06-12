<template>
    <div class="constructor">
        <aside
            ref="aside"
            :class="asideClass"
        >
            <div class="constructor-aside__header">
                <app-lang-selector />
                <router-link
                    to="/"
                    class="inline-block"
                >
                    <app-logo />
                </router-link>
            </div>
            <div class="constructor-aside__body">
                <app-tabs>
                    <template v-slot:label>
                        <app-tabs-label id="cv">{{ $t('constructor.aside.tabs.cv') }}</app-tabs-label>
                        <app-tabs-label id="options">{{ $t('constructor.aside.tabs.options') }}</app-tabs-label>
                    </template>
                    <template v-slot:additional>
                        <app-tooltip
                            theme="error"
                            v-if="overflow"
                            placement="left"
                            class="margin-right--xs"
                            :content="$t('helper.overflow')"
                        />
                        <app-button
                            rounded
                            theme="yellow"
                            :disabled="overflow"
                            v-processing="{ callback: createPDF }"
                        >{{ $t('buttons.generate') }}</app-button>
                    </template>
                    <template v-slot:content>
                        <app-tabs-content id="cv">
                            <app-accordion>
                                <app-accordion-item id="personal-information">
                                    <template v-slot:header>{{ $t('infoBlocks.personal') }}</template>
                                    <template v-slot:body>
                                        <personal
                                            type="personal"
                                            :data="formData.personal"
                                            v-model="formData.personal"
                                        />
                                    </template>
                                </app-accordion-item>
                                <app-accordion-item id="objective">
                                    <template v-slot:header>
                                        {{ $t('infoBlocks.objective') }}
                                        <app-tooltip :content="$t('helper.objective')" />
                                    </template>
                                    <template v-slot:body>
                                        <div class="row">
                                            <div class="col-default-12">
                                                <app-input
                                                    name="objective"
                                                    v-model="formData.objective.position"
                                                    :placeholder="$t('fields.objective')"
                                                />
                                            </div>
                                            <div class="col-default-12">
                                                <app-textarea
                                                    name="aboutObjective"
                                                    v-model="formData.objective.about"
                                                    :placeholder="$t('fields.aboutObjective')"
                                                />
                                            </div>
                                        </div>
                                    </template>
                                </app-accordion-item>
                                <app-accordion-item id="education">
                                    <template v-slot:header>{{ $t('infoBlocks.education') }}</template>
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
                                                >{{ $t('buttons.addNew') }}</app-button>
                                            </div>
                                        </div>
                                    </template>
                                </app-accordion-item>
                                <app-accordion-item id="work-experience">
                                    <template v-slot:header>{{ $t('infoBlocks.work') }}</template>
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
                                                >{{ $t('buttons.addNew') }}</app-button>
                                            </div>
                                        </div>
                                    </template>
                                </app-accordion-item>
                                <app-accordion-item id="personal-qualities">
                                    <template v-slot:header>
                                        {{ $t('infoBlocks.qualities') }}
                                        <app-tooltip :content="$t('helper.qualities')" />
                                    </template>
                                    <template v-slot:body>
                                        <div class="row">
                                            <div class="col-default-12">
                                                <app-textarea
                                                    name="qualities"
                                                    v-model="formData.qualities"
                                                    :placeholder="$t('fields.qualities')"
                                                />
                                            </div>
                                        </div>
                                    </template>
                                </app-accordion-item>
                                <app-accordion-item id="special-skills">
                                    <template v-slot:header>
                                        {{ $t('infoBlocks.skills') }}
                                        <app-tooltip :content="$t('helper.skills')" />
                                    </template>
                                    <template v-slot:body>
                                        <div class="row">
                                            <div class="col-default-12">
                                                <app-textarea
                                                    name="skills"
                                                    v-model="formData.skills"
                                                    :placeholder="$t('fields.skills')"
                                                />
                                            </div>
                                        </div>
                                    </template>
                                </app-accordion-item>
                            </app-accordion>
                        </app-tabs-content>
                        <app-tabs-content id="options">
                            <div class="constructor-aside__option">
                                <span class="constructor-aside__caption">{{ $t('constructor.aside.options.theme') }}:</span>
                                <app-radio
                                    name="theme"
                                    :data="themes"
                                    v-model="theme"
                                />
                            </div>
                            <div class="constructor-aside__option">
                                <span class="constructor-aside__caption">
                                    {{ $t('constructor.aside.options.download') }}
                                    <app-tooltip :content="$t('descriptions.downloadJSON')" />
                                </span>
                                <app-button
                                    rounded
                                    tag="a"
                                    download
                                    theme="yellow"
                                    :href="JSONUrl"
                                    :download-name="`${cvName}.json`"
                                >{{ $t('buttons.download') }}</app-button>
                            </div>
                            <div class="constructor-aside__option">
                                <span class="constructor-aside__caption">
                                    {{ $t('constructor.aside.options.upload') }}
                                    <app-tooltip :content="$t('descriptions.uploadJSON')" />
                                </span>
                                <app-input-file
                                    emit="file"
                                    name="json"
                                    accept-type="json"
                                    :accept-size="512000"
                                    v-model="uploadedJSON"
                                    :description="$t('fields.uploadFile')"
                                    :button-text="$t('buttons.uploadJSON')"
                                />
                                <app-button
                                    rounded
                                    theme="yellow"
                                    class="margin-top--s"
                                    @click="applyUploadedData"
                                    :disabled="Object.getOwnPropertyNames(uploadedJSON).length !== 0"
                                >{{ $t('buttons.apply') }}</app-button>
                            </div>
                        </app-tabs-content>
                    </template>
                </app-tabs>
            </div>
            <button
                @click="aside = !aside"
                :class="asideTriggerClass"
            ></button>
            <app-footer location="aside" />
        </aside>
        <section
            ref="preview"
            :class="previewClass"
        >
            <app-preview
                :type="theme"
                ref="document"
                :data="formData"
            />
        </section>
    </div>
</template>

<script lang="ts">
import JSPDF from 'jspdf'
import 'jspdf/dist/polyfills.es.js'
import html2canvas from 'html2canvas'
import Personal from './personal.vue'
import pdfFonts from '@/utils/pdfFonts.ts'
import Education from './education.vue'
import Experience from './experience.vue'

import AppLogo from '@/components/AppLogo/index.vue'
import AppFooter from '@/components/AppFooter/index.vue'
import AppButton from '@/components/AppButton/index.vue'
import AppAccordion from '@/components/AppAccordion/index.vue'
import AppLangSelector from '@/components/AppLangSelector/index.vue'
import AppAccordionItem from '@/components/AppAccordionItem/index.vue'

export default {
    name: 'constructor',
    components: {
        Personal,
        Education,
        Experience,
        AppLogo,
        AppFooter,
        AppButton,
        AppAccordion,
        AppLangSelector,
        AppAccordionItem
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
            JSPDF: Object,
            dimensions: {
                width: 700,
                ratio: 1.4142
            },
            theme: 'default',
            popupActive: false,
            uploadedJSON: Object,
            formData: {
                objective: {
                    position: '',
                    about: ''
                },
                personal: {
                    site: '',
                    photo: 'data:image/png;base64,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',
                    name: '',
                    phone: '',
                    email: '',
                    address: '',
                    dateOfBirth: '',
                    maritalStatus: ''
                },
                education: [],
                experience: [],
                skills: '',
                qualities: ''
            },
            components: {
                education: [],
                experience: []
            },
            aside: false,
            overflow: false
        }
    },
    mounted () {
        document.addEventListener('click', e => this.hideDropdown(e))
    },
    computed: {
        pdfFormat () {
            return [
                this.dimensions.width,
                this.dimensions.width * this.dimensions.ratio
            ]
        },
        selectedTheme () {
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

            currentDate = this.lang === 'ru' ? `${day}-${month}-${year}` : `${month}-${day}-${year}`

            return `${this.formData.personal.name.split(' ').join('-')}-${currentDate}`
        },
        themes () {
            return [
                {
                    id: 'default',
                    disabled: false,
                    text: this.$t('radios.themes[0]')
                },
                {
                    id: 'one',
                    disabled: false,
                    text: this.$t('radios.themes[1]')
                },
                {
                    id: 'two',
                    disabled: false,
                    text: this.$t('radios.themes[2]')
                },
                {
                    id: 'three',
                    disabled: false,
                    text: this.$t('radios.themes[3]')
                }
            ]
        },
        asideClass () {
            return [
                'constructor-aside',
                {
                    'constructor-aside--active': this.aside
                }
            ]
        },
        previewClass () {
            return [
                'constructor-preview',
                {
                    'constructor-preview--active': !this.aside
                }
            ]
        },
        asideTriggerClass () {
            return [
                'constructor-aside__trigger icon icon-arrow-right2',
                {
                    'constructor-aside__trigger--active': this.aside
                }
            ]
        }
    },
    watch: {
        formData: {
            deep: true,
            handler (value) {
                this.checkHeight()
            }
        }
    },
    methods: {
        createPDF () {
            const content = this.$refs.document.$refs.page.$el

            this.JSPDF = new JSPDF({
                unit: 'mm',
                format: this.pdfFormat,
                orientation: 'portrait'
            })

            this.JSPDF.addFileToVFS('Roboto-Bold-bold.ttf', pdfFonts.roboto.bold)
            this.JSPDF.addFileToVFS('Roboto-Light-normal.ttf', pdfFonts.roboto.light)
            this.JSPDF.addFileToVFS('Roboto-Regular-normal.ttf', pdfFonts.roboto.regular)

            this.JSPDF.addFont('Roboto-Bold-bold.ttf', 'Roboto-Bold', 'bold')
            this.JSPDF.addFont('Roboto-Light-normal.ttf', 'Roboto-Light', 'normal')
            this.JSPDF.addFont('Roboto-Regular-normal.ttf', 'Roboto-Regular', 'normal')

            html2canvas(content, {
                scale: 1,
                useCORS: true,
                allowTaint: true,
                width: this.pdfFormat[0],
                height: this.pdfFormat[1]
            }).then(canvas => {
                this.JSPDF.html(content, {
                    callback: pdf => {
                        // pdf.output('dataurlnewwindow')
                        pdf.save(`${this.cvName}.pdf`)
                    }
                })
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
            const blanks = {
                experience: {
                    id,
                    to: '',
                    from: '',
                    city: '',
                    about: '',
                    company: '',
                    country: '',
                    position: '',
                    currently: false
                },
                education: {
                    id,
                    period: '',
                    degree: '',
                    university: ''
                }
            }

            this.formData[type].push(blanks[type])
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

                if (result.education.length) this.components.education.push('education')
                if (result.experience.length) this.components.experience.push('experience')
            }
        },
        checkHeight () {
            const preview = this.$refs.document.$el
            const page = this.$refs.document.$refs.page.$el

            this.overflow = page.scrollHeight > preview.offsetHeight
        },
        hideDropdown (e) {
            const isOutside = this.$refs.aside !== e.target && !this.$refs.aside.contains(e.target)

            if (isOutside) this.aside = false
        }
    }
}
</script>

<style lang="scss">
.constructor {
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
}

.constructor-aside {
    display: flex;
    flex-flow: column nowrap;
    width: 28.25rem;
    flex-shrink: 0;
    background-color: $gray-dark;

    @include breakpoint(tablet) {
        min-height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        transform: translateX(-100%);
        transition: transform $transition;
    }

    @include breakpoint(mobile) {
        width: 24rem;
    }

    &__header {
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
            border-top-color: $white;
            border-right-color: $white;
            border-left-color: $gray-dark;
            border-bottom-color: $gray-dark;
        }

        .app-lang-selector {
            position: absolute;
            top: 50%;
            left: 2rem;
            z-index: 1;
            transform: translateY(-50%);
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

    &__desc {
        line-height: 1.5;
        font-size: .875rem;
        margin-bottom: 1.5rem;
    }

    &__trigger {
        display: none;
        padding: 1rem;
        position: absolute;
        top: 0;
        left: 100%;
        z-index: 1;
        font-size: 2.5rem;
        color: $blue-lite;
        line-height: 1;
        border: none;
        background-color: transparent;
        transform: scale(1, 1);
        transition: transform $transition;

        @include breakpoint(tablet) {
            display: block;
        }

        &--active {
            transform: scale(-1, 1);
        }
    }

    &--active {

        @include breakpoint(tablet) {
            transform: translateX(0%);
        }
    }
}

.constructor-preview {
    $parent: &;

    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    width: calc(100% - 28.25rem);
    height: 100vh;
    overflow: hidden;
    position: relative;
    background-color: $white;

    @include breakpoint(tablet) {
        width: 100%;
        opacity: 1;
        transition: opacity $transition;

        &:not(#{$parent}--active) {
            opacity: .25;
        }
    }

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
