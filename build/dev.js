import remotedev from 'remotedev-server'
import WebpackDevServer from 'webpack-dev-server'
import ExtensionReloader from 'webpack-extension-reloader'
import webpack from 'webpack'
import config from '../webpack.config.babel'
import path from 'path'

const REDUX_REMOTE_TOOLS_PORT = 4000
const EXTENSION_RELOADER_PORT = 9090
const PORT = 3000

process.env.NODE_ENV = 'development'

for (var entryName in config.entry) {
    config.entry[entryName] = [
        'webpack-dev-server/client?http://localhost:' + PORT,
        'webpack/hot/dev-server'
    ].concat(config.entry[entryName])
}

config.mode = 'development'

config.plugins = [
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
].concat(config.plugins)

var server = new WebpackDevServer(webpack(config), {
    hot: true,
    contentBase: path.join(__dirname, '../dist'),
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    disableHostCheck: true
})

// change port to change redux remote dev tools port
remotedev({ hostname: 'localhost', port: REDUX_REMOTE_TOOLS_PORT })
server.listen(PORT)
