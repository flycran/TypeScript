
# 实用函数 & 类型守卫

---

## 类型守卫（ts.isXxx）

TypeScript 为**所有节点类型**提供了 `ts.isXxx(node): node is XxxNode` 形式的类型守卫。

### 标识符 & Token 守卫

| 函数 | 对应接口 |
|------|---------|
| `ts.isIdentifier(node)` | `Identifier` |
| `ts.isPrivateIdentifier(node)` | `PrivateIdentifier` |
| `ts.isQualifiedName(node)` | `QualifiedName` |
| `ts.isComputedPropertyName(node)` | `ComputedPropertyName` |
| `ts.isToken(node)` | 任意 Token 节点 |
| `ts.isTokenKind(kind)` | `SyntaxKind` 是否为 Token 类型 |
| `ts.isDotDotDotToken(node)` | `...` Token |
| `ts.isPlusToken(node)` | `+` Token |
| `ts.isMinusToken(node)` | `-` Token |
| `ts.isAsteriskToken(node)` | `*` Token |
| `ts.isExclamationToken(node)` | `!` Token |
| `ts.isQuestionToken(node)` | `?` Token |
| `ts.isColonToken(node)` | `:` Token |
| `ts.isQuestionDotToken(node)` | `?.` Token |
| `ts.isEqualsGreaterThanToken(node)` | `=>` Token |
| `ts.isAssertsKeyword(node)` | `asserts` 关键字 |
| `ts.isAwaitKeyword(node)` | `await` 关键字 |

### 字面量守卫

| 函数 | 对应接口 |
|------|---------|
| `ts.isStringLiteral(node)` | `StringLiteral` |
| `ts.isNumericLiteral(node)` | `NumericLiteral` |
| `ts.isBigIntLiteral(node)` | `BigIntLiteral` |
| `ts.isRegularExpressionLiteral(node)` | `RegularExpressionLiteral` |
| `ts.isNoSubstitutionTemplateLiteral(node)` | `NoSubstitutionTemplateLiteral` |
| `ts.isTemplateHead(node)` | `TemplateHead` |
| `ts.isTemplateMiddle(node)` | `TemplateMiddle` |
| `ts.isTemplateTail(node)` | `TemplateTail` |
| `ts.isLiteralExpression(node)` | 任意 `LiteralExpression` |
| `ts.isTemplateLiteralToken(node)` | 任意模板字面量 Token |
| `ts.isTemplateMiddleOrTemplateTail(node)` | `TemplateMiddle \| TemplateTail` |
| `ts.isTemplateLiteral(node)` | `TemplateLiteral`（含插值） |
| `ts.isJsxText(node)` | `JsxText` |

### 类型节点守卫

| 函数 | 对应接口 |
|------|---------|
| `ts.isTypeNode(node)` | 任意 `TypeNode` |
| `ts.isTypeReferenceNode(node)` | `TypeReferenceNode` |
| `ts.isTypeQueryNode(node)` | `TypeQueryNode`（`typeof T`） |
| `ts.isTypeLiteralNode(node)` | `TypeLiteralNode`（`{ ... }`） |
| `ts.isUnionTypeNode(node)` | `UnionTypeNode` |
| `ts.isIntersectionTypeNode(node)` | `IntersectionTypeNode` |
| `ts.isConditionalTypeNode(node)` | `ConditionalTypeNode` |
| `ts.isMappedTypeNode(node)` | `MappedTypeNode` |
| `ts.isTemplateLiteralTypeNode(node)` | `TemplateLiteralTypeNode` |
| `ts.isTemplateLiteralTypeSpan(node)` | `TemplateLiteralTypeSpan` |
| `ts.isIndexedAccessTypeNode(node)` | `IndexedAccessTypeNode` |
| `ts.isTypeOperatorNode(node)` | `TypeOperatorNode`（keyof / unique / readonly） |
| `ts.isTypePredicateNode(node)` | `TypePredicateNode` |
| `ts.isFunctionTypeNode(node)` | `FunctionTypeNode` |
| `ts.isConstructorTypeNode(node)` | `ConstructorTypeNode` |
| `ts.isArrayTypeNode(node)` | `ArrayTypeNode` |
| `ts.isTupleTypeNode(node)` | `TupleTypeNode` |
| `ts.isNamedTupleMember(node)` | `NamedTupleMember` |
| `ts.isOptionalTypeNode(node)` | `OptionalTypeNode` |
| `ts.isRestTypeNode(node)` | `RestTypeNode` |
| `ts.isLiteralTypeNode(node)` | `LiteralTypeNode` |
| `ts.isImportTypeNode(node)` | `ImportTypeNode` |
| `ts.isInferTypeNode(node)` | `InferTypeNode` |
| `ts.isParenthesizedTypeNode(node)` | `ParenthesizedTypeNode` |
| `ts.isThisTypeNode(node)` | `ThisTypeNode` |
| `ts.isFunctionOrConstructorTypeNode(node)` | `FunctionTypeNode \| ConstructorTypeNode` |
| `ts.isIdentifierOrThisTypeNode(node)` | `Identifier \| ThisTypeNode` |
| `ts.isConstTypeReference(node)` | `const` 类型引用 |

