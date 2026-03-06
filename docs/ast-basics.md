
# 基础 AST 接口

## ReadonlyTextRange / TextRange

所有 AST 节点都携带源码位置信息，`TextRange` 是最小公共接口。

```ts
interface ReadonlyTextRange {
  readonly pos: number;  // 起始偏移（含 leading trivia）
  readonly end: number;  // 结束偏移（不含）
}

interface TextRange extends ReadonlyTextRange {
  pos: number;
  end: number;
}
```

> `pos` 到 `end` 是 UTF-16 码元偏移，与 `SourceFile.text` 的下标对应。

---

## Node

`Node` 是整棵 AST 中每个节点的公共基类，继承 `ReadonlyTextRange`。

```ts
interface Node extends ReadonlyTextRange {
  kind: SyntaxKind;
  flags: NodeFlags;
  parent: Node;
  // ... 方法见下表
}
```

### 核心属性

| 成员 | 类型 | 说明 |
|------|------|------|
| `kind` | `SyntaxKind` | 节点类型枚举，唯一标识节点种类 |
| `flags` | `NodeFlags` | 节点标志位（Let / Const / Ambient / Optional…） |
| `parent` | `Node` | 父节点引用（Binder 阶段写入，`createSourceFile` 时需传 `setParentNodes=true`） |

### 核心方法

| 方法签名 | 说明 |
|----------|------|
| `getSourceFile(): SourceFile` | 返回该节点所属的 SourceFile |
| `getChildCount(sf?): number` | 子节点数量（含 Token） |
| `getChildAt(index, sf?): Node` | 按索引取子节点 |
| `getChildren(sf?): Node[]` | 全部子节点列表 |
| `getStart(sf?, includeJsDocComment?): number` | 跳过 trivia 后的真实起始位置 |
| `getFullStart(): number` | 含 leading trivia 的起始位置（= `pos`） |
| `getEnd(): number` | 结束位置（= `end`） |
| `getWidth(sf?): number` | `end - getStart()` |
| `getFullWidth(): number` | `end - pos`（含 trivia） |
| `getLeadingTriviaWidth(sf?): number` | leading trivia 的宽度 |
| `getFullText(sf?): string` | 完整原始文本（含 trivia） |
| `getText(sf?): string` | 不含 trivia 的节点文本 |
| `forEachChild<T>(cbNode, cbNodes?): T \| undefined` | 深度优先遍历直接子节点 |

---

## SyntaxKind

`SyntaxKind` 是超大枚举（~400 值），以下列出**类型系统高频值**。完整枚举见 `typescript.d.ts`。

### 类型节点相关

| 枚举值 | 说明 |
|--------|------|
| `TypeParameter` | 泛型参数 `<T extends ...>` |
| `TypeReference` | 类型引用 `Array<T>`、`Promise<T>` |
| `FunctionType` | 函数类型 `(x: T) => R` |
| `ConstructorType` | 构造函数类型 `new (...) => T` |
| `TypeQuery` | `typeof Expr` |
| `TypeLiteral` | 匿名对象类型 `{ x: number }` |
| `ArrayType` | 数组类型 `T[]` |
| `TupleType` | 元组类型 `[A, B, C]` |
| `OptionalType` | 可选元素 `T?`（元组内） |
| `RestType` | 剩余元素 `...T`（元组内） |
| `UnionType` | 联合类型 `A \| B` |
| `IntersectionType` | 交叉类型 `A & B` |
| `ConditionalType` | 条件类型 `T extends U ? X : Y` |
| `InferType` | `infer R` |
| `ParenthesizedType` | 括号类型 `(T)` |
| `TemplateLiteralType` | 模板字面量类型 `` `${T}` `` |
| `NamedTupleMember` | 具名元组成员 `[name: T]` |
| `MappedType` | 映射类型 `{ [K in keyof T]: ... }` |
| `LiteralType` | 字面量类型节点 |
| `ImportType` | `import()` 类型 |
| `IndexedAccessType` | 索引访问类型 `T[K]` |
| `TypePredicate` | 类型谓词 `x is T` |
| `TypeOperator` | 类型运算符 `keyof T` / `unique symbol` / `readonly` |

### 声明相关

| 枚举值 | 说明 |
|--------|------|
| `Identifier` | 标识符（变量名、类型名等） |
| `QualifiedName` | `A.B` 限定名 |
| `Parameter` | 函数参数 |
| `PropertySignature` | 接口属性签名 `{ x: number }` |
| `PropertyDeclaration` | 类属性声明 |
| `MethodSignature` | 接口方法签名 |
| `MethodDeclaration` | 类方法声明 |
| `IndexSignature` | 索引签名 `[key: string]: T` |
| `InterfaceDeclaration` | `interface` 声明 |
| `TypeAliasDeclaration` | `type` 别名声明 |
| `EnumDeclaration` | `enum` 声明 |

### 表达式中的类型相关

| 枚举值 | 说明 |
|--------|------|
| `TypeAssertionExpression` | `<T>expr`（旧式断言） |
| `AsExpression` | `expr as T` |
| `SatisfiesExpression` | `expr satisfies T`（TS 4.9+） |
| `NonNullExpression` | `expr!` |

