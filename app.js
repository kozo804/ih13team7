const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const testRouter = require('./routes/test');
const empRouter = require('./routes/emp');

const app = express();

// テンプレートエンジンの設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// expressの設定
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: true, credentials: true }));

// ホットリロード用
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  for (let file in webpackConfig.entry) {
    let filePath = webpackConfig.entry[file];
    filePath.unshift('webpack-hot-middleware/client?reload=true&timeout=1000');
  }
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, { publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// ルーターの設定
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/test', testRouter);
app.use('/emp', empRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
