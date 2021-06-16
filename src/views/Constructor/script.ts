import JSPDF from 'jspdf'
import 'jspdf/dist/polyfills.es.js'
import html2canvas from 'html2canvas'
import pdfFonts from '@/utils/pdfFonts.ts'
import Personal from './components/personal.vue'
import Education from './components/education.vue'
import Experience from './components/experience.vue'
import AppTabs from '@/components/AppTabs/index.vue'
import AppLogo from '@/components/AppLogo/index.vue'
import AppRadio from '@/components/AppRadio/index.vue'
import AppTitle from '@/components/AppTitle/index.vue'
import AppInput from '@/components/AppInput/index.vue'
import AppButton from '@/components/AppButton/index.vue'
import AppFooter from '@/components/AppFooter/index.vue'
import AppPreview from '@/components/AppPreview/index.vue'
import AppTooltip from '@/components/AppTooltip/index.vue'
import AppTextarea from '@/components/AppTextarea/index.vue'
import AppTabsLabel from '@/components/AppTabsLabel/index.vue'
import AppAccordion from '@/components/AppAccordion/index.vue'
import AppInputFile from '@/components/AppInputFile/index.vue'
import AppTabsContent from '@/components/AppTabsContent/index.vue'
import AppLangSelector from '@/components/AppLangSelector/index.vue'
import AppAccordionItem from '@/components/AppAccordionItem/index.vue'
import { Component, Vue, Watch } from 'vue-property-decorator'

import VueI18n from 'vue-i18n'
import TranslateResult = VueI18n.TranslateResult

type BlankComponentsData = {
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

type FormData = {
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
        maritalStatus: string,
    },
    education: any[],
    experience: any[],
    skills: string,
    qualities: string
}

type Theme = {
    id: string,
    disabled: boolean,
    selected: boolean,
    text: TranslateResult
}

type ComputedClass = [string, {[elem: string]: boolean}]

@Component({
    components: {
        Personal,
        Education,
        Experience,
        AppLogo,
        AppTabs,
        AppTitle,
        AppRadio,
        AppInput,
        AppFooter,
        AppButton,
        AppTooltip,
        AppPreview,
        AppTextarea,
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
    formData: FormData
    uploadedJSON: Blob | []

    dimensions: {
        width: number,
        ratio: number
    }

    components: {
        education: any[],
        experience: any[]
    }

    constructor () {
        super()
        this.counter = 1
        this.aside = false
        this.overflow = false
        this.uploadedJSON = []
        this.dimensions = {
            width: 700,
            ratio: 1.4142
        }
        this.components = {
            education: [],
            experience: []
        }
        this.theme = this.$store.state.theme
        this.formData = this.$store.state.formData
    }

    get lang (): string {
        return this.$store.state.lang
    }

    get JSONUrl (): string {
        return this.$store.getters.JSONUrl
    }

    get cvName (): string {
        return this.$store.getters.cvName
    }

    get pdfFormat (): number[] {
        return [
            this.dimensions.width,
            this.dimensions.width * this.dimensions.ratio
        ]
    }

    get themes (): Theme[] {
        return [
            {
                id: 'default',
                disabled: false,
                selected: true,
                text: this.$t('radios.themes[0]')
            },
            {
                id: 'one',
                disabled: false,
                selected: false,
                text: this.$t('radios.themes[1]')
            },
            {
                id: 'two',
                disabled: false,
                selected: false,
                text: this.$t('radios.themes[2]')
            },
            {
                id: 'three',
                disabled: false,
                selected: false,
                text: this.$t('radios.themes[3]')
            }
        ].map((item: Theme): Theme => {
            if (item.id === this.theme) {
                item.selected = true
            }

            return item
        })
    }

    get asideClass (): ComputedClass {
        return [
            'constructor-aside',
            {
                'constructor-aside--active': this.aside
            }
        ]
    }

    get previewClass (): ComputedClass {
        return [
            'constructor-preview',
            {
                'constructor-preview--active': !this.aside
            }
        ]
    }

    @Watch('formData', { deep: true })
    onFormDataChanged (data: FormData): void {
        this.checkHeight()
        this.$store.commit('setFormData', data)
    }

    @Watch('theme')
    onThemeChanged (theme: string): void {
        this.$store.commit('setTheme', theme)
    }

    mounted (): void {
        this.update()
        document.addEventListener('click', (e: {[elem: string]: any}) => this.hideDropdown(e))
    }

    update (): void {
        if (this.formData.education.length) {
            this.components.education = []
            for (let i = 0; i < this.formData.education.length; i++) {
                this.components.education.push('education')
            }
        }
        if (this.formData.experience.length) {
            this.components.experience = []
            for (let i = 0; i < this.formData.experience.length; i++) {
                this.components.experience.push('experience')
            }
        }
    }

    createPDF (target = 'save'): void {
        const document = this.$refs.document as Vue
        const page = document.$refs.page as Vue
        const content = page.$el as HTMLElement
        const jsPDF: JSPDF = new JSPDF({
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
        }).then(() => {
            return jsPDF.html(content, {
                callback: pdf => {
                    if (target === 'save') {
                        pdf.save(`${this.cvName}.pdf`)
                    } else if (target === 'window') {
                        pdf.output('dataurlnewwindow')
                    } else {
                        console.warn('Target type is undefined!')
                    }
                }
            })
        })
    }

    previewPDF (): void {
        this.createPDF('window')
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

        if (type === 'experience' || type === 'education') {
            this.formData[type].push(blanks[type])
            this.components[type].push(type)
        }
    }

    removeComponent (data: {type: string, id: string}): void {
        if (data.type === 'experience' || data.type === 'education') {
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
    }

    applyUploadedData (): void {
        const fileReader: FileReader = new FileReader()

        fileReader.readAsText(this.uploadedJSON as Blob)

        fileReader.onload = (e: any) => {
            this.formData = JSON.parse(e.target.result)
            this.update()
        }

        this.uploadedJSON = []
    }

    checkHeight (): void {
        const document = this.$refs.document as Vue
        const preview = document.$el as HTMLElement
        const page = (document.$refs.page as Vue).$el as HTMLElement

        this.overflow = page.scrollHeight > preview.offsetHeight
    }

    hideDropdown (e: {[elem: string]: any}): void {
        const aside = this.$refs.aside as HTMLElement
        const isOutside: boolean = aside !== e.target && !aside.contains(e.target)

        if (isOutside) this.aside = false
    }
}
