const path = require('path')
const loaderUtils = require('loader-utils')
const validateOptions = require('schema-utils')

const option_type = {
    "type": "object",
    "properties": {
        "name": {}
    },
    "additionalProperties": true
}

module.exports = function (source) {
    if (!this.emitFile) throw new Error('File Loader\n\nemitFile is required from module system')
    const
        options = loaderUtils.getOptions(this) || {},
        context = options.context || this.rootContext || this.options && this.options.context,
        $option = this.options



    let url = loaderUtils.interpolateName(this, options.name, {
        context,
        source,
        regExp: options.regExp,
    }),
        outputPath = url


    if ($option.output && $option.output.publicPath)
        outputPath = path.posix.join($option.output.publicPath, url)


    this.emitFile(url, source)

    return `module.exports = function(){return (new Worker('${outputPath}'))}`
}
