import ExtensionReloader from 'webpack-extension-reloader'
import path from 'path'
import webpack from 'webpack'
import remotedev from 'remotedev-server'
import config from './webpack.config.common.babel'
import merge from 'webpack-merge'

const REDUX_REMOTE_TOOLS_PORT = 4000
const EXTENSION_RELOADER_PORT = 9090
const PORT = 3000

// change port to change redux remote dev tools port
remotedev({ hostname: 'localhost', port: REDUX_REMOTE_TOOLS_PORT })

for (const entryName in config.entry) {
    config.entry[entryName] = [
        'webpack-dev-server/client?http://localhost:' + PORT,
        'webpack/hot/dev-server'
    ].concat(config.entry[entryName])
}

export default merge(config, {
    watch: true,
    devtool: 'inline-source-map',
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ExtensionReloader({
            port: EXTENSION_RELOADER_PORT,
            reloadPage: true,
            entries: {
                contentScript: 'content',
                background: 'background',
                popup: 'popup',
                options: 'options'
            }
        })
    ].concat(config.plugins),
    devServer: {
        port: PORT,
        hot: true,
        contentBase: path.join(__dirname, '../dist'),
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        disableHostCheck: true
    }
})
