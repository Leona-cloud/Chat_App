const express = require("express");
const ejs = require("ejs");
const http = require("http");
const container = require("./container");
const validator = require ('express-validator');
const cookieParser = require("cookie-parser");
require('dotenv').config();
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const passport = require('passport');



container.resolve(function (users) {
  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=> console.log(`connected to chat`))
  .catch((err)=>{console.log(err)});

  const app = setupExpress();

  function setupExpress(){
    let app = express();
    const server = http.createServer(app);
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`listening on port ${port} `);
    });

     configureExpress(app);

    const router = require("express-promise-router")();
    users.setRoute(router);
    
        app.use(router);

  };

  function configureExpress(app) {
    require('./passport/passport-local');


    app.use(express.static("public"));
    app.use(cookieParser());
    app.set("view engine", "ejs");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(validator());
   
    app.use(
      session({
        secret: process.env.KEY,
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_CONNECT }),
      })
    );

    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session())
  }

 

  //setup router

});

