jison = require('jison');

lexical_rules = [
  ["def", "return 'DEF';"],
  ["var", "return 'VAR';"],
  ["val", "return 'VAL';"],
  ["inspect", "return 'INSPECT';"],
  ["[a-z]+", "return 'ID';"],
  ["[0-9]+", "return 'NUM';"],
  ["=>", "return '=>';"],
  ["=", "return '=';"],
  ["\\(", "return '(';"],
  ["\\)", "return ')';"],
  ["\\{", "return '{';"],
  ["\\}", "return '}';"],
  ["\\,", "return ',';"],
  ["\\*", "return '*';"],
  ["\\+", "return '+';"],
  ["\\-", "return '-';"],
  ["[\\n;]+", "return 'T';"],
  ["[\\s]+", '']
]

operators = [
  ["right", "="],
  ["left", "+"],
  ["left", "*"],
  ["right", "UNARY"]
]


parser = new jison.Parser({
  lex: { rules: lexical_rules },
  bnf: require('./grammar'),
  startSymbol: 'Program',
  operators: operators
})

parser.yy = require('./ast');

module.exports = parser;
