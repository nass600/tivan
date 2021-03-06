import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

export default {
    entry: {
        background: path.resolve(__dirname, 'src/chrome/background/index.ts'),
        content: path.resolve(__dirname, 'src/chrome/content/index.tsx'),
        popup: path.resolve(__dirname, 'src/chrome/popup/index.tsx'),
        options: path.resolve(__dirname, 'src/chrome/options/index.tsx')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.png$/,
                loader: 'file-loader?name=[name].[ext]',
                exclude: /node_modules/
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.tsx', '.ts'],
        alias: {
            '@store': path.resolve(__dirname, 'src/store'),
            '@actions': path.resolve(__dirname, 'src/store/actions'),
            '@reducers': path.resolve(__dirname, 'src/store/reducers'),
            '@selectors': path.resolve(__dirname, 'src/store/selectors'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@containers': path.resolve(__dirname, 'src/containers'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@api': path.resolve(__dirname, 'src/api'),
            '@sdk': path.resolve(__dirname, 'src/sdk'),
            '@types': path.resolve(__dirname, 'src/types'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@styles': path.resolve(__dirname, 'src/assets/styles')
        }
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/chrome/popup/index.html'),
            filename: 'popup.html',
            chunks: ['popup']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/chrome/options/index.html'),
            filename: 'options.html',
            chunks: ['options']
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'src/chrome/manifest.json'),
                transform: function (content) {
                    return Buffer.from(
                        JSON.stringify({
                            description: process.env.npm_package_description,
                            version: process.env.npm_package_version,
                            ...JSON.parse(content.toString())
                        })
                    )
                }
            },
            {
                from: path.resolve(__dirname, 'src/assets/img')
            }
        ])
    ],
    stats: {
        children: false,
        modules: false,
        colors: true
    }
}
