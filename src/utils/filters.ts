/* eslint-disable no-undef */
import Vue from 'vue'

interface Period {
    to: string,
    from: string,
    currently: boolean
}

Vue.filter('breakLine', (string: string): string => {
    return string.replace(/(?:\r\n|\r|\n)/g, '<br>')
})

Vue.filter('period', (item: Period): string => {
    let result = ''

    result += item.from ? item.from : ''
    result += item.from && (item.to || item.currently) ? ' — ' : ''
    result += item.currently ? 'present' : item.to

    return result
})
