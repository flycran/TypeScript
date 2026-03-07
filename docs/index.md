
# TypeScript 5.9 API 参考文档

本文档聚焦于 TypeScript **类型系统**、**AST 节点**与 **Language Service Plugin** 三个核心维度，  
不涉及 Compiler/Emit 部分（编译输出由 `swc` 处理）。

所有接口签名均来源于 `typescript@5.9.3` 的 `typescript/lib/typescript.d.ts`。

## 文档结构

| 章节 | 内容 |
|------|------|
| [基础 AST 接口](./ast-basics) | `Node`、`SourceFile`、`SyntaxKind`、`NodeFlags`、`ModifierFlags` |
| [SyntaxKind 完整枚举](./syntax-kind) | `SyntaxKind` 全量（约 360 值）分类列表 |
| [类型层接口](./type-interfaces) | `Type`、`TypeFlags`、所有类型子接口（Union/Conditional/Mapped…） |
| [Symbol 接口](./symbol) | `Symbol`、`SymbolFlags`、`SymbolTable`、`SymbolDisplayPart` |
| [TypeChecker](./typechecker) | 从节点/符号获取类型、类型操作、关系判断、签名解析、诊断 |
| [AST 类型节点](./type-nodes) | 所有 `TypeNode` 子类与类型声明节点 |
| [Language Service](./language-service) | `LanguageService`、`LanguageServiceHost`、`DocumentRegistry` |
| [LS Plugin](./plugin) | `PluginModule`、`PluginCreateInfo`、插件开发完整示例 |
| [实用函数](./utilities) | 类型守卫 `ts.isXxx`、工具函数、`ts.factory` 工厂方法 |

## 快速上手

```ts
import ts from 'typescript';

// 1. 解析单文件（仅语法，无类型）
const sf = ts.createSourceFile('foo.ts', sourceText, ts.ScriptTarget.Latest, true);

// 2. 创建带类型检查的 Program
const program = ts.createProgram(['foo.ts'], { strict: true });
const checker = program.getTypeChecker();

// 3. 获取节点类型
ts.forEachChild(sf, function visit(node) {
  if (ts.isVariableDeclaration(node) && node.name) {
    const type = checker.getTypeAtLocation(node.name);
    console.log(checker.typeToString(type));
  }
  ts.forEachChild(node, visit);
});
```

## 参考来源

- `typescript/lib/typescript.d.ts`（npm 包内置，最权威）
- [TypeScript 源码 types.ts](https://github.com/microsoft/TypeScript/blob/main/src/compiler/types.ts)
- [Compiler API Wiki](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [Language Service API Wiki](https://github.com/microsoft/TypeScript/wiki/Using-the-Language-Service-API)
- [Writing a Language Service Plugin](https://github.com/microsoft/TypeScript/wiki/Writing-a-Language-Service-Plugin)
- [ts-ast-viewer.com](https://ts-ast-viewer.com/)（交互式 AST 查看器）
