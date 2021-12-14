'use strict'

module.exports = function( _, passport ){
    
    return {
        setRoute: function(router){
            router.get('/', this.startPage);
            router.get('/signup', this.getsignUp);

            router.get('/home', this.homePage)

            router.post('/signup', this.postsignUp)
        },

        startPage: function(req, res){
            return res.render('start', {start: "This is the start page"})
        },

        getsignUp: function(req, res){
            return res.render('signup')
        },
         postsignUp: passport.authenticate('local-signup', {
             successRedirect: '/home',
             failureRedirect: '/signup',
             failureFlash: true
         }),

         homePage: function(req, res){
             return res.render('home')
         }
    }

}
