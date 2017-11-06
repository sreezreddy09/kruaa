var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry : {
        app : "./src/main.js",
        lib :["react", "react-dom"]
    },
    output : {
        path : path.resolve(__dirname, "dist"),
        filename : "[name].js",
        chunkFilename : "[name].chunk.js"
    },
    module : {
        rules : [
            {
                test: /\.js?$/,
                loader : 'babel-loader',
                exclude : [path.resolve(__dirname, "/node_modules")],
                options : {
                    presets : ['es2015', 'react']
                }
            }
        ]
    },
    plugins : [
        new HtmlWebpackPlugin({
            filename : "./index.html",
            template : __dirname + "/src/pages/index.html"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:"lib",
            filename: "lib.js",
            minChunks : function(module){
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        })
    ],
    stats : {
        // modules : false,
        // reasons :true
        chunks : true,
        chunkModules : true,
        children : false
        // excludeModules : /node_modules/
    }
}