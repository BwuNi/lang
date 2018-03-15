const path = require('path')

module.exports = {
    entry:'./entry.js',
    output:{

        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js',
        //异步加载的模块是要以文件形式加载，生成的文件名是以chunkFilename配置的
        //chunkFilename: 'chunk/chunk[id].js?[chunkhash:8]',
        chunkFilename:'chunk/[id]_[chunkhash:8].chunk.js'
    },
	devServer:{
        port:8080,
        inline:true,
    },
    devtool:"source-map",
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:'style-loader!css-loader'
            },
            {
                test:/\.js$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.worker\.js$/,
                use: [ {
                    loader: "le-worker-loader" ,
                    options: {
                      //name: '[path][name].[ext]'
                      name: 'js/[name].js'
                    }}
                    , {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test:/\.wat$/,
                use: [ {
                    loader: "le-wat-loader" ,
                    options: {
                      //name: '[path][name].[ext]'
                      name: 'wat/[name].wasm'
                    }}
                ]
            },
            {
                test:/\.scre$/,
                use: [ {
                    loader: "le-scr-loader" ,
                    options: {
                      //name: '[path][name].[ext]'
                      name: 'scr/[name].wasm'
                    }}
                ]
            }
        ]
    },
    resolve:{
        "extensions":['.js','.css']
    },
    resolveLoader:{
        modules:['node_modules','./src/loader/']
    }
}
