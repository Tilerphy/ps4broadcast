const path = require('path')

module.exports = {
    mode: 'production',
    // devtool: 'eval',
    output: {
        path: path.resolve(__dirname, '..', '..', 'dist'),
        filename: '[name].min.js'
    },
}