### 声明节点守卫

| 函数 | 对应接口 |
|------|---------|
| `ts.isTypeParameterDeclaration(node)` | `TypeParameterDeclaration` |
| `ts.isParameter(node)` | `ParameterDeclaration` |
| `ts.isDecorator(node)` | `Decorator` |
| `ts.isPropertySignature(node)` | `PropertySignature` |
| `ts.isPropertyDeclaration(node)` | `PropertyDeclaration` |
| `ts.isMethodSignature(node)` | `MethodSignature` |
| `ts.isMethodDeclaration(node)` | `MethodDeclaration` |
| `ts.isConstructorDeclaration(node)` | `ConstructorDeclaration` |
| `ts.isGetAccessorDeclaration(node)` | `GetAccessorDeclaration` |
| `ts.isSetAccessorDeclaration(node)` | `SetAccessorDeclaration` |
| `ts.isClassStaticBlockDeclaration(node)` | `ClassStaticBlockDeclaration` |
| `ts.isCallSignatureDeclaration(node)` | `CallSignatureDeclaration` |
| `ts.isConstructSignatureDeclaration(node)` | `ConstructSignatureDeclaration` |
| `ts.isIndexSignatureDeclaration(node)` | `IndexSignatureDeclaration` |
| `ts.isInterfaceDeclaration(node)` | `InterfaceDeclaration` |
| `ts.isTypeAliasDeclaration(node)` | `TypeAliasDeclaration` |
| `ts.isEnumDeclaration(node)` | `EnumDeclaration` |
| `ts.isEnumMember(node)` | `EnumMember` |
| `ts.isClassDeclaration(node)` | `ClassDeclaration` |
| `ts.isClassExpression(node)` | `ClassExpression` |
| `ts.isFunctionDeclaration(node)` | `FunctionDeclaration` |
| `ts.isVariableDeclaration(node)` | `VariableDeclaration` |
| `ts.isVariableDeclarationList(node)` | `VariableDeclarationList` |
| `ts.isHeritageClause(node)` | `HeritageClause` |
| `ts.isExpressionWithTypeArguments(node)` | `ExpressionWithTypeArguments` |
| `ts.isMissingDeclaration(node)` | `MissingDeclaration` |
| `ts.isParameterPropertyDeclaration(node, parent)` | `ParameterPropertyDeclaration` |

### 绑定模式守卫

| 函数 | 对应接口 |
|------|---------|
| `ts.isObjectBindingPattern(node)` | `ObjectBindingPattern` |
| `ts.isArrayBindingPattern(node)` | `ArrayBindingPattern` |
| `ts.isBindingElement(node)` | `BindingElement` |
| `ts.isEmptyBindingPattern(node)` | 空 `BindingPattern` |
| `ts.isEmptyBindingElement(node)` | 空 `BindingElement` |
| `ts.isArrayBindingElement(node)` | `ArrayBindingElement` |

### 表达式节点守卫

