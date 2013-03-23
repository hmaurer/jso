module.exports = {
  Program: [
    ["SourceElements", "return yy.createProgram($1);"],
    ["SourceElements T", "return yy.createProgram($1);"]
  ],
  SourceElements: [
    ["SourceElement", "$$ = [$1]"],
    ["SourceElements T SourceElement", "$1.push($3)"]
  ],
  SourceElement: [
    ["Statement", "$$ = $1"]
  ],
  Statement: [
    ["VariableDeclaration", "$$ = $1"],
    ["FunctionDeclaration", "$$ = $1"],
    ["InspectStatement", "$$ = $1"],
    ["ExpressionStatement", "$$ = $1;"]
  ],
  FunctionDeclaration: [
    ["DEF Identifier ( Params ) BlockStatement", "$$ = yy.createFunctionDeclaration($2, $4, $6);"],
    ["DEF Identifier ( Params ) T BlockStatement", "$$ = yy.createFunctionDeclaration($2, $4, $7);"]
  ],
  Params: [
    ["", "$$ = []"],
    ["Identifier", "$$ = [$1]"],
    ["Params , Identifier", "$1.push($3)"]
  ],
  InspectStatement: [
    ["INSPECT", "$$ = yy.createInspectStatement()"]
  ],
  VariableDeclaration: [
    ["VAL VariableDeclarators", "$$ = yy.createVariableDeclaration('val', $2)"],
    ["VAR VariableDeclarators", "$$ = yy.createVariableDeclaration('var', $2)"]
  ],
  VariableDeclarators: [
    ["VariableDeclarator", "$$ = [$1]"],
    ["VariableDeclarators , VariableDeclarator", "$1.push($3)"]
  ],
  VariableDeclarator: [
    ["Identifier", "$$ = yy.createVariableDeclarator($1, null)"],
    ["Identifier = Expression", "$$ = yy.createVariableDeclarator($1, $3)"]
  ],
  BlockStatement: [
    ["{ SourceElements }", "$$ = yy.createBlockStatement($2);"],
    ["{ SourceElements T }", "$$ = yy.createBlockStatement($2);"],
    ["{ T SourceElements T }", "$$ = yy.createBlockStatement($3);"],
    ["{ T SourceElements }", "$$ = yy.createBlockStatement($3);"]
  ],
  ExpressionStatement: [
    ["Expression", "$$ = yy.createExpressionStatement($1)"]
  ],
  Expression: [
    ["AssignmentExpression", "$$ = $1"],
    ["BinaryExpression", "$$ = $1"],
    ["UnaryExpression", "$$ = $1"],
    ["GroupExpression", "$$ = $1"],
    ["CallExpression", "$$ = $1"],
    ["Identifier", "$$ = $1"],
    ["Literal", "$$ = $1"]
  ],
  AssignmentExpression: [
    ["Identifier = Expression", "$$ = yy.createAssignmentExpression('=', $1, $3);"]
  ],
  CallExpression: [
    ["Identifier ( Args )", "$$ = yy.createCallExpression($1, $3)"]
  ],
  Args: [
    ["", "$$ = []"],
    ["Expression", "$$ = [$1]"],
    ["Args , Expression", "$1.push($3)"]
  ],
  BinaryExpression: [
    ["Expression + Expression", "$$ = yy.createBinaryExpression('+', $1, $3);"],
    ["Expression * Expression", "$$ = yy.createBinaryExpression('*', $1, $3);"]
  ],
  UnaryExpression: [
    ["- Expression", "$$ = yy.createUnaryExpression('-', $2);", { prec: 'UNARY' }]
  ],
  GroupExpression: [
    ["( Expression )", "$$ = $2"]
  ],
  Identifier: [
    ["ID", "$$ = yy.createIdentifier($1);"]
  ],
  Literal: [
    ["NUM", "$$ = yy.createNumericLiteral($1);"]
  ]
}
