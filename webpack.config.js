var webpack = require("webpack");
var path = require("path");

module.exports = {

  entry: { 
  	app: './src/app.js'
  },

  output: {
    filename: 'public/build/bundle.js'
  },

  devtool: "#source-map",
  module: {
  	loaders: [
  		test: /\.jsx?$/,
  		exclude: /(node_modules)/,
  		loader: "babel",
  		query: {
  			presets: ["react", "es2015"]
  		}
  	]
  }
}


//  This will go in to the package.json file
////"start": "webpack --config mywebpack.config.js"