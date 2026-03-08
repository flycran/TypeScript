
# 类型层接口

TypeChecker 返回的所有类型对象都实现 `Type` 接口。类型对象是**不可变**的，由 TypeChecker 统一管理和缓存。

---

## Type — 基础接口

```ts
interface Type {
  flags: TypeFlags;
  symbol: Symbol;
  aliasSymbol?: Symbol;
  aliasTypeArguments?: readonly Type[];
}
```

### 属性

| 成员 | 类型 | 说明 |
|------|------|------|
| `flags` | `TypeFlags` | **最重要字段**，类型分类位掩码 |
| `symbol` | `Symbol` | 关联的符号（非原始类型有此字段） |
| `aliasSymbol` | `Symbol?` | 若该类型来自 `type` 别名，则为别名符号 |
| `aliasTypeArguments` | `readonly Type[]?` | 别名的类型实参 |

### 方法

| 方法签名 | 说明 |
|----------|------|
| `getFlags(): TypeFlags` | 返回 `flags` |
| `getSymbol(): Symbol \| undefined` | 同 `symbol` 字段 |
| `getProperties(): Symbol[]` | 该类型的可枚举属性符号列表 |
| `getProperty(name): Symbol \| undefined` | 按名称获取属性符号 |
| `getApparentProperties(): Symbol[]` | 含继承属性的完整列表 |
| `getCallSignatures(): readonly Signature[]` | 调用签名列表 |
| `getConstructSignatures(): readonly Signature[]` | 构造签名列表 |
| `getStringIndexType(): Type \| undefined` | 字符串索引类型 |
| `getNumberIndexType(): Type \| undefined` | 数字索引类型 |
| `getBaseTypes(): BaseType[] \| undefined` | 基类型（class / interface） |
| `getNonNullableType(): Type` | 去掉 `null` / `undefined` |
| `getConstraint(): Type \| undefined` | 泛型约束 |
| `getDefault(): Type \| undefined` | 泛型默认值 |
| `isUnion(): this is UnionType` | 是联合类型 |
| `isIntersection(): this is IntersectionType` | 是交叉类型 |
| `isUnionOrIntersection(): this is UnionOrIntersectionType` | 是联合或交叉 |
| `isLiteral(): this is LiteralType` | 是字面量类型 |
| `isStringLiteral(): this is StringLiteralType` | 是字符串字面量 |
| `isNumberLiteral(): this is NumberLiteralType` | 是数字字面量 |
| `isTypeParameter(): this is TypeParameter` | 是类型参数 `T` |
| `isClassOrInterface(): this is InterfaceType` | 是 class 或 interface |
| `isClass(): this is InterfaceType` | 是 class |
| `isIndexType(): this is IndexType` | 是 `keyof T` 类型 |

---

## TypeFlags

<FindTypeFlags />

`TypeFlags` 是位掩码枚举，单个类型对象可同时拥有多个标志。

```ts
// 典型用法
if (type.flags & ts.TypeFlags.StringLiteral) {
  const lit = type as ts.StringLiteralType;
  console.log(lit.value);
}
```

### 原始类型标志

| 标志 | 值 | 说明 |
|------|----|------|
| `Any` | 1 | `any` |
| `Unknown` | 2 | `unknown` |
| `String` | 4 | `string` |
| `Number` | 8 | `number` |
| `Boolean` | 16 | `boolean` |
| `Enum` | 32 | 枚举类型 |
| `BigInt` | 64 | `bigint` |
| `ESSymbol` | 4096 | `symbol`（ES 内建） |
| `UniqueESSymbol` | 8192 | `unique symbol` |
| `Void` | 16384 | `void` |
| `Undefined` | 32768 | `undefined` |
| `Null` | 65536 | `null` |
| `Never` | 131072 | `never` |
| `NonPrimitive` | 67108864 | `object`（小写） |

### 字面量类型标志

| 标志 | 说明 |
|------|------|
| `StringLiteral` | 字符串字面量 `"foo"` |
| `NumberLiteral` | 数字字面量 `42` |
| `BooleanLiteral` | `true` / `false` |
| `EnumLiteral` | 枚举成员字面量 |
| `BigIntLiteral` | bigint 字面量 |

### 复合 / 结构类型标志

| 标志 | 说明 |
|------|------|
| `TypeParameter` | 类型参数 `T` |
| `Object` | 对象类型（进一步用 `ObjectFlags` 区分） |
| `Union` | 联合类型 `A \| B` |
| `Intersection` | 交叉类型 `A & B` |
| `Index` | `keyof T` |
| `IndexedAccess` | `T[K]` |
| `Conditional` | 条件类型 `T extends U ? X : Y` |
| `Substitution` | 替换类型（TypeChecker 内部） |
| `TemplateLiteral` | 模板字面量类型 |
| `StringMapping` | `Uppercase<T>` / `Lowercase<T>` 等内建字符串映射 |

### 复合别名标志

| 标志 | 等价 | 说明 |
|------|------|------|
| `AnyOrUnknown` | `Any \| Unknown` | |
| `Nullable` | `Undefined \| Null` | 可空 |
| `Literal` | `StringLiteral \| NumberLiteral \| BigIntLiteral \| BooleanLiteral` | 所有字面量 |
| `Unit` | `Literal \| UniqueESSymbol \| Nullable` | 单元类型 |
| `Primitive` | `String \| Number \| BigInt \| Boolean \| Enum \| ESSymbol \| Void \| Undefined \| Null` | 所有原始类型 |
| `StringOrNumberLiteral` | `StringLiteral \| NumberLiteral` | |

---

## 字面量类型

### LiteralType

```ts
interface LiteralType extends Type {
  value: string | number | PseudoBigInt;
  freshType: LiteralType;    // fresh 版本（刚被推断，溢出检查用）
  regularType: LiteralType;  // regular 版本（widened 后）
}

interface StringLiteralType extends LiteralType { value: string; }
interface NumberLiteralType extends LiteralType { value: number; }
interface BigIntLiteralType extends LiteralType { value: PseudoBigInt; }
```

### UniqueESSymbolType

```ts
interface UniqueESSymbolType extends Type {
  symbol: Symbol;
  escapedName: __String;
}
```

---

## 联合 / 交叉类型

```ts
interface UnionOrIntersectionType extends Type {
  types: readonly Type[];  // 成员类型列表
}

interface UnionType extends UnionOrIntersectionType {}
interface IntersectionType extends UnionOrIntersectionType {}
```

---

## TypeParameter

```ts
interface TypeParameter extends InstantiableType {
  constraint: Type | undefined;       // T extends U 中的 U
  default: Type | undefined;          // T = Default
  target?: TypeParameter;             // 泛型实例化的原始参数
  mapper?: TypeMapper;                // 实例化时的类型映射器
  isThisType?: boolean;               // 是否为 this 类型
  resolvedDefaultType?: Type;
}
```

---

## ObjectType 与 ObjectFlags

凡 `type.flags & TypeFlags.Object` 为真，该类型即为 `ObjectType`，通过 `objectFlags` 进一步区分。

```ts
interface ObjectType extends Type {
  objectFlags: ObjectFlags;
}
```

### ObjectFlags

