const depandable = require('dependable');
const path = require('path')

const container = depandable.container();

const myDependencies = [
    ['_', 'lodash']
];

myDependencies.forEach(function(val){
    container.register(val[0], function(){
        return require(val[1]);
    })
});

container.load(path.join( __dirname, '/controllers'))

container.register('container',function(){
    return container;
});

module.exports = container;
