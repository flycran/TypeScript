
# Language Service

`LanguageService` 是编辑器功能（补全 / 诊断 / 重构等）的核心接口。

```ts
import ts from 'typescript';

const host: ts.LanguageServiceHost = { /* ... */ };
const registry = ts.createDocumentRegistry();
const ls = ts.createLanguageService(host, registry);
```

---

## LanguageService 方法

### 诊断

| 方法签名 | 说明 |
|----------|------|
| `getSyntacticDiagnostics(fileName): DiagnosticWithLocation[]` | 语法错误诊断 |
| `getSemanticDiagnostics(fileName): Diagnostic[]` | 语义错误诊断 |
| `getSuggestionDiagnostics(fileName): DiagnosticWithLocation[]` | 建议诊断（可选链、冗余代码等） |
| `getCompilerOptionsDiagnostics(): Diagnostic[]` | `tsconfig` 选项诊断 |

### 补全

| 方法签名 | 说明 |
|----------|------|
| `getCompletionsAtPosition(fileName, pos, options?, formattingSettings?): CompletionInfo \| undefined` | 代码补全列表 |
| `getCompletionEntryDetails(fileName, pos, entryName, formatOptions?, source?, preferences?, data?): CompletionEntryDetails \| undefined` | 补全项详情 |
| `getCompletionEntrySymbol(fileName, pos, name, source?): Symbol \| undefined` | 补全项对应的符号 |

### 悬停信息

| 方法签名 | 说明 |
|----------|------|
| `getQuickInfoAtPosition(fileName, pos): QuickInfo \| undefined` | 悬停类型 / 文档信息 |

### 签名帮助

| 方法签名 | 说明 |
|----------|------|
| `getSignatureHelpItems(fileName, pos, options?): SignatureHelpItems \| undefined` | 函数调用签名帮助 |

### 查找定义 / 引用

| 方法签名 | 说明 |
|----------|------|
| `getDefinitionAtPosition(fileName, pos): readonly DefinitionInfo[] \| undefined` | 跳转到定义 |
| `getDefinitionAndBoundSpan(fileName, pos): DefinitionInfoAndBoundSpan \| undefined` | 定义 + 选中范围 |
| `getTypeDefinitionAtPosition(fileName, pos): readonly DefinitionInfo[] \| undefined` | 跳转到类型定义 |
| `getImplementationAtPosition(fileName, pos): readonly ImplementationLocation[] \| undefined` | 跳转到实现 |
| `getReferencesAtPosition(fileName, pos): ReferenceEntry[] \| undefined` | 查找所有引用 |
| `findReferences(fileName, pos): ReferencedSymbol[] \| undefined` | 查找引用（含符号信息） |
| `getFileReferences(fileName): ReferenceEntry[]` | 文件内所有引用 |

### 重命名 / 重构

| 方法签名 | 说明 |
|----------|------|
| `getRenameInfo(fileName, pos, preferences?): RenameInfo` | 重命名信息（是否可重命名） |
| `findRenameLocations(fileName, pos, findInStrings, findInComments, preferences?): readonly RenameLocation[] \| undefined` | 所有需重命名的位置 |
| `getApplicableRefactors(fileName, posOrRange, preferences?, triggerReason?, kind?, includeInteractiveActions?): ApplicableRefactorInfo[]` | 可用重构操作列表 |
| `getEditsForRefactor(fileName, formatOptions, posOrRange, refactorName, actionName, preferences?, interactiveRefactorArguments?): RefactorEditInfo \| undefined` | 重构的编辑结果 |
| `getMoveToRefactoringFileSuggestions(fileName, posOrRange, preferences?, triggerReason?, kind?): { newFileName: string }[]` | 移动到新文件建议（TS 5.x+） |

### 代码操作 / 修复

| 方法签名 | 说明 |
|----------|------|
| `getCodeFixesAtPosition(fileName, start, end, errorCodes, formatOptions, preferences): readonly CodeFixAction[]` | 错误处的代码修复 |
| `getCombinedCodeFix(scope, fixId, formatOptions, preferences): CombinedCodeActions` | 合并批量修复 |
| `applyCodeActionCommand(action, formatSettings?): Promise<ApplyCodeActionCommandResult>` | 应用代码操作命令 |

