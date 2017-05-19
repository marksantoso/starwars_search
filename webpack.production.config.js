var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
    entry: [
        './src/index.js'
    ],
    output: {
        path: __dirname + '/build',
        publicPath: '/build',
        filename: 'bundle.js'
    },
    devtool: 'cheap-module-source-map',
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
        }, {
            test: /\.css$/,
            use: ['postcss-loader']
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    query: {
                        name: 'assets/[name].[ext]'
                    }
                }
            }, {
                loader: 'image-webpack-loader',
                options: {
                    progressive: true,
                    optipng: {
                        optimizationLevel: 7,
                    },
                    mozjpeg: {
                        quality: 65
                    },
                    gifsicle: {
                        interlaced: true,
                    },
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    }
                }
            }]
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        }]

    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};
