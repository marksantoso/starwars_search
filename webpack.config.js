module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: "source-map", // any "source-map"-like devtool is possible
    module: {
        rules: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        }, {
            exclude: /node_modules/,
            test: /\.scss$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                // translates CSS into CommonJS
                loader: "css-loader",
                options: {
                    sourceMap: true
                }
            }, {
                // compiles Sass to CSS
                loader: "sass-loader",
                options: {
                    sourceMap: true
                }

            }]
        },
        {
          test: /\.css$/,
          use: ['postcss-loader']
        },
        {
       test: /\.(jpe?g|png|gif|svg)$/i,
       loaders: [
         'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
         'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
       ]
     }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};