### 格式化

| 方法签名 | 说明 |
|----------|------|
| `getFormattingEditsForRange(fileName, start, end, options): TextChange[]` | 区间格式化 |
| `getFormattingEditsForDocument(fileName, options): TextChange[]` | 全文档格式化 |
| `getFormattingEditsAfterKeystroke(fileName, pos, key, options): TextChange[]` | 按键后格式化 |
| `getIndentationAtPosition(fileName, pos, options): number` | 指定位置的缩进量 |

### 导入整理

| 方法签名 | 说明 |
|----------|------|
| `organizeImports(args, formatOptions, preferences?): readonly FileTextChanges[]` | 整理 `import` 语句 |
| `getEditsForFileRename(oldFilePath, newFilePath, formatOptions, preferences?): readonly FileTextChanges[]` | 文件重命名后的编辑 |
| `getAutoImportProvider(): LanguageService \| undefined` | 自动导入提供器 |

### 导航 / 文档结构

| 方法签名 | 说明 |
|----------|------|
| `getNavigationBarItems(fileName): NavigationBarItem[]` | 导航栏项目（面包屑） |
| `getNavigationTree(fileName): NavigationTree` | 文件的层级结构树 |
| `getOutliningSpans(fileName): OutliningSpan[]` | 可折叠区域 |
| `getTodoComments(fileName, descriptors): TodoComment[]` | TODO 注释列表 |
| `getDocumentHighlights(fileName, pos, filesToSearch): DocumentHighlights[] \| undefined` | 文档高亮 |
| `getBraceMatchingAtPosition(fileName, pos): TextSpan[]` | 括号匹配 |
| `getSmartSelectionRange(fileName, pos): SelectionRange` | 智能选择范围 |

### 内嵌提示 / 调用层次

| 方法签名 | 说明 |
|----------|------|
| `provideInlayHints(fileName, span, preferences?): InlayHint[]` | 内嵌类型提示（TS 4.4+） |
| `prepareCallHierarchy(fileName, pos): CallHierarchyItem \| CallHierarchyItem[] \| undefined` | 准备调用层次 |
| `provideCallHierarchyIncomingCalls(fileName, pos): CallHierarchyIncomingCall[]` | 调用来自哪里 |
| `provideCallHierarchyOutgoingCalls(fileName, pos): CallHierarchyOutgoingCall[]` | 调用了哪里 |

### Program / SourceFile 访问

| 方法签名 | 说明 |
|----------|------|
| `getProgram(): Program \| undefined` | 获取底层 `Program` |
| `getCurrentProgram(): Program \| undefined` | 同上（版本间存在差异） |
| `getNonBoundSourceFile(fileName): SourceFile` | 获取未 bind 的 `SourceFile` |
| `cleanupSemanticCache(): void` | 清除语义缓存 |
| `dispose(): void` | 释放资源（务必调用） |

---

## LanguageServiceHost

实现 Language Service 时需要提供 `LanguageServiceHost`，告知 LS 如何读取文件和编译选项。

### 必须实现

| 方法 | 说明 |
|------|------|
| `getCompilationSettings(): CompilerOptions` | 编译选项 |
| `getScriptFileNames(): string[]` | 所有被追踪的文件名列表 |
| `getScriptVersion(fileName): string` | 文件版本号（内容变化时返回新值） |
| `getScriptSnapshot(fileName): IScriptSnapshot \| undefined` | 文件快照 |
| `getCurrentDirectory(): string` | 当前目录 |
| `getDefaultLibFileName(options): string` | `lib.d.ts` 文件路径 |

### 可选实现

