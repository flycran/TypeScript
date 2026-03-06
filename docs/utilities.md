
# 实用函数 & 类型守卫

---

## 类型守卫（ts.isXxx）

TypeScript 为**所有节点类型**提供了 `ts.isXxx(node): node is XxxNode` 形式的类型守卫。

### 类型节点守卫

| 函数 | 对应接口 |
|------|---------|
| `ts.isTypeNode(node)` | 任意 `TypeNode` |
| `ts.isKeyword(node)` | 关键字 Token |
| `ts.isTypeReferenceNode(node)` | `TypeReferenceNode` |
| `ts.isUnionTypeNode(node)` | `UnionTypeNode` |
| `ts.isIntersectionTypeNode(node)` | `IntersectionTypeNode` |
| `ts.isConditionalTypeNode(node)` | `ConditionalTypeNode` |
| `ts.isMappedTypeNode(node)` | `MappedTypeNode` |
| `ts.isTemplateLiteralTypeNode(node)` | `TemplateLiteralTypeNode` |
| `ts.isIndexedAccessTypeNode(node)` | `IndexedAccessTypeNode` |
| `ts.isTypeOperatorNode(node)` | `TypeOperatorNode`（keyof / unique / readonly） |
| `ts.isTypePredicateNode(node)` | `TypePredicateNode` |
| `ts.isFunctionTypeNode(node)` | `FunctionTypeNode` |
| `ts.isConstructorTypeNode(node)` | `ConstructorTypeNode` |
| `ts.isArrayTypeNode(node)` | `ArrayTypeNode` |
| `ts.isTupleTypeNode(node)` | `TupleTypeNode` |
| `ts.isLiteralTypeNode(node)` | `LiteralTypeNode` |
| `ts.isImportTypeNode(node)` | `ImportTypeNode` |
| `ts.isInferTypeNode(node)` | `InferTypeNode` |
| `ts.isNamedTupleMember(node)` | `NamedTupleMember` |
| `ts.isOptionalTypeNode(node)` | `OptionalTypeNode` |
| `ts.isRestTypeNode(node)` | `RestTypeNode` |
| `ts.isParenthesizedTypeNode(node)` | `ParenthesizedTypeNode` |
| `ts.isThisTypeNode(node)` | `ThisTypeNode` |

### 声明节点守卫

| 函数 | 对应接口 |
|------|---------|
| `ts.isInterfaceDeclaration(node)` | `InterfaceDeclaration` |
| `ts.isTypeAliasDeclaration(node)` | `TypeAliasDeclaration` |
| `ts.isEnumDeclaration(node)` | `EnumDeclaration` |
| `ts.isEnumMember(node)` | `EnumMember` |
| `ts.isTypeParameterDeclaration(node)` | `TypeParameterDeclaration` |
| `ts.isPropertySignature(node)` | `PropertySignature` |
| `ts.isMethodSignature(node)` | `MethodSignature` |
| `ts.isIndexSignatureDeclaration(node)` | `IndexSignatureDeclaration` |
| `ts.isCallSignatureDeclaration(node)` | `CallSignatureDeclaration` |
| `ts.isConstructSignatureDeclaration(node)` | `ConstructSignatureDeclaration` |
| `ts.isClassDeclaration(node)` | `ClassDeclaration` |
| `ts.isClassExpression(node)` | `ClassExpression` |
| `ts.isFunctionDeclaration(node)` | `FunctionDeclaration` |
| `ts.isHeritageClause(node)` | `HeritageClause` |
| `ts.isExpressionWithTypeArguments(node)` | `ExpressionWithTypeArguments` |
| `ts.isVariableDeclaration(node)` | `VariableDeclaration` |
| `ts.isParameter(node)` | `ParameterDeclaration` |
| `ts.isPropertyDeclaration(node)` | `PropertyDeclaration` |
| `ts.isMethodDeclaration(node)` | `MethodDeclaration` |

### 表达式节点守卫

