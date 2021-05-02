export default class Lang {
    constructor () {
        this.localStorage = window.localStorage
        this.navigatorLanguage = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0, 2).toLowerCase()
    }

    get () {
        return this.getFromLocalStorage() !== null ? this.getFromLocalStorage() : this.navigatorLanguage
    }

    getFromLocalStorage () {
        return this.localStorage.getItem('lang')
    }
}
