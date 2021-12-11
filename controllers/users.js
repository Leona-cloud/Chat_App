'use strict'

module.exports = function( _ ){
    
    return {
        setRoute: function(router){
            router.get('/', this.startPage)
        },

        startPage: function(req, res){
            return res.render('start', {start: "This is the start page"})
        }
    }

}