| 函数 | 对应接口 |
|------|---------|
| `ts.isAsExpression(node)` | `AsExpression`（`expr as T`） |
| `ts.isSatisfiesExpression(node)` | `SatisfiesExpression`（`expr satisfies T`） |
| `ts.isNonNullExpression(node)` | `NonNullExpression`（`expr!`） |
| `ts.isTypeAssertionExpression(node)` | `TypeAssertionExpression`（`<T>expr`） |
| `ts.isIdentifier(node)` | `Identifier` |
| `ts.isStringLiteral(node)` | `StringLiteral` |
| `ts.isNumericLiteral(node)` | `NumericLiteral` |
| `ts.isBigIntLiteral(node)` | `BigIntLiteral` |
| `ts.isCallExpression(node)` | `CallExpression` |
| `ts.isNewExpression(node)` | `NewExpression` |

### 通用守卫

| 函数 | 说明 |
|------|------|
| `ts.isDeclaration(node)` | 是否为声明节点 |
| `ts.isStatement(node)` | 是否为语句 |
| `ts.isExpression(node)` | 是否为表达式 |
| `ts.isToken(node)` | 是否为 Token 节点 |
| `ts.isJSDoc(node)` | 是否为 JSDoc 注释块 |
| `ts.isJSDocTypeExpression(node)` | `JSDocTypeExpression` |
| `ts.isJSDocTag(node)` | JSDoc 标签 |

---

## 核心工厂 & 解析函数

| 函数签名 | 说明 |
|----------|------|
| `ts.createSourceFile(fileName, sourceText, languageVersion, setParentNodes?, scriptKind?): SourceFile` | 从字符串解析 SourceFile（仅语法，无类型） |
| `ts.createProgram(rootNames \| options): Program` | 创建含类型检查的 Program |
| `ts.createLanguageService(host, registry?, syntaxOnlyOrProjectService?): LanguageService` | 创建 Language Service |
| `ts.createDocumentRegistry(useCaseSensitive?, currentDirectory?): DocumentRegistry` | 创建文档注册表 |
| `ts.parseJsonConfigFileContent(json, host, basePath, ...): ParsedCommandLine` | 解析 tsconfig.json |
| `ts.readConfigFile(fileName, readFile): { config?: any; error?: Diagnostic }` | 读取 tsconfig.json |

---

## 遍历 / 访问函数

| 函数签名 | 说明 |
|----------|------|
| `ts.forEachChild<T>(node, cbNode, cbNodes?): T \| undefined` | 遍历直接子节点（深度优先） |
| `ts.visitNode(node, visitor, test?, lift?): T` | 访问单个节点 |
| `ts.visitEachChild(node, visitor, context, nodesVisitor?, tokenVisitor?): T` | 访问所有子节点（Transformer 上下文中） |
| `ts.transform(source, transformers, compilerOptions?): TransformationResult<T>` | 执行 AST 变换 |

### forEachChild 示例

```ts
function findAllTypeAliases(node: ts.Node): ts.TypeAliasDeclaration[] {
  const result: ts.TypeAliasDeclaration[] = [];

  function visit(node: ts.Node) {
    if (ts.isTypeAliasDeclaration(node)) {
      result.push(node);
    }
    ts.forEachChild(node, visit);
  }

  visit(node);
  return result;
}
```

---

## 节点信息工具函数

| 函数签名 | 说明 |
|----------|------|
| `ts.getNameOfDeclaration(declaration): DeclarationName \| undefined` | 获取声明名称节点 |
| `ts.getModifiers(node): readonly Modifier[] \| undefined` | 获取修饰符列表 |
| `ts.getCombinedModifierFlags(node): ModifierFlags` | 合并所有修饰符标志 |
| `ts.getCombinedNodeFlags(node): NodeFlags` | 合并节点标志 |
| `ts.skipParentheses(node): Expression` | 跳过括号节点 |

---

## JSDoc 工具函数

