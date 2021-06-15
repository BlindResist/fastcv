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
import AppButton from '@/components/AppButton/index.vue'
import AppFooter from '@/components/AppFooter/index.vue'
import AppPreview from '@/components/AppPreview/index.vue'
import AppTooltip from '@/components/AppTooltip/index.vue'
import AppTextarea from '@/components/AppTextarea/index.vue'
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
        this.theme = 'default'
        this.dimensions = {
            width: 700,
            ratio: 1.4142
        }
        this.components = {
            education: [],
            experience: []
        }
        this.formData = this.$store.state.formData
    }

    mounted (): void {
        document.addEventListener('click', (e: {[elem: string]: any}) => this.hideDropdown(e))
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

    get themes (): {id: string, disabled: boolean, selected: boolean, text: TranslateResult}[] {
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
            'constructor-aside__trigger',
            {
                'constructor-aside__trigger--active': this.aside
            }
        ]
    }

    @Watch('formData', { deep: true })
    onFormDataChanged (data: FormData): void {
        this.checkHeight()
        this.$store.commit('setFormData', data)
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
            const result: FormData = JSON.parse(e.target.result)

            this.formData = result

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
        const aside = this.$refs.aside as HTMLElement
        const isOutside: boolean = aside !== e.target && !aside.contains(e.target)

        if (isOutside) this.aside = false
    }
}
