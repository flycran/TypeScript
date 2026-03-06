
# Language Service Plugin

TypeScript 4.x+ 提供完善的 Language Service Plugin 机制，允许在编辑器中扩展语义分析、补全、诊断等功能。

---

## 配置

在 `tsconfig.json` 的 `compilerOptions.plugins` 数组中注册插件：

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "my-ts-plugin",
        "someOption": true,
        "anotherOption": "value"
      }
    ]
  }
}
```

:::info

- 插件只在 **Language Service 模式**下运行（即 tsserver / IDE 中），不影响 `tsc` 编译输出。
- 若使用 `swc` 编译，插件仍可用于 IDE 类型提示，两者互不干扰。
:::

---

## 插件入口

插件必须导出一个 `init` 函数：

```ts
import type * as ts from 'typescript/lib/tsserverlibrary';

function init(modules: { typescript: typeof ts }): ts.server.PluginModule {
  const typescript = modules.typescript;

  return {
    create(info: ts.server.PluginCreateInfo): ts.LanguageService {
      const { languageService, languageServiceHost, project, config } = info;

      // 包装原有 LanguageService，返回增强版
      const proxy: ts.LanguageService = Object.create(null);

      // 先复制所有方法
      for (const k of Object.keys(languageService) as Array<keyof ts.LanguageService>) {
        const x = languageService[k];
        // @ts-ignore
        proxy[k] = (...args: unknown[]) => (x as Function).apply(languageService, args);
      }

      // 拦截并增强 getSemanticDiagnostics
      proxy.getSemanticDiagnostics = (fileName) => {
        const original = languageService.getSemanticDiagnostics(fileName);
        const extra = myCustomAnalysis(fileName, info);
        return [...original, ...extra];
      };

      // 拦截补全
      proxy.getCompletionsAtPosition = (fileName, position, options) => {
        const original = languageService.getCompletionsAtPosition(fileName, position, options);
        if (!original) return original;
        return {
          ...original,
          entries: [
            ...original.entries,
            ...myCustomCompletions(fileName, position, info),
          ],
        };
      };

      return proxy;
    },

    getExternalFiles(project: ts.server.Project): string[] {
      // 向项目注入虚拟文件（如代码生成的 .d.ts）
      return [];
    },

    onConfigurationChanged(config: any): void {
      // tsconfig plugins 配置变更时回调
      project.projectService.logger.info(`[my-ts-plugin] config updated: ${JSON.stringify(config)}`);
    },
  };
}

