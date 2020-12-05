const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const entry_dir = './app';

const webpackConfig = {
  mode: 'development',
  entry: {
    // ここにbuildしたいファイルを追加する
    // 書式 → ビルド後のファイル名: [`${entry_dir}/ビルドしたいファイル名`]
    emp_regist_car: [`${entry_dir}/emp_regist_car.js`],
    emp_car:[`${entry_dir}/emp_car.js`],
    user_car:[`${entry_dir}/user_car.js`],
    test: [`${entry_dir}/test.js`],
  },
  output: {
    path: path.join(__dirname, 'public/js'),
    publicPath: '/js/',
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
        options: {
          loaders: {
            // <style lang="scss">
            // vue-style-loaderではcssが反映されなかった
            scss: 'style-loader!css-loader!sass-loader',
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    port: 9000,
    host: '0.0.0.0',
  },
  plugins: [new VueLoaderPlugin()],
};

module.exports = webpackConfig;