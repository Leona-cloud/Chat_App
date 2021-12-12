const express = require("express");
const ejs = require("ejs");
const http = require("http");
const container = require("./container");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const passport = require('passport')


container.resolve(function (users) {
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://localhost/notes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=> console.log(`connected to `))
  .catch((err)=>{console.log(err)});

  const app = setupExpress();

  function setupExpress() {
    const app = express();
    const server = http.createServer(app);
    server.listen(3000, () => {
      console.log("listening on port 3000");
    });

    configureExpress(app);

    //setup router
    const router = require("express-promise-router")();
    users.setRoute(router);

    app.use(router);
  }

  function configureExpress(app) {
    app.use(express.static("public"));
    app.use(cookieParser());
    app.set("view engine", "ejs");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

   
    app.use(
      session({
        secret: "mySecretKey",
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: mongoose.connection}),
      })
    );

    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session())
  }
});