| 函数 | 对应接口 |
|------|---------|
| `ts.isArrayLiteralExpression(node)` | `ArrayLiteralExpression` |
| `ts.isObjectLiteralExpression(node)` | `ObjectLiteralExpression` |
| `ts.isPropertyAccessExpression(node)` | `PropertyAccessExpression` |
| `ts.isElementAccessExpression(node)` | `ElementAccessExpression` |
| `ts.isCallExpression(node)` | `CallExpression` |
| `ts.isNewExpression(node)` | `NewExpression` |
| `ts.isTaggedTemplateExpression(node)` | `TaggedTemplateExpression` |
| `ts.isTypeAssertionExpression(node)` | `TypeAssertion`（`<T>expr`） |
| `ts.isParenthesizedExpression(node)` | `ParenthesizedExpression` |
| `ts.isFunctionExpression(node)` | `FunctionExpression` |
| `ts.isArrowFunction(node)` | `ArrowFunction` |
| `ts.isDeleteExpression(node)` | `DeleteExpression` |
| `ts.isTypeOfExpression(node)` | `TypeOfExpression` |
| `ts.isVoidExpression(node)` | `VoidExpression` |
| `ts.isAwaitExpression(node)` | `AwaitExpression` |
| `ts.isPrefixUnaryExpression(node)` | `PrefixUnaryExpression` |
| `ts.isPostfixUnaryExpression(node)` | `PostfixUnaryExpression` |
| `ts.isBinaryExpression(node)` | `BinaryExpression` |
| `ts.isConditionalExpression(node)` | `ConditionalExpression` |
| `ts.isTemplateExpression(node)` | `TemplateExpression` |
| `ts.isYieldExpression(node)` | `YieldExpression` |
| `ts.isSpreadElement(node)` | `SpreadElement` |
| `ts.isOmittedExpression(node)` | `OmittedExpression` |
| `ts.isAsExpression(node)` | `AsExpression`（`expr as T`） |
| `ts.isSatisfiesExpression(node)` | `SatisfiesExpression`（`expr satisfies T`） |
| `ts.isNonNullExpression(node)` | `NonNullExpression`（`expr!`） |
| `ts.isMetaProperty(node)` | `MetaProperty`（`new.target` 等） |
| `ts.isTemplateSpan(node)` | `TemplateSpan` |
| `ts.isPropertyAssignment(node)` | `PropertyAssignment` |
| `ts.isShorthandPropertyAssignment(node)` | `ShorthandPropertyAssignment` |
| `ts.isSpreadAssignment(node)` | `SpreadAssignment` |
| `ts.isSourceFile(node)` | `SourceFile` |

### 语句节点守卫

| 函数 | 对应接口 |
|------|---------|
| `ts.isBlock(node)` | `Block` |
| `ts.isVariableStatement(node)` | `VariableStatement` |
| `ts.isEmptyStatement(node)` | `EmptyStatement` |
| `ts.isExpressionStatement(node)` | `ExpressionStatement` |
| `ts.isIfStatement(node)` | `IfStatement` |
| `ts.isDoStatement(node)` | `DoStatement` |
| `ts.isWhileStatement(node)` | `WhileStatement` |
| `ts.isForStatement(node)` | `ForStatement` |
| `ts.isForInStatement(node)` | `ForInStatement` |
| `ts.isForOfStatement(node)` | `ForOfStatement` |
| `ts.isContinueStatement(node)` | `ContinueStatement` |
| `ts.isBreakStatement(node)` | `BreakStatement` |
| `ts.isReturnStatement(node)` | `ReturnStatement` |
| `ts.isWithStatement(node)` | `WithStatement` |
| `ts.isSwitchStatement(node)` | `SwitchStatement` |
| `ts.isLabeledStatement(node)` | `LabeledStatement` |
| `ts.isThrowStatement(node)` | `ThrowStatement` |
| `ts.isTryStatement(node)` | `TryStatement` |
| `ts.isDebuggerStatement(node)` | `DebuggerStatement` |
| `ts.isCaseClause(node)` | `CaseClause` |
| `ts.isDefaultClause(node)` | `DefaultClause` |
| `ts.isCatchClause(node)` | `CatchClause` |
| `ts.isCaseBlock(node)` | `CaseBlock` |
| `ts.isSemicolonClassElement(node)` | `SemicolonClassElement` |
| `ts.isBreakOrContinueStatement(node)` | `BreakOrContinueStatement` |
| `ts.isIterationStatement(node, lookInLabeled)` | `IterationStatement`（可含 `LabeledStatement`） |

### 模块 / 导入导出守卫

| 函数 | 对应接口 |
|------|---------|
| `ts.isModuleDeclaration(node)` | `ModuleDeclaration` |
| `ts.isModuleBlock(node)` | `ModuleBlock` |
| `ts.isNamespaceExportDeclaration(node)` | `NamespaceExportDeclaration` |
| `ts.isImportEqualsDeclaration(node)` | `ImportEqualsDeclaration` |
| `ts.isImportDeclaration(node)` | `ImportDeclaration` |
| `ts.isImportClause(node)` | `ImportClause` |
| `ts.isNamespaceImport(node)` | `NamespaceImport` |
| `ts.isNamedImports(node)` | `NamedImports` |
| `ts.isImportSpecifier(node)` | `ImportSpecifier` |
| `ts.isImportAttributes(node)` | `ImportAttributes` |
| `ts.isImportAttribute(node)` | `ImportAttribute` |
| `ts.isExportAssignment(node)` | `ExportAssignment` |
| `ts.isExportDeclaration(node)` | `ExportDeclaration` |
| `ts.isNamedExports(node)` | `NamedExports` |
| `ts.isNamespaceExport(node)` | `NamespaceExport` |
| `ts.isExportSpecifier(node)` | `ExportSpecifier` |
| `ts.isModuleExportName(node)` | `ModuleExportName` |
| `ts.isExternalModuleReference(node)` | `ExternalModuleReference` |
| `ts.isImportOrExportSpecifier(node)` | `ImportSpecifier \| ExportSpecifier` |
| `ts.isNamedExportBindings(node)` | `NamedExportBindings` |
| `ts.isNamedImportBindings(node)` | `NamedImportBindings` |
| `ts.isTypeOnlyImportDeclaration(node)` | `TypeOnlyImportDeclaration` |
| `ts.isTypeOnlyExportDeclaration(node)` | `TypeOnlyExportDeclaration` |
| `ts.isTypeOnlyImportOrExportDeclaration(node)` | `TypeOnlyAliasDeclaration` |

