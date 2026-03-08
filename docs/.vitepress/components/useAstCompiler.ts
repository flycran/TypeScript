import { ref, shallowRef, watch, type Ref } from 'vue'
import ts from 'typescript'
// @ts-ignore - raw import
import libDts from 'typescript/lib/lib.d.ts?raw'

export type TreeMode = 'Full' | 'Bound'
export type ScriptKindName = 'TS' | 'TSX' | 'JS' | 'JSX'

const SCRIPT_KIND_MAP: Record<ScriptKindName, ts.ScriptKind> = {
  TS: ts.ScriptKind.TS,
  TSX: ts.ScriptKind.TSX,
  JS: ts.ScriptKind.JS,
  JSX: ts.ScriptKind.JSX,
}

let cachedLibSourceFile: ts.SourceFile | null = null
function getLibSourceFile(): ts.SourceFile {
  if (!cachedLibSourceFile) {
    cachedLibSourceFile = ts.createSourceFile('lib.d.ts', libDts as string, ts.ScriptTarget.Latest, false)
  }
  return cachedLibSourceFile
}

function createHost(sourceFile: ts.SourceFile): ts.CompilerHost {
  return {
    getSourceFile(fileName) {
      if (fileName === 'input.ts') return sourceFile
      if (fileName === 'lib.d.ts') return getLibSourceFile()
      return undefined
    },
    writeFile: () => {},
    getDefaultLibFileName: () => 'lib.d.ts',
    useCaseSensitiveFileNames: () => true,
    getCanonicalFileName: (f) => f,
    getCurrentDirectory: () => '',
    getNewLine: () => '\n',
    fileExists: (f) => f === 'input.ts' || f === 'lib.d.ts',
    readFile: () => undefined,
    directoryExists: () => false,
    getDirectories: () => [],
  }
}

export interface CompileResult {
  sourceFile: ts.SourceFile
  checker: ts.TypeChecker
  program: ts.Program
}

export function useAstCompiler(
  code: Ref<string>,
  scriptKind: Ref<ScriptKindName>,
) {
  const result = shallowRef<CompileResult | null>(null)
  const error = ref<string | null>(null)

  function compile() {
    try {
      const kind = SCRIPT_KIND_MAP[scriptKind.value]
      const sf = ts.createSourceFile('input.ts', code.value, ts.ScriptTarget.Latest, true, kind)
      const host = createHost(sf)
      const program = ts.createProgram(['input.ts'], {
        target: ts.ScriptTarget.Latest,
        allowJs: true,
        strict: false,
        noLib: false,
      }, host)
      const checker = program.getTypeChecker()
      result.value = { sourceFile: sf, checker, program }
      error.value = null
    } catch (e: any) {
      error.value = e?.message ?? String(e)
    }
  }

  let timer: ReturnType<typeof setTimeout> | null = null
  watch([code, scriptKind], () => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(compile, 300)
  }, { immediate: true })

  return { result, error }
}

// 将位标志拆解为名称列表
export function decomposeBitFlags<T extends number>(
  flagsObj: Record<string | number, string | number>,
  value: number,
): string[] {
  const names: string[] = []
  for (const key of Object.keys(flagsObj)) {
    if (isNaN(Number(key))) continue
    const bit = Number(key)
    if (bit !== 0 && (value & bit) === bit) {
      names.push(flagsObj[bit] as string)
    }
  }
  return names
}

// 判断节点是否为"有语义绑定"节点（Bound 模式过滤用）
export function isBoundNode(node: ts.Node): boolean {
  return (
    ts.isIdentifier(node) ||
    ts.isStringLiteralLike(node) ||
    ts.isNumericLiteral(node) ||
    node.kind >= ts.SyntaxKind.FirstStatement && node.kind <= ts.SyntaxKind.LastStatement ||
    node.kind >= ts.SyntaxKind.FirstDeclaration && node.kind <= ts.SyntaxKind.LastDeclaration ||
    ts.isExpression(node) ||
    node.kind === ts.SyntaxKind.SourceFile
  )
}
