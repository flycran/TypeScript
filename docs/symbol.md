
# Symbol 接口

Symbol（符号）是类型系统的**命名实体**。每个命名声明（变量、函数、类、接口等）都对应一个 Symbol。

---

## Symbol

```ts
interface Symbol {
  flags: SymbolFlags;
  escapedName: __String;
  declarations?: Declaration[];
  valueDeclaration?: Declaration;
  members?: SymbolTable;
  exports?: SymbolTable;
  globalExports?: SymbolTable;
}
```

### 属性

| 成员 | 类型 | 说明 |
|------|------|------|
| `flags` | `SymbolFlags` | 符号分类标志位 |
| `escapedName` | `__String` | 内部转义名称（用于唯一标识，`__`前缀处理了关键字冲突） |
| `declarations` | `Declaration[]?` | 该符号的**所有**声明节点（声明合并时有多个） |
| `valueDeclaration` | `Declaration?` | 主声明节点（值空间） |
| `members` | `SymbolTable?` | 成员符号表（类 / 接口成员） |
| `exports` | `SymbolTable?` | 导出符号表 |
| `globalExports` | `SymbolTable?` | 全局导出（`declare global`） |
| `id` `@internal` | `number` | 唯一数字 ID（`@internal`，运行时存在但不在公开 API 中） |
| `mergeId` `@internal` | `number` | 声明合并 ID（`@internal`） |
| `parent` `@internal` | `Symbol?` | 父符号（如类方法的父符号是类）（`@internal`） |

### 方法

| 方法签名 | 说明 |
|----------|------|
| `getName(): string` | 非转义的名称字符串 |
| `getFlags(): SymbolFlags` | 返回 `flags` |
| `getEscapedName(): __String` | 内部转义名 |
| `getDeclarations(): Declaration[] \| undefined` | 所有声明节点 |
| `getDocumentationComment(checker?): SymbolDisplayPart[]` | JSDoc 注释 |
| `getJsDocTags(checker?): JSDocTagInfo[]` | JSDoc 标签列表 |

---

## SymbolFlags

<FindSymbolFlags />

`SymbolFlags` 是位掩码枚举，描述符号所在的语义空间。

### 基础标志

| 标志 | 说明 |
|------|------|
| `None = 0` | 无 |
| `FunctionScopedVariable` | `var` / 函数参数 |
| `BlockScopedVariable` | `let` / `const` |
| `Property` | 属性（对象 / 类） |
| `EnumMember` | 枚举成员 |
| `Function` | 函数 |
| `Class` | `class` |
| `Interface` | `interface` |
| `ConstEnum` | `const enum` |
| `RegularEnum` | 普通 `enum` |
| `ValueModule` | 值命名空间（`module` / `namespace`） |
| `NamespaceModule` | 纯类型命名空间 |
| `TypeLiteral` | 匿名类型字面量 |
| `ObjectLiteral` | 对象字面量 |
| `Method` | 方法 |
| `Constructor` | 构造函数 |
| `GetAccessor` | `getter` |
| `SetAccessor` | `setter` |
| `Signature` | 调用 / 构造签名 |
| `TypeParameter` | 类型参数 |
| `TypeAlias` | `type` 别名 |
| `ExportValue` | 导出的值 |
| `Alias` | `import` / `export` 别名 |
| `Prototype` | `prototype` 属性 |
| `ExportStar` | `export *` 声明 |
| `Optional` | 可选成员（`?`） |
| `Transient` | 临时符号（编译器内部） |
| `Assignment` | 赋值模式（JS） |
| `Deprecated` | 已弃用 |

### 复合标志

| 标志 | 等价 | 说明 |
|------|------|------|
| `Variable` | `FunctionScopedVariable \| BlockScopedVariable` | 变量 |
| `Value` | `Variable \| Property \| EnumMember \| ...` | 值空间符号 |
| `Type` | `Class \| Interface \| Enum \| TypeAlias \| TypeParameter \| ...` | 类型空间符号 |
| `Namespace` | `ValueModule \| NamespaceModule \| Enum` | 命名空间 |
| `HasExports` | `Class \| Enum \| Module` | 有导出 |
| `HasMembers` | `Class \| Interface \| TypeLiteral \| ObjectLiteral` | 有成员 |
| `Accessor` | `GetAccessor \| SetAccessor` | 访问器 |
| `Classifiable` | `Class \| Enum \| TypeAlias \| Interface \| TypeParameter \| Module \| Alias` | 可分类 |
| `Enum` | `RegularEnum \| ConstEnum` | 所有枚举 |
| `Module` | `ValueModule \| NamespaceModule` | 所有模块 |
| `ModuleMember` | — | 模块内允许的成员类型 |
| `ExportHasLocal` | — | 导出且有局部实录 |
| `BlockScoped` | `BlockScopedVariable \| Class \| Enum` | 块作用域绑定 |
| `PropertyOrAccessor` | `Property \| GetAccessor \| SetAccessor` | 属性或访问器 |
| `ClassMember` | `Method \| Accessor \| Property` | 类成员 |
| `All` | `-1` | 所有标志 |

