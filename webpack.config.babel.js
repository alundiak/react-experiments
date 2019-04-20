import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PrettierPlugin from 'prettier-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';

const src = resolve(__dirname, './src');
const reactSumSrc = resolve(__dirname, 'node_modules/@lundiak/react-sum/src');

export default env => {
    const { ifNotProduction } = getIfUtils(env);
    return {
        // "core-js/modules/es6.promise", ?
        // "core-js/modules/es6.array.iterator", ?
        entry: {
            experimentsChunk: './src/index.jsx'
        },
        // entry: { // TRY
        //     'babel-polyfil',
        //     './src/index.jsx'
        // },
        output: {
            path: __dirname + '/dist',
            publicPath: env.dev ? '/' : './',
            filename: 'reactExperiments.js'
        },
        resolve: {
            alias: {
                myCss: resolve(src, './css'), // my current codebase css/ folder
                css: resolve(reactSumSrc, 'css'), // to experiment with relative path from dependant component and webpack alias
                components: resolve(src, './components'),
                img: resolve(src, './images'),
                // Alternative, when default imported code is not OK (or not working)
                reactMath: resolve(__dirname, 'node_modules/@lundiak/react-sum/src/components')
            },

            // Standard: 'main', 'browser', 'module' (not sure if it's Webpack or npm )
            // Non-standard, and requires explicit mention in array: 'jsnext:main', 'esm'
            mainFields: ['module', 'esm', 'jsnext:main', 'main', 'browser'],

            modules: ['node_modules', 'bower_components', 'src'],
            extensions: ['.js', '.css', '.less', '.jsx', '.json']
        },
        module: {
            rules: [
                {
                    // research more "pre-made rules"
                    // https://medium.freecodecamp.org/how-to-set-up-deploy-your-react-app-from-scratch-using-webpack-and-babel-a669891033d4
                    enforce: 'pre',
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'eslint-loader',
                },
                {
                    test: /\.(js|jsx)$/,

                    // If you need to import JSX file directly from node_modules, u need to comment this line
                    // exclude: /node_modules/,

                    use: {
                        loader: 'babel-loader'
                        // rootMode: 'upward' // not valid
                    }
                },
                {
                    test: /\.css$/,
                    loader: 'css-loader'
                },
                {
                    test: /\.less$/,
                    use: removeEmpty([
                        ifNotProduction('css-hot-loader'),
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'less-loader',
                            options: {
                                relativeUrls: false
                            }
                        }
                    ])
                },
                {
                    test: /\.(png|svg|jpg|gif|pdf)$/,
                    use: [
                        'file-loader'
                    ]
                }
            ]
        },
        plugins: removeEmpty([
            ifNotProduction(new webpack.HotModuleReplacementPlugin()),
            new MiniCssExtractPlugin({
                filename: 'css/reactExperiments.css', // "filename" here is not related to real file name(s) in src/css/ folder.
                // chunkFilename: 'reactExperiments' // ???
            }),
            new HtmlWebpackPlugin({
                title: 'React Experiments', // not used. But if needed , then in index.html => `<title><%= htmlWebpackPlugin.options.title %></title>`
                filename: 'index.html',
                template: './src/index.html',
                minify: {
                    html5: true,
                    removeComments: true,
                    useShortDoctype: true, // this generates <!doctypehtml>
                    removeTagWhitespace: true,
                    removeStyleLinkTypeAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeRedundantAttributes: true,
                    processConditionalComments: true,
                    minifyCSS: true,
                    minifyJS: true,
                    keepClosingSlash: true,
                    collapseWhitespace: true
                },
                hash: true
            }),
            new PrettierPlugin({
                printWidth: 80,               // Specify the length of line that the printer will wrap on.
                tabWidth: 2,                  // Specify the number of spaces per indentation-level.
                useTabs: false,               // Indent lines with tabs instead of spaces.
                semi: true,                   // Print semicolons at the ends of statements.
                encoding: 'utf-8',            // Which encoding scheme to use on files
                extensions: [ ".less" ]       // Which file extensions to process
              })
        ]),
        devServer: {
            host: 'localhost',
            port: 3000,
            hot: true,
            // contentBase: './dist' // ???
        },
        devtool: 'source-map'
    }
};
