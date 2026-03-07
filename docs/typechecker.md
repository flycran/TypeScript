
# TypeChecker

`TypeChecker` 是访问类型信息的**核心 API**，通过 `program.getTypeChecker()` 获取。

```ts
const program = ts.createProgram(['foo.ts'], { strict: true });
const checker = program.getTypeChecker();
```

:::info
TypeChecker 包含大量内部方法（标注 `@internal`），这些方法**存在于运行时对象**但不在 `typescript.d.ts` 中声明，不保证版本稳定性，需通过 `(checker as any).xxx()` 访问。以下文档将公开 API 列在前，`@internal` 方法集中在末尾。
:::

---

## 从节点获取类型 / 符号

| 方法签名 | 说明 |
|----------|------|
| `getTypeAtLocation(node): Type` | 获取节点处的类型（**最常用**） |
| `getTypeFromTypeNode(typeNode): Type` | 从类型节点获取对应类型 |
| `getContextualType(expr): Type \| undefined` | 获取表达式的上下文期望类型 |
| `getSymbolAtLocation(node): Symbol \| undefined` | 获取节点处的符号 |
| `getSymbolsInScope(location, meaning): Symbol[]` | 指定位置可见的符号列表 |
| `getTypeOfSymbol(symbol): Type` | 符号的类型（值类型） |
| `getTypeOfSymbolAtLocation(symbol, node): Type` | 符号在特定节点处的类型 |
| `getDeclaredTypeOfSymbol(symbol): Type` | 符号的声明类型（不含类型实例化） |
| `getTypePredicateOfSignature(sig): TypePredicate \| undefined` | 获取签名的类型谓词 |
| `getReturnTypeOfSignature(sig): Type` | 签名的返回类型 |
| `getIndexInfosOfType(type): readonly IndexInfo[]` | 对象类型的所有索引信息 |
| `getIndexInfoOfType(type, kind): IndexInfo \| undefined` | 按 `IndexKind` 获取单个索引信息 |
| `getIndexTypeOfType(type, kind): Type \| undefined` | 索引类型（string/number 键对应值类型） |
| `getPropertySymbolOfDestructuringAssignment(location): Symbol \| undefined` | 解构赋值的属性符号 |
| `getTypeOfAssignmentPattern(pattern): Type` | 赋值模式的类型 |

### 示例

```ts
// 获取变量类型
ts.forEachChild(sourceFile, function visit(node) {
  if (ts.isVariableDeclaration(node) && node.name) {
    const type = checker.getTypeAtLocation(node.name);
    console.log(checker.typeToString(type));
  }
  ts.forEachChild(node, visit);
});

// 获取函数返回类型
const funcType = checker.getTypeAtLocation(funcNode);
const sigs = checker.getSignaturesOfType(funcType, ts.SignatureKind.Call);
if (sigs.length > 0) {
  const returnType = checker.getReturnTypeOfSignature(sigs[0]);
  console.log(checker.typeToString(returnType));
}
```

---

## 类型操作

| 方法签名 | 说明 |
|----------|------|
| `getWidenedType(type): Type` | 拓宽类型（字面量 → 基本类型） |
| `getNullableType(type, flags): Type` | 添加 `null` / `undefined` |
| `getNonNullableType(type): Type` | 去除 `null` / `undefined` |
| `getTypeArguments(typeRef): readonly Type[]` | 获取泛型实例的类型实参 |
| `getBaseTypes(type): BaseType[]` | 获取 class / interface 的基类型列表 |
| `getBaseTypeOfLiteralType(type): Type` | 字面量类型 → 基础类型 |
| `getApparentType(type): Type` | 获取显式类型（展开别名 / 映射等） |
| `getBaseConstraintOfType(type): Type \| undefined` | 类型参数的约束类型 |
| `getDefaultFromTypeParameter(type): Type \| undefined` | 类型参数的默认值 |
| `getAwaitedType(type): Type \| undefined` | `Awaited<T>`（TS 4.5+） |
| `isTupleType(type): boolean` | 是否元组类型 |
| `isArrayType(type): boolean` | 是否 `Array` 或 `ReadonlyArray` 类型 |
| `isArrayLikeType(type): boolean` | 是否可赋值给 `ReadonlyArray<any>` 的类数组类型 |
| `isValidPropertyAccess(node, propertyName): boolean` | 属性访问是否合法 |

