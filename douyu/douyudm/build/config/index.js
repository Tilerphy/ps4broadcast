const path = require('path')

const config = {
    entry: {
        douyudanmaku: path.resolve(__dirname, '..', 'index.js'),
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    plugins: [
                        "@babel/plugin-transform-async-to-generator",
                        "@babel/plugin-proposal-object-rest-spread",
                        "@babel/plugin-transform-exponentiation-operator",
                        "@babel/plugin-transform-parameters",
                        "@babel/plugin-transform-for-of",
                        "@babel/plugin-transform-property-literals",
                        "@babel/plugin-proposal-class-properties",
                        "babel-plugin-transform-remove-console",
                        "minify-simplify",
                        "minify-constant-folding",
                        "minify-dead-code-elimination",
                        "minify-guarded-expressions",
                        "minify-mangle-names",
                        "minify-numeric-literals",
                        "minify-type-constructors",
                    ],
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    esmodules: true
                                }
                            }
                        ]
                    ],
                },
            },
        }]
    },
    node: {
        fs: 'empty',
    },
}



module.exports = function (argv) {
    if (argv === 'dev') {
        return Object.assign({}, config, require('./dev'))
    } else {
        return Object.assign({}, config, require('./prod'))
    }
}