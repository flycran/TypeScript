import ts from 'typescript'
import path from 'path'

const sourceText = "const foo = 123;";

// 1. 解析单文件（仅语法，无类型）
const sf = ts.createSourceFile('foo.ts', sourceText, ts.ScriptTarget.Latest, true);

debugger

/**
 * 创建一个简单的 LanguageServiceHost，用于测试
 */
/* function createLanguageServiceHost(fileName: string, source: string): ts.LanguageServiceHost {
    const files: Record<string, { version: number; content: string }> = {
        [fileName]: { version: 0, content: source },
    };

    return {
        getScriptFileNames: () => [fileName],
        getScriptVersion: (f) => String(files[f]?.version ?? 0),
        getScriptSnapshot: (f) => {
            if (!files[f]) return undefined;
            return ts.ScriptSnapshot.fromString(files[f].content);
        },
        getCurrentDirectory: () => process.cwd(),
        getCompilationSettings: () => ({
            target: ts.ScriptTarget.ES2020,
            module: ts.ModuleKind.CommonJS,
            strict: true,
        }),
        getDefaultLibFileName: (opts) => ts.getDefaultLibFilePath(opts),
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        readDirectory: ts.sys.readDirectory,
    };
} */

/**
 * 解析一段 TypeScript 源码并获取诊断信息
 */
/* function analyzeSource(fileName: string, source: string) {
    const host = createLanguageServiceHost(fileName, source);
    const registry = ts.createDocumentRegistry();
    const langService = ts.createLanguageService(host, registry);

    const syntacticDiagnostics = langService.getSyntacticDiagnostics(fileName);
    const semanticDiagnostics = langService.getSemanticDiagnostics(fileName);
    const program = langService.getProgram()!;
    const sourceFile = program.getSourceFile(fileName)!;
    const checker = program.getTypeChecker();

    return {
        langService,
        program,
        sourceFile,
        checker,
        syntacticDiagnostics,
        semanticDiagnostics,
    };
} */

/**
 * 遍历 AST 节点
 */
/* function visitNode(node: ts.Node, depth = 0): void {
    const indent = "  ".repeat(depth);
    const kind = ts.SyntaxKind[node.kind];
    console.log(`${indent}[${kind}]`);
    node.forEachChild(child => visitNode(child, depth + 1));
} */

/**
 * 获取指定位置的类型信息
 */
/* function getTypeAtPosition(
    langService: ts.LanguageService,
    fileName: string,
    position: number
): string | undefined {
    const quickInfo = langService.getQuickInfoAtPosition(fileName, position);
    if (!quickInfo?.displayParts) return undefined;
    return quickInfo.displayParts.map(p => p.text).join("");
} */

/**
 * 查找所有引用
 */
/* function findAllReferences(
    langService: ts.LanguageService,
    fileName: string,
    position: number
) {
    return langService.findReferences(fileName, position);
} */

// ===== 13. 主流程 =====

/* const sampleSource = `
interface Point { x: number; y: number; }
const p: Point = { x: 1, y: 2 };
console.log(p.x + p.y);
`; */

/* const targetFile = "sample.ts";
const analysis = analyzeSource(targetFile, sampleSource);

console.log("=== Syntactic Diagnostics ===");
analysis.syntacticDiagnostics.forEach(d =>
    console.log(" -", ts.flattenDiagnosticMessageText(d.messageText, "\n"))
);

console.log("=== Semantic Diagnostics ===");
analysis.semanticDiagnostics.forEach(d =>
    console.log(" -", ts.flattenDiagnosticMessageText(d.messageText, "\n"))
);

console.log("=== AST Structure ===");
visitNode(analysis.sourceFile);

console.log("=== Completions at position 40 ===");
const completions = analysis.langService.getCompletionsAtPosition(
    targetFile,
    sampleSource.indexOf("p.x") + 2, // after "p."
    undefined
);
completions?.entries.slice(0, 5).forEach(e =>
    console.log(" -", e.name, ":", e.kind)
); */
