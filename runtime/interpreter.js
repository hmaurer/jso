var mediator = require('mediator');

var Context = require('./context');

function run(ast) {
   mediator.context = new Context();
   var scope = mediator.context.spawnScope();
   var result = mediator.context.visit(ast, scope);
   console.log('Result: ' + result);
}

module.exports = run;