### JSX 节点守卫

| 函数 | 对应接口 |
|------|---------|
| `ts.isJsxElement(node)` | `JsxElement` |
| `ts.isJsxSelfClosingElement(node)` | `JsxSelfClosingElement` |
| `ts.isJsxOpeningElement(node)` | `JsxOpeningElement` |
| `ts.isJsxClosingElement(node)` | `JsxClosingElement` |
| `ts.isJsxFragment(node)` | `JsxFragment` |
| `ts.isJsxOpeningFragment(node)` | `JsxOpeningFragment` |
| `ts.isJsxClosingFragment(node)` | `JsxClosingFragment` |
| `ts.isJsxAttribute(node)` | `JsxAttribute` |
| `ts.isJsxAttributes(node)` | `JsxAttributes` |
| `ts.isJsxSpreadAttribute(node)` | `JsxSpreadAttribute` |
| `ts.isJsxExpression(node)` | `JsxExpression` |
| `ts.isJsxNamespacedName(node)` | `JsxNamespacedName` |
| `ts.isJsxOpeningLikeElement(node)` | `JsxOpeningLikeElement` |
| `ts.isJsxChild(node)` | `JsxChild` |
| `ts.isJsxAttributeLike(node)` | `JsxAttributeLike` |
| `ts.isJsxCallLike(node)` | `JsxCallLike` |
| `ts.isJsxTagNameExpression(node)` | `JsxTagNameExpression` |
| `ts.isStringLiteralOrJsxExpression(node)` | `StringLiteral \| JsxExpression` |

### JSDoc 节点守卫

| 函数 | 对应接口 |
|------|---------|
| `ts.isJSDoc(node)` | `JSDoc` |
| `ts.isJSDocTypeExpression(node)` | `JSDocTypeExpression` |
| `ts.isJSDocNameReference(node)` | `JSDocNameReference` |
| `ts.isJSDocMemberName(node)` | `JSDocMemberName` |
| `ts.isJSDocLink(node)` | `JSDocLink` |
| `ts.isJSDocLinkCode(node)` | `JSDocLinkCode` |
| `ts.isJSDocLinkPlain(node)` | `JSDocLinkPlain` |
| `ts.isJSDocLinkLike(node)` | `JSDocLink \| JSDocLinkCode \| JSDocLinkPlain` |
| `ts.isJSDocAllType(node)` | `JSDocAllType` |
| `ts.isJSDocUnknownType(node)` | `JSDocUnknownType` |
| `ts.isJSDocNullableType(node)` | `JSDocNullableType` |
| `ts.isJSDocNonNullableType(node)` | `JSDocNonNullableType` |
| `ts.isJSDocOptionalType(node)` | `JSDocOptionalType` |
| `ts.isJSDocFunctionType(node)` | `JSDocFunctionType` |
| `ts.isJSDocVariadicType(node)` | `JSDocVariadicType` |
| `ts.isJSDocNamepathType(node)` | `JSDocNamepathType` |
| `ts.isJSDocTypeLiteral(node)` | `JSDocTypeLiteral` |
| `ts.isJSDocSignature(node)` | `JSDocSignature` |
| `ts.isJSDocTag(node)` | 任意 JSDoc 标签 |
| `ts.isJSDocPropertyLikeTag(node)` | `JSDocPropertyLikeTag` |
| `ts.isJSDocAugmentsTag(node)` | `JSDocAugmentsTag` |
| `ts.isJSDocAuthorTag(node)` | `JSDocAuthorTag` |
| `ts.isJSDocClassTag(node)` | `JSDocClassTag` |
| `ts.isJSDocCallbackTag(node)` | `JSDocCallbackTag` |
| `ts.isJSDocPublicTag(node)` | `JSDocPublicTag` |
| `ts.isJSDocPrivateTag(node)` | `JSDocPrivateTag` |
| `ts.isJSDocProtectedTag(node)` | `JSDocProtectedTag` |
| `ts.isJSDocReadonlyTag(node)` | `JSDocReadonlyTag` |
| `ts.isJSDocOverrideTag(node)` | `JSDocOverrideTag` |
| `ts.isJSDocOverloadTag(node)` | `JSDocOverloadTag` |
| `ts.isJSDocDeprecatedTag(node)` | `JSDocDeprecatedTag` |
| `ts.isJSDocSeeTag(node)` | `JSDocSeeTag` |
| `ts.isJSDocEnumTag(node)` | `JSDocEnumTag` |
| `ts.isJSDocParameterTag(node)` | `JSDocParameterTag` |
| `ts.isJSDocReturnTag(node)` | `JSDocReturnTag` |
| `ts.isJSDocThisTag(node)` | `JSDocThisTag` |
| `ts.isJSDocTypeTag(node)` | `JSDocTypeTag` |
| `ts.isJSDocTemplateTag(node)` | `JSDocTemplateTag` |
| `ts.isJSDocTypedefTag(node)` | `JSDocTypedefTag` |
| `ts.isJSDocUnknownTag(node)` | `JSDocUnknownTag` |
| `ts.isJSDocPropertyTag(node)` | `JSDocPropertyTag` |
| `ts.isJSDocImplementsTag(node)` | `JSDocImplementsTag` |
| `ts.isJSDocSatisfiesTag(node)` | `JSDocSatisfiesTag` |
| `ts.isJSDocThrowsTag(node)` | `JSDocThrowsTag` |
| `ts.isJSDocImportTag(node)` | `JSDocImportTag` |

