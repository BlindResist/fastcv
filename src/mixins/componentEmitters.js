export default type => {
    return {
        watch: {
            innerData: {
                deep: true,
                handler (data) {
                    this.$emit('input', {
                        ...data,
                        type: type
                    })
                }
            }
        }
    }
}
