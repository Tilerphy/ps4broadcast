const path = require('path')

module.exports = {
    mode: 'development',
    devtool: 'source-maps',
    output: {
        path: path.resolve(__dirname, '..', '..', 'dist'),
        filename: '[name].js'
    },
}