
# SyntaxKind 完整枚举

`SyntaxKind` 是一个超大枚举（共约 360 个原始值），唯一标识 AST 中每一种节点/Token 的种类。  
通过 `node.kind` 访问，常与类型守卫 `ts.isXxx(node)` 配合使用。

:::tip
枚举中还有一批**范围边界别名**（`FirstXxx` / `LastXxx`）用于范围判断，列于文末。
:::

---

## 标识符 & 私有标识符

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `Identifier` | 80 | 普通标识符（变量名、类型名等） |
| `PrivateIdentifier` | 81 | 私有字段标识符 `#field` |

---

## 声明节点

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `QualifiedName` | 167 | 限定名 `A.B` |
| `ComputedPropertyName` | 168 | 计算属性名 `[expr]` |
| `TypeParameter` | 169 | 泛型参数声明 `<T extends ...>` |
| `Parameter` | 170 | 函数参数 |
| `Decorator` | 171 | 装饰器 `@Decorator` |
| `PropertySignature` | 172 | 接口属性签名 `x: T` |
| `PropertyDeclaration` | 173 | 类属性声明 |
| `MethodSignature` | 174 | 接口方法签名 |
| `MethodDeclaration` | 175 | 类方法声明 |
| `ClassStaticBlockDeclaration` | 176 | 类静态块 `static { ... }` |
| `Constructor` | 177 | 构造函数 `constructor()` |
| `GetAccessor` | 178 | getter `get foo()` |
| `SetAccessor` | 179 | setter `set foo(v)` |
| `CallSignature` | 180 | 调用签名 `(x: T): R` |
| `ConstructSignature` | 181 | 构造签名 `new (...): T` |
| `IndexSignature` | 182 | 索引签名 `[key: string]: T` |
| `EnumMember` | 307 | 枚举成员 |
| `SourceFile` | 308 | 源文件根节点 |

---

## 类型节点

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `TypePredicate` | 183 | 类型谓词 `x is T` / `asserts x is T` |
| `TypeReference` | 184 | 类型引用 `Array<T>`、`Promise<T>` |
| `FunctionType` | 185 | 函数类型 `(x: T) => R` |
| `ConstructorType` | 186 | 构造函数类型 `new (...) => T` |
| `TypeQuery` | 187 | `typeof Expr` |
| `TypeLiteral` | 188 | 匿名对象类型 `{ x: number }` |
| `ArrayType` | 189 | 数组类型 `T[]` |
| `TupleType` | 190 | 元组类型 `[A, B, C]` |
| `OptionalType` | 191 | 可选元素 `T?`（元组内） |
| `RestType` | 192 | 剩余元素 `...T`（元组内） |
| `UnionType` | 193 | 联合类型 `A \| B` |
| `IntersectionType` | 194 | 交叉类型 `A & B` |
| `ConditionalType` | 195 | 条件类型 `T extends U ? X : Y` |
| `InferType` | 196 | `infer R` |
| `ParenthesizedType` | 197 | 括号类型 `(T)` |
| `ThisType` | 198 | `this` 类型 |
| `TypeOperator` | 199 | 类型运算符 `keyof T` / `unique symbol` / `readonly` |
| `IndexedAccessType` | 200 | 索引访问类型 `T[K]` |
| `MappedType` | 201 | 映射类型 `{ [K in keyof T]: ... }` |
| `LiteralType` | 202 | 字面量类型节点 |
| `NamedTupleMember` | 203 | 具名元组成员 `[name: T]` |
| `TemplateLiteralType` | 204 | 模板字面量类型 `` `${T}` `` |
| `TemplateLiteralTypeSpan` | 205 | 模板字面量类型片段 |
| `ImportType` | 206 | `import()` 类型 |

---