| 函数签名 | 说明 |
|----------|------|
| `ts.getJSDocType(node): TypeNode \| undefined` | 从 `@type` 获取类型节点 |
| `ts.getJSDocReturnType(node): TypeNode \| undefined` | `@returns` 类型 |
| `ts.getJSDocParameterTags(param): readonly JSDocParameterTag[]` | 参数的 `@param` 标签 |
| `ts.getJSDocTags(node): readonly JSDocTag[]` | 节点上的所有 JSDoc 标签 |
| `ts.getJSDocDeprecatedTag(node): JSDocDeprecatedTag \| undefined` | `@deprecated` 标签 |
| `ts.getJSDocPublicTag(node): JSDocPublicTag \| undefined` | `@public` 标签 |
| `ts.getAllJSDocTags<T extends JSDocTag>(node, tagName, predicate): T[]` | 按谓词获取 JSDoc 标签 |
| `ts.getTextOfJSDocComment(comment): string \| undefined` | 获取 JSDoc 注释文本 |

---

## 诊断工具函数

| 函数签名 | 说明 |
|----------|------|
| `ts.getPreEmitDiagnostics(program, sourceFile?, ct?): readonly Diagnostic[]` | emit 前的全部诊断 |
| `ts.sortAndDeduplicateDiagnostics<T>(diagnostics): SortedReadonlyArray<T>` | 排序并去重诊断 |
| `ts.flattenDiagnosticMessageText(msg, newLine, indent?): string` | 展平诊断消息链为字符串 |
| `ts.formatDiagnostics(diagnostics, host): string` | 格式化诊断（简单） |
| `ts.formatDiagnosticsWithColorAndContext(diagnostics, host): string` | 带颜色和上下文的诊断输出 |
| `ts.createDiagnosticForNode(node, message, ...args): DiagnosticWithLocation` | 为节点创建诊断对象 |

---

## 名称 / 路径工具

| 函数签名 | 说明 |
|----------|------|
| `ts.escapeLeadingUnderscores(identifier): __String` | 标识符 → 内部转义名 |
| `ts.unescapeLeadingUnderscores(identifier): string` | 内部转义名 → 普通字符串 |
| `ts.idText(node): string` | `Identifier` / `PrivateIdentifier` → 文本（去转义） |
| `ts.symbolName(symbol): string` | Symbol → 名称字符串 |
| `ts.getDefaultLibFileName(options): string` | 根据编译选项返回 lib.d.ts 文件名 |
| `ts.getDefaultLibFilePath(options): string` | lib.d.ts 完整文件路径 |
| `ts.normalizePath(path): string` | 规范化路径（统一斜杠） |
| `ts.getDirectoryPath(path): string` | 获取目录路径 |
| `ts.getBaseFileName(path, extensions?, ignoreCase?): string` | 获取文件名 |
| `ts.removeFileExtension(path): string` | 去掉扩展名 |
| `ts.extensionFromPath(path): Extension` | 获取文件扩展名枚举值 |

---

## ts.factory — AST 节点工厂

`ts.factory` 提供创建 AST 节点的工厂方法，用于代码生成或 AST 变换（替代已弃用的 `ts.createXxx` 函数）。

### 类型节点工厂

| 方法 | 说明 |
|------|------|
| `ts.factory.createTypeReferenceNode(name, typeArgs?)` | 类型引用 `Foo<T>` |
| `ts.factory.createUnionTypeNode(types)` | 联合类型 `A \| B` |
| `ts.factory.createIntersectionTypeNode(types)` | 交叉类型 `A & B` |
| `ts.factory.createArrayTypeNode(elementType)` | 数组类型 `T[]` |
| `ts.factory.createTupleTypeNode(elements)` | 元组类型 |
| `ts.factory.createFunctionTypeNode(typeParams, params, returnType)` | 函数类型 |
| `ts.factory.createKeywordTypeNode(kind)` | 关键字类型（`string` / `number` / `never` 等） |
| `ts.factory.createLiteralTypeNode(literal)` | 字面量类型 |
| `ts.factory.createMappedTypeNode(readonlyToken, typeParam, nameType, questionToken, type, members)` | 映射类型 |
| `ts.factory.createConditionalTypeNode(checkType, extendsType, trueType, falseType)` | 条件类型 |
| `ts.factory.createIndexedAccessTypeNode(objectType, indexType)` | `T[K]` |
| `ts.factory.createTypeOperatorNode(operator, type)` | `keyof T` / `unique symbol` / `readonly T` |
| `ts.factory.createInferTypeNode(typeParam)` | `infer R` |
| `ts.factory.createTemplateLiteralType(head, templateSpans)` | 模板字面量类型 |
| `ts.factory.createParenthesizedType(type)` | `(T)` |
| `ts.factory.createRestTypeNode(type)` | `...T` |
| `ts.factory.createOptionalTypeNode(type)` | `T?` |
| `ts.factory.createThisTypeNode()` | `this` |
| `ts.factory.createTypePredicateNode(assertsModifier, paramName, type)` | `x is T` |
| `ts.factory.createImportTypeNode(argument, assertions, qualifier, typeArguments, isTypeOf)` | `import('mod').T` |
| `ts.factory.createTypeLiteralNode(members)` | `{ ... }` |

