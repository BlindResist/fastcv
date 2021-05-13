/* eslint-disable no-undef */
import Vue from 'vue'

Vue.filter('breakLine', string => {
    return string.replace(/(?:\r\n|\r|\n)/g, '<br>')
})

Vue.filter('period', item => {
    let result = ''

    result += item.from ? item.from : ''
    result += item.from && (item.to || item.currently) ? ' — ' : ''
    result += item.currently ? 'present' : item.to

    return result
})