## 表达式节点

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `ArrayLiteralExpression` | 210 | 数组字面量 `[1, 2, 3]` |
| `ObjectLiteralExpression` | 211 | 对象字面量 `{ a: 1 }` |
| `PropertyAccessExpression` | 212 | 属性访问 `obj.prop` |
| `ElementAccessExpression` | 213 | 元素访问 `obj[key]` |
| `CallExpression` | 214 | 函数调用 `fn(args)` |
| `NewExpression` | 215 | `new Ctor(args)` |
| `TaggedTemplateExpression` | 216 | 标签模板 `` tag`...` `` |
| `TypeAssertionExpression` | 217 | 旧式断言 `<T>expr` |
| `ParenthesizedExpression` | 218 | 括号表达式 `(expr)` |
| `FunctionExpression` | 219 | 函数表达式 `function() {}` |
| `ArrowFunction` | 220 | 箭头函数 `() => {}` |
| `DeleteExpression` | 221 | `delete obj.prop` |
| `TypeOfExpression` | 222 | `typeof expr` |
| `VoidExpression` | 223 | `void expr` |
| `AwaitExpression` | 224 | `await expr` |
| `PrefixUnaryExpression` | 225 | 前缀一元 `!x`、`-x`、`++x` |
| `PostfixUnaryExpression` | 226 | 后缀一元 `x++`、`x--` |
| `BinaryExpression` | 227 | 二元表达式 `a + b`、`a = b` |
| `ConditionalExpression` | 228 | 三元表达式 `cond ? a : b` |
| `TemplateExpression` | 229 | 模板字符串 `` `${x}` `` |
| `YieldExpression` | 230 | `yield expr` |
| `SpreadElement` | 231 | `...expr`（实参展开） |
| `ClassExpression` | 232 | 类表达式 `class {}` |
| `OmittedExpression` | 233 | 省略元素（解构中的空位） |
| `ExpressionWithTypeArguments` | 234 | 带类型实参的表达式（`extends Foo<T>`） |
| `AsExpression` | 235 | `expr as T` |
| `NonNullExpression` | 236 | 非空断言 `expr!` |
| `MetaProperty` | 237 | 元属性 `new.target`、`import.meta` |
| `SyntheticExpression` | 238 | 编译器合成表达式（内部） |
| `SatisfiesExpression` | 239 | `expr satisfies T`（TS 4.9+） |

---

## 语句节点

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `Block` | 242 | 块语句 `{ ... }` |
| `EmptyStatement` | 243 | 空语句 `;` |
| `VariableStatement` | 244 | 变量声明语句 `let/const/var x = ...` |
| `ExpressionStatement` | 245 | 表达式语句 |
| `IfStatement` | 246 | `if (...) {}` |
| `DoStatement` | 247 | `do {} while (...)` |
| `WhileStatement` | 248 | `while (...) {}` |
| `ForStatement` | 249 | `for (;;) {}` |
| `ForInStatement` | 250 | `for (x in obj) {}` |
| `ForOfStatement` | 251 | `for (x of iter) {}` |
| `ContinueStatement` | 252 | `continue` |
| `BreakStatement` | 253 | `break` |
| `ReturnStatement` | 254 | `return expr` |
| `WithStatement` | 255 | `with (obj) {}` |
| `SwitchStatement` | 256 | `switch (x) {}` |
| `LabeledStatement` | 257 | 标签语句 `label: stmt` |
| `ThrowStatement` | 258 | `throw expr` |
| `TryStatement` | 259 | `try {} catch {} finally {}` |
| `DebuggerStatement` | 260 | `debugger` |

---

## 声明语句

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `VariableDeclaration` | 261 | 单个变量声明 `x: T = val` |
| `VariableDeclarationList` | 262 | 变量声明列表 `let x, y` |
| `FunctionDeclaration` | 263 | 函数声明 `function foo() {}` |
| `ClassDeclaration` | 264 | 类声明 `class Foo {}` |
| `InterfaceDeclaration` | 265 | `interface` 声明 |
| `TypeAliasDeclaration` | 266 | `type` 别名声明 |
| `EnumDeclaration` | 267 | `enum` 声明 |
| `ModuleDeclaration` | 268 | `module` / `namespace` 声明 |
| `ModuleBlock` | 269 | 模块/命名空间体 `{ ... }` |
| `NamespaceExportDeclaration` | 271 | `export as namespace Foo` |
| `MissingDeclaration` | 283 | 缺失的声明（错误恢复用） |

