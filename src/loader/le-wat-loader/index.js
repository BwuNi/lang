const
    path = require('path'),
    loaderUtils = require('loader-utils'),
    validateOptions = require('schema-utils'),
    cp = require('child_process'),
    os = require('os'),
    fs = require('fs')

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
        $option = this._compilation.compiler.options,
        _this = this,
        callback = this.async()


    let
        url = loaderUtils.interpolateName(this, options.name, {
            context,
            source,
            regExp: options.regExp,
        }),
        outputPath = url

    if ($option.output && $option.output.publicPath) {
        outputPath = path.posix.join($option.output.publicPath, url)
    }

    //临时文件路径
    const
        temp_wat_path = path.resolve(os.tmpdir(), path.basename(this.resource)),
        temp_wasm_path = path.resolve(os.tmpdir(), path.basename(url))

    createTempFile(temp_wat_path, source)
        .then(() => compileTempFile(temp_wat_path, temp_wasm_path))
        .then(() => readTempFile(temp_wasm_path))
        .then(res => {
            _this.emitFile(url, res)
            callback('', `module.exports = '${outputPath}'`)
            return deleteTempFiles[temp_wat_path, temp_wasm_path]
        })
        .catch(err => {
            if (err)
                throw err
            else
                throw 'wat compile error'
        })
}



function createTempFile(url, source) {
    return new Promise((res, rej) => {
        fs.writeFile(url, source, function (err) {
            if (err) rej()
            else res()
        })
    })
}

function compileTempFile(wat, wasm) {
    return new Promise((res, rej) => {
        cp.spawn(`wat2wasm`, [wat, '-o', wasm])
            .on('close', code => {
                if (code)
                    rej()
                else
                    res()
            })
    })
}

function readTempFile(url) {
    return new Promise((res, rej) => {
        let
            chunks = [],
            size = 0
        const
            stream = fs.createReadStream(url)

        stream.on('data', chunk => {
            chunks.push(chunk)
            size += chunk.length
        })
        stream.on('end', () => {
            const buf = Buffer.concat(chunks, size)
            res(buf)
        })
    })
}

function deleteTempFile(url) {
    return new Promise((res, rej) => {
        fs.unlink(url, (err) => {
            if (err)
                rej(err)
            else {
                res()
            }
        })
    })
}

function deleteTempFiles(pathArr) {
    return Promise.all(
        pathArr.map(
            path => deleteTempFile(path)
        )
    )
}
