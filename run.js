var sugar = require('sugar');

var parser = require('./parser/parser.js');
var Context = require('./runtime/context');

var fs = require('fs');
input = fs.readFileSync('/dev/stdin').toString();

ast = parser.parse(input);

console.log(JSON.stringify(ast, null, 2));

var context = new Context();
context.visit(ast);