---

## 模块 / 导入导出

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `ImportEqualsDeclaration` | 272 | `import Foo = require('...')` |
| `ImportDeclaration` | 273 | `import ... from '...'` |
| `ImportClause` | 274 | `import Foo, { bar }` 的从句部分 |
| `NamespaceImport` | 275 | `* as ns` |
| `NamedImports` | 276 | `{ Foo, Bar }` |
| `ImportSpecifier` | 277 | 单个导入说明符 `Foo as F` |
| `ExportAssignment` | 278 | `export default expr` / `export = expr` |
| `ExportDeclaration` | 279 | `export { ... } from '...'` |
| `NamedExports` | 280 | `{ Foo, Bar }` 的导出形式 |
| `NamespaceExport` | 281 | `export * as ns` |
| `ExportSpecifier` | 282 | 单个导出说明符 |
| `ExternalModuleReference` | 284 | `require('...')` |
| `ImportAttributes` | 301 | 导入属性 `with { type: 'json' }` |
| `ImportAttribute` | 302 | 单个导入属性 |

---

## 绑定模式

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `ObjectBindingPattern` | 207 | 对象解构模式 `{ a, b }` |
| `ArrayBindingPattern` | 208 | 数组解构模式 `[a, b]` |
| `BindingElement` | 209 | 解构绑定元素 |

---

## 对象字面量成员

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `PropertyAssignment` | 304 | 属性赋值 `key: value` |
| `ShorthandPropertyAssignment` | 305 | 简写属性 `{ x }` |
| `SpreadAssignment` | 306 | 展开赋值 `{ ...obj }` |

---

## 控制流辅助节点

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `CaseBlock` | 270 | `switch` 的 case 块 |
| `CaseClause` | 297 | `case x:` |
| `DefaultClause` | 298 | `default:` |
| `HeritageClause` | 299 | `extends` / `implements` 从句 |
| `CatchClause` | 300 | `catch (e) {}` |
| `TemplateSpan` | 240 | 模板字符串的插值片段 |
| `SemicolonClassElement` | 241 | 类体内的分号 `;` |

---

## JSX 节点

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `JsxElement` | 285 | JSX 元素 `<Foo>...</Foo>` |
| `JsxSelfClosingElement` | 286 | 自闭合 JSX `<Foo />` |
| `JsxOpeningElement` | 287 | JSX 开标签 `<Foo>` |
| `JsxClosingElement` | 288 | JSX 闭标签 `</Foo>` |
| `JsxFragment` | 289 | JSX 片段 `<>...</>` |
| `JsxOpeningFragment` | 290 | `<>` |
| `JsxClosingFragment` | 291 | `</>` |
| `JsxAttribute` | 292 | JSX 属性 `prop={val}` |
| `JsxAttributes` | 293 | JSX 属性集合 |
| `JsxSpreadAttribute` | 294 | JSX 展开属性 `{...props}` |
| `JsxExpression` | 295 | JSX 插值表达式 `{expr}` |
| `JsxNamespacedName` | 296 | JSX 命名空间名 `ns:tag` |
| `JsxText` | 12 | JSX 文本内容 |
| `JsxTextAllWhiteSpaces` | 13 | JSX 纯空白文本 |

---

## 字面量 Token

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `NumericLiteral` | 9 | 数字字面量 `42` |
| `BigIntLiteral` | 10 | BigInt 字面量 `42n` |
| `StringLiteral` | 11 | 字符串字面量 `"foo"` |
| `RegularExpressionLiteral` | 14 | 正则字面量 `/pattern/flags` |
| `NoSubstitutionTemplateLiteral` | 15 | 无插值模板 `` `text` `` |
| `TemplateHead` | 16 | 模板头 `` `text${ `` |
| `TemplateMiddle` | 17 | 模板中间 `` }text${ `` |
| `TemplateTail` | 18 | 模板尾 `` }text` `` |

---

## 关键字 Token

### JS 保留关键字（83–118）

| 枚举值 | 数值 | 关键字 |
|--------|------|--------|
| `BreakKeyword` | 83 | `break` |
| `CaseKeyword` | 84 | `case` |
| `CatchKeyword` | 85 | `catch` |
| `ClassKeyword` | 86 | `class` |
| `ConstKeyword` | 87 | `const` |
| `ContinueKeyword` | 88 | `continue` |
| `DebuggerKeyword` | 89 | `debugger` |
| `DefaultKeyword` | 90 | `default` |
| `DeleteKeyword` | 91 | `delete` |
| `DoKeyword` | 92 | `do` |
| `ElseKeyword` | 93 | `else` |
| `EnumKeyword` | 94 | `enum` |
| `ExportKeyword` | 95 | `export` |
| `ExtendsKeyword` | 96 | `extends` |
| `FalseKeyword` | 97 | `false` |
| `FinallyKeyword` | 98 | `finally` |
| `ForKeyword` | 99 | `for` |
| `FunctionKeyword` | 100 | `function` |
| `IfKeyword` | 101 | `if` |
| `ImportKeyword` | 102 | `import` |
| `InKeyword` | 103 | `in` |
| `InstanceOfKeyword` | 104 | `instanceof` |
| `NewKeyword` | 105 | `new` |
| `NullKeyword` | 106 | `null` |
| `ReturnKeyword` | 107 | `return` |
| `SuperKeyword` | 108 | `super` |
| `SwitchKeyword` | 109 | `switch` |
| `ThisKeyword` | 110 | `this` |
| `ThrowKeyword` | 111 | `throw` |
| `TrueKeyword` | 112 | `true` |
| `TryKeyword` | 113 | `try` |
| `TypeOfKeyword` | 114 | `typeof` |
| `VarKeyword` | 115 | `var` |
| `VoidKeyword` | 116 | `void` |
| `WhileKeyword` | 117 | `while` |
| `WithKeyword` | 118 | `with` |

### JS 未来保留关键字（119–127）

| 枚举值 | 数值 | 关键字 |
|--------|------|--------|
| `ImplementsKeyword` | 119 | `implements` |
| `InterfaceKeyword` | 120 | `interface` |
| `LetKeyword` | 121 | `let` |
| `PackageKeyword` | 122 | `package` |
| `PrivateKeyword` | 123 | `private` |
| `ProtectedKeyword` | 124 | `protected` |
| `PublicKeyword` | 125 | `public` |
| `StaticKeyword` | 126 | `static` |
| `YieldKeyword` | 127 | `yield` |

### TypeScript 专有关键字（128–166）

| 枚举值 | 数值 | 关键字 / 说明 |
|--------|------|--------------|
| `AbstractKeyword` | 128 | `abstract` |
| `AccessorKeyword` | 129 | `accessor`（TS 4.9+） |
| `AsKeyword` | 130 | `as` |
| `AssertsKeyword` | 131 | `asserts` |
| `AssertKeyword` | 132 | `assert` |
| `AnyKeyword` | 133 | `any` 类型 |
| `AsyncKeyword` | 134 | `async` |
| `AwaitKeyword` | 135 | `await` |
| `BooleanKeyword` | 136 | `boolean` 类型 |
| `ConstructorKeyword` | 137 | `constructor` |
| `DeclareKeyword` | 138 | `declare` |
| `GetKeyword` | 139 | `get` |
| `InferKeyword` | 140 | `infer` |
| `IntrinsicKeyword` | 141 | `intrinsic`（内建类型） |
| `IsKeyword` | 142 | `is`（类型谓词） |
| `KeyOfKeyword` | 143 | `keyof` |
| `ModuleKeyword` | 144 | `module` |
| `NamespaceKeyword` | 145 | `namespace` |
| `NeverKeyword` | 146 | `never` 类型 |
| `OutKeyword` | 147 | `out`（协变标注，TS 4.7+） |
| `ReadonlyKeyword` | 148 | `readonly` |
| `RequireKeyword` | 149 | `require` |
| `NumberKeyword` | 150 | `number` 类型 |
| `ObjectKeyword` | 151 | `object` 类型 |
| `SatisfiesKeyword` | 152 | `satisfies`（TS 4.9+） |
| `SetKeyword` | 153 | `set` |
| `StringKeyword` | 154 | `string` 类型 |
| `SymbolKeyword` | 155 | `symbol` 类型 |
| `TypeKeyword` | 156 | `type` |
| `UndefinedKeyword` | 157 | `undefined` 类型 |
| `UniqueKeyword` | 158 | `unique` |
| `UnknownKeyword` | 159 | `unknown` 类型 |
| `UsingKeyword` | 160 | `using`（TS 5.2+） |
| `FromKeyword` | 161 | `from` |
| `GlobalKeyword` | 162 | `global` |
| `BigIntKeyword` | 163 | `bigint` 类型 |
| `OverrideKeyword` | 164 | `override`（TS 4.3+） |
| `OfKeyword` | 165 | `of`（`for...of`） |
| `DeferKeyword` | 166 | `defer` |

---

## 标点 / 操作符 Token

### 分隔符

| 枚举值 | 数值 | 符号 |
|--------|------|------|
| `OpenBraceToken` | 19 | `{` |
| `CloseBraceToken` | 20 | `}` |
| `OpenParenToken` | 21 | `(` |
| `CloseParenToken` | 22 | `)` |
| `OpenBracketToken` | 23 | `[` |
| `CloseBracketToken` | 24 | `]` |
| `DotToken` | 25 | `.` |
| `DotDotDotToken` | 26 | `...` |
| `SemicolonToken` | 27 | `;` |
| `CommaToken` | 28 | `,` |
| `QuestionDotToken` | 29 | `?.` |
| `ColonToken` | 59 | `:` |
| `AtToken` | 60 | `@` |
| `BacktickToken` | 62 | `` ` ``（JSDoc 扫描器专用） |
| `HashToken` | 63 | `#`（JSDoc 扫描器专用） |
| `QuestionToken` | 58 | `?` |

### 比较运算符

| 枚举值 | 数值 | 符号 |
|--------|------|------|
| `LessThanToken` | 30 | `<` |
| `LessThanSlashToken` | 31 | `</`（JSX 用） |
| `GreaterThanToken` | 32 | `>` |
| `LessThanEqualsToken` | 33 | `<=` |
| `GreaterThanEqualsToken` | 34 | `>=` |
| `EqualsEqualsToken` | 35 | `==` |
| `ExclamationEqualsToken` | 36 | `!=` |
| `EqualsEqualsEqualsToken` | 37 | `===` |
| `ExclamationEqualsEqualsToken` | 38 | `!==` |

### 算术 / 逻辑运算符

| 枚举值 | 数值 | 符号 |
|--------|------|------|
| `EqualsGreaterThanToken` | 39 | `=>` |
| `PlusToken` | 40 | `+` |
| `MinusToken` | 41 | `-` |
| `AsteriskToken` | 42 | `*` |
| `AsteriskAsteriskToken` | 43 | `**` |
| `SlashToken` | 44 | `/` |
| `PercentToken` | 45 | `%` |
| `PlusPlusToken` | 46 | `++` |
| `MinusMinusToken` | 47 | `--` |
| `LessThanLessThanToken` | 48 | `<<` |
| `GreaterThanGreaterThanToken` | 49 | `>>` |
| `GreaterThanGreaterThanGreaterThanToken` | 50 | `>>>` |
| `AmpersandToken` | 51 | `&` |
| `BarToken` | 52 | `\|` |
| `CaretToken` | 53 | `^` |
| `ExclamationToken` | 54 | `!` |
| `TildeToken` | 55 | `~` |
| `AmpersandAmpersandToken` | 56 | `&&` |
| `BarBarToken` | 57 | `\|\|` |
| `QuestionQuestionToken` | 61 | `??` |

### 赋值运算符

