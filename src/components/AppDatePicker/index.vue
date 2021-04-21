<template>
    <div class="app-date-picker">
        <date-picker
            :lang="lang"
            :type="type"
            :format="format"
            @change="onChange"
            :formatter="formatter"
            :value-type="valueType"
            :placeholder="placeholder"
            popup-class="app-date-picker__popup"
        />
    </div>
</template>

<script>
import dayjs from 'dayjs'
import 'vue2-datepicker/index.css'
import DatePicker from 'vue2-datepicker'

export default {
    name: 'app-date-picker',
    components: {
        DatePicker
    },
    model: {
        event: 'change'
    },
    props: {
        type: {
            type: String,
            default: 'date',
            validator: prop => ['date', 'datetime', 'year', 'month', 'time', 'week'].includes(prop)
        },
        lang: {
            type: String,
            default: 'en'
        },
        format: {
            type: String,
            default: 'DD.MM.YYYY'
        },
        valueType: {
            type: String,
            default: 'format'
        },
        range: Boolean,
        placeholder: {
            type: String,
            default: ''
        }
    },
    data () {
        return {}
    },
    created () {
        dayjs.locale(this.lang)
    },
    computed: {
        formatter () {
            return {
                stringify: value => dayjs(value).format(this.format),
                parse: value => dayjs(value, this.format).toDate()
            }
        }
    },
    methods: {
        onChange (data) {
            this.$emit('change', data)
        }
    }
}
</script>

