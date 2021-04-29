import { resolve } from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import PrettierPlugin from 'prettier-webpack-plugin';
import { getIfUtils, removeEmpty } from 'webpack-config-utils';

const src = resolve(__dirname, './src');
const reactSumSrc = resolve(__dirname, 'node_modules/@lundiak/react-sum/src');

export default env => {
    const { ifDev } = getIfUtils(env);
    return {
        // target: 'web', // <=== can be omitted as default is 'web'

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
                // img: resolve(src, './images'), // not used in this repo.
                // Alternative, when default imported code is not OK (or not working)
                reactMath: resolve(__dirname, 'node_modules/@lundiak/react-sum/src/components')
            },

            // https://webpack.js.org/configuration/resolve/#resolvemainfields
            //
            // if ("target" === "webworker" | "web" | undefined):
            // 'browser', 'module', 'main'
            // VERIFIED WORKS. BUT ReactDevTool issue with displayName !!! Look in ReactDevTool.
            //
            // if ("target" === any other target, including node):
            // 'module', 'main'
            // VERIFIED, DOESN'T WORK. Error: "ReferenceError: require is not defined"
            //
            // not sure it/s correct.
            // Based on my personal experiments, when no "target" specified in neither "react-sum" nor "react-experiments":
            // 'main', 'browser', 'module'
            // not sure it/s correct.
            //
            // Non-standard npm fields require explicit mention in array: 'jsnext:main', 'esm'
            //
            // So my sequence (I wanted to force using "module" for ES6/JSX imports. But...):
            //
            mainFields: ['module', 'esm', 'jsnext:main', 'main', 'browser'],
            // VERIFIED WORKS. And look in ReactDevTool, where also all works better now.
            //
            // Important what is in package.json of provider components (fields: browser, module, main)

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
                    exclude: [
                        /node_modules/, // when used npm link, in fact folder node_modules/@lundiak/react-sum is NOT in real node_modules.
                        /\@lundiak\/react\-sum\/dist/ // adding explicit ignore regexp help to avoid ESLINT warnings.
                    ],
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
                    // No css files in this repo,
                    // but it is required to load css files from dependant modules in node_modules
                    // like with-alias.css or SumWithCssAlias.jsx file.
                    test: /\.css$/,
                    use: removeEmpty([
                        ifDev('css-hot-loader'),
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ])
                },
                {
                    test: /\.less$/,
                    use: removeEmpty([
                        ifDev('css-hot-loader'),
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
                    use: {
                        loader: 'url-loader',
                        options: {
                            fallback: 'file-loader',
                            name: ifDev('[name].[ext]', '[hash].[ext]'),
                            outputPath: 'images',
                            publicPath: ifDev('/images', './images'),
                        }
                    }
                }
            ]
        },
        plugins: removeEmpty([
            ifDev(new webpack.HotModuleReplacementPlugin()),
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
                extensions: [".less"]       // Which file extensions to process
            })
        ]),
        devServer: {
            host: 'localhost',
            port: 3000,
            hot: ifDev(true, false),
            // contentBase: './dist' // ???
            // watchContentBase: true, // full page reload
            // https://webpack.js.org/configuration/dev-server/#devserverwatchcontentbase
        },
        devtool: 'source-map'
    }
};