### 通用 / 复合守卫

| 函数 | 说明 |
|------|------|
| `ts.isDeclaration(node)` | 是否为声明节点 |
| `ts.isDeclarationStatement(node)` | 是否为声明语句 |
| `ts.isStatement(node)` | 是否为语句 |
| `ts.isExpression(node)` | 是否为表达式 |
| `ts.isLeftHandSideExpression(node)` | 是否为左值表达式 |
| `ts.isLiteralExpression(node)` | 是否为字面量表达式 |
| `ts.isLiteralTypeLiteral(node)` | `NullLiteral \| BooleanLiteral \| LiteralExpression \| PrefixUnaryExpression` |
| `ts.isAssertionExpression(node)` | `AsExpression \| TypeAssertion` |
| `ts.isCallOrNewExpression(node)` | `CallExpression \| NewExpression` |
| `ts.isCallLikeExpression(node)` | `CallLikeExpression` |
| `ts.isFunctionLike(node)` | 是否为函数类节点（`SignatureDeclaration`） |
| `ts.isClassLike(node)` | `ClassLikeDeclaration` |
| `ts.isClassElement(node)` | `ClassElement` |
| `ts.isClassOrTypeElement(node)` | `ClassElement \| TypeElement` |
| `ts.isTypeElement(node)` | `TypeElement` |
| `ts.isAccessor(node)` | `AccessorDeclaration` |
| `ts.isAutoAccessorPropertyDeclaration(node)` | `AutoAccessorPropertyDeclaration` |
| `ts.isModifier(node)` | `Modifier` |
| `ts.isModifierLike(node)` | `ModifierLike` |
| `ts.isEntityName(node)` | `EntityName`（`Identifier \| QualifiedName`） |
| `ts.isPropertyName(node)` | `PropertyName` |
| `ts.isBindingName(node)` | `BindingName` |
| `ts.isMemberName(node)` | `MemberName` |
| `ts.isModuleName(node)` | `ModuleName` |
| `ts.isModuleBody(node)` | `ModuleBody` |
| `ts.isModuleReference(node)` | `ModuleReference` |
| `ts.isObjectLiteralElementLike(node)` | `ObjectLiteralElementLike` |
| `ts.isObjectLiteralElement(node)` | `ObjectLiteralElement` |
| `ts.isCaseOrDefaultClause(node)` | `CaseOrDefaultClause` |
| `ts.isConciseBody(node)` | `ConciseBody` |
| `ts.isForInitializer(node)` | `ForInitializer` |
| `ts.isStringLiteralLike(node)` | `StringLiteralLike`（含 JSX） |
| `ts.isStringTextContainingNode(node)` | `StringLiteral \| TemplateLiteralToken` |
| `ts.isPropertyAccessOrQualifiedName(node)` | `PropertyAccessExpression \| QualifiedName` |
| `ts.isPropertyAccessChain(node)` | `PropertyAccessChain`（可选链） |
| `ts.isElementAccessChain(node)` | `ElementAccessChain`（可选链） |
| `ts.isCallChain(node)` | `CallChain`（可选链） |
| `ts.isOptionalChain(node)` | 任意可选链节点 |
| `ts.isNonNullChain(node)` | `NonNullChain` |
| `ts.isNullishCoalesce(node)` | `??` 表达式 |
| `ts.isImportAttributeName(node)` | `ImportAttributeName` |
| `ts.isPartOfTypeNode(node)` | 是否为类型节点的一部分 |
| `ts.isParseTreeNode(node)` | 是否源自解析树（非合成） |
| `ts.isSetAccessor(node)` | `SetAccessorDeclaration` |
| `ts.isGetAccessor(node)` | `GetAccessorDeclaration` |
| `ts.canHaveModifiers(node)` | `HasModifiers` |
| `ts.canHaveDecorators(node)` | `HasDecorators` |
| `ts.isBinaryOperatorToken(node)` | `BinaryOperatorToken` |
| `ts.isReadonlyKeywordOrPlusOrMinusToken(node)` | `ReadonlyKeyword \| PlusToken \| MinusToken` |
| `ts.isQuestionOrPlusOrMinusToken(node)` | `QuestionToken \| PlusToken \| MinusToken` |
| `ts.isQuestionOrExclamationToken(node)` | `QuestionToken \| ExclamationToken` |

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

