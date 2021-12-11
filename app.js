const express = require('express');
const ejs = require('ejs');
const http = require('http');
const container = require('./container');


container.resolve(function(users){

    const app = setupExpress();

    function setupExpress(){

        const app = express();
        const server = http.createServer(app);
        server.listen(3000, ()=>{
            console.log('listening on port 3000')
        });

        configureExpress(app);

            //setup router
        const router = require('express-promise-router')();
        users.setRoute(router);

        app.use(router);
    }



    function configureExpress(app){
        app.use(express.static('public'));
        app.set('view engine', 'ejs');
        app.use(express.json());
        app.use(express.urlencoded({extended: true}))
    }

});
