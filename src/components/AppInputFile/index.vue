<template>
    <div class="app-input-file">
        <span
            v-if="description"
            class="app-input-file__desc"
        >{{ description[0] }}: {{ formats[acceptType].join(', ') }}<br>{{ description[1] }}: {{ fileSize }}</span>
        <label
            :for="name"
            class="app-input-file__inner"
        >
            <span class="app-input-file__button">{{ buttonText }}</span>
            <input
                :id="name"
                type="file"
                :name="name"
                :multiple="multiple"
                @change="change($event)"
                :accept="acceptSettings[acceptType]"
            />
            <span class="app-input-file__text">{{ fileText }}</span>
            <span
                v-if="error"
                class="app-input-file__error"
            >{{ message }}</span>
        </label>
    </div>
</template>

<script>
export default {
    name: 'app-input-file',
    props: {
        multiple: Boolean,
        name: {
            type: String,
            required: true
        },
        acceptType: {
            type: String,
            default: 'image'
        },
        acceptSize: {
            type: Number,
            default: 1048576
        },
        buttonText: {
            type: String,
            default: 'Upload photo'
        },
        emit: {
            type: String,
            default: 'blob'
        },
        description: {
            type: [Array, String]
        }
    },
    data () {
        return {
            mb: 1048576,
            message: '',
            error: false,
            file: {
                blob: '',
                name: '',
                itself: Object
            },
            text: {
                empty: '...',
                error: {
                    size: this.$t('error.fileSize'),
                    format: this.$t('error.fileFormat')
                }
            },
            acceptSettings: {
                image: '.jpg,.jpeg,.png,.bmp,image/bmp,image/png,image/x-png',
                json: 'application/json'
            },
            formats: {
                image: ['jpg', 'jpeg', 'png', 'bmp'],
                json: ['json', 'jsonp']
            }
        }
    },
    computed: {
        fileText () {
            return this.file.name.length ? this.file.name : this.text.empty
        },
        fileSize () {
            const size = parseFloat(this.acceptSize / this.mb).toFixed(2)

            return size < 1 ? `${size}Kb` : `${size}Mb`
        }
    },
    methods: {
        change (event) {
            const file = event.target.files[0]

            if (!this.validate(file)) return

            this.file.itself = file
            this.file.name = file.name
            this.file.blob = URL.createObjectURL(file)

            let data = this.file

            if (this.emit === 'blob') {
                data = this.file.blob
            } else if (this.emit === 'file') {
                data = this.file.itself
            }

            this.$emit('input', data)
        },
        validate (file) {
            if (this.checkFormat(file)) {
                this.error = false
            } else {
                this.error = true
                this.message = this.text.error.format
                return false
            }

            if (this.checkSize(file)) {
                this.error = false
            } else {
                this.error = true
                this.message = this.text.error.size
                return false
            }

            return true
        },
        checkSize (file) {
            return file.size <= this.acceptSize
        },
        checkFormat (file) {
            const regex = /(?:\.([^.]+))?$/
            const extension = regex.exec(file.name.toLowerCase())[1]

            return this.formats[this.acceptType].includes(extension)
        }
    }
}

</script>

<style lang="scss">
.app-input-file {
    $padding: 1rem;

    input {
        display: none;
    }

    &__inner {
        display: flex;
        align-items: center;
        flex-flow: row nowrap;
        width: 100%;
        position: relative;
        background-color: $gray-lite;
        box-shadow: inset 0 0 0 1px $blue-dark;
        user-select: none;
        cursor: pointer;
    }

    &__button {
        padding: $padding;
        color: $white;
        white-space: nowrap;
        background-color: $blue-dark;
    }

    &__text {
        max-width: 100%;
        overflow: hidden;
        padding: $padding;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: rgba($blue-dark, .5);
        pointer-events: none;
    }

    &__error {
        display: block;
        position: absolute;
        top: calc(100% + .25rem);
        left: 0;
        z-index: 1;
        font-size: .75rem;
        color: $red;
    }

    &__desc {
        display: block;
        margin-bottom: .75rem;
        font-size: .75rem;
        line-height: 1.5;
    }
}
</style>
