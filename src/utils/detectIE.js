export default () => {
    const userAgent = window.navigator.userAgent
    const msie = userAgent.indexOf('MSIE ')
    const trident = userAgent.indexOf('Trident/')

    if (msie > 0) {
        return parseInt(userAgent.substring(msie + 5, userAgent.indexOf('.', msie)), 10)
    }

    if (trident > 0) {
        const rv = userAgent.indexOf('rv:')

        return parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10)
    }

    return false
}