| 枚举值 | 数值 | 符号 |
|--------|------|------|
| `EqualsToken` | 64 | `=` |
| `PlusEqualsToken` | 65 | `+=` |
| `MinusEqualsToken` | 66 | `-=` |
| `AsteriskEqualsToken` | 67 | `*=` |
| `AsteriskAsteriskEqualsToken` | 68 | `**=` |
| `SlashEqualsToken` | 69 | `/=` |
| `PercentEqualsToken` | 70 | `%=` |
| `LessThanLessThanEqualsToken` | 71 | `<<=` |
| `GreaterThanGreaterThanEqualsToken` | 72 | `>>=` |
| `GreaterThanGreaterThanGreaterThanEqualsToken` | 73 | `>>>=` |
| `AmpersandEqualsToken` | 74 | `&=` |
| `BarEqualsToken` | 75 | `\|=` |
| `BarBarEqualsToken` | 76 | `\|\|=` |
| `AmpersandAmpersandEqualsToken` | 77 | `&&=` |
| `QuestionQuestionEqualsToken` | 78 | `??=` |
| `CaretEqualsToken` | 79 | `^=` |

---

## Trivia（空白 / 注释）

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `SingleLineCommentTrivia` | 2 | 单行注释 `// ...` |
| `MultiLineCommentTrivia` | 3 | 多行注释 `/* ... */` |
| `NewLineTrivia` | 4 | 换行符 |
| `WhitespaceTrivia` | 5 | 空白字符 |
| `ShebangTrivia` | 6 | Shebang `#!...` |
| `ConflictMarkerTrivia` | 7 | 冲突标记 `<<<<<<` |
| `NonTextFileMarkerTrivia` | 8 | 非文本文件标记 |

---

## JSDoc 节点

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `JSDocTypeExpression` | 310 | JSDoc 类型表达式 `{T}` |
| `JSDocNameReference` | 311 | JSDoc 名称引用 |
| `JSDocMemberName` | 312 | JSDoc 成员名 |
| `JSDocAllType` | 313 | `{*}` 任意类型 |
| `JSDocUnknownType` | 314 | `{?}` 未知类型 |
| `JSDocNullableType` | 315 | `{?T}` 可空类型 |
| `JSDocNonNullableType` | 316 | `{!T}` 非空类型 |
| `JSDocOptionalType` | 317 | `{T=}` 可选类型 |
| `JSDocFunctionType` | 318 | JSDoc 函数类型 |
| `JSDocVariadicType` | 319 | JSDoc 可变参数类型 |
| `JSDocNamepathType` | 320 | JSDoc 名称路径类型 |
| `JSDoc` | 321 | JSDoc 注释块（`JSDocComment` 已弃用，同值） |
| `JSDocText` | 322 | JSDoc 纯文本内容 |
| `JSDocTypeLiteral` | 323 | JSDoc 类型字面量 |
| `JSDocSignature` | 324 | JSDoc 签名 |
| `JSDocLink` | 325 | `{@link ...}` |
| `JSDocLinkCode` | 326 | `{@linkcode ...}` |
| `JSDocLinkPlain` | 327 | `{@linkplain ...}` |

### JSDoc 标签

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `JSDocTag` | 328 | 通用 JSDoc 标签 |
| `JSDocAugmentsTag` | 329 | `@augments` / `@extends` |
| `JSDocImplementsTag` | 330 | `@implements` |
| `JSDocAuthorTag` | 331 | `@author` |
| `JSDocDeprecatedTag` | 332 | `@deprecated` |
| `JSDocClassTag` | 333 | `@class` / `@constructor` |
| `JSDocPublicTag` | 334 | `@public` |
| `JSDocPrivateTag` | 335 | `@private` |
| `JSDocProtectedTag` | 336 | `@protected` |
| `JSDocReadonlyTag` | 337 | `@readonly` |
| `JSDocOverrideTag` | 338 | `@override` |
| `JSDocCallbackTag` | 339 | `@callback` |
| `JSDocOverloadTag` | 340 | `@overload` |
| `JSDocEnumTag` | 341 | `@enum` |
| `JSDocParameterTag` | 342 | `@param` |
| `JSDocReturnTag` | 343 | `@returns` / `@return` |
| `JSDocThisTag` | 344 | `@this` |
| `JSDocTypeTag` | 345 | `@type` |
| `JSDocTemplateTag` | 346 | `@template` |
| `JSDocTypedefTag` | 347 | `@typedef` |
| `JSDocSeeTag` | 348 | `@see` |
| `JSDocPropertyTag` | 349 | `@property` / `@prop` |
| `JSDocThrowsTag` | 350 | `@throws` |
| `JSDocSatisfiesTag` | 351 | `@satisfies` |
| `JSDocImportTag` | 352 | `@import` |

