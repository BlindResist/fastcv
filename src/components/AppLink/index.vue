<template>
    <a
        :href="link"
        :class="classObject"
        @click="click($event)"
        :target="blank ? '_blank' : false"
    ><slot /></a>
</template>

<script>
export default {
    name: 'app-link',
    props: {
        link: {
            type: String,
            default: '#'
        },
        hover: {
            type: String,
            default: 'yellow'
        },
        blank: Boolean,
        prevent: Boolean,
        underline: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        classObject () {
            return [
                'app-link',
                `app-link--hover-${this.hover}`,
                {
                    'app-link--underline': this.underline
                }
            ]
        }
    },
    methods: {
        click (e) {
            if (this.prevent) e.preventDefault()

            this.$emit('click')
        }
    }
}
</script>

<style lang="scss">
.app-link {
    color: $black;
    transition: color $transition;

    &:visited,
    &:focus,
    &:active {
        outline: none;
        outline: 0 none;
    }

    &--hover {

        &-yellow {

            &:hover {
                color: $yellow-dark;
            }
        }

        &-no {

            &:hover {
                color: $black;
            }
        }
    }

    &--underline {
        text-decoration: underline;
    }
}
</style>
