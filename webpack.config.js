"usestrict";
const webpack = require('webpack'),
    path = require("path"),
    glob = require("glob"),
    //  _ = require("lodash"),
    HtmlWebpackPlugin = require('html-webpack-plugin');

let    fileList = glob.sync("test/*.html");
let outputPath ="build";
//获取可以把pulgins 构建成一个class
let plugins = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'template/_layout.ejs',
        favicon: "template/favicon.ico",
        inject: 'head',
        title: "DUST",
        data: fileList.map(function(filePath){
            return  path.parse(filePath).name;
        })
    })
];
function addHTMLPlugin(plugins) {
   /**
     * 
     * var myFilePath = '/someDir/someFile.json';
     * path.parse(myFilePath).base
     * // "someFile.json"
     * path.parse(myFilePath).name
     * // "someFile"
     * path.parse(myFilePath).ext
     * // ".json"
     *'/someDir/someFile.json'
     *  @desc  纪念历史
     *   // fileRegexp = /([\w\W]+)\.(\w+)$/;
     *   fileList =  fs.readdirSync(path.join(__dirname, 'test'));
     */
    fileList.forEach(function (filePath) {
        plugins.push(
            new HtmlWebpackPlugin({
                filename: path.parse(filePath).base,
                template: filePath,
                favicon: "template/favicon.ico",
                inject: 'head',
                title: path.parse(filePath).name
            })
        )
    });
}
addHTMLPlugin(plugins);

module.exports = {
    entry: {
        dust: './src'
    },
    output: {
        path: path.resolve(__dirname, outputPath),
        filename: "[name].js",
    },

    module: {
        rules: [

            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.(art|ejs)$/,
                loader: "art-template-loader",
                options: {
                    // compileDebug: true
                }
            }
        ]

    },
    context: __dirname,
    devtool: "source-map",
    target: "web",
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        modules: [
            "Tools",
            "node_modules"
        ],
        // directories where to look for modules
        extensions: [".js", ".jsx", ".json", ".less"],
    },
    plugins: plugins,
    externals: {
        'react': ' window.React',
        'react-dom': ' window.ReactDOM',
    },
    devServer: {
        contentBase: path.join(__dirname, outputPath),
        compress: true,
        port: 9000
    }
};
//
/**
 * HtmlWebpackPluginOption
 * 
 */
function HTMLPluginOption(options) {

    let baseOptions = {
        filename: 'index.html',
        template: 'template/_layout.ejs',
        favicon: "template/favicon.ico",
        inject: 'head',
        title: "DUST"
    };

    Object.assign(this, baseOptions, options);

}
