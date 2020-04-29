import ZipPlugin from 'zip-webpack-plugin'
import path from 'path'
import merge from 'webpack-merge'
import config from './webpack.config.common.babel'
import app from './package.json'

export default merge(config, {
    mode: 'production',
    plugins: [
        new ZipPlugin({
            path: path.resolve(__dirname, 'build'),
            filename: `${app.name}.zip`
        })
    ].concat(config.plugins)
})
