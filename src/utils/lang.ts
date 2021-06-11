export default class Lang {
    localStorage: {
        [elem: string]: any
    }
    navigatorLanguage: string
    navigator: {
        [elem: string]: any,
        systemLanguage?: string,
        userLanguage?: string
    }

    constructor () {
        this.navigator = window.navigator
        this.localStorage = window.localStorage
        this.navigatorLanguage = (this.navigator.language || this.navigator.systemLanguage || this.navigator.userLanguage).substr(0, 2).toLowerCase()
    }

    get (): string {
        return this.getFromLocalStorage() !== null ? this.getFromLocalStorage() : this.navigatorLanguage
    }

    getFromLocalStorage (): string {
        return this.localStorage.getItem('lang')
    }
}
