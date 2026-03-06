---
id: type-nodes
title: AST 类型节点
sidebar_position: 6
---

# AST 类型节点

本页列出 `TypeNode` 层级下所有与**类型表示**相关的 AST 节点接口。

---

## TypeNode — 基础

```ts
interface TypeNode extends Node {
  _typeNodeBrand: any;  // 名义类型标记，区别于其他 Node
}
```

所有类型节点都继承 `TypeNode`，可用 `ts.isTypeNode(node)` 守卫检测。

---

## 关键字类型节点

```ts
interface KeywordTypeNode<T extends KeywordTypeSyntaxKind = KeywordTypeSyntaxKind>
  extends KeywordToken<T>, TypeNode {
  readonly kind: T;
}
```

覆盖的 `SyntaxKind`：

| SyntaxKind | 对应类型 |
|------------|---------|
| `AnyKeyword` | `any` |
| `UnknownKeyword` | `unknown` |
| `NumberKeyword` | `number` |
| `BigIntKeyword` | `bigint` |
| `ObjectKeyword` | `object` |
| `BooleanKeyword` | `boolean` |
| `StringKeyword` | `string` |
| `SymbolKeyword` | `symbol` |
| `VoidKeyword` | `void` |
| `UndefinedKeyword` | `undefined` |
| `NeverKeyword` | `never` |
| `IntrinsicKeyword` | `intrinsic`（内建类型） |

---

## 原子类型节点

### ThisTypeNode

```ts
interface ThisTypeNode extends TypeNode {
  kind: SyntaxKind.ThisType;
}
```

### LiteralTypeNode

```ts
interface LiteralTypeNode extends TypeNode {
  kind: SyntaxKind.LiteralType;
  literal:
    | NullLiteral
    | BooleanLiteral
    | LiteralExpression    // StringLiteral / NumericLiteral / BigIntLiteral / NoSubstitutionTemplateLiteral
    | PrefixUnaryExpression; // 负数字面量 -42
}
```

### TypePredicateNode

```ts
interface TypePredicateNode extends TypeNode {
  kind: SyntaxKind.TypePredicate;
  parent: SignatureDeclaration | JSDocTypeExpression;
  assertsModifier?: AssertsKeyword;  // asserts x is T
  parameterName: Identifier | ThisTypeNode;
  type?: TypeNode;
}
```

---

## 引用 / 查询类型节点

### TypeReferenceNode

```ts
interface TypeReferenceNode extends NodeWithTypeArguments {
  kind: SyntaxKind.TypeReference;
  typeName: EntityName;              // Foo 或 A.B.C
  typeArguments?: NodeArray<TypeNode>;
}
```

### TypeQueryNode（typeof）

```ts
interface TypeQueryNode extends TypeNode {
  kind: SyntaxKind.TypeQuery;
  exprName: EntityName | ThisExpression;
  typeArguments?: NodeArray<TypeNode>;
}
```

### ImportTypeNode

```ts
interface ImportTypeNode extends NodeWithTypeArguments {
  kind: SyntaxKind.ImportType;
  isTypeOf: boolean;                       // typeof import(...)
  argument: TypeNode;                      // import("module")
  assertions?: ImportTypeAssertionContainer;
  qualifier?: EntityName;                  // .Foo 部分
  typeArguments?: NodeArray<TypeNode>;
}
```

---

## 结构类型节点

### TypeLiteralNode

```ts
interface TypeLiteralNode extends TypeNode, Declaration {
  kind: SyntaxKind.TypeLiteral;
  members: NodeArray<TypeElement>;
}
```

### ArrayTypeNode

```ts
interface ArrayTypeNode extends TypeNode {
  kind: SyntaxKind.ArrayType;
  elementType: TypeNode;
}
```

### TupleTypeNode

```ts
interface TupleTypeNode extends TypeNode {
  kind: SyntaxKind.TupleType;
  elements: NodeArray<TypeNode | NamedTupleMember>;
}
```

### NamedTupleMember

```ts
interface NamedTupleMember extends TypeNode, JSDocContainer, Declaration {
  kind: SyntaxKind.NamedTupleMember;
  dotDotDotToken?: DotDotDotToken;
  name: Identifier;
  questionToken?: QuestionToken;
  type: TypeNode;
}
```