### 标识符 & Token 工厂

| 方法 | 说明 |
|------|------|
| `ts.factory.createIdentifier(text)` | 创建标识符 |
| `ts.factory.createPrivateIdentifier(text)` | 创建私有标识符（`#name`） |
| `ts.factory.createTempVariable(recordTempVariable?, reservedInNestedScopes?)` | 创建临时变量（`_a`等） |
| `ts.factory.createLoopVariable(reservedInNestedScopes?)` | 创建循环临时变量 |
| `ts.factory.createUniqueName(text, flags?)` | 创建全局唯一名称 |
| `ts.factory.createToken(token)` | 创建任意 Token（关键字/标点） |
| `ts.factory.createModifier(kind)` | 创建修饰符 Token（`public` / `async` 等） |
| `ts.factory.createModifiersFromModifierFlags(flags)` | 根据 `ModifierFlags` 生成修饰符数组 |
| `ts.factory.createSuper()` | `super` |
| `ts.factory.createThis()` | `this` |
| `ts.factory.createNull()` | `null` |
| `ts.factory.createTrue()` | `true` |
| `ts.factory.createFalse()` | `false` |
| `ts.factory.createQualifiedName(left, right)` | `A.B` 实体名 |
| `ts.factory.createComputedPropertyName(expression)` | `[expr]` 计算属性名 |

### 字面量工厂

| 方法 | 说明 |
|------|------|
| `ts.factory.createNumericLiteral(value, flags?)` | 数字字面量 |
| `ts.factory.createBigIntLiteral(value)` | BigInt 字面量 |
| `ts.factory.createStringLiteral(text, isSingleQuote?)` | 字符串字面量 |
| `ts.factory.createRegularExpressionLiteral(text)` | 正则表达式字面量 |
| `ts.factory.createNoSubstitutionTemplateLiteral(text, rawText?)` | 无插值模板字面量 |
| `ts.factory.createTemplateHead(text, rawText?, flags?)` | 模板字面量头部 |
| `ts.factory.createTemplateMiddle(text, rawText?, flags?)` | 模板字面量中间部分 |
| `ts.factory.createTemplateTail(text, rawText?, flags?)` | 模板字面量尾部 |

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

### 绑定模式工厂

| 方法 | 说明 |
|------|------|
| `ts.factory.createObjectBindingPattern(elements)` | `{ a, b }` 对象解构 |
| `ts.factory.createArrayBindingPattern(elements)` | `[a, b]` 数组解构 |
| `ts.factory.createBindingElement(dotDotDot, propertyName, name, initializer?)` | 解构元素 |

### 表达式工厂

