'use strict'

const passport = require('passport');
const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done)=>{

    done(null, user.id)
});

passport.deserializeUser((id, done)=>{

    User.findById(id, (err, user)=>{
        done(err, user)
    })
});



passport.use('local-signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done)=>{

    User.findOne({'email': email}, (err, user)=>{
        if(err){
            return done(err)
        }
    
        if(user){
             return (done, null, req.flash('error', 'user already exists'))
        };


        let newUser = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });

   
        
    const salt =  bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(newUser.password, salt);

    
         newUser.save((err) =>{
             done(null, newUser)
         })
    });

   

  
    


}))
