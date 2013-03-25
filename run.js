var sugar = require('sugar');

var parser = require('./parser/parser');
var run = require('./runtime/interpreter');

var fs = require('fs');
input = fs.readFileSync('/dev/stdin').toString();

ast = parser.parse(input);

console.log(JSON.stringify(ast, function(key, value) {
  if(key == 'track')
  {
    return undefined;
  }
  else
  {
    return value;
  }
}, 2));

run(ast);
