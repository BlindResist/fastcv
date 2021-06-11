module.exports = {
    lintOnSave: false,
    css: {
        requireModuleExtension: false,
        loaderOptions: {
            sass: {
                prependData: '@import "~@/assets/styles/common.scss";'
            }
        }
    }
}
