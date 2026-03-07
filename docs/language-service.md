
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
| `readFile(path, encoding?): string \| undefined` | 读取文件内容 |
| `fileExists(path): boolean` | 文件是否存在 |

### 可选实现

| 方法 | 说明 |
|------|------|
| `getNewLine?(): string` | 换行符（`\n` 或 `\r\n`） |
| `getProjectVersion?(): string` | 项目版本（变化时触发重新分析） |
| `getScriptKind?(fileName): ScriptKind` | 文件类型（TS / JS / TSX / JSX / JSON） |
| `getProjectReferences?(): readonly ProjectReference[] \| undefined` | 项目引用列表 |
| `getLocalizedDiagnosticMessages?(): any` | 本地化诊断消息 |
| `getCancellationToken?(): HostCancellationToken` | 取消令牌（用于中断长时运算） |
| `log?(s: string): void` | 日志输出 |
| `trace?(s: string): void` | 追踪输出 |
| `error?(s: string): void` | 错误输出 |
| `useCaseSensitiveFileNames?(): boolean` | 文件名是否区分大小写 |
| `readDirectory?(path, extensions?, ...): string[]` | 递归读目录 |
| `realpath?(path): string` | 解析真实路径（符号链接） |
| `getTypeRootsVersion?(): number` | 类型根版本（`@types` 变化时递增） |
| `resolveModuleNames?` | 自定义模块解析（**已废弃**，推荐改用 `resolveModuleNameLiterals`） |
| `getResolvedModuleWithFailedLookupLocationsFromCache?(modulename, containingFile, resolutionMode?): ResolvedModuleWithFailedLookupLocations \| undefined` | 从缓存获取模块解析结果 |
| `resolveTypeReferenceDirectives?` | 自定义类型引用解析（**已废弃**，推荐改用 `resolveTypeReferenceDirectiveReferences`） |
| `resolveModuleNameLiterals?` | 模块字面量解析（TS 5.0+，推荐） |
| `resolveTypeReferenceDirectiveReferences?` | 类型引用指令解析（推荐） |
| `getDirectories?(dir): string[]` | 列出目录 |
| `getCustomTransformers?(): CustomTransformers \| undefined` | 自定义 AST 变换器 |
| `isKnownTypesPackageName?(name): boolean` | 是否为已知的 `@types` 包名 |
| `installPackage?(options): Promise<ApplyCodeActionCommandResult>` | 安装缺失的类型包 |
| `writeFile?(fileName, content): void` | 写文件 |
| `getParsedCommandLine?(fileName): ParsedCommandLine \| undefined` | 解析好的 `tsconfig` |
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

## 查找定义相关接口

### DocumentSpan

`DefinitionInfo` 的基类，表示一个带文件名和文本范围的位置跨度。

```ts
interface DocumentSpan {
  textSpan: TextSpan;           // 定义名称所在的文本范围
  fileName: string;             // 所在文件路径
  originalTextSpan?: TextSpan;  // 若通过 .d.ts.map 重映射，原始范围
  originalFileName?: string;    // 原始文件路径
  contextSpan?: TextSpan;       // 整个声明的范围（textSpan 仅为名称部分时）
  originalContextSpan?: TextSpan;
}
```

### DefinitionInfo

继承自 `DocumentSpan`，描述一个具体的定义位置。

```ts
interface DefinitionInfo extends DocumentSpan {
  kind: ScriptElementKind;     // 符号类型（class / function / …）
  name: string;                // 符号名称
  containerKind: ScriptElementKind; // 容器类型（module / class / …）
  containerName: string;       // 容器名称
  unverified?: boolean;        // 为 true 时文件可能不存在
}
```

### DefinitionInfoAndBoundSpan

`getDefinitionAndBoundSpan` 的返回值，同时携带触发位置的文本范围。

```ts
interface DefinitionInfoAndBoundSpan {
  definitions?: readonly DefinitionInfo[]; // 找到的所有定义
  textSpan: TextSpan;                      // 触发查找时光标所在标识符的范围
}
```

### ImplementationLocation

`getImplementationAtPosition` 的返回元素，继承自 `DocumentSpan`。

