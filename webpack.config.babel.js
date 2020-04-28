import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import WriteFilePlugin from 'write-file-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

export default {
    devtool: 'inline-source-map',
    entry: {
        background: path.resolve(__dirname, 'src/background/index.ts'),
        content: path.resolve(__dirname, 'src/content/index.tsx'),
        popup: path.resolve(__dirname, 'src/popup/index.tsx'),
        options: path.resolve(__dirname, 'src/options/index.tsx')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader',
                exclude: /node_modules/
            },
            {
                test: /\.png$/,
                loader: 'file-loader?name=[name].[ext]',
                exclude: /node_modules/
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
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.tsx', '.ts'],
        alias: {
            '@actions': path.resolve(__dirname, 'src/background/store/actions'),
            // '@api': path.resolve(__dirname, 'src/background/api'),
            '@content': path.resolve(__dirname, 'src/content'),
            '@popup': path.resolve(__dirname, 'src/popup')
            // '@constants': path.resolve(__dirname, 'src/constants'),
            // '@components': path.resolve(__dirname, 'src/components')
        }
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/popup/index.html'),
            filename: 'popup.html',
            chunks: ['popup']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/options/index.html'),
            filename: 'options.html',
            chunks: ['options']
        }),
        new CopyWebpackPlugin([
            {
                from: 'manifest.json',
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
                from: path.resolve(__dirname, 'src/content/img')
            }
        ]),
        new WriteFilePlugin({
            test: /^(?!.*(hot)).*/
        })
    ],
    stats: {
        children: false,
        colors: true
    }
}