| 标志 | 值 | 说明 |
|------|----|----|
| `Class` | 1 | `class` 声明 |
| `Interface` | 2 | `interface` 声明 |
| `Reference` | 4 | 泛型实例化引用，如 `Array<string>` |
| `Tuple` | 8 | 元组类型 |
| `Anonymous` | 16 | 匿名对象类型 |
| `Mapped` | 32 | 映射类型 |
| `Instantiated` | 64 | 已实例化的映射类型 |
| `ObjectLiteral` | 128 | 对象字面量类型 |
| `EvolvingArray` | 256 | 推演数组（内部） |
| `ObjectLiteralPatternWithComputedProperties` | 512 | 含计算属性的对象字面量模式 |
| `ReverseMapped` | 1024 | 反向映射类型 |
| `JsxAttributes` | 2048 | JSX 属性类型 |
| `JSLiteral` | 4096 | JS 字面量类型 |
| `FreshLiteral` | 8192 | Fresh 字面量对象（溢出检查用） |
| `ArrayLiteral` | 16384 | 数组字面量类型 |
| `ContainsSpread` | 2097152 | 含散展的对象类型 |
| `ObjectRestType` | 4194304 | 对象 rest 类型 |
| `InstantiationExpressionType` | 8388608 | 实例化表达式类型（`F<T>`） |
| `SingleSignatureType` | 134217728 | 单一签名类型 |
| `ClassOrInterface` | 3 | `Class \| Interface`（复合） |

---

## InstantiableType

`InstantiableType` 是所有“可实例化”类型的基类，包括 `TypeParameter`、`ConditionalType`、`IndexedAccessType`、`IndexType`、`TemplateLiteralType`、`StringMappingType`。

```ts
interface InstantiableType extends Type {}
```

---

## StringMappingType

`StringMappingType` 对应 `Uppercase<T>` / `Lowercase<T>` / `Capitalize<T>` / `Uncapitalize<T>` 等内建字符串映射类型（`TypeFlags.StringMapping`）。

```ts
interface StringMappingType extends InstantiableType {
  symbol: Symbol;  // 对应的内建符号（Uppercase/Lowercase 等）
  type: Type;      // 被映射的类型
}
```

---

## SubstitutionType

`SubstitutionType` 是 TypeChecker 内部使用的替换类型（`TypeFlags.Substitution`），在条件类型的真分支推断中用于将类型局限为更精确的类型。

```ts
interface SubstitutionType extends InstantiableType {
  objectFlags: ObjectFlags;
  baseType: Type;    // 局限前的基类型（T）
  constraint: Type;  // 局限后的类型（负载更精确的类型）
}
```

---

## InterfaceType / InterfaceTypeWithDeclaredMembers

```ts
interface InterfaceType extends ObjectType {
  typeParameters: TypeParameter[] | undefined;
  outerTypeParameters: TypeParameter[] | undefined;
  localTypeParameters: TypeParameter[] | undefined;
  thisType: TypeParameter | undefined;
  resolvedBaseConstructorType?: Type;
  resolvedBaseTypes: BaseType[];
}

interface InterfaceTypeWithDeclaredMembers extends InterfaceType {
  declaredProperties: Symbol[];
  declaredCallSignatures: Signature[];
  declaredConstructSignatures: Signature[];
  declaredIndexInfos: IndexInfo[];
}
```

---

## TypeReference（泛型实例）

```ts
interface TypeReference extends ObjectType {
  target: GenericType;                          // 原始泛型类型，如 Array<T>
  node?: TypeReferenceNode | ArrayTypeNode | TupleTypeNode;
  mapper?: TypeMapper;
  resolvedTypeArguments?: readonly Type[];       // 已解析的类型实参
  literalType?: TypeReference;
}
```

:::tip
通过 `checker.getTypeArguments(typeRef)` 安全地获取类型实参，而非直接读 `resolvedTypeArguments`。
:::

---

## TupleType / TupleTypeReference

```ts
interface TupleType extends GenericType {
  elementFlags: readonly ElementFlags[];
  minLength: number;        // 最少需要的元素个数
  fixedLength: number;      // 固定长度（可选前）
  hasRestElement: boolean;
  combinedFlags: ElementFlags;
  readonly: boolean;
  labeledElementDeclarations?: readonly (NamedTupleMember | ParameterDeclaration)[];
}

const enum ElementFlags {
  Required  = 1,   // 必须元素
  Optional  = 2,   // 可选元素 T?
  Rest      = 4,   // Rest 元素 ...T[]
  Variadic  = 8,   // Variadic 元素 ...T
  Variable  = Rest | Variadic,
}
```