| 方法 | 说明 |
|------|------|
| `getNewLine?(): string` | 换行符（`\n` 或 `\r\n`） |
| `getProjectVersion?(): string` | 项目版本（变化时触发重新分析） |
| `getScriptKind?(fileName): ScriptKind` | 文件类型（TS / JS / TSX / JSX / JSON） |
| `getLocalizedDiagnosticMessages?(): any` | 本地化诊断消息 |
| `getCancellationToken?(): HostCancellationToken` | 取消令牌（用于中断长时运算） |
| `log?(s: string): void` | 日志输出 |
| `trace?(s: string): void` | 追踪输出 |
| `error?(s: string): void` | 错误输出 |
| `useCaseSensitiveFileNames?(): boolean` | 文件名是否区分大小写 |
| `readFile(path, encoding?): string \| undefined` | 读取文件内容 |
| `realpath?(path): string` | 解析真实路径（符号链接） |
| `fileExists(path): boolean` | 文件是否存在 |
| `getTypeRootsVersion?(): number` | 类型根版本（`@types` 变化时递增） |
| `resolveModuleNames?` | 自定义模块解析（旧版） |
| `resolveModuleNameLiterals?` | 模块字面量解析（TS 5.0+，推荐） |
| `getDirectories?(dir): string[]` | 列出目录 |
| `readDirectory?(path, extensions?, ...): string[]` | 递归读目录 |
| `getCustomTransformers?(): CustomTransformers \| undefined` | 自定义 AST 变换器 |
| `getParsedCommandLine?(fileName): ParsedCommandLine \| undefined` | 解析好的 `tsconfig` |
| `getIncompleteCompletionsCache?(): IncompleteCompletionsCache` | 不完整补全缓存 |
| `jsDocParsingMode?: JSDocParsingMode` | JSDoc 解析模式（TS 5.3+） |

### 最小实现示例

```ts
import ts from 'typescript';
import fs from 'fs';
import path from 'path';

const files = new Map<string, { version: number; content: string }>();

const host: ts.LanguageServiceHost = {
  getCompilationSettings: () => ({ strict: true, target: ts.ScriptTarget.ES2022 }),
  getScriptFileNames: () => [...files.keys()],
  getScriptVersion: (fileName) => String(files.get(fileName)?.version ?? 0),
  getScriptSnapshot: (fileName) => {
    const content = files.get(fileName)?.content ?? fs.readFileSync(fileName, 'utf8');
    return ts.ScriptSnapshot.fromString(content);
  },
  getCurrentDirectory: () => process.cwd(),
  getDefaultLibFileName: (opts) => ts.getDefaultLibFilePath(opts),
  fileExists: ts.sys.fileExists,
  readFile: ts.sys.readFile,
  readDirectory: ts.sys.readDirectory,
};

const ls = ts.createLanguageService(host, ts.createDocumentRegistry());
```

---

## IScriptSnapshot

```ts
interface IScriptSnapshot {
  getText(start: number, end: number): string;
  getLength(): number;
  getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange | undefined;
  dispose?(): void;
}
```

- `ts.ScriptSnapshot.fromString(text)` — 从字符串创建静态快照
- `getChangeRange` 返回 `undefined` 表示全量更新，返回 `TextChangeRange` 启用增量解析

---

## DocumentRegistry

`DocumentRegistry` 在多个 `LanguageService` 实例间**共享 SourceFile**，节省内存（monorepo 场景有益）。

```ts
const registry = ts.createDocumentRegistry(
  useCaseSensitiveFileNames?: boolean,
  currentDirectory?: string
);
```

| 方法签名 | 说明 |
|----------|------|
| `acquireDocument(fileName, compilationSettings, scriptSnapshot, version, scriptKind?, sourceFileOptions?): SourceFile` | 获取或创建 `SourceFile` |
| `acquireDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version, scriptKind?, sourceFileOptions?): SourceFile` | 按 key 获取 |
| `updateDocument(fileName, compilationSettings, scriptSnapshot, version, scriptKind?, sourceFileOptions?): SourceFile` | 更新已有 `SourceFile` |
| `updateDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version, scriptKind?, sourceFileOptions?): SourceFile` | 按 key 更新 |
| `releaseDocument(fileName, compilationSettings, scriptKind?, impliedNodeFormat?): void` | 释放 `SourceFile` 引用 |
| `releaseDocumentWithKey(path, key, scriptKind?, impliedNodeFormat?): void` | 按 key 释放 |
| `getKeyForCompilationSettings(settings): DocumentRegistryBucketKey` | 编译选项 → bucket key |
| `reportStats(): string` | 统计信息 |