---

## 类型关系判断

| 方法签名 | 说明 |
|----------|------|
| `isTypeAssignableTo(source, target): boolean` | `source` 是否可赋值给 `target` |

---

## 签名 / 重载

| 方法签名 | 说明 |
|----------|------|
| `getSignaturesOfType(type, kind): readonly Signature[]` | 获取调用或构造签名列表 |
| `getResolvedSignature(call, candidates?, argumentCount?): Signature \| undefined` | 解析调用的实际签名 |
| `getSignatureFromDeclaration(declaration): Signature \| undefined` | 从函数声明获取签名 |
| `isImplementationOfOverload(node): boolean \| undefined` | 是否为重载实现 |
| `getTypeArgumentsForResolvedSignature(sig): readonly Type[] \| undefined` | 已解析签名的类型实参 |

```ts
const type = checker.getTypeAtLocation(callExpr.expression);
const sigs = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
sigs.forEach(sig => {
  const params = sig.getParameters();
  const ret = sig.getReturnType();
  console.log(
    `(${params.map(p => p.getName()).join(', ')}) => ${checker.typeToString(ret)}`
  );
});
```

---

## 符号操作

| 方法签名 | 说明 |
|----------|------|
| `getPropertiesOfType(type): Symbol[]` | 类型的所有可枚举属性 |
| `getPropertyOfType(type, name): Symbol \| undefined` | 按名获取属性符号 |
| `getPrivateIdentifierPropertyOfType(leftType, name, location): Symbol \| undefined` | 私有标识符属性符号 |
| `getIndexInfosOfIndexSymbol(indexSymbol, siblingSymbols?): IndexInfo[]` | 通过索引符号获取索引信息 |
| `getAugmentedPropertiesOfType(type): Symbol[]` | 含原型链的完整属性列表 |
| `getExportsOfModule(moduleSymbol): Symbol[]` | 模块所有导出符号 |
| `getExportSymbolOfSymbol(symbol): Symbol` | 获取对应的导出符号 |
| `getAliasedSymbol(symbol): Symbol` | 解析 `import` 别名（递归到底） |
| `getImmediateAliasedSymbol(symbol): Symbol \| undefined` | 直接别名（不完全解析） |
| `tryGetMemberInModuleExports(name, moduleSymbol): Symbol \| undefined` | 按名查模块导出成员 |
| `getMergedSymbol(symbol): Symbol` | 获取合并后的符号 |
| `getRootSymbols(symbol): readonly Symbol[]` | 获取根符号集合（解构 / 解析） |
| `getFullyQualifiedName(symbol): string` | 完全限定名 |
| `getSymbolsOfParameterPropertyDeclaration(param, name): Symbol[]` | 参数属性声明对应的符号 |
| `getShorthandAssignmentValueSymbol(location): Symbol \| undefined` | 简写属性赋值的值符号 |
| `getExportSpecifierLocalTargetSymbol(location): Symbol \| undefined` | export 说明符的本地目标符号 |
| `getSymbolOfExpando(node, allowDeclaration): Symbol \| undefined` | JS 扩展对象的符号 |
| `getAmbientModules(): Symbol[]` | 所有 ambient 模块符号 |
| `getJsxIntrinsicTagNamesAt(location): Symbol[]` | 指定位置的 JSX 内建标签名符号 |
| `isUndefinedSymbol(symbol): boolean` | 是否为全局 `undefined` 符号 |
| `isArgumentsSymbol(symbol): boolean` | 是否为 `arguments` 符号 |
| `isUnknownSymbol(symbol): boolean` | 是否为 `unknown` 符号 |
| `isOptionalParameter(node): boolean` | 参数是否可选 |
| `resolveName(name, location, meaning, excludeGlobals): Symbol \| undefined` | 按名称解析符号 |

