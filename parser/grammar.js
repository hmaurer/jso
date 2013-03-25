function o(pattern, action, options) {
  action = action || "$1";
  options = options || {};
  if(action.indexOf('create') != -1) {
     action = addTrackingData(action, options);
  }
  action = "$$ = " + action;
  return [pattern, action];
}

function addTrackingData(action, options) {
   var i = options.track || 1;
  var action = 'function() { var node = ' + action + ";";
  return action + "node['track'] = @"+i+"; return node; }();"
}

module.exports = {
  Program: [
    ["SourceElements", "return yy.createProgram($1);"],
    ["SourceElements T", "return yy.createProgram($1);"]
  ],
  SourceElements: [
    o('', '[]'),
    o('SourceElement', '[$1]'),
    ['SourceElements T SourceElement', '$1.push($3)']
  ],
  SourceElement: [
    o('Statement')
  ],
  Statement: [
    o('VariableDeclaration'),
    o('FunctionDeclaration'),
    o('InspectStatement'),
    o('ReturnStatement'),
    o('ExpressionStatement')
  ],
  FunctionDeclaration: [
    o(
      "DEF Identifier ( Params ) = ExpressionStatement",
      "yy.createFunctionDeclaration($2, $4, yy.createBlockStatement([$7]))"
    ),
    o('DEF Identifier ( Params ) = BlockStatement', 'yy.createFunctionDeclaration($2, $4, $7)')
  ],
  Params: [
    o('', '[]'),
    o('Identifier', '[$1]'),
    ['Params , Identifier', '$1.push($3)']
  ],
  InspectStatement: [
    o("INSPECT", "yy.createInspectStatement()")
  ],
  ReturnStatement: [
    o("RETURN Expression", "yy.createReturnStatement($2)")
  ],
  VariableDeclaration: [
    o("VAL VariableDeclarators", "yy.createVariableDeclaration('val', $2)"),
    o("VAR VariableDeclarators", "yy.createVariableDeclaration('var', $2)")
  ],
  VariableDeclarators: [
    o("VariableDeclarator", "[$1]"),
    ["VariableDeclarators , VariableDeclarator", "$1.push($3)"]
  ],
  VariableDeclarator: [
    o("Identifier", "yy.createVariableDeclarator($1, null)"),
    o("Identifier = Expression", "yy.createVariableDeclarator($1, $3)")
  ],
  BlockStatement: [
    o("{ SourceElements }", "yy.createBlockStatement($2)"),
    o("{ SourceElements T }", "yy.createBlockStatement($2)"),
    o("{ T SourceElements T }", "yy.createBlockStatement($3)"),
    o("{ T SourceElements }", "yy.createBlockStatement($3)")
  ],
  ExpressionStatement: [
    o("Expression", "yy.createExpressionStatement($1)")
  ],
  Expression: [
    o("AssignmentExpression"),
    o("BinaryExpression"),
    o("LambdaExpression"),
    o("GroupExpression"),
    o("CallExpression"),
    o("Identifier"),
    o("Literal")
  ],
  AssignmentExpression: [
   o("Identifier = Expression", "yy.createAssignmentExpression('=', $1, $3)")
  ],
  LambdaExpression: [
    o("( Params ) => ExpressionStatement", "yy.createLambdaExpression($2, yy.createBlockStatement([$5]))"),
    o("( Params ) => BlockStatement", "yy.createLambdaExpression($2, $5)")
  ],
  CallExpression: [
    o("Expression ( Args )", "yy.createCallExpression($1, $3)", { track: 2 })
  ],
  Args: [
    o("", "[]"),
    o("Expression", "[$1]"),
    ["Args , Expression", "$1.push($3)"]
  ],
  BinaryExpression: [
    o("Expression ADDITIVE Expression", "yy.createBinaryExpression($2, $1, $3)"),
    o("Expression MULTIPLICATIVE Expression", "yy.createBinaryExpression($2, $1, $3)")
  ],
  GroupExpression: [
    o("( Expression )", "$2")
  ],
  Identifier: [
    o("ID", "yy.createIdentifier($1)")
  ],
  Literal: [
    o("NUM", "yy.createNumericLiteral($1)")
  ]
}