---

## 特殊 / 合成节点

| 枚举值 | 数值 | 说明 |
|--------|------|------|
| `Unknown` | 0 | 未知/无效节点 |
| `EndOfFileToken` | 1 | 文件结束 |
| `Bundle` | 309 | 多文件 Bundle（内部） |
| `SyntaxList` | 353 | 语法列表（内部） |
| `NotEmittedStatement` | 354 | 不输出语句（变换器用） |
| `NotEmittedTypeElement` | 355 | 不输出类型元素 |
| `PartiallyEmittedExpression` | 356 | 部分输出表达式（变换器用） |
| `CommaListExpression` | 357 | 逗号列表表达式（内部） |
| `SyntheticReferenceExpression` | 358 | 合成引用表达式（内部） |

---

## 范围边界别名

这些别名**不对应具体节点**，仅用于范围判断（如 `kind >= SyntaxKind.FirstStatement && kind <= SyntaxKind.LastStatement`）：

| 别名 | 数值 | 说明 |
|------|------|------|
| `FirstToken` | 0 | 第一个 Token |
| `LastToken` | 166 | 最后一个 Token |
| `FirstTriviaToken` | 2 | 第一个 Trivia |
| `LastTriviaToken` | 7 | 最后一个 Trivia |
| `FirstLiteralToken` | 9 | 第一个字面量 Token |
| `LastLiteralToken` | 15 | 最后一个字面量 Token |
| `FirstTemplateToken` | 15 | 第一个模板 Token |
| `LastTemplateToken` | 18 | 最后一个模板 Token |
| `FirstPunctuation` | 19 | 第一个标点 |
| `LastPunctuation` | 79 | 最后一个标点 |
| `FirstAssignment` | 64 | 第一个赋值运算符 |
| `LastAssignment` | 79 | 最后一个赋值运算符 |
| `FirstCompoundAssignment` | 65 | 第一个复合赋值运算符 |
| `LastCompoundAssignment` | 79 | 最后一个复合赋值运算符 |
| `FirstBinaryOperator` | 30 | 第一个二元运算符 |
| `LastBinaryOperator` | 79 | 最后一个二元运算符 |
| `FirstReservedWord` | 83 | 第一个保留字 |
| `LastReservedWord` | 118 | 最后一个保留字 |
| `FirstKeyword` | 83 | 第一个关键字 |
| `LastKeyword` | 166 | 最后一个关键字 |
| `FirstFutureReservedWord` | 119 | 第一个未来保留字 |
| `LastFutureReservedWord` | 127 | 最后一个未来保留字 |
| `FirstTypeNode` | 183 | 第一个类型节点 |
| `LastTypeNode` | 206 | 最后一个类型节点 |
| `FirstStatement` | 244 | 第一个语句节点 |
| `LastStatement` | 260 | 最后一个语句节点 |
| `FirstNode` | 167 | 第一个非 Token 节点 |
| `FirstJSDocNode` | 310 | 第一个 JSDoc 节点 |
| `LastJSDocNode` | 352 | 最后一个 JSDoc 节点 |
| `FirstJSDocTagNode` | 328 | 第一个 JSDoc 标签节点 |
| `LastJSDocTagNode` | 352 | 最后一个 JSDoc 标签节点 |
| `Count` | 359 | 枚举总数 |