```ts
interface ImplementationLocation extends DocumentSpan {
  kind: ScriptElementKind;        // 实现的符号类型
  displayParts: SymbolDisplayPart[]; // 显示文本（含类型信息）
}
```

### ReferenceEntry

`getReferencesAtPosition` / `getFileReferences` 的返回元素。

```ts
interface ReferenceEntry extends DocumentSpan {
  isWriteAccess: boolean;  // 是否为写操作（赋值/初始化）
  isInString?: true;       // 是否出现在字符串字面量中
}
```

### ReferencedSymbol

`findReferences` 的返回元素，含符号定义信息与所有引用位置。

```ts
interface ReferencedSymbol {
  definition: ReferencedSymbolDefinitionInfo; // 符号定义
  references: ReferencedSymbolEntry[];        // 所有引用位置
}

interface ReferencedSymbolDefinitionInfo extends DefinitionInfo {
  displayParts: SymbolDisplayPart[]; // 符号的显示文本
}

interface ReferencedSymbolEntry extends ReferenceEntry {
  isDefinition?: boolean; // 是否同时也是定义位置
}
```

---

## 重命名相关接口

### RenameInfo

`getRenameInfo` 的返回值，为联合类型。

```ts
type RenameInfo = RenameInfoSuccess | RenameInfoFailure;

interface RenameInfoSuccess {
  canRename: true;
  fileToRename?: string;   // 若设置，则应调用 getEditsForFileRename 而非 findRenameLocations
  displayName: string;     // 符号显示名称
  fullDisplayName: string; // 完整显示名称（含容器路径）
  kind: ScriptElementKind;
  kindModifiers: string;
  triggerSpan: TextSpan;   // 触发重命名的文本范围
}

interface RenameInfoFailure {
  canRename: false;
  localizedErrorMessage: string; // 不可重命名的原因
}
```

### RenameLocation

`findRenameLocations` 的返回元素，继承自 `DocumentSpan`。

```ts
interface RenameLocation extends DocumentSpan {
  readonly prefixText?: string; // 插入到新名称前的文本
  readonly suffixText?: string; // 插入到新名称后的文本
}
```

---

## 签名帮助相关接口

### SignatureHelpItems

`getSignatureHelpItems` 的返回值。

```ts
interface SignatureHelpItems {
  items: SignatureHelpItem[];  // 所有可选重载签名
  applicableSpan: TextSpan;   // 整个调用表达式的范围
  selectedItemIndex: number;  // 当前匹配的签名索引
  argumentIndex: number;      // 当前光标所在的参数位置
  argumentCount: number;      // 参数总数
}
```

### SignatureHelpItem

单个函数签名的完整信息。

```ts
interface SignatureHelpItem {
  isVariadic: boolean;                     // 是否含剩余参数
  prefixDisplayParts: SymbolDisplayPart[]; // 左括号前的显示部件
  suffixDisplayParts: SymbolDisplayPart[]; // 右括号后的显示部件
  separatorDisplayParts: SymbolDisplayPart[]; // 参数间分隔符（逗号）
  parameters: SignatureHelpParameter[];    // 各参数详情
  documentation: SymbolDisplayPart[];      // JSDoc 文档
  tags: JSDocTagInfo[];                    // JSDoc 标签
}
```

### SignatureHelpParameter

单个参数的签名帮助信息。

```ts
interface SignatureHelpParameter {
  name: string;
  documentation: SymbolDisplayPart[]; // 参数 JSDoc
  displayParts: SymbolDisplayPart[];  // 参数类型显示
  isOptional: boolean;
  isRest?: boolean;                   // 是否为剩余参数（...args）
}
```

---

## 代码操作 / 重构相关接口

### TextChange

一次文本编辑操作。

```ts
interface TextChange {
  span: TextSpan;   // 要替换的原文范围
  newText: string;  // 替换后的新文本（空字符串表示删除）
}
```

### FileTextChanges

对单个文件的一批编辑。

```ts
interface FileTextChanges {
  fileName: string;
  textChanges: readonly TextChange[];
  isNewFile?: boolean; // 为 true 时表示需要创建新文件
}
```

