export default type => {
    return {
        watch: {
            innerData: {
                deep: true,
                handler (data) {
                    this.$emit('input', {
                        ...data,
                        id: `${type}-${this.id}`
                    })
                }
            }
        },
        methods: {
            remove () {
                this.$emit('remove', {
                    type: type,
                    id: `${type}-${this.id}`
                })
            }
        }
    }
}