### OptionalTypeNode（元组可选元素）

```ts
interface OptionalTypeNode extends TypeNode {
  kind: SyntaxKind.OptionalType;
  type: TypeNode;
}
```

### RestTypeNode（元组 rest 元素）

```ts
interface RestTypeNode extends TypeNode {
  kind: SyntaxKind.RestType;
  type: TypeNode;
}
```

---

## 组合类型节点

### UnionTypeNode

```ts
interface UnionTypeNode extends TypeNode {
  kind: SyntaxKind.UnionType;
  types: NodeArray<TypeNode>;
}
```

### IntersectionTypeNode

```ts
interface IntersectionTypeNode extends TypeNode {
  kind: SyntaxKind.IntersectionType;
  types: NodeArray<TypeNode>;
}
```

### ConditionalTypeNode

```ts
interface ConditionalTypeNode extends TypeNode {
  kind: SyntaxKind.ConditionalType;
  checkType: TypeNode;    // T
  extendsType: TypeNode;  // U
  trueType: TypeNode;     // X
  falseType: TypeNode;    // Y
}
```

### InferTypeNode

```ts
interface InferTypeNode extends TypeNode {
  kind: SyntaxKind.InferType;
  typeParameter: TypeParameterDeclaration;
}
```

### ParenthesizedTypeNode

```ts
interface ParenthesizedTypeNode extends TypeNode {
  kind: SyntaxKind.ParenthesizedType;
  type: TypeNode;
}
```

---

## 函数 / 构造类型节点

### FunctionTypeNode

```ts
interface FunctionTypeNode extends FunctionOrConstructorTypeNodeBase, LocalsContainer {
  kind: SyntaxKind.FunctionType;
}

interface FunctionOrConstructorTypeNodeBase extends TypeNode, SignatureDeclarationBase {
  kind: SyntaxKind.FunctionType | SyntaxKind.ConstructorType;
  type: TypeNode;
}
```

### ConstructorTypeNode

```ts
interface ConstructorTypeNode extends FunctionOrConstructorTypeNodeBase, LocalsContainer {
  kind: SyntaxKind.ConstructorType;
  modifiers?: NodeArray<Modifier>;
}
```

---

## 高级类型节点

### MappedTypeNode

```ts
interface MappedTypeNode extends TypeNode, Declaration, LocalsContainer {
  kind: SyntaxKind.MappedType;
  readonlyToken?: ReadonlyKeyword | PlusToken | MinusToken;
  typeParameter: TypeParameterDeclaration;
  nameType?: TypeNode;        // as 子句
  questionToken?: QuestionToken | PlusToken | MinusToken;
  type?: TypeNode;
  members?: NodeArray<TypeElement>;
}
```

### TemplateLiteralTypeNode

```ts
interface TemplateLiteralTypeNode extends TypeNode {
  kind: SyntaxKind.TemplateLiteralType;
  head: TemplateHead;
  templateSpans: NodeArray<TemplateLiteralTypeSpan>;
}

interface TemplateLiteralTypeSpan extends TypeNode {
  kind: SyntaxKind.TemplateLiteralTypeSpan;
  parent: TemplateLiteralTypeNode;
  type: TypeNode;
  literal: TemplateMiddle | TemplateTail;
}
```

### TypeOperatorNode

```ts
interface TypeOperatorNode extends TypeNode {
  kind: SyntaxKind.TypeOperator;
  operator:
    | SyntaxKind.KeyOfKeyword       // keyof T
    | SyntaxKind.UniqueKeyword      // unique symbol
    | SyntaxKind.ReadonlyKeyword;   // readonly T（数组/元组前）
  type: TypeNode;
}
```

### IndexedAccessTypeNode

```ts
interface IndexedAccessTypeNode extends TypeNode {
  kind: SyntaxKind.IndexedAccessType;
  objectType: TypeNode;  // T
  indexType: TypeNode;   // K
}
```

---

## 类型声明节点

### TypeParameterDeclaration

```ts
interface TypeParameterDeclaration extends NamedDeclaration, JSDocContainer {
  kind: SyntaxKind.TypeParameter;
  parent: DeclarationWithTypeParameters | InferTypeNode;
  modifiers?: NodeArray<Modifier>;
  name: Identifier;
  constraint?: TypeNode;     // extends U
  default?: TypeNode;        // = Default
  expression?: Expression;   // typeof T（实验性）
}
```