---

## 类型转字符串 / 节点

| 方法签名 | 说明 |
|----------|------|
| `typeToString(type, enclosingDeclaration?, flags?): string` | 类型 → 可读字符串 |
| `typePredicateToString(predicate, enclosing?, flags?): string` | 类型谓词 → 字符串 |
| `signatureToString(sig, enclosing?, flags?, kind?): string` | 签名 → 字符串 |
| `symbolToString(symbol, enclosing?, meaning?, flags?): string` | 符号 → 字符串表示 |
| `typeToTypeNode(type, enclosing?, flags?): TypeNode \| undefined` | 类型 → AST 类型节点 |
| `signatureToSignatureDeclaration(sig, kind, enclosing?, flags?): SignatureDeclaration \| undefined` | 签名 → 声明节点 |
| `indexInfoToIndexSignatureDeclaration(info, enclosing?, flags?): IndexSignatureDeclaration \| undefined` | 索引信息 → 声明节点 |
| `typeParameterToDeclaration(param, enclosing?, flags?): TypeParameterDeclaration \| undefined` | 类型参数 → 声明节点 |
| `symbolToEntityName(symbol, meaning, enclosing?, flags?): EntityName \| undefined` | 符号 → 实体名 AST 节点 |
| `symbolToExpression(symbol, meaning, enclosing?, flags?): Expression \| undefined` | 符号 → 表达式 AST 节点 |
| `symbolToTypeParameterDeclarations(symbol, enclosing?, flags?): NodeArray<TypeParameterDeclaration> \| undefined` | 符号 → 类型参数声明列表 |
| `symbolToParameterDeclaration(symbol, enclosing?, flags?): ParameterDeclaration \| undefined` | 符号 → 参数声明节点 |

### TypeFormatFlags

`TypeFormatFlags` 用于 `typeToString` / `typePredicateToString` 等方法的格式化输出。

| 标志 | 值 | 说明 |
|------|-------|------|
| `None` | 0 | 默认 |
| `NoTruncation` | 1 | 不截断长类型（默认会截断） |
| `WriteArrayAsGenericType` | 2 | `T[]` 写为 `Array<T>` |
| `GenerateNamesForShadowedTypeParams` | 4 | 为被遥蔽的类型参数生成名称 |
| `UseStructuralFallback` | 8 | 求解失败时尝试结构表示 |
| `WriteTypeArgumentsOfSignature` | 32 | 输出签名的类型实参 |
| `UseFullyQualifiedType` | 64 | 使用全限定类型名 |
| `SuppressAnyReturnType` | 256 | 隐藏 `any` 返回类型 |
| `MultilineObjectLiterals` | 1024 | 对象类型换行 |
| `WriteClassExpressionAsTypeLiteral` | 2048 | 类表达式写为类型字面量 |
| `UseTypeOfFunction` | 4096 | 写为 `typeof fn` 而非展开 |
| `OmitParameterModifiers` | 8192 | 省略参数修饰符 |
| `UseAliasDefinedOutsideCurrentScope` | 16384 | 使用当前作用域外定义的别名 |
| `AllowUniqueESSymbolType` | 1048576 | 允许 `unique symbol` 输出 |
| `AddUndefined` | 131072 | 添加 `\| undefined` |
| `WriteArrowStyleSignature` | 262144 | 使用箭头函数风格输出签名 |
| `InArrayType` | 524288 | 表示当前在数组类型内（控制括号） |
| `InElementType` | 2097152 | 元组/数组元素类型内 |
| `InFirstTypeArgument` | 4194304 | 第一个类型实参内 |
| `InTypeAlias` | 8388608 | `type` 别名内（避免递归展开） |
| `OmitThisParameter` | 33554432 | 省略 `this` 参数 |
| `UseSingleQuotesForStringLiteralType` | 268435456 | 字符串字面量类型使用单引号 |
| `NoTypeReduction` | 536870912 | 禁止类型化简 |
| `NodeBuilderFlagsMask` | 848330095 | `NodeBuilderFlags` 的掩码 |