### 声明工厂

| 方法 | 说明 |
|------|------|
| `ts.factory.createTypeParameterDeclaration(modifiers, name, constraint?, defaultType?)` | 泛型参数声明 |
| `ts.factory.createInterfaceDeclaration(modifiers, name, typeParams, heritageClauses, members)` | `interface` 声明 |
| `ts.factory.createTypeAliasDeclaration(modifiers, name, typeParams, type)` | `type` 别名声明 |
| `ts.factory.createPropertySignature(modifiers, name, questionToken, type)` | 属性签名 |
| `ts.factory.createMethodSignature(modifiers, name, questionToken, typeParams, params, type)` | 方法签名 |
| `ts.factory.createIndexSignature(modifiers, parameters, type)` | 索引签名 |
| `ts.factory.createCallSignature(typeParams, params, type)` | 调用签名 |
| `ts.factory.createConstructSignature(typeParams, params, type)` | 构造签名 |
| `ts.factory.createEnumDeclaration(modifiers, name, members)` | `enum` 声明 |
| `ts.factory.createEnumMember(name, initializer?)` | 枚举成员 |

### 代码打印

```ts
import ts from 'typescript';

// 创建类型节点
const strOrNum = ts.factory.createUnionTypeNode([
  ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
  ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
]);

// 打印为字符串
const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
const resultFile = ts.createSourceFile(
  'temp.ts', '', ts.ScriptTarget.Latest, false, ts.ScriptKind.TS
);
const result = printer.printNode(
  ts.EmitHint.Unspecified,
  strOrNum,
  resultFile
);
console.log(result); // "string | number"
```

---

## 系统对象

| 变量 | 说明 |
|------|------|
| `ts.sys` | 内置的 Node.js `System` 实现（文件读写、监视等） |
| `ts.version` | 当前 TypeScript 版本字符串（如 `"5.9.3"`） |

```ts
console.log(ts.version); // "5.9.3"
console.log(ts.sys.fileExists('/path/to/file.ts'));
console.log(ts.sys.readFile('/path/to/file.ts', 'utf8'));
```

---

## @internal 工具函数

以下函数**存在于运行时 `ts` 对象**，但不在 `typescript.d.ts` 中声明。需通过 `(ts as any).xxx()` 访问，不保证版本间稳定性。

:::warning
`@internal` 函数随 TypeScript 版本可能变更或移除，生产代码中使用需谨慎。
:::

### 节点信息（@internal）

| 函数签名 | 说明 |
|----------|------|
| `ts.skipTypeParentheses(node): TypeNode` | 跳过类型括号节点 `(@internal)` |
| `ts.getEffectiveTypeAnnotationNode(node): TypeNode \| undefined` | 获取有效类型注解节点（含 JSDoc） `(@internal)` |
| `ts.getEffectiveReturnTypeNode(node): TypeNode \| undefined` | 获取有效返回类型注解（含 JSDoc） `(@internal)` |
| `ts.isDeclarationReadonly(declaration): boolean` | 声明是否为 readonly `(@internal)` |
| `ts.isOptionalDeclaration(decl): boolean` | 声明是否可选 `(@internal)` |
