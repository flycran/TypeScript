import ts from 'typescript'
import path from 'path'
import fs from 'fs/promises'

const currentFileName = import.meta.url.replace('file://', '');

const currentDirname = path.dirname(currentFileName)

const tsconfigFile = await fs.readFile(path.resolve(currentDirname, '../src/typescript/tsconfig.json'), 'utf8');

const tsconfig = JSON.parse(tsconfigFile);

const fileName = path.resolve(currentDirname, './program.ts');

const sourceText = await fs.readFile(fileName, 'utf8');

const host: ts.LanguageServiceHost = {
    getCompilationSettings: () => (tsconfig),
    getScriptFileNames: () => [fileName],
    getScriptVersion: () => "1",
    getScriptSnapshot: (f) => f === fileName ? ts.ScriptSnapshot.fromString(sourceText) : undefined,
    getCurrentDirectory: () => currentDirname,
    getDefaultLibFileName: (o) => ts.getDefaultLibFilePath(o),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
};


const service = ts.createLanguageService(host);

const program = ts.createProgram([fileName], { strict: true });

const checker = program.getTypeChecker();

const sf = program.getSourceFile(fileName)!;

function getNodeAt(sourceFile: ts.SourceFile, line: number, character: number): ts.Node {
    const pos = sourceFile.getPositionOfLineAndCharacter(line, character);
    let current: ts.Node = sourceFile;
    while (true) {
        const child = current.getChildren(sourceFile).find(c => c.pos <= pos && pos < c.end);
        if (!child) break;
        current = child;
    }
    return current;
}

const node = getNodeAt(sf, 18, 22);

const symbol = checker.getSymbolAtLocation(node);

debugger

service.dispose()