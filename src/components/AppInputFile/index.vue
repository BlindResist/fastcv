<template>
    <label
        :for="name"
        class="app-input-file"
    >
        <span class="app-input-file__button">{{ buttonText }}</span>
        <input
            :id="name"
            type="file"
            :name="name"
            :multiple="multiple"
            @change="change($event)"
            :accept="acceptSettings[accept]"
        />
        <span class="app-input-file__text">{{ fileText }}</span>
        <!-- <span class="app-input-file__tip"></span> -->
    </label>
</template>

<script>
export default {
    name: 'app-input-file',
    props: {
        name: {
            type: String,
            required: true
        },
        multiple: Boolean,
        accept: {
            type: String,
            default: 'image'
        },
        buttonText: {
            type: String,
            default: 'Upload photo'
        },
        emit: {
            type: String,
            default: 'blob'
        }
    },
    data () {
        return {
            file: {
                blob: '',
                name: '',
                itself: Object
            },
            text: {
                empty: '...'
            },
            acceptSettings: {
                image: '.jpg,.jpeg,.png,.bmp,image/bmp,image/png,image/x-png',
                json: 'application/json'
            }
        }
    },
    computed: {
        fileText () {
            return this.file.name.length ? this.file.name : this.text.empty
        }
    },
    methods: {
        change (event) {
            const file = event.target.files[0]

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
        }
    }
}

</script>

<style lang="scss">
.app-input-file {
    $padding: 1rem;

    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    width: 100%;
    position: relative;
    background-color: $gray-lite;
    box-shadow: inset 0 0 0 1px $blue-dark;
    user-select: none;
    cursor: pointer;

    input {
        display: none;
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
}
</style>
