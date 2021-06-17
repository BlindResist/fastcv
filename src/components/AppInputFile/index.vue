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

<script lang="ts">
import VueI18n from 'vue-i18n'
import TranslateResult = VueI18n.TranslateResult
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AppInputFile extends Vue {
    @Prop(Boolean) readonly multiple!: boolean
    @Prop([Array, String]) readonly description!: [] | string

    @Prop({
        type: String,
        required: true
    }) readonly name!: string

    @Prop({
        type: String,
        default: 'image'
    }) readonly acceptType!: string

    @Prop({
        type: Number,
        default: 1048576
    }) readonly acceptSize!: number

    @Prop({
        type: String,
        default: 'Upload photo'
    }) readonly buttonText!: string

    @Prop({
        type: String,
        default: 'blob'
    }) readonly emit!: string

    mb: number
    message: string
    error: boolean
    file!: {
        blob: string,
        name: string,
        itself?: File
    }

    text: {
        empty: string,
        error: {
            size: TranslateResult,
            format: TranslateResult
        }
    }

    acceptSettings: {
        [elem: string]: string
    }

    formats: {
        [elem: string]: string[]
    }

    constructor () {
        super()
        this.mb = 1048576
        this.message = ''
        this.error = false
        this.text = {
            empty: '...',
            error: {
                size: this.$t('error.fileSize'),
                format: this.$t('error.fileFormat')
            }
        }
        this.acceptSettings = {
            image: '.jpg,.jpeg,.png,.bmp,image/bmp,image/png,image/x-png',
            json: 'application/json'
        }
        this.formats = {
            image: ['jpg', 'jpeg', 'png', 'bmp'],
            json: ['json', 'jsonp']
        }
        this.file = {
            blob: '',
            name: ''
        }
    }

    get fileText (): string {
        return this.file && this.file.name.length ? this.file.name : this.text.empty
    }

    get fileSize (): string {
        const parse: number = this.acceptSize / this.mb
        const size: number = parseInt(parse.toFixed(2))

        return size < 1 ? `${size}Kb` : `${size}Mb`
    }

    change (event: {target: {files: File[]}}): void {
        const file = event.target.files[0]

        if (!this.validate(file)) return

        this.file.itself = file
        this.file.name = file.name
        this.file.blob = URL.createObjectURL(file)

        let data

        if (this.emit === 'blob') {
            data = this.file.blob
        } else if (this.emit === 'file') {
            data = this.file.itself
        } else {
            data = this.file
        }

        this.$emit('input', data)
    }

    validate (file: File): void | boolean {
        if (this.checkFormat(file.name)) {
            this.error = false
        } else {
            this.error = true
            this.message = this.text.error.format
            return false
        }

        if (this.checkSize(file.size)) {
            this.error = false
        } else {
            this.error = true
            this.message = this.text.error.size
            return false
        }

        return true
    }

    checkSize (fileSize: number): boolean {
        return fileSize <= this.acceptSize
    }

    checkFormat (fileName: string): boolean {
        const regexp = /(?:\.([^.]+))?$/
        const name: string = fileName.toLowerCase()
        const extension = regexp.exec(name)
        const types: string[] = this.formats[this.acceptType]

        return extension !== null ? types.includes(extension[1] as unknown as string) : false
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