| 方法 | 说明 |
|------|------|
| `ts.factory.createArrayLiteralExpression(elements?, multiLine?)` | `[a, b, c]` |
| `ts.factory.createObjectLiteralExpression(properties?, multiLine?)` | `{ a: 1 }` |
| `ts.factory.createPropertyAccessExpression(expression, name)` | `a.b` |
| `ts.factory.createPropertyAccessChain(expression, questionDot, name)` | `a?.b` |
| `ts.factory.createElementAccessExpression(expression, index)` | `a[b]` |
| `ts.factory.createElementAccessChain(expression, questionDot, index)` | `a?.[b]` |
| `ts.factory.createCallExpression(expression, typeArgs, args)` | `f(a, b)` |
| `ts.factory.createCallChain(expression, questionDot, typeArgs, args)` | `f?.(a, b)` |
| `ts.factory.createNewExpression(expression, typeArgs, args)` | `new Foo(a)` |
| `ts.factory.createTaggedTemplateExpression(tag, typeArgs, template)` | `` tag`...` `` |
| `ts.factory.createTypeAssertion(type, expression)` | `<T>expr` |
| `ts.factory.createParenthesizedExpression(expression)` | `(expr)` |
| `ts.factory.createFunctionExpression(modifiers, asterisk, name, typeParams, params, type, body)` | `function(...)` |
| `ts.factory.createArrowFunction(modifiers, typeParams, params, type, equalsGreaterThan, body)` | `(...) => ...` |
| `ts.factory.createDeleteExpression(expression)` | `delete expr` |
| `ts.factory.createTypeOfExpression(expression)` | `typeof expr` |
| `ts.factory.createVoidExpression(expression)` | `void expr` |
| `ts.factory.createAwaitExpression(expression)` | `await expr` |
| `ts.factory.createPrefixUnaryExpression(operator, operand)` | `!x` / `++x` 等 |
| `ts.factory.createPostfixUnaryExpression(operand, operator)` | `x++` / `x--` |
| `ts.factory.createBinaryExpression(left, operator, right)` | `a + b` / `a = b` 等 |
| `ts.factory.createConditionalExpression(cond, question, whenTrue, colon, whenFalse)` | `a ? b : c` |
| `ts.factory.createTemplateExpression(head, spans)` | `` `${x}...` `` |
| `ts.factory.createTemplateSpan(expression, literal)` | 模板居间 |
| `ts.factory.createYieldExpression(asterisk, expression)` | `yield expr` |
| `ts.factory.createSpreadElement(expression)` | `...expr` |
| `ts.factory.createClassExpression(modifiers, name, typeParams, heritage, members)` | `class { ... }` |
| `ts.factory.createOmittedExpression()` | 省略表达式（数组解构中的空座） |
| `ts.factory.createExpressionWithTypeArguments(expression, typeArgs)` | `Foo<T>` |
| `ts.factory.createAsExpression(expression, type)` | `expr as T` |
| `ts.factory.createSatisfiesExpression(expression, type)` | `expr satisfies T` |
| `ts.factory.createNonNullExpression(expression)` | `expr!` |
| `ts.factory.createNonNullChain(expression)` | `expr!` （可选链） |
| `ts.factory.createMetaProperty(keywordToken, name)` | `new.target` / `import.meta` |

### 语句工厂

| 方法 | 说明 |
|------|------|
| `ts.factory.createBlock(statements, multiLine?)` | `{ ... }` 语句块 |
| `ts.factory.createVariableStatement(modifiers, declarationList)` | `const/let/var ...` |
| `ts.factory.createVariableDeclaration(name, exclamation?, type?, initializer?)` | 变量声明 |
| `ts.factory.createVariableDeclarationList(declarations, flags?)` | 变量声明列表 |
| `ts.factory.createEmptyStatement()` | `;` 空语句 |
| `ts.factory.createExpressionStatement(expression)` | 表达式语句 |
| `ts.factory.createIfStatement(condition, thenStatement, elseStatement?)` | `if (...) ...` |
| `ts.factory.createDoStatement(statement, expression)` | `do ... while (...)` |
| `ts.factory.createWhileStatement(expression, statement)` | `while (...) ...` |
| `ts.factory.createForStatement(init, condition, incrementor, statement)` | `for (...; ...; ...) ...` |
| `ts.factory.createForInStatement(initializer, expression, statement)` | `for (x in obj) ...` |
| `ts.factory.createForOfStatement(awaitModifier, initializer, expression, statement)` | `for (x of arr) ...` |
| `ts.factory.createContinueStatement(label?)` | `continue` |
| `ts.factory.createBreakStatement(label?)` | `break` |
| `ts.factory.createReturnStatement(expression?)` | `return expr` |
| `ts.factory.createWithStatement(expression, statement)` | `with (obj) ...` |
| `ts.factory.createSwitchStatement(expression, caseBlock)` | `switch (...) { ... }` |
| `ts.factory.createLabeledStatement(label, statement)` | `label: stmt` |
| `ts.factory.createThrowStatement(expression)` | `throw expr` |
| `ts.factory.createTryStatement(tryBlock, catchClause, finallyBlock)` | `try { } catch { } finally { }` |
| `ts.factory.createDebuggerStatement()` | `debugger` |
| `ts.factory.createCaseBlock(clauses)` | switch 的 case 块 |
| `ts.factory.createCaseClause(expression, statements)` | `case x:` |
| `ts.factory.createDefaultClause(statements)` | `default:` |
| `ts.factory.createCatchClause(variableDeclaration, block)` | `catch (e)` |

