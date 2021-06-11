export default (): number | boolean => {
    const userAgent: string = window.navigator.userAgent
    const msie: number = userAgent.indexOf('MSIE ')
    const trident: number = userAgent.indexOf('Trident/')

    if (msie > 0) {
        return parseInt(userAgent.substring(msie + 5, userAgent.indexOf('.', msie)), 10)
    }

    if (trident > 0) {
        const rv: number = userAgent.indexOf('rv:')

        return parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10)
    }

    return false
}
