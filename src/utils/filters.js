/* eslint-disable no-undef */
import Vue from 'vue'

Vue.filter('breakLine', function (string) {
    return string.replace(/(?:\r\n|\r|\n)/g, '<br>')
})