### NodeBuilderFlags

`NodeBuilderFlags` 用于 `typeToTypeNode` / `symbolToEntityName` 等将类型/符号转为 AST 节点的操作。

| 标志 | 值 | 说明 |
|------|-------|------|
| `None` | 0 | 默认 |
| `NoTruncation` | 1 | 不截断 |
| `WriteArrayAsGenericType` | 2 | `T[]` 写为 `Array<T>` |
| `GenerateNamesForShadowedTypeParams` | 4 | 为被遥蔽的类型参数生成名称 |
| `UseStructuralFallback` | 8 | 尝试结构表示 |
| `ForbidIndexedAccessSymbolReferences` | 16 | 禁止索引访问符号引用 |
| `WriteTypeArgumentsOfSignature` | 32 | 输出签名的类型实参 |
| `UseFullyQualifiedType` | 64 | 使用全限定类型名 |
| `UseOnlyExternalAliasing` | 128 | 只使用外部别名 |
| `SuppressAnyReturnType` | 256 | 隐藏 `any` 返回类型 |
| `WriteTypeParametersInQualifiedName` | 512 | 在限定名中写类型参数 |
| `MultilineObjectLiterals` | 1024 | 对象类型换行 |
| `WriteClassExpressionAsTypeLiteral` | 2048 | 类表达式写为类型字面量 |
| `UseTypeOfFunction` | 4096 | 写为 `typeof fn` |
| `OmitParameterModifiers` | 8192 | 省略参数修饰符 |
| `UseAliasDefinedOutsideCurrentScope` | 16384 | 使用当前作用域外别名 |
| `AllowThisInObjectLiteral` | 32768 | 允许对象字面量中使用 `this` |
| `AllowQualifiedNameInPlaceOfIdentifier` | 65536 | 允许限定名代替标识符 |
| `AllowAnonymousIdentifier` | 131072 | 允许匿名标识符 |
| `AllowEmptyUnionOrIntersection` | 262144 | 允许空联合/交叉类型 |
| `AllowEmptyTuple` | 524288 | 允许空元组 |
| `AllowUniqueESSymbolType` | 1048576 | 允许 `unique symbol` |
| `AllowEmptyIndexInfoType` | 2097152 | 允许空索引信息类型 |
| `AllowNodeModulesRelativePaths` | 67108864 | 允许 node_modules 相对路径 |
| `OmitThisParameter` | 33554432 | 省略 `this` 参数 |
| `UseSingleQuotesForStringLiteralType` | 268435456 | 字符串字面量类型使用单引号 |
| `NoTypeReduction` | 536870912 | 禁止类型化简 |
| `InObjectTypeLiteral` | 4194304 | 在对象类型字面量内 |
| `InTypeAlias` | 8388608 | `type` 别名内 |
| `InInitialEntityName` | 16777216 | 初始实体名内 |
| `IgnoreErrors` | 70221824 | 忽略错误（多个标志的复合） |

---

## 内建类型获取

| 方法签名 | 说明 |
|----------|------|
| `getAnyType(): Type` | 获取 `any` 类型（勿用于相等判断，用 `flags & TypeFlags.Any`） |
| `getUnknownType(): Type` | 获取 `unknown` 类型 |
| `getStringType(): Type` | 获取 `string` 类型 |
| `getNumberType(): Type` | 获取 `number` 类型 |
| `getBigIntType(): Type` | 获取 `bigint` 类型 |
| `getBooleanType(): Type` | 获取 `boolean` 类型 |
| `getVoidType(): Type` | 获取 `void` 类型 |
| `getUndefinedType(): Type` | 获取 `undefined` 类型（勿用于相等判断） |
| `getNullType(): Type` | 获取 `null` 类型（勿用于相等判断） |
| `getESSymbolType(): Type` | 获取 `symbol` 类型 |
| `getNeverType(): Type` | 获取 `never` 类型（勿用于相等判断） |
| `getNonPrimitiveType(): Type` | 获取 `object`（小写）类型 |
| `getFalseType(): Type` | 获取 `false` 字面量类型 |
| `getTrueType(): Type` | 获取 `true` 字面量类型 |
| `getStringLiteralType(value): StringLiteralType` | 创建字符串字面量类型 |
| `getNumberLiteralType(value): NumberLiteralType` | 创建数字字面量类型 |
| `getBigIntLiteralType(value): BigIntLiteralType` | 创建 bigint 字面量类型 |