### CodeFixAction

`getCodeFixesAtPosition` 的返回元素。

```ts
interface CodeFixAction extends CodeAction {
  fixName: string;           // 修复的唯一短名（用于遥测）
  fixId?: {};                // 若设置，可调用 getCombinedCodeFix 批量应用
  fixAllDescription?: string;
}

interface CodeAction {
  description: string;           // UI 显示的描述文本
  changes: FileTextChanges[];    // 所有文件修改
  commands?: CodeActionCommand[]; // 需要额外执行的命令（如安装依赖）
}
```

### CombinedCodeActions

`getCombinedCodeFix` 的返回值，合并同类修复为一次操作。

```ts
interface CombinedCodeActions {
  changes: readonly FileTextChanges[];
  commands?: readonly CodeActionCommand[];
}
```

### ApplicableRefactorInfo

`getApplicableRefactors` 的返回元素，一个重构分组下可包含多个 action。

```ts
interface ApplicableRefactorInfo {
  name: string;                  // 重构的程序化名称
  description: string;           // 重构分组描述
  inlineable?: boolean;          // 是否可提升到上下文菜单顶层（默认 true）
  actions: RefactorActionInfo[]; // 具体操作列表
}

interface RefactorActionInfo {
  name: string;                  // 操作的程序化名称
  description: string;           // 操作说明
  notApplicableReason?: string;  // 不适用的原因（需 UserPreferences.provideRefactorNotApplicableReason）
  kind?: string;                 // 层级点分名（如 "refactor.extract.function"）
  isInteractive?: boolean;       // 是否需要额外交互参数
}
```

### RefactorEditInfo

`getEditsForRefactor` 的返回值。

```ts
interface RefactorEditInfo {
  edits: FileTextChanges[];      // 所有文件修改
  renameFilename?: string;       // 若需要重命名，此为目标文件名
  renameLocation?: number;       // 重命名触发偏移
  commands?: CodeActionCommand[];
  notApplicableReason?: string;  // 重构无法应用时的原因
}
```

---

## 导航 / 文档结构相关接口

### NavigationBarItem

`getNavigationBarItems` 的返回元素，用于编辑器面包屑双列布局。子项的 `childItems` 始终为空数组。

```ts
interface NavigationBarItem {
  text: string;
  kind: ScriptElementKind;
  kindModifiers: string;
  spans: TextSpan[];             // 可能有多个（声明合并时）
  childItems: NavigationBarItem[];
  indent: number;                // 缩进层级
  bolded: boolean;
  grayed: boolean;
}
```

### NavigationTree

`getNavigationTree` 的返回值，完整的嵌套树结构。

```ts
interface NavigationTree {
  text: string;                  // 声明名称或简短描述（如 "<class>"）
  kind: ScriptElementKind;
  kindModifiers: string;         // 逗号分隔（如 "public,abstract"）
  spans: TextSpan[];             // 声明合并时有多个
  nameSpan: TextSpan | undefined;
  childItems?: NavigationTree[]; // 非空时存在
}
```

### OutliningSpan

`getOutliningSpans` 的返回元素，可折叠区域。

```ts
interface OutliningSpan {
  textSpan: TextSpan;   // 实际折叠的范围
  hintSpan: TextSpan;   // 悬停时显示的预览范围
  bannerText: string;   // 折叠后显示的占位文本
  autoCollapse: boolean; // "折叠所有定义" 命令时是否自动折叠
  kind: OutliningSpanKind;
}

enum OutliningSpanKind {
  Comment = "comment", // 注释块
  Region  = "region",  // #region / #endregion
  Code    = "code",    // 声明 / 表达式
  Imports = "imports", // 连续 import 块
}
```

### TodoComment

`getTodoComments` 的返回元素。

```ts
interface TodoComment {
  descriptor: TodoCommentDescriptor; // 触发的描述符（如 "TODO"）
  message: string;                   // 完整注释文本
  position: number;                  // 文件偏移
}

interface TodoCommentDescriptor {
  text: string;     // 要匹配的标记文本（如 "TODO"、"FIXME"）
  priority: number; // 优先级（越小越优先）
}
```