### InterfaceDeclaration

```ts
interface InterfaceDeclaration extends DeclarationStatement, JSDocContainer {
  kind: SyntaxKind.InterfaceDeclaration;
  modifiers?: NodeArray<ModifierLike>;
  name: Identifier;
  typeParameters?: NodeArray<TypeParameterDeclaration>;
  heritageClauses?: NodeArray<HeritageClause>;  // extends A, B
  members: NodeArray<TypeElement>;
}
```

### TypeAliasDeclaration

```ts
interface TypeAliasDeclaration extends DeclarationStatement, JSDocContainer, LocalsContainer {
  kind: SyntaxKind.TypeAliasDeclaration;
  modifiers?: NodeArray<ModifierLike>;
  name: Identifier;
  typeParameters?: NodeArray<TypeParameterDeclaration>;
  type: TypeNode;
}
```

### EnumDeclaration

```ts
interface EnumDeclaration extends DeclarationStatement, JSDocContainer {
  kind: SyntaxKind.EnumDeclaration;
  modifiers?: NodeArray<ModifierLike>;
  name: Identifier;
  members: NodeArray<EnumMember>;
}

interface EnumMember extends NamedDeclaration, JSDocContainer {
  kind: SyntaxKind.EnumMember;
  parent: EnumDeclaration;
  name: PropertyName;
  initializer?: Expression;
}
```

### IndexSignatureDeclaration

```ts
interface IndexSignatureDeclaration extends SignatureDeclarationBase, ClassElement, TypeElement, LocalsContainer {
  kind: SyntaxKind.IndexSignature;
  modifiers?: NodeArray<ModifierLike>;
  parameters: NodeArray<ParameterDeclaration>;  // 只有一个参数
  type: TypeNode;
}
```

### PropertySignature

```ts
interface PropertySignature extends TypeElement, JSDocContainer {
  kind: SyntaxKind.PropertySignature;
  modifiers?: NodeArray<Modifier>;
  name: PropertyName;
  questionToken?: QuestionToken;
  type?: TypeNode;
}
```

### MethodSignature

```ts
interface MethodSignature extends SignatureDeclarationBase, TypeElement, LocalsContainer {
  kind: SyntaxKind.MethodSignature;
  modifiers?: NodeArray<Modifier>;
  name: PropertyName;
  questionToken?: QuestionToken;
}
```

### CallSignatureDeclaration / ConstructSignatureDeclaration

```ts
interface CallSignatureDeclaration extends SignatureDeclarationBase, TypeElement, LocalsContainer {
  kind: SyntaxKind.CallSignature;
}

interface ConstructSignatureDeclaration extends SignatureDeclarationBase, TypeElement, LocalsContainer {
  kind: SyntaxKind.ConstructSignature;
}
```

---

## HeritageClause

```ts
interface HeritageClause extends Node {
  kind: SyntaxKind.HeritageClause;
  parent: InterfaceDeclaration | ClassLikeDeclaration;
  token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword;
  types: NodeArray<ExpressionWithTypeArguments>;
}

interface ExpressionWithTypeArguments extends MemberExpression, NodeWithTypeArguments {
  kind: SyntaxKind.ExpressionWithTypeArguments;
  expression: LeftHandSideExpression;
  typeArguments?: NodeArray<TypeNode>;
}
```

---

## 类型断言节点

| 节点 | 语法 | 说明 |
|------|------|------|
| `TypeAssertionExpression` | `<T>expr` | 旧式类型断言（在 `.tsx` 中不可用） |
| `AsExpression` | `expr as T` | 新式类型断言（推荐） |
| `SatisfiesExpression` | `expr satisfies T` | 满足类型约束（TS 4.9+，不改变类型） |
| `NonNullExpression` | `expr!` | 非空断言 |

```ts
interface AsExpression extends Expression {
  kind: SyntaxKind.AsExpression;
  expression: Expression;
  type: TypeNode;
}

interface SatisfiesExpression extends Expression {
  kind: SyntaxKind.SatisfiesExpression;
  expression: Expression;
  type: TypeNode;
}
```
