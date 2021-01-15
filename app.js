const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const expressSession = require('express-session');

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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: true, credentials: true }));
app.use(expressSession({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxage: 1000 * 60 * 30
  }
}));

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

// 認証
const LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});
const Users = require('./models/t01_users').users;
const Employees = require('./models/t04_Employees').employees;
const con = require('./models/mongoose-loader');

passport.use(
  'emp_login',
  new LocalStrategy(
    {
      usernameField: 'name',
      passwordField: 'password'
    },
    function (name, password, done) {
      const db = con.mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function () {
        // we're connected!
        console.log('DB接続中... You can cancel from ctrl + c');
      });

      Employees.find({ name: name, password: password })
        .then(function (result) {
          log(result);
          return done(null, result);
        }).catch(function (err) {
          console.log(err);
          return done(null, err);
        });
    }
  )
);

passport.use(
  'user_login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      const db = con.mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error:'));
      db.once('open', function () {
        // we're connected!
        console.log('DB接続中... You can cancel from ctrl + c');
      });

      Users.find({ email: email, password: password })
        .then(function (result) {
          console.log('user login result' + result);
          return done(null, result);
        }).catch(function (err) {
          console.log(err);
          return done(null, err);
        });
    }
  )
);


// ルーターの設定
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/emp', empRouter);
app.use('/test', testRouter);

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
  // if (res.handerSent) return;

  // res.status(err.name === 'AuthenticationError' ? 401 : 500);

});

module.exports = app;