### DocumentHighlights

`getDocumentHighlights` 的返回元素，某一文件中所有高亮位置。

```ts
interface DocumentHighlights {
  fileName: string;
  highlightSpans: HighlightSpan[];
}

interface HighlightSpan {
  fileName?: string;
  isInString?: true;
  textSpan: TextSpan;
  contextSpan?: TextSpan;
  kind: HighlightSpanKind;
}

enum HighlightSpanKind {
  none             = "none",
  definition       = "definition",
  reference        = "reference",
  writtenReference = "writtenReference",
}
```

### SelectionRange

`getSmartSelectionRange` 的返回值，嵌套的智能选择范围链。

```ts
interface SelectionRange {
  textSpan: TextSpan;
  parent?: SelectionRange; // 向外扩展的父级范围
}
```

---

## 调用层次相关接口

### CallHierarchyItem

调用层次中的一个节点（函数 / 方法）。

```ts
interface CallHierarchyItem {
  name: string;
  kind: ScriptElementKind;
  kindModifiers?: string;
  file: string;
  span: TextSpan;          // 整个函数体的范围
  selectionSpan: TextSpan; // 函数名称的范围
  containerName?: string;
}
```

### CallHierarchyIncomingCall / CallHierarchyOutgoingCall

```ts
interface CallHierarchyIncomingCall {
  from: CallHierarchyItem;  // 调用方
  fromSpans: TextSpan[];    // 调用方内所有调用点
}

interface CallHierarchyOutgoingCall {
  to: CallHierarchyItem;    // 被调用方
  fromSpans: TextSpan[];    // 当前函数内的调用点
}
```

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

## ScriptElementKind

`ScriptElementKind` 是字符串枚举，用于表示符号/补全项的语义类型。

### 声明 / 标识符类

| 枚举成员 | 字符串值 | 说明 |
|----------|--------|------|
| `ScriptElementKind.classElement` | `"class"` | 类声明 |
| `ScriptElementKind.localClassElement` | `"local class"` | 局部类表达式 |
| `ScriptElementKind.interfaceElement` | `"interface"` | 接口声明 |
| `ScriptElementKind.typeElement` | `"type"` | `type` 别名 |
| `ScriptElementKind.enumElement` | `"enum"` | 枚举声明 |
| `ScriptElementKind.enumMemberElement` | `"enum member"` | 枚举成员 |
| `ScriptElementKind.moduleElement` | `"module"` | `module/namespace` |
| `ScriptElementKind.alias` | `"alias"` | 导入别名 / `import X =` |
| `ScriptElementKind.typeParameterElement` | `"type parameter"` | 泛型参数 |

### 变量 / 函数类

| 枚举成员 | 字符串值 | 说明 |
|----------|--------|------|
| `ScriptElementKind.variableElement` | `"var"` | 模块层变量 |
| `ScriptElementKind.localVariableElement` | `"local var"` | 函数内局部变量 |
| `ScriptElementKind.constElement` | `"const"` | `const` 声明 |
| `ScriptElementKind.letElement` | `"let"` | `let` 声明 |
| `ScriptElementKind.variableUsingElement` | `"using"` | `using` 声明 |
| `ScriptElementKind.variableAwaitUsingElement` | `"await using"` | `await using` 声明 |
| `ScriptElementKind.functionElement` | `"function"` | 模块层函数 |
| `ScriptElementKind.localFunctionElement` | `"local function"` | 局部函数 |
| `ScriptElementKind.parameterElement` | `"parameter"` | 函数参数 |

### 类成员类

| 枚举成员 | 字符串值 | 说明 |
|----------|--------|------|
| `ScriptElementKind.memberFunctionElement` | `"method"` | 实例方法 |
| `ScriptElementKind.memberVariableElement` | `"property"` | 属性 / 实例字段 |
| `ScriptElementKind.memberGetAccessorElement` | `"getter"` | `get` 访问器 |
| `ScriptElementKind.memberSetAccessorElement` | `"setter"` | `set` 访问器 |
| `ScriptElementKind.memberAccessorVariableElement` | `"accessor"` | auto-accessor |
| `ScriptElementKind.constructorImplementationElement` | `"constructor"` | 构造函数 / 静态块 |
| `ScriptElementKind.callSignatureElement` | `"call"` | 调用签名 |
| `ScriptElementKind.indexSignatureElement` | `"index"` | 索引签名 |
| `ScriptElementKind.constructSignatureElement` | `"construct"` | 构造签名 |

