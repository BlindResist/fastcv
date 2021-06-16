import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        lang: 'en',
        theme: 'default',
        processing: false,
        languages: ['ru', 'en'],
        tabAsideActive: 'tabs-cv',
        accordionAsideActive: '',
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
        }
    },
    mutations: {
        changeLang (state, lang: string): void {
            state.lang = lang
        },
        processing (state, status: boolean): void {
            state.processing = status
        },
        activateTab (state, id: string): void {
            state.tabAsideActive = id
        },
        activateAsideAccordion (state, id: string): void {
            state.accordionAsideActive = id
        },
        setFormData (state, data): void {
            state.formData = data
        },
        setTheme (state, theme): void {
            state.theme = theme
        }
    },
    getters: {
        cvName (state): string {
            const currentDate: Date = new Date()
            const year: number = currentDate.getFullYear()
            const day: string = String(currentDate.getDate()).padStart(2, '0')
            const month: string = String(currentDate.getMonth() + 1).padStart(2, '0')
            const date: string = state.lang === 'ru' ? `${day}-${month}-${year}` : `${month}-${day}-${year}`

            return `${state.formData.personal.name.split(' ').join('-')}-${date}`
        },
        JSONUrl (state): string {
            return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(state.formData))}`
        }
    }
})