---

## 诊断 / 控制流

| 方法签名 | 说明 |
|----------|------|
| `getConstantValue(node): string \| number \| undefined` | 枚举成员 / `const` 的常量值 |
| `runWithCancellationToken(token, cb): T` | 带取消令牌执行（长时运算支持中断） |

---

## 完整查询示例

```ts
import ts from 'typescript';

const program = ts.createProgram(['app.ts'], {
  target: ts.ScriptTarget.ES2022,
  strict: true,
});
const checker = program.getTypeChecker();
const sf = program.getSourceFile('app.ts')!;

function inspectNode(node: ts.Node) {
  // 1. 类型信息
  const type = checker.getTypeAtLocation(node);
  console.log('type:', checker.typeToString(type));

  // 2. 符号信息
  const sym = checker.getSymbolAtLocation(node);
  if (sym) {
    console.log('symbol:', sym.getName(), '  flags:', sym.flags);
    console.log('docs:', sym.getDocumentationComment(checker).map(p => p.text).join(''));
  }

  // 3. 展开属性
  const props = checker.getPropertiesOfType(type);
  props.forEach(p => {
    const propType = checker.getTypeOfSymbol(p);
    console.log(' .', p.getName(), ':', checker.typeToString(propType));
  });
}
```

---

## @internal 方法

以下方法**存在于运行时 `checker` 对象**，但不在 `typescript.d.ts` 中声明。需通过 `(checker as any).xxx()` 访问，不保证版本间稳定性。

:::warning
`@internal` 方法随 TypeScript 版本可能变更或移除，生产代码中使用需谨慎。
:::

### 类型操作（@internal）

| 方法签名 | 说明 |
|----------|------|
| `getNonOptionalType(type): Type` | 去除 `undefined`（可选标记） `(@internal)` |
| `getOptionalType(): Type` | 获取可选标记类型 `(@internal)` |
| `getUnionType(types, subtypeReduction?): Type` | 构造联合类型 `(@internal)` |
| `getWidenedLiteralType(type): Type` | 字面量类型拓宽 `(@internal)` |
| `getPromisedTypeOfPromise(promise, errorNode?): Type \| undefined` | `Promise<T>` 的 `T` `(@internal)` |
| `isNullableType(type): boolean` | 是否可空 `(@internal)` |
| `getIndexType(type): Type` | 获取 `keyof T` 类型 `(@internal)` |
| `getElementTypeOfArrayType(type): Type \| undefined` | 数组元素类型 `(@internal)` |
| `fillMissingTypeArguments(typeArguments, typeParameters, minTypeArgumentCount, isJavaScriptImplicitAny): Type[]` | 补全缺失的类型实参 `(@internal)` |

### 签名（@internal）

| 方法签名 | 说明 |
|----------|------|
| `getResolvedSignatureForSignatureHelp(call, candidates?, argumentCount?): Signature \| undefined` | 签名帮助专用（禁用缓存） `(@internal)` |
| `getExpandedParameters(sig): readonly (readonly Symbol[])[]` | 展开 rest 参数后的参数列表 `(@internal)` |
| `hasEffectiveRestParameter(sig): boolean` | 签名是否有 rest 参数 `(@internal)` |
| `containsArgumentsReference(declaration): boolean` | 函数体是否引用 `arguments` `(@internal)` |
| `getParameterType(sig, paramIndex): Type` | 签名中指定位置的参数类型 `(@internal)` |

### 符号 / 模块（@internal）