<style lang="scss">
.app-date-picker {
    font-family: inherit;

    .mx-datepicker {
        max-width: 250px;
        width: 100%;
    }

    .mx-datepicker-range {
        max-width: 490px;
        width: 100%;
    }

    .mx-input-wrapper {

        &:hover {

            .mx-icon-clear {
                display: flex;
            }

            .mx-icon-clear+.mx-icon-calendar {
                display: block;
            }
        }
    }

    .mx-icon-clear {
        display: flex;
        cursor: pointer;
    }

    .mx-icon-calendar {
        cursor: pointer;
    }

    .mx-input {
        height: 42px;
        padding: 8px 45px 8px 20px;
        color: $black;
        font-size: 16px;
        line-height: 1.4;
        border: none;
        border-radius: 0;
        box-shadow: inset 0 0 0 1px $gray-dark;

        &:hover {
            box-shadow: inset 0 0 0 1px $gray-lite;
        }

        &:focus {
            box-shadow: inset 0 0 0 1px $yellow;
        }

        &::placeholder {
            color: $gray-dark;
        }

        @include breakpoint (mobile) {
            font-size: 14px;
        }
    }

    &__popup {
        font-family: inherit;

        .mx-btn-icon-left,
        .mx-btn-icon-right {
            height: 100%;
        }

        .mx-icon-right,
        .mx-icon-left {
            display: block;
            width: 14px;
            height: 14px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            background-image: url("data:image/svg+xml,%3Csvg width='7' height='12' viewBox='0 0 7 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.803166 5.46967C0.510273 5.76256 0.510273 6.23744 0.803166 6.53033L5.57614 11.3033C5.86903 11.5962 6.3439 11.5962 6.6368 11.3033C6.92969 11.0104 6.92969 10.5355 6.6368 10.2426L2.39416 6L6.6368 1.75736C6.92969 1.46447 6.92969 0.989593 6.6368 0.696699C6.3439 0.403806 5.86903 0.403806 5.57614 0.696699L0.803166 5.46967ZM2.3335 5.25H1.3335V6.75H2.3335V5.25Z' fill='%239DA5B1'/%3E%3C/svg%3E%0A");

            &:hover {
                background-image: url("data:image/svg+xml,%3Csvg width='7' height='12' viewBox='0 0 7 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.803166 5.46967C0.510273 5.76256 0.510273 6.23744 0.803166 6.53033L5.57614 11.3033C5.86903 11.5962 6.3439 11.5962 6.6368 11.3033C6.92969 11.0104 6.92969 10.5355 6.6368 10.2426L2.39416 6L6.6368 1.75736C6.92969 1.46447 6.92969 0.989593 6.6368 0.696699C6.3439 0.403806 5.86903 0.403806 5.57614 0.696699L0.803166 5.46967ZM2.3335 5.25H1.3335V6.75H2.3335V5.25Z' fill='%23000000'/%3E%3C/svg%3E%0A");
            }

            &:before,
            &:after {
                display: none;
            }
        }

        .mx-icon-right {
            transform: scale(-1, 1);
        }

        .mx-btn-icon-double-left,
        .mx-btn-icon-double-right {
            height: 100%;
        }

        .mx-icon-double-left,
        .mx-icon-double-right {
            display: block;
            width: 16px;
            height: 14px;
            background-size: contain;
            background-repeat: repeat-x;
            background-position: 0 center;
            background-image: url("data:image/svg+xml,%3Csvg width='7' height='12' viewBox='0 0 7 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.803166 5.46967C0.510273 5.76256 0.510273 6.23744 0.803166 6.53033L5.57614 11.3033C5.86903 11.5962 6.3439 11.5962 6.6368 11.3033C6.92969 11.0104 6.92969 10.5355 6.6368 10.2426L2.39416 6L6.6368 1.75736C6.92969 1.46447 6.92969 0.989593 6.6368 0.696699C6.3439 0.403806 5.86903 0.403806 5.57614 0.696699L0.803166 5.46967ZM2.3335 5.25H1.3335V6.75H2.3335V5.25Z' fill='%239DA5B1'/%3E%3C/svg%3E%0A");

            &:hover {
                background-image: url("data:image/svg+xml,%3Csvg width='7' height='12' viewBox='0 0 7 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.803166 5.46967C0.510273 5.76256 0.510273 6.23744 0.803166 6.53033L5.57614 11.3033C5.86903 11.5962 6.3439 11.5962 6.6368 11.3033C6.92969 11.0104 6.92969 10.5355 6.6368 10.2426L2.39416 6L6.6368 1.75736C6.92969 1.46447 6.92969 0.989593 6.6368 0.696699C6.3439 0.403806 5.86903 0.403806 5.57614 0.696699L0.803166 5.46967ZM2.3335 5.25H1.3335V6.75H2.3335V5.25Z' fill='%23000000'/%3E%3C/svg%3E%0A");
            }

            &:before,
            &:after {
                display: none;
            }
        }

        .mx-icon-double-right {
            transform: scale(-1, 1);
        }

        .cell {
            vertical-align: middle;
            position: relative;
            color: $black;
            font-size: 14px;

            &:hover {
                color: $black;
                border-radius: 50%;
                background-color: $gray-dark;

                & + .cell.hover-in-range, {
                    &:before {
                        content: '';
                        display: block;
                        width: 50%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        right: 100%;
                        z-index: -1;
                        pointer-events: none;
                        background-color: $gray-lite;
                    }
                }

            }

            &.active {
                color: $yellow;
                font-weight: 800;
                border-radius: 50%;
                background-color: $blue-lite;

                & + .cell.in-range,
                & + .cell.hover-in-range, {

                    &:before {
                        content: '';
                        display: block;
                        width: 50%;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        right: 100%;
                        z-index: -1;
                        background: $gray-dark;
                        pointer-events: none;
                    }
                }

                & + .cell.hover-in-range {

                    &:before {
                        background: $gray-lite;
                    }
                }
            }

            &.in-range,
            &.hover-in-range {
                background-color: $gray-dark;
                color: $black;

                &:hover {
                    background-color: $gray-lite;

                    &:after {
                        content: '';
                        position: absolute;
                        pointer-events: none;
                        height: 100%;
                        width: 100%;
                        background-color: $gray-dark;
                        top: 0;
                        left: 0;
                        z-index: -1;
                    }
                }

                & + .cell:hover {
                    &:before {
                        content: '';
                        display: block;
                        width: 50%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        position: absolute;
                        pointer-events: none;
                        background-color: $gray-lite;
                        z-index: -1;
                    }
                }

                & + .cell.active {

                    &:before {
                        content: '';
                        display: block;
                        width: 50%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        position: absolute;
                        pointer-events: none;
                        background-color: $gray-dark;
                        z-index: -1;
                    }
                }
            }

            &.hover-in-range {
                background-color: $gray-lite;

                & + .cell:hover,
                & + .cell.active, {
                    &:before {
                        background-color: $gray-lite;
                    }
                }
            }
        }

        .mx-calendar-header-label {
            font-size: 18px;

            .mx-btn {
                font-weight: 800;
                color: $yellow;
                font-size: inherit;
            }

            span,
            .mx-btn-current-month {
                font-weight: 800;
                color: $black;
            }

            .mx-calendar-decade-separator {
                font-weight: 400;
            }
        }

        .mx-table-month {

            .cell {

                &:hover,
                &.active {
                    border-radius: 26px;
                }
            }
        }

        .mx-table-year {

            .cell {

                &:hover,
                &.active {
                    border-radius: 26px;
                }
            }
        }

        .mx-table-date {

            thead {

                th {
                    color: $gray-dark;
                    font-weight: 800;
                    font-size: 12px;
                    vertical-align: middle;
                }
            }
        }
    }
}
</style>
