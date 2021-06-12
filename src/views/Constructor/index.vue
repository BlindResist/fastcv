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
import AppTabs from '@/components/AppTabs/index.vue'
import AppLogo from '@/components/AppLogo/index.vue'
import AppButton from '@/components/AppButton/index.vue'
import AppFooter from '@/components/AppFooter/index.vue'
import AppPreview from '@/components/AppPreview/index.vue'
import AppTabsLabel from '@/components/AppTabsLabel/index.vue'
import AppAccordion from '@/components/AppAccordion/index.vue'
import AppTabsContent from '@/components/AppTabsContent/index.vue'
import AppLangSelector from '@/components/AppLangSelector/index.vue'
import AppAccordionItem from '@/components/AppAccordionItem/index.vue'
import AppInput from '@/components/AppInput/index.vue'
import AppInputFile from '@/components/AppInputFile/index.vue'
import { Component, Watch, Vue } from 'vue-property-decorator'

import VueI18n from 'vue-i18n'
import TranslateResult = VueI18n.TranslateResult

interface BlankComponentsData {
    experience: {
        id: string,
        to: string,
        from: string,
        city: string,
        about: string,
        company: string,
        country: string,
        position: string,
        currently: boolean
    },
    education: {
        id: string,
        period: string,
        degree: string,
        university: string
    }
}

interface Data {
    objective: {
        position: string,
        about: string
    },
    personal: {
        site: string,
        photo: string,
        name: string,
        phone: string,
        email: string,
        address: string,
        dateOfBirth: string,
        maritalStatus: string
    },
    education: [],
    experience: [],
    skills: string,
    qualities: string
}

@Component({
    components: {
        Personal,
        Education,
        Experience,
        AppLogo,
        AppTabs,
        AppInput,
        AppFooter,
        AppButton,
        AppPreview,
        AppAccordion,
        AppTabsLabel,
        AppInputFile,
        AppTabsContent,
        AppLangSelector,
        AppAccordionItem
    }
})

export default class Constructor extends Vue {
    theme: string
    aside: boolean
    counter: number
    overflow: boolean
    uploadedJSON!: {[elem: string]: any}

    dimensions: {
        width: number,
        ratio: number
    }

    components!: {
        education: [],
        experience: []
    }

    constructor () {
        super()
        this.counter = 1
        this.aside = false
        this.overflow = false
        this.uploadedJSON = []
        this.theme = 'default'
        this.dimensions = {
            width: 700,
            ratio: 1.4142
        }
    }

    mounted (): void {
        document.addEventListener('click', (e: {[elem: string]: any}) => this.hideDropdown(e))
    }

    get formData (): Data {
        return this.$store.state.formData
    }

    get lang (): string {
        return this.$store.state.lang
    }

    get pdfFormat (): number[] {
        return [
            this.dimensions.width,
            this.dimensions.width * this.dimensions.ratio
        ]
    }

    get selectedTheme (): string[] {
        return this.themes.find(item => item.id === this.theme)?.text
    }

    get JSONUrl (): string {
        return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.formData))}`
    }

    get cvName (): string {
        const currentDate: Date = new Date()
        const year: number = currentDate.getFullYear()
        const day: string = String(currentDate.getDate()).padStart(2, '0')
        const month: string = String(currentDate.getMonth() + 1).padStart(2, '0')
        const date: string = this.lang === 'ru' ? `${day}-${month}-${year}` : `${month}-${day}-${year}`

        return `${this.formData.personal.name.split(' ').join('-')}-${date}`
    }

    get themes (): {id: string, disabled: boolean, text: TranslateResult}[] {
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
    }

    get asideClass (): [string, {[elem: string]: boolean}] {
        return [
            'constructor-aside',
            {
                'constructor-aside--active': this.aside
            }
        ]
    }

    get previewClass (): [string, {[elem: string]: boolean}] {
        return [
            'constructor-preview',
            {
                'constructor-preview--active': !this.aside
            }
        ]
    }

    get asideTriggerClass (): [string, {[elem: string]: boolean}] {
        return [
            'constructor-aside__trigger icon icon-arrow-right2',
            {
                'constructor-aside__trigger--active': this.aside
            }
        ]
    }

    @Watch('formData', { deep: true })
    onFormDataCHanged (): void {
        this.checkHeight()
    }

    createPDF (): void {
        const document = this.$refs.document as Vue
        const page = document.$refs.page as Vue
        const content = page.$el as HTMLElement
        const jsPDF = new JSPDF({
            unit: 'mm',
            format: this.pdfFormat,
            orientation: 'portrait'
        })

        jsPDF.addFileToVFS('Roboto-Bold-bold.ttf', pdfFonts.roboto.bold)
        jsPDF.addFileToVFS('Roboto-Light-normal.ttf', pdfFonts.roboto.light)
        jsPDF.addFileToVFS('Roboto-Regular-normal.ttf', pdfFonts.roboto.regular)

        jsPDF.addFont('Roboto-Bold-bold.ttf', 'Roboto-Bold', 'bold')
        jsPDF.addFont('Roboto-Light-normal.ttf', 'Roboto-Light', 'normal')
        jsPDF.addFont('Roboto-Regular-normal.ttf', 'Roboto-Regular', 'normal')

        html2canvas(content, {
            scale: 1,
            useCORS: true,
            allowTaint: true,
            width: this.pdfFormat[0],
            height: this.pdfFormat[1]
        }).then(canvas => {
            jsPDF.html(content, {
                callback: pdf => {
                    // pdf.output('dataurlnewwindow')
                    pdf.save(`${this.cvName}.pdf`)
                }
            })
        })
    }

    addComponent (type: string): void {
        const id = `${type}-${this.counter++}`
        const blanks: BlankComponentsData = {
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
    }

    removeComponent (data: {type: string, id: string}): void {
        const formData = this.formData[data.type]
        const components = this.components[data.type]

        for (let i = 0; i < formData.length; i++) {
            if (formData[i].id === data.id) {
                const index: number = formData.indexOf(formData[i])

                formData.splice(index, 1)
                components.splice(index, 1)
            }
        }
    }

    applyUploadedData (): void {
        const fileReader: FileReader = new FileReader()

        fileReader.readAsText(this.uploadedJSON)

        fileReader.onload = (e: {target: {result: string}}) => {
            const result: BlankComponentsData = JSON.parse(e.target.result)

            this.$store.commit('setData', result)

            if (result.education.length) this.components.education.push('education')
            if (result.experience.length) this.components.experience.push('experience')
        }
    }

    checkHeight (): void {
        const document = this.$refs.document as Vue
        const preview = document.$el as HTMLElement
        const page = (document.$refs.page as Vue).$el as HTMLElement

        this.overflow = page.scrollHeight > preview.offsetHeight
    }

    hideDropdown (e: {[elem: string]: any}): void {
        const aside = (this.$refs.aside as Vue).$el as HTMLElement
        const isOutside: boolean = this.$refs.aside !== e.target && !aside.contains(e.target)

        if (isOutside) this.aside = false
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