---

## 补全相关接口

### CompletionInfo

```ts
interface CompletionInfo {
  isGlobalCompletion: boolean;
  isMemberCompletion: boolean;
  isNewIdentifierLocation: boolean;
  isIncomplete?: boolean;           // 还有更多补全项（异步加载）
  flags?: CompletionInfoFlags;
  entries: CompletionEntry[];
  optionalReplacementSpan?: TextSpan;
  defaultCommitCharacters?: string[];
}
```

### CompletionEntry

| 字段 | 类型 | 说明 |
|------|------|------|
| `name` | `string` | 补全项名称 |
| `kind` | `ScriptElementKind` | 语义分类（`keyword` / `function` / `class` / …） |
| `kindModifiers` | `string?` | 修饰符字符串（`abstract` / `export` / `deprecated` / …） |
| `sortText` | `string` | 排序键 |
| `filterText` | `string?` | 过滤文本（模糊匹配用） |
| `insertText` | `string?` | 实际插入文本（与 `name` 不同时） |
| `isSnippet` | `true?` | 是否为 snippet（含 `$1` 占位符） |
| `replacementSpan` | `TextSpan?` | 替换的文本范围 |
| `hasAction` | `true?` | 是否需要额外操作（如自动导入） |
| `source` | `string?` | 来源模块路径（自动导入用） |
| `sourceDisplay` | `SymbolDisplayPart[]?` | 来源模块显示文本 |
| `labelDetails` | `CompletionEntryLabelDetails?` | 详细标签（TS 4.7+） |
| `isPackageJsonImport` | `true?` | 来自 `package.json` 的导入 |
| `data` | `CompletionEntryData?` | 额外数据（供后续查询详情用） |

---

## QuickInfo

```ts
interface QuickInfo {
  kind: ScriptElementKind;
  kindModifiers: string;
  textSpan: TextSpan;
  displayParts?: SymbolDisplayPart[];          // 类型显示（拼接即得类型文本）
  documentation?: SymbolDisplayPart[];         // JSDoc 文档
  tags?: JSDocTagInfo[];                       // JSDoc 标签
  canIncreaseVerbosityLevel?: boolean;         // 是否可提升详细度（TS 5.9 新增）
}
```

---

## InlayHint（TS 4.4+）

```ts
interface InlayHint {
  text: string;
  position: number;                     // 文件偏移
  kind: InlayHintKind;                  // Type | Parameter | Enum
  whitespaceBefore?: boolean;
  whitespaceAfter?: boolean;
  displayParts?: InlayHintDisplayPart[];  // 含跳转链接的详细部件
}

const enum InlayHintKind {
  Type      = 'Type',
  Parameter = 'Parameter',
  Enum      = 'Enum',
}
```

---

## Diagnostic

```ts
interface Diagnostic extends DiagnosticRelatedInformation {
  category: DiagnosticCategory;
  code: number;
  source?: string;
  relatedInformation?: DiagnosticRelatedInformation[];
  reportsDeprecated?: {} | true;
  reportsUnnecessary?: {} | true;
  skippedOn?: keyof CompilerOptions;
}

interface DiagnosticRelatedInformation {
  category: DiagnosticCategory;
  code: number;
  file: SourceFile | undefined;
  start: number | undefined;
  length: number | undefined;
  messageText: string | DiagnosticMessageChain;
}

const enum DiagnosticCategory {
  Warning     = 0,
  Error       = 1,
  Suggestion  = 2,
  Message     = 3,
}
```

### 格式化工具

```ts
// 展平嵌套的诊断消息链
ts.flattenDiagnosticMessageText(diag.messageText, '\n');

// 带颜色和上下文的终端输出
ts.formatDiagnosticsWithColorAndContext(diagnostics, {
  getCurrentDirectory: () => process.cwd(),
  getCanonicalFileName: (f) => f,
  getNewLine: () => '\n',
});
```