---

## NodeFlags

节点标志位，通过 `node.flags` 访问。

| 标志 | 说明 |
|------|------|
| `None = 0` | 无标志 |
| `Let` | `let` 声明 |
| `Const` | `const` 声明 |
| `NestedNamespace` | 嵌套命名空间 |
| `Synthesized` | 编译器合成节点（非源码原生） |
| `Namespace` | `namespace` 声明 |
| `ExportContext` | export 上下文 |
| `ContainsThis` | 包含 `this` 引用 |
| `HasImplicitReturn` | 有隐式 `return` |
| `HasExplicitReturn` | 有显式 `return` |
| `GlobalAugmentation` | 全局扩充 `declare global` |
| `HasAsyncFunctions` | 含异步函数 |
| `Ambient` | ambient 上下文（`.d.ts` / `declare`） |
| `JsonFile` | JSON 文件解析模式 |
| `Deprecated` | 已弃用（TS 5.0+） |
| `BlockScoped` | `Let \| Const`（复合） |

---

## ModifierFlags

修饰符标志位，通过 `ts.getCombinedModifierFlags(node)` 获取。

:::tip
不要直接读 `node.modifierFlagsCache`，应使用 `ts.getCombinedModifierFlags(node)` 以确保正确合并。
:::

| 标志 | 说明 |
|------|------|
| `None = 0` | 无修饰符 |
| `Export` | `export` |
| `Ambient` | `declare` |
| `Public` | `public` |
| `Private` | `private` |
| `Protected` | `protected` |
| `Static` | `static` |
| `Readonly` | `readonly` |
| `Override` | `override`（TS 4.3+） |
| `Abstract` | `abstract` |
| `Async` | `async` |
| `Default` | `default` |
| `Const` | `const enum` |
| `Deprecated` | `@deprecated`（TS 4.0+） |
| `In` | `in`（映射类型修饰符，TS 4.1+） |
| `Out` | `out`（协变标注，TS 4.7+） |
| `Accessor` | `accessor`（TS 4.9+） |
| `AccessibilityModifier` | `Public \| Private \| Protected`（复合） |
| `ExportDefault` | `Export \| Default`（复合） |
| `TypeScriptModifier` | TypeScript 专有修饰符集合（复合） |

---

## SourceFile

`SourceFile` 是解析单个 `.ts` / `.d.ts` 文件得到的**根节点**，也是 AST 的顶层入口。

```ts
interface SourceFile extends Declaration {
  kind: SyntaxKind.SourceFile;
  statements: NodeArray<Statement>;
  endOfFileToken: Token<SyntaxKind.EndOfFileToken>;
  fileName: string;
  text: string;
  // ...
}
```

### 属性

| 成员 | 类型 | 说明 |
|------|------|------|
| `statements` | `NodeArray<Statement>` | 顶层语句列表 |
| `fileName` | `string` | 文件路径（规范化） |
| `text` | `string` | 完整源码文本 |
| `isDeclarationFile` | `boolean` | 是否为 `.d.ts` 文件 |
| `hasNoDefaultLib` | `boolean` | 是否含 `/// <reference no-default-lib>` |
| `languageVersion` | `ScriptTarget` | 目标语言版本 |
| `languageVariant` | `LanguageVariant` | `Standard \| JSX` |
| `scriptKind` | `ScriptKind?` | `JS / TS / JSX / TSX / JSON` 等 |
| `referencedFiles` | `readonly FileReference[]` | `/// <reference path>` 引用 |
| `typeReferenceDirectives` | `readonly FileReference[]` | `/// <reference types>` |
| `libReferenceDirectives` | `readonly FileReference[]` | `/// <reference lib>` |
| `impliedNodeFormat` | `ResolutionMode?` | 模块模式（CJS / ESM），TS 5.x 新增 |

### 方法

| 方法签名 | 说明 |
|----------|------|
| `getLineAndCharacterOfPosition(pos): LineAndCharacter` | 偏移 → 行列号（0-based） |
| `getPositionOfLineAndCharacter(line, char): number` | 行列号 → 偏移 |
| `getLineEndOfPosition(pos): number` | 该行末尾偏移 |
| `getLineStarts(): readonly number[]` | 各行起始偏移数组 |
| `update(newText, textChangeRange): SourceFile` | 增量更新（Language Service 内部用） |

### 创建方式

```ts
// 仅语法解析（无类型信息，速度快）
const sf = ts.createSourceFile(
  'foo.ts',
  sourceText,
  ts.ScriptTarget.Latest,
  /*setParentNodes*/ true
);

// 含类型信息，通过 Program
const program = ts.createProgram(['foo.ts'], { strict: true });
const sf = program.getSourceFile('foo.ts')!;
```

---

## NodeArray\<T\>

```ts
interface NodeArray<T extends Node> extends ReadonlyArray<T>, ReadonlyTextRange {
  hasTrailingComma: boolean;
}
```

`NodeArray` 是带位置信息的节点数组，`hasTrailingComma` 表示最后一个元素后是否有逗号（对元组 / 参数列表有意义）。