### 模块 / 导入导出工厂

| 方法 | 说明 |
|------|------|
| `ts.factory.createFunctionDeclaration(modifiers, asterisk, name, typeParams, params, type, body)` | `function foo(...)` |
| `ts.factory.createClassDeclaration(modifiers, name, typeParams, heritage, members)` | `class Foo { ... }` |
| `ts.factory.createModuleDeclaration(modifiers, name, body, flags?)` | `module/namespace` 声明 |
| `ts.factory.createModuleBlock(statements)` | 模块块 |
| `ts.factory.createNamespaceExportDeclaration(name)` | `export as namespace Foo` |
| `ts.factory.createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference)` | `import X = ...` |
| `ts.factory.createImportDeclaration(modifiers, importClause, moduleSpecifier, attributes?)` | `import ... from '...'` |
| `ts.factory.createImportClause(phaseModifier, name, namedBindings)` | import 卷（默认导入+命名导入） |
| `ts.factory.createNamespaceImport(name)` | `* as Foo` |
| `ts.factory.createNamedImports(elements)` | `{ a, b }` |
| `ts.factory.createImportSpecifier(isTypeOnly, propertyName, name)` | 单个命名导入项 |
| `ts.factory.createImportAttributes(elements, multiLine?)` | `with { type: '...' }` |
| `ts.factory.createImportAttribute(name, value)` | 单个导入属性 |
| `ts.factory.createExportAssignment(modifiers, isExportEquals, expression)` | `export default expr` / `export = expr` |
| `ts.factory.createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier?, attributes?)` | `export { a } from '...'` |
| `ts.factory.createNamedExports(elements)` | `{ a, b }` 命名导出 |
| `ts.factory.createNamespaceExport(name)` | `* as Foo` 命名空间导出 |
| `ts.factory.createExportSpecifier(isTypeOnly, propertyName, name)` | 单个导出项 |
| `ts.factory.createExternalModuleReference(expression)` | `require('mod')` |

### JSX 工厂

| 方法 | 说明 |
|------|------|
| `ts.factory.createJsxElement(opening, children, closing)` | `<Foo>...</Foo>` |
| `ts.factory.createJsxSelfClosingElement(tagName, typeArgs, attributes)` | `<Foo />` |
| `ts.factory.createJsxOpeningElement(tagName, typeArgs, attributes)` | `<Foo` 开口标签 |
| `ts.factory.createJsxClosingElement(tagName)` | `</Foo>` 闭口标签 |
| `ts.factory.createJsxFragment(openingFragment, children, closingFragment)` | `<>...</>` |
| `ts.factory.createJsxAttribute(name, initializer)` | JSX 属性 |
| `ts.factory.createJsxAttributes(properties)` | JSX 属性集合 |
| `ts.factory.createJsxSpreadAttribute(expression)` | `{...props}` |
| `ts.factory.createJsxExpression(dotDotDot, expression)` | `{expr}` / `{...expr}` |
| `ts.factory.createJsxText(text, containsOnlyTrivia?)` | JSX 文本内容 |
| `ts.factory.createJsxNamespacedName(namespace, name)` | `ns:name` JSX 属性名 |

### 其他工厂

| 方法 | 说明 |
|------|------|
| `ts.factory.createNodeArray(elements?, hasTrailingComma?)` | 创建 `NodeArray<T>` |
| `ts.factory.createDecorator(expression)` | 装饰器 `@expr` |
| `ts.factory.createParameterDeclaration(modifiers, dotDotDot, name, question?, type?, initializer?)` | 函数/方法参数 |
| `ts.factory.createHeritageClause(token, types)` | `extends`/`implements` 子句 |
| `ts.factory.createSemicolonClassElement()` | 类中的分号占位元素 |
| `ts.factory.createPropertyAssignment(name, initializer)` | `{ key: value }` |
| `ts.factory.createShorthandPropertyAssignment(name, initializer?)` | `{ key }` |
| `ts.factory.createSpreadAssignment(expression)` | `{ ...obj }` |
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