### 其他类

| 枚举成员 | 字符串值 | 说明 |
|----------|--------|------|
| `ScriptElementKind.keyword` | `"keyword"` | 关键字 / 预定义类型 |
| `ScriptElementKind.primitiveType` | `"primitive type"` | 原始类型 |
| `ScriptElementKind.scriptElement` | `"script"` | 顶层 script 节点 |
| `ScriptElementKind.directory` | `"directory"` | 目录 |
| `ScriptElementKind.externalModuleName` | `"external module name"` | 外部模块路径 |
| `ScriptElementKind.label` | `"label"` | 语句标签 |
| `ScriptElementKind.string` | `"string"` | 字符串字面量 |
| `ScriptElementKind.link` | `"link"` | JSDoc `{@link}` 前后文本 |
| `ScriptElementKind.linkName` | `"link name"` | JSDoc `{@link}` 实体名 |
| `ScriptElementKind.linkText` | `"link text"` | JSDoc `{@link}` 连接文本 |
| `ScriptElementKind.jsxAttribute` | `"JSX attribute"` | JSX 属性（`@deprecated`） |
| `ScriptElementKind.unknown` | `""` | 未知类型 |
| `ScriptElementKind.warning` | `"warning"` | 警告占位符 |

### ScriptElementKindModifier

`kindModifiers` 字段是以逗号分隔的字符串，各部分可能的值：

| 枚举成员 | 字符串值 | 说明 |
|----------|--------|------|
| `ScriptElementKindModifier.publicMemberModifier` | `"public"` | 公共成员 |
| `ScriptElementKindModifier.privateMemberModifier` | `"private"` | 私有成员 |
| `ScriptElementKindModifier.protectedMemberModifier` | `"protected"` | 受保护成员 |
| `ScriptElementKindModifier.exportedModifier` | `"export"` | 已导出 |
| `ScriptElementKindModifier.ambientModifier` | `"declare"` | ambient 声明 |
| `ScriptElementKindModifier.staticModifier` | `"static"` | 静态 |
| `ScriptElementKindModifier.abstractModifier` | `"abstract"` | 抄象 |
| `ScriptElementKindModifier.optionalModifier` | `"optional"` | 可选 |
| `ScriptElementKindModifier.deprecatedModifier` | `"deprecated"` | 已废弃 |
| `ScriptElementKindModifier.dtsModifier` | `".d.ts"` | 类型声明文件 |
| `ScriptElementKindModifier.tsModifier` | `".ts"` / `".tsx"` / `".js"` 等 | 文件扩展名 |

---

## UserPreferences

`UserPreferences` 用于控制计算机 API 的补全、重构、内嵌提示、导入整理等行为。

### 补全相关

| 字段 | 类型 | 说明 |
|------|------|------|
| `disableSuggestions` | `boolean?` | 禁用建议补全 |
| `quotePreference` | `"auto" \| "double" \| "single"` | 引号偏好 |
| `includeCompletionsForModuleExports` | `boolean?` | 搜索外部模块导出的补全（自动导入） |
| `includeCompletionsForImportStatements` | `boolean?` | import 语句中的补全 |
| `includeCompletionsWithSnippetText` | `boolean?` | 允许补全项为 snippet 模式 |
| `includeAutomaticOptionalChainCompletions` | `boolean?` | `.` 补全包含可选链 (`?.`) |
| `includeCompletionsWithInsertText` | `boolean?` | 包含无效标识符的 `["x"]` 订阅式补全 |
| `includeCompletionsWithClassMemberSnippets` | `boolean?` | 类成员补全包含完整声明 snippet |
| `includeCompletionsWithObjectLiteralMethodSnippets` | `boolean?` | 对象字面量方法补全 snippet |
| `useLabelDetailsInCompletionEntries` | `boolean?` | 设置是否支持 `labelDetails` 字段 |
| `allowIncompleteCompletions` | `boolean?` | 允许不完整补全列表 |
| `jsxAttributeCompletionStyle` | `"auto" \| "braces" \| "none"` | JSX 属性补全样式 |

