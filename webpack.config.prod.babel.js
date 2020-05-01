import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import merge from 'webpack-merge'
import config from './webpack.config.common.babel'

export default merge(config, {
    mode: 'production',
    performance: {
        maxAssetSize: 1000000
    },
    plugins: [
        new CleanWebpackPlugin()
    ].concat(config.plugins)
})
