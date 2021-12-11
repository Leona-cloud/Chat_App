const depandable = require('dependable');
const path = require('path')

const container = depandable.container();

const myDependencies = [
    ['_', 'lodash']
];

myDependencies.forEach((val)=>{
    container.register(val[0], ()=>{
        return require(val[1])
    })
});

container.load(path.join( __dirname, '/controllers'))

container.register('container',()=>{
    return container;
});

module.exports = container;