### 自动导入相关

| 字段 | 类型 | 说明 |
|------|------|------|
| `importModuleSpecifierPreference` | `"shortest" \| "project-relative" \| "relative" \| "non-relative"` | 模块路径风格 |
| `importModuleSpecifierEnding` | `"auto" \| "minimal" \| "index" \| "js"` | 模块路径结尾 |
| `allowTextChangesInNewFiles` | `boolean?` | 允许在新文件中修改 |
| `includePackageJsonAutoImports` | `"auto" \| "on" \| "off"` | `package.json` 自动导入 |
| `autoImportFileExcludePatterns` | `string[]?` | 排除指定文件的自动导入 |
| `autoImportSpecifierExcludeRegexes` | `string[]?` | 排除指定路径的自动导入 |
| `preferTypeOnlyAutoImports` | `boolean?` | 优先使用 `import type` |

### 内嵌提示相关

| 字段 | 类型 | 说明 |
|------|------|------|
| `includeInlayParameterNameHints` | `"none" \| "literals" \| "all"` | 参数名内嵌提示 |
| `includeInlayParameterNameHintsWhenArgumentMatchesName` | `boolean?` | 当实参名与形参名相同时也显示 |
| `includeInlayFunctionParameterTypeHints` | `boolean?` | 函数参数类型提示 |
| `includeInlayVariableTypeHints` | `boolean?` | 变量类型提示 |
| `includeInlayVariableTypeHintsWhenTypeMatchesName` | `boolean?` | 类型与变量同名时也显示 |
| `includeInlayPropertyDeclarationTypeHints` | `boolean?` | 属性类型提示 |
| `includeInlayFunctionLikeReturnTypeHints` | `boolean?` | 函数返回类型提示 |
| `includeInlayEnumMemberValueHints` | `boolean?` | 枚举成员当前值提示 |
| `interactiveInlayHints` | `boolean?` | 可交互的内嵌提示（点击可跳转） |

### 导入整理相关

| 字段 | 类型 | 说明 |
|------|------|------|
| `organizeImportsIgnoreCase` | `"auto" \| boolean` | 忽略大小写 |
| `organizeImportsCollation` | `"ordinal" \| "unicode"` | 排序算法（默认 `"ordinal"`） |
| `organizeImportsLocale` | `string?` | Unicode 排序的 locale（默认 `"en"`） |
| `organizeImportsNumericCollation` | `boolean?` | 数字排序（`a1z < a2z < a100z`） |
| `organizeImportsAccentCollation` | `boolean?` | 将八位符视为不相等 |
| `organizeImportsCaseFirst` | `"upper" \| "lower" \| false` | 大写或小写优先 |
| `organizeImportsTypeOrder` | `"last" \| "inline" \| "first"` | `type-only` 导入排序位置（默认 `"last"`） |

### 其他选项

| 字段 | 类型 | 说明 |
|------|------|------|
| `providePrefixAndSuffixTextForRename` | `boolean?` | 重命名时提供前缀/后缀 |
| `allowRenameOfImportPath` | `boolean?` | 允许重命名导入路径 |
| `provideRefactorNotApplicableReason` | `boolean?` | 重构不可用时返回原因 |
| `excludeLibrarySymbolsInNavTo` | `boolean?` | navTo 结果排除标准库/node_modules |
| `displayPartsForJSDoc` | `boolean?` | JSDoc 返回带 displayParts |
| `generateReturnInDocTemplate` | `boolean?` | 自动生成 JSDoc `@returns` |
| `disableLineTextInReferences` | `boolean?` | 引用结果中不包含行内容 |
| `maximumHoverLength` | `number?` | 悬停文本最大长度（默认 500） |

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