### Excludes 系列（声明冲突检测）

Excludes 标志用于声明合并阶段，表示“某种符号不允许与哪些其他符号共存”。一般不直接使用。

| 标志 | 说明 |
|------|------|
| `FunctionScopedVariableExcludes` | `var` 声明不能与哪些符号共存 |
| `BlockScopedVariableExcludes` | `let/const` 不能与任何其他值符号共存 |
| `ParameterExcludes` | 参数不能与任何其他值符号共存 |
| `PropertyExcludes` | 属性无冲突限制 |
| `EnumMemberExcludes` | 枚举成员的共存限制 |
| `FunctionExcludes` | 函数的共存限制 |
| `ClassExcludes` | `class` 的共存限制 |
| `InterfaceExcludes` | `interface` 的共存限制（可合并） |
| `RegularEnumExcludes` | 普通 `enum` 的共存限制 |
| `ConstEnumExcludes` | `const enum` 的共存限制 |
| `ValueModuleExcludes` | `module/namespace` 的共存限制 |
| `NamespaceModuleExcludes` | 纯类型命名空间无冲突限制 |
| `MethodExcludes` | 方法的共存限制 |
| `GetAccessorExcludes` | `getter` 的共存限制 |
| `SetAccessorExcludes` | `setter` 的共存限制 |
| `AccessorExcludes` | 访问器通用共存限制 |
| `TypeParameterExcludes` | 类型参数的共存限制 |
| `TypeAliasExcludes` | `type` 别名的共存限制 |
| `AliasExcludes` | 导入别名的共存限制 |

---

## SymbolTable

```ts
// SymbolTable 是 Map<__String, Symbol> 的类型别名
type SymbolTable = Map<__String, Symbol>;
```

### 常见访问方式

```ts
// 获取模块的所有导出符号
const exports = checker.getExportsOfModule(moduleSymbol); // Symbol[]

// 按名称查成员（注意 escapedName 转换）
const member = symbol.members?.get('methodName' as ts.__String);

// 遍历所有成员
symbol.members?.forEach((sym, name) => {
  console.log(ts.unescapeLeadingUnderscores(name), sym.flags);
});
```

### 名称转义规则

TypeScript 内部对标识符名称有转义处理（`__String`），以避免与 JavaScript 内建属性冲突：

| 原名 | 转义后 |
|------|--------|
| `constructor` | `__constructor` |
| `toString` | `__toString` |
| 普通名称 | 不变 |

使用 `ts.escapeLeadingUnderscores(name)` 和 `ts.unescapeLeadingUnderscores(escapedName)` 互转。

---

## SymbolDisplayPart

```ts
interface SymbolDisplayPart {
  text: string;
  kind: string;  // 语义分类
}
```

### kind 取值

| kind | 说明 |
|------|------|
| `keyword` | 关键字（`const`、`interface`…） |
| `text` | 普通文本 |
| `punctuation` | 标点（`{`、`}`、`(`、`)`…） |
| `space` | 空格 |
| `operator` | 运算符（`:`、`=>`…） |
| `aliasName` | 别名 |
| `className` | 类名 |
| `enumName` | 枚举名 |
| `fieldName` | 字段名 |
| `functionName` | 函数名 |
| `interfaceName` | 接口名 |
| `localName` | 局部名 |
| `methodName` | 方法名 |
| `moduleName` | 模块名 |
| `parameterName` | 参数名 |
| `propertyName` | 属性名 |
| `stringLiteral` | 字符串字面量 |
| `typeParameterName` | 类型参数名 |
| `typeAliasName` | 类型别名名 |
| `symbol` | 符号名 |
| `lineBreak` | 换行符 |
| `link` | 链接（JSDoc `{@link}`） |
| `linkName` | 链接名 |
| `linkText` | 链接文本 |

### 拼接示例

```ts
const info = checker.getQuickInfoAtPosition(fileName, pos);
const typeText = info?.displayParts?.map(p => p.text).join('') ?? '';
```

---

## JSDocTagInfo

```ts
interface JSDocTagInfo {
  name: string;                          // 标签名（不含 @）
  text: SymbolDisplayPart[] | undefined; // 标签内容部件
}
```

### 示例

```ts
/** @param value 要处理的值 @returns 处理结果 */
function process(value: string): string { ... }

const sym = checker.getSymbolAtLocation(fnNode)!;
const tags = sym.getJsDocTags(checker);
// tags[0] = { name: 'param', text: [{ text: 'value', kind: 'parameterName' }, ...] }
// tags[1] = { name: 'returns', text: [{ text: '处理结果', kind: 'text' }] }
```