export = init;
```

---

## PluginModule 接口

```ts
interface PluginModule {
  create(createInfo: PluginCreateInfo): LanguageService;
  getExternalFiles?(proj: server.Project, updateLevel?: ProgramUpdateLevel): string[];
  onConfigurationChanged?(config: any): void;
}
```

| 成员 | 说明 |
|------|------|
| `create` | **必须实现**。接收 `PluginCreateInfo`，返回包装后的 `LanguageService` |
| `getExternalFiles` | 向项目注入额外文件路径（代码生成场景） |
| `onConfigurationChanged` | `tsconfig` 中该插件的配置对象变更时调用 |

---

## PluginCreateInfo 接口

```ts
interface PluginCreateInfo {
  project: server.Project;
  languageService: LanguageService;
  languageServiceHost: LanguageServiceHost;
  serverHost: server.ServerHost;
  session?: server.Session<unknown>;
  config: any;
}
```

| 字段 | 说明 |
|------|------|
| `project` | 当前 tsserver 项目对象 |
| `languageService` | **原始** `LanguageService`（应被包装而非替换） |
| `languageServiceHost` | `LanguageServiceHost` 实例 |
| `serverHost` | 服务器 Host（文件 I/O、监视等） |
| `session` | tsserver Session（可注册自定义请求） |
| `config` | `tsconfig.plugins[n]` 中该插件的配置对象 |

---

## server.Project 常用 API

```ts
interface Project {
  getLanguageService(ensureSynchronized?: boolean): LanguageService;
  getCompilerOptions(): CompilerOptions;
  getScriptFileNames(): string[]
  getRootFiles(): string[];
  getProjectName(): string;
  getTypeChecker(): TypeChecker;
  getProgram(): Program | undefined;
  projectService: server.ProjectService;
  log(msg: string): void;
}
```

---

## 自定义 tsserver 请求

可通过 `info.session` 注册自定义协议请求，供 IDE 插件调用：

```ts
create(info) {
  const session = info.session;

  if (session) {
    // 注册自定义命令
    (session as any).addProtocolHandler('myPlugin/getTypeInfo', (request: any) => {
      const { file, position } = request.arguments;
      const type = getCustomTypeInfo(file, position, info);
      return { response: type, responseRequired: true };
    });
  }

  return wrapLanguageService(info.languageService);
}
```

---

## 虚拟文件 / 代码生成

对于 Vue / Svelte 等框架插件，需要向 TypeScript 注入虚拟 `.ts` 文件：

```ts
function init(modules: { typescript: typeof ts }): ts.server.PluginModule {
  const virtualFiles = new Map<string, string>();

  return {
    create(info) {
      // 劫持 LanguageServiceHost 以提供虚拟文件
      const originalGetScriptSnapshot = info.languageServiceHost.getScriptSnapshot.bind(
        info.languageServiceHost
      );
      info.languageServiceHost.getScriptSnapshot = (fileName) => {
        if (virtualFiles.has(fileName)) {
          return ts.ScriptSnapshot.fromString(virtualFiles.get(fileName)!);
        }
        return originalGetScriptSnapshot(fileName);
      };

      const originalGetScriptFileNames = info.languageServiceHost.getScriptFileNames.bind(
        info.languageServiceHost
      );
      info.languageServiceHost.getScriptFileNames = () => {
        return [...originalGetScriptFileNames(), ...virtualFiles.keys()];
      };

      return info.languageService;
    },

    getExternalFiles(project) {
      // 告知 tsserver 这些虚拟文件属于该项目
      return [...virtualFiles.keys()];
    },
  };
}
```

---

## 调试插件

### 启用 tsserver 日志

在 VS Code 的 `settings.json` 中：

```json
{
  "typescript.tsserver.log": "verbose",
  "typescript.tsserver.pluginPaths": ["./node_modules"]
}
```

日志文件位于 VS Code 的输出面板（TypeScript 频道）或临时目录下的 `tsserver.log`。

### 在插件中写日志

```ts
create(info) {
  const log = (msg: string) =>
    info.project.projectService.logger.info(`[my-plugin] ${msg}`);

  log('plugin initialized');
  log(`config: ${JSON.stringify(info.config)}`);
  // ...
}
```

---

## 完整插件模板

```ts
import type * as ts from 'typescript/lib/tsserverlibrary';

interface PluginConfig {
  strict?: boolean;
  ignore?: string[];
}

function init(modules: { typescript: typeof ts }): ts.server.PluginModule {
  const ts = modules.typescript;
  let config: PluginConfig = {};

  function createProxy(info: ts.server.PluginCreateInfo): ts.LanguageService {
    const ls = info.languageService;
    const log = (msg: string) =>
      info.project.projectService.logger.info(`[my-plugin] ${msg}`);

    log('create called');

    const proxy: ts.LanguageService = Object.create(null);
    for (const k of Object.keys(ls) as Array<keyof ts.LanguageService>) {
      const x = ls[k];
      // @ts-expect-error
      proxy[k] = (...args: unknown[]) => (x as Function).apply(ls, args);
    }

    proxy.getSemanticDiagnostics = (fileName) => {
      const diags = ls.getSemanticDiagnostics(fileName);
      if (config.ignore?.some((p) => fileName.includes(p))) return diags;

      const sf = ls.getProgram()?.getSourceFile(fileName);
      if (!sf) return diags;

      const checker = ls.getProgram()!.getTypeChecker();
      const extraDiags: ts.Diagnostic[] = [];

      // 在此添加自定义分析逻辑...

      return [...diags, ...extraDiags];
    };

    return proxy;
  }

  return {
    create: createProxy,
    onConfigurationChanged(newConfig: PluginConfig) {
      config = newConfig;
    },
  };
}

export = init;
```

---

## 发布插件

`package.json` 示例：

```json
{
  "name": "typescript-my-plugin",
  "version": "1.0.0",
  "main": "lib/index.js",
  "peerDependencies": {
    "typescript": ">=4.0.0"
  },
  "keywords": ["typescript-plugin"]
}
```

:::tip
包名以 `typescript-` 开头是社区惯例，VS Code 会自动推荐安装。
:::
