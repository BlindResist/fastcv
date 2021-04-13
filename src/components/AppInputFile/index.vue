<template>
    <label
        :for="name"
        class="app-input-file"
    >
        <input
            :id="name"
            type="file"
            :name="name"
            @change="change($event)"
        />
        <span class="app-input-file__name">{{ file.name }}</span>
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
                error: 'Required field',
                emailError: 'Invalid email format'
            }
        }
    },
    methods: {
        change (event) {
            const file = event.target.files[0]

            console.log(file)
            this.file.name = file.name
            this.file.blob = URL.createObjectURL(file)

            this.$emit('input', this.file.blob)
        }
    }
}

</script>

<style lang="scss">
.app-input-file {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    width: 100%;
    height: 40px;
    position: relative;
    background-color: #000;

    input {
        display: none;
    }
}
</style>
