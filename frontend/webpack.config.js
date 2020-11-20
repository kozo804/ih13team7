const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const entry_dir = './app';

module.exports = {
  mode: 'development',
  entry: {
    emp_regist_car: `${entry_dir}/emp_regist_car.js`,
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].js'
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      // vue-template-compilerに読ませてコンパイルするために必要
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  plugins: [new VueLoaderPlugin()],
};