function o(pattern, action) {
  action = action || "$1";
  if(action.indexOf('create') != -1) {
     action = addTrackingData(action);
  }
  action = "$$ = " + action;
  return [pattern, action];
}

function addTrackingData(action) {
  var action = 'function() { var node = ' + action + ";";
  return action + "node['track'] = @1; return node; }();"
}

module.exports = {
  Program: [
    ["SourceElements", "return yy.createProgram($1);"],
    ["SourceElements T", "return yy.createProgram($1);"]
  ],
  SourceElements: [
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
    o('ExpressionStatement')
  ],
  FunctionDeclaration: [
    o(
      "DEF Identifier ( Params ) = ExpressionStatement",
      "yy.createFunctionDeclaration($2, $4, yy.createBlockStatement([$7]))"
    ),
    o('DEF Identifier ( Params ) BlockStatement', 'yy.createFunctionDeclaration($2, $4, $6)'),
    o('DEF Identifier ( Params ) T BlockStatement', 'yy.createFunctionDeclaration($2, $4, $7)')
  ],
  Params: [
    o('', '[]'),
    o('Identifier', '[$1]'),
    ['Params , Identifier', '$1.push($3)']
  ],
  InspectStatement: [
    o("INSPECT", "yy.createInspectStatement()")
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
    o("GroupExpression"),
    o("CallExpression"),
    o("Identifier"),
    o("Literal")
  ],
  AssignmentExpression: [
   o("Identifier = Expression", "yy.createAssignmentExpression('=', $1, $3)")
  ],
  CallExpression: [
    o("Identifier ( Args )", "yy.createCallExpression($1, $3)")
  ],
  Args: [
    o("", "[]"),
    o("Expression", "[$1]"),
    ["Args , Expression", "$1.push($3)"]
  ],
  BinaryExpression: [
    o("Expression + Expression", "yy.createBinaryExpression('+', $1, $3)"),
    o("Expression * Expression", "yy.createBinaryExpression('*', $1, $3)")
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
