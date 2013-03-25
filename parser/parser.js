jison = require('jison');

lexical_rules = [
  ["def", "return 'DEF';"],
  ["var", "return 'VAR';"],
  ["val", "return 'VAL';"],
  ["return", "return 'RETURN';"],
  ["inspect", "return 'INSPECT';"],
  ["[a-zA-Z]{1}[a-zA-Z0-9_]*", "return 'ID';"],
  ["[\\-|\\+]?[0-9]*\\.?[0-9]+(e[\\-|\\+]?[0-9]*\\.?[0-9]+)?", "return 'NUM';"],
  ["=>", "return '=>';"],
  ["=", "return '=';"],
  ["\\(", "return '(';"],
  ["\\)", "return ')';"],
  ["\\{", "return '{';"],
  ["\\}", "return '}';"],
  ["\\,", "return ',';"],
  ["\\*|\\/", "return 'MULTIPLICATIVE';"],
  ["\\+|\\-", "return 'ADDITIVE';"],
  ["[\\n;]+", "return 'T';"],
  ["[\\s]+", '']
]

operators = [
  ["right", "="],
  ["left", "ADDITIVE"],
  ["left", "MULTIPLICATIVE"],
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