---

## ConditionalType

```ts
interface ConditionalType extends InstantiableType {
  root: ConditionalRoot;
  checkType: Type;             // T extends U 中的 T
  extendsType: Type;           // T extends U 中的 U
  resolvedTrueType?: Type;
  resolvedFalseType?: Type;
  resolvedInferredTrueType?: Type;
  mapper?: TypeMapper;
  combinedMapper?: TypeMapper;
}
```

---

## MappedType

```ts
interface MappedType extends AnonymousType {
  declaration: MappedTypeNode;
  typeParameter?: TypeParameter;   // 映射变量 K
  constraintType?: Type;           // 约束类型（keyof T）
  nameType?: Type;                 // as 子句产生的名称类型
  templateType?: Type;             // 映射值类型
  modifiersType?: Type;
  resolvedApparentType?: Type;
}
```

---

## IndexType（keyof T）

```ts
interface IndexType extends InstantiableType {
  type: InstantiableType | UnionOrIntersectionType;
}
```

---

## IndexedAccessType（T\[K\]）

```ts
interface IndexedAccessType extends InstantiableType {
  objectType: Type;   // T
  indexType: Type;    // K
  constraint?: Type;
  simplifiedForReading?: Type;
  simplifiedForWriting?: Type;
}
```

---

## TemplateLiteralType

```ts
interface TemplateLiteralType extends InstantiableType {
  texts: readonly string[];  // 固定片段，长度 = types.length + 1
  types: readonly Type[];    // 插值类型列表
}
```

---

## Signature（函数 / 调用签名）

```ts
interface Signature {
  declaration?: SignatureDeclaration | JSDocSignature;
  typeParameters?: readonly TypeParameter[];
  parameters: readonly Symbol[];
  thisParameter?: Symbol;
  resolvedReturnType?: Type;
  resolvedTypePredicate?: TypePredicate;
  minArgumentCount: number;
  flags: SignatureFlags;
}
```

### 方法

| 方法签名 | 说明 |
|----------|------|
| `getDeclaration(): SignatureDeclaration` | 获取声明节点 |
| `getTypeParameters(): TypeParameter[] \| undefined` | 泛型参数 |
| `getParameters(): Symbol[]` | 参数符号列表 |
| `getTypeParameterAtPosition(pos): Type` | 按位置获取泛型参数类型 |
| `getReturnType(): Type` | 返回类型 |
| `getDocumentationComment(checker?): SymbolDisplayPart[]` | JSDoc 说明 |
| `getJsDocTags(checker?): JSDocTagInfo[]` | JSDoc 标签 |

### SignatureFlags

| 标志 | 说明 |
|------|------|
| `None` | — |
| `HasRestParameter` | 有 rest 参数 |
| `HasLiteralTypes` | 含字面量类型 |
| `Abstract` | 抽象 |
| `IsInnerCallChain` | 内部调用链（可选链内） |
| `IsOuterCallChain` | 外部调用链 |
| `IsUntypedSignatureInJSFile` | JS 文件无类型签名 |
| `IsNonInferrable` | 不可推断 |
| `PropagatingFlags` | `HasRestParameter \| HasLiteralTypes \| IsUntypedSignatureInJSFile` |

---

## IndexInfo（索引签名）

```ts
interface IndexInfo {
  keyType: Type;     // string / number / symbol
  type: Type;        // 值类型
  isReadonly: boolean;
  declaration?: IndexSignatureDeclaration;
}
```

---

## TypePredicate（类型谓词）

```ts
interface TypePredicate {
  kind: TypePredicateKind;
  parameterName: string | undefined;   // identifier 或 "this"
  parameterIndex: number | undefined;
  type: Type | undefined;              // 断言为的类型
}

const enum TypePredicateKind {
  This              = 0,  // this is T
  Identifier        = 1,  // x is T
  AssertsThis       = 2,  // asserts this is T
  AssertsIdentifier = 3,  // asserts x is T
}
```
