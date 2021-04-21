<template>
    <label
        :for="name"
        class="app-input-file"
    >
        <span class="app-input-file__button">Upload photo</span>
        <input
            :id="name"
            type="file"
            :name="name"
            @change="change($event)"
        />
        <span class="app-input-file__text">{{ file.name.length ? file.name : text.empty }}</span>
    </label>
</template>

<script>
export default {
    name: 'app-input-file',
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            file: {
                blob: '',
                name: ''
            },
            text: {
                empty: '...'
            }
        }
    },
    methods: {
        change (event) {
            const file = event.target.files[0]

            this.file.name = file.name
            this.file.blob = URL.createObjectURL(file)

            this.$emit('input', this.file.blob)
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