| 方法签名 | 说明 |
|----------|------|
| `tryFindAmbientModule(moduleName): Symbol \| undefined` | 查找 ambient 模块符号 `(@internal)` |
| `tryGetMemberInModuleExportsAndProperties(name, moduleSymbol): Symbol \| undefined` | 在导出及属性中查找成员 `(@internal)` |
| `getExportsAndPropertiesOfModule(moduleSymbol): Symbol[]` | 模块导出及属性 `(@internal)` |
| `symbolIsValue(symbol): boolean` | 符号是否在值空间 `(@internal)` |
| `getSymbolFlags(symbol): SymbolFlags` | 获取符号标志（含合并） `(@internal)` |
| `getSymbolWalker(accept?): SymbolWalker` | 符号遍历器 `(@internal)` |
| `isSymbolAccessible(symbol, enclosingDeclaration, meaning, shouldComputeAliasesToMakeVisible): SymbolAccessibilityResult` | 符号是否可访问 `(@internal)` |

### 诊断（@internal）

| 方法签名 | 说明 |
|----------|------|
| `getDiagnostics(sourceFile?, ct?): readonly Diagnostic[]` | 获取语义诊断 `(@internal)` |
| `getGlobalDiagnostics(): readonly Diagnostic[]` | 全局诊断 `(@internal)` |
| `getSuggestionDiagnostics(file, ct?): DiagnosticWithLocation[]` | 建议类诊断 `(@internal)` |

### 上下文类型（@internal）

| 方法签名 | 说明 |
|----------|------|
| `getContextualTypeForObjectLiteralElement(node): Type \| undefined` | 对象字面量成员的上下文类型 `(@internal)` |
| `getContextualTypeForArgumentAtIndex(node, argIndex): Type \| undefined` | 函数调用特定参数的上下文类型 `(@internal)` |
| `getContextualTypeForJsxAttribute(node): Type \| undefined` | JSX 属性的上下文类型 `(@internal)` |
| `getTypeOfPropertyOfContextualType(type, name): Type \| undefined` | 上下文类型的特定属性类型 `(@internal)` |
| `isContextSensitive(node): boolean` | 节点是否对上下文类型敏感 `(@internal)` |

### 其他（@internal）

| 方法签名 | 说明 |
|----------|------|
| `createAnonymousType(symbol, members, callSignatures, constructSignatures, indexInfos): ResolvedType` | 创建匿名对象类型 `(@internal)` |
| `createSignature(declaration, typeParameters, thisParameter, parameters, resolvedReturnType, resolvedTypePredicate, minArgumentCount, flags): Signature` | 创建签名对象 `(@internal)` |
| `createSymbol(flags, name): TransientSymbol` | 创建临时符号 `(@internal)` |
| `createIndexInfo(keyType, type, isReadonly, declaration?): IndexInfo` | 创建索引信息 `(@internal)` |
| `createArrayType(elementType, readonly?): ObjectType` | 创建数组类型 `(@internal)` |
| `createPromiseType(type): Type` | 创建 `Promise<T>` 类型 `(@internal)` |
| `getTypeArgumentConstraint(node): Type \| undefined` | 类型实参处的约束 `(@internal)` |
| `resolveExternalModuleName(moduleSpecifier): Symbol \| undefined` | 解析模块说明符符号 `(@internal)` |
| `resolveExternalModuleSymbol(symbol): Symbol` | 解析模块符号（展开 `export =`） `(@internal)` |
| `tryGetThisTypeAt(node, includeGlobalThis?, container?): Type \| undefined` | 指定位置的 `this` 类型 `(@internal)` |
| `typeHasCallOrConstructSignatures(type): boolean` | 类型是否有调用或构造签名 `(@internal)` |
| `isDeclarationVisible(node): boolean` | 声明是否可见（用于 .d.ts 生成） `(@internal)` |
| `isPropertyAccessible(node, isSuper, isWrite, containingType, property): boolean` | 属性访问是否合法（含可见性检查） `(@internal)` |
| `isValidPropertyAccessForCompletions(node, type, property): boolean` | 属性是否可在补全中访问 `(@internal)` |
| `getRecursionIdentity(type): object` | 类型的递归标识对象 `(@internal)` |
