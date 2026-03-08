<template>
  <div class="ast-viewer vp-raw" :class="{ 'is-fullscreen': isFullscreen }">
    <Splitpanes class="outer-split">
      <!-- 左栏：编辑器 -->
      <Pane min-size="20" :size="45" class="left-pane">
        <!-- 工具栏 -->
        <div class="toolbar">
          <span class="toolbar-label">Tree mode</span>
          <el-select v-model="treeMode" size="small" style="width: 90px">
            <el-option label="Full" value="Full" />
            <el-option label="Bound" value="Bound" />
          </el-select>

          <span class="toolbar-label">Script kind</span>
          <el-select v-model="scriptKind" size="small" style="width: 80px">
            <el-option label="TS" value="TS" />
            <el-option label="TSX" value="TSX" />
            <el-option label="JS" value="JS" />
            <el-option label="JSX" value="JSX" />
          </el-select>

          <span v-if="compileError" class="error-badge">
            <el-icon><Warning /></el-icon> 解析错误
          </span>

          <div class="toolbar-spacer" />

          <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'" placement="top">
            <el-button
              size="small"
              :icon="isFullscreen ? Aim : FullScreen"
              circle
              @click="toggleFullscreen"
            />
          </el-tooltip>
        </div>

        <!-- CodeMirror 编辑器 -->
        <div ref="editorContainer" class="editor-container" />
      </Pane>

      <!-- 右栏 -->
      <Pane min-size="20" class="right-pane">
        <Splitpanes horizontal class="inner-split">
          <!-- AST 树 -->
          <Pane min-size="15" :size="60" class="ast-tree-pane">
            <div class="pane-header">AST</div>
            <AstTree
              :source-file="compileResult?.sourceFile ?? null"
              :selected-node="selectedNode"
              :hovered-node="hoveredNode"
              :tree-mode="treeMode"
              :cursor-pos="cursorPos"
              @select="handleNodeSelect"
              @hover="hoveredNode = $event"
            />
          </Pane>

          <!-- 详情面板 -->
          <Pane min-size="15" class="detail-pane">
            <el-tabs v-model="activeTab" size="small" class="detail-tabs">
              <el-tab-pane label="Node" name="node">
                <AstNodeDetail
                  :node="selectedNode"
                  :source-file="compileResult?.sourceFile ?? null"
                />
              </el-tab-pane>
              <el-tab-pane label="Symbol" name="symbol">
                <AstSymbolDetail
                  :node="selectedNode"
                  :checker="compileResult?.checker ?? null"
                  @jump-to="handleJumpTo"
                />
              </el-tab-pane>
              <el-tab-pane label="Type" name="type">
                <AstTypeDetail
                  :node="selectedNode"
                  :checker="compileResult?.checker ?? null"
                />
              </el-tab-pane>
            </el-tabs>
          </Pane>
        </Splitpanes>
      </Pane>
    </Splitpanes>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, watch, onMounted, onBeforeUnmount, computed } from 'vue'
import { useData } from 'vitepress'
import ts from 'typescript'
import { Warning, FullScreen, Aim } from '@element-plus/icons-vue'
import { Splitpanes, Pane } from 'splitpanes'

// CodeMirror
import { EditorView, Decoration, type DecorationSet } from '@codemirror/view'
import { EditorState, StateField, StateEffect } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView as EV } from '@codemirror/view'
import { basicSetup } from 'codemirror'

const lightTheme = EV.theme({
  '&': { background: 'var(--vp-c-bg)', color: 'var(--vp-c-text-1)' },
  '.cm-gutters': { background: 'var(--vp-c-bg-soft)', color: 'var(--vp-c-text-3)', border: 'none' },
  '.cm-activeLineGutter': { background: 'var(--vp-c-default-soft)' },
  '.cm-activeLine': { background: 'var(--vp-c-default-soft)' },
  '&.cm-focused .cm-selectionBackground': { background: '#b3d7ff' },
  '.cm-selectionBackground': { background: '#b3d7ff' },
})

import AstTree from './AstTree.vue'
import AstNodeDetail from './AstNodeDetail.vue'
import AstSymbolDetail from './AstSymbolDetail.vue'
import AstTypeDetail from './AstTypeDetail.vue'
import { useAstCompiler, type TreeMode, type ScriptKindName } from './useAstCompiler'

// ---- 全屏 ----
const isFullscreen = ref(false)

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value
}

// ESC 退出网页内全屏
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isFullscreen.value) {
    isFullscreen.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
})

// ---- 状态 ----
const treeMode = ref<TreeMode>('Full')
const scriptKind = ref<ScriptKindName>('TS')
const activeTab = ref('node')
const selectedNode = shallowRef<ts.Node | null>(null)
const hoveredNode = shallowRef<ts.Node | null>(null)
const cursorPos = ref(0)

const DEFAULT_CODE = `interface Animal {
  name: string
  speak(): string
}

class Dog implements Animal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  speak(): string {
    return \`Woof! I'm \${this.name}\`
  }
}

function greet<T extends Animal>(animal: T): string {
  return animal.speak()
}

const dog = new Dog('Buddy')
console.log(greet(dog))
`

const { isDark } = useData()

// ---- 编译 ----
const code = ref(DEFAULT_CODE)
const { result: compileResult, error: compileError } = useAstCompiler(code, scriptKind)

// ---- CodeMirror ----
const editorContainer = ref<HTMLElement | null>(null)
let editorView: EditorView | null = null

// 高亮 decoration effect
const setHighlight = StateEffect.define<{ from: number; to: number } | null>()
const highlightField = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(deco, tr) {
    for (const e of tr.effects) {
      if (e.is(setHighlight)) {
        if (e.value == null) return Decoration.none
        const { from, to } = e.value
        if (from >= to) return Decoration.none
        return Decoration.set([
          Decoration.mark({ class: 'cm-ast-highlight' }).range(from, to)
        ])
      }
    }
    return deco.map(tr.changes)
  },
  provide: f => EditorView.decorations.from(f),
})

// hover decoration effect
const setHoverHighlight = StateEffect.define<{ from: number; to: number } | null>()
const hoverHighlightField = StateField.define<DecorationSet>({
  create: () => Decoration.none,
  update(deco, tr) {
    for (const e of tr.effects) {
      if (e.is(setHoverHighlight)) {
        if (e.value == null) return Decoration.none
        const { from, to } = e.value
        if (from >= to) return Decoration.none
        return Decoration.set([
          Decoration.mark({ class: 'cm-ast-hover' }).range(from, to)
        ])
      }
    }
    return deco.map(tr.changes)
  },
  provide: f => EditorView.decorations.from(f),
})

function buildEditorTheme(dark: boolean) {
  return dark ? oneDark : lightTheme
}

onMounted(() => {
  if (!editorContainer.value) return

  const state = EditorState.create({
    doc: code.value,
    extensions: [
      basicSetup,
      javascript({ typescript: true }),
      buildEditorTheme(isDark.value),
      highlightField,
      hoverHighlightField,
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          code.value = update.state.doc.toString()
        }
        // 光标移动：只有编辑器有焦点时才同步到 AST 树
        if (editorFocused) {
          const pos = update.state.selection.main.head
          cursorPos.value = pos
        }
      }),
      EditorView.domEventHandlers({
        focus: () => { editorFocused = true },
        blur: () => { editorFocused = false },
      }),
      EditorView.theme({
        '&': { height: '100%' },
        '.cm-scroller': { overflow: 'auto', height: '100%' },
        '.cm-ast-highlight': {
          background: 'rgba(99, 102, 241, 0.25)',
          borderRadius: '2px',
        },
        '.cm-ast-hover': {
          background: 'rgba(99, 102, 241, 0.1)',
          borderRadius: '2px',
          outline: '1px dashed rgba(99, 102, 241, 0.5)',
        },
      }),
    ],
  })

  editorView = new EditorView({ state, parent: editorContainer.value })
})

onBeforeUnmount(() => {
  editorView?.destroy()
})

// 主题切换重建 editor（简单方案）
watch(isDark, (dark) => {
  if (!editorView || !editorContainer.value) return
  const doc = editorView.state.doc.toString()
  editorView.destroy()
  const state = EditorState.create({
    doc,
    extensions: [
      basicSetup,
      javascript({ typescript: true }),
      buildEditorTheme(dark),
      highlightField,
      hoverHighlightField,
      EditorView.updateListener.of(update => {
        if (update.docChanged) code.value = update.state.doc.toString()
        if (editorFocused) {
          cursorPos.value = update.state.selection.main.head
        }
      }),
      EditorView.domEventHandlers({
        focus: () => { editorFocused = true },
        blur: () => { editorFocused = false },
      }),
      EditorView.theme({
        '&': { height: '100%' },
        '.cm-scroller': { overflow: 'auto', height: '100%' },
        '.cm-ast-highlight': { background: 'rgba(99,102,241,0.25)', borderRadius: '2px' },
        '.cm-ast-hover': { background: 'rgba(99,102,241,0.1)', borderRadius: '2px', outline: '1px dashed rgba(99,102,241,0.5)' },
      }),
    ],
  })
  editorView = new EditorView({ state, parent: editorContainer.value })
})

// 节点选中 → 编辑器高亮 + 滚动
let editorFocused = false
function handleNodeSelect(node: ts.Node) {
  selectedNode.value = node
  if (!editorView) return
  const from = node.getStart(compileResult.value?.sourceFile, true)
  const to = node.end
  // 编辑器有焦点时只更新高亮，不移动光标（避免干扰用户打字）
  if (editorFocused) {
    editorView.dispatch({
      effects: [setHighlight.of({ from, to })],
    })
  } else {
    editorView.dispatch({
      effects: [setHighlight.of({ from, to })],
      selection: { anchor: from },
      scrollIntoView: true,
    })
  }
}

// hover → 编辑器淡色预览
watch(hoveredNode, (node) => {
  if (!editorView) return
  if (!node) {
    editorView.dispatch({ effects: [setHoverHighlight.of(null)] })
    return
  }
  const from = node.getStart(compileResult.value?.sourceFile, true)
  const to = node.end
  editorView.dispatch({ effects: [setHoverHighlight.of({ from, to })] })
})

// Symbol 跳转 → 编辑器定位
function handleJumpTo(pos: number) {
  if (!editorView) return
  editorView.dispatch({
    selection: { anchor: pos },
    scrollIntoView: true,
  })
}

</script>

<style scoped>
.ast-viewer {
  height: calc(100vh - var(--vp-nav-height));
  overflow: hidden;
  font-family: var(--vp-font-family-base);
}

.ast-viewer.is-fullscreen {
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100vw;
  z-index: 9999;
  background: var(--vp-c-bg);
}

/* splitpanes 覆盖 */
.ast-viewer :deep(.splitpanes__splitter) {
  background: var(--vp-c-divider);
  z-index: 1;
}
.ast-viewer :deep(.splitpanes--vertical > .splitpanes__splitter) {
  width: 4px;
  cursor: col-resize;
}
.ast-viewer :deep(.splitpanes--vertical > .splitpanes__splitter:hover),
.ast-viewer :deep(.splitpanes--vertical > .splitpanes__splitter:active) {
  background: var(--vp-c-brand-1);
}
.ast-viewer :deep(.splitpanes--horizontal > .splitpanes__splitter) {
  height: 4px;
  cursor: row-resize;
}
.ast-viewer :deep(.splitpanes--horizontal > .splitpanes__splitter:hover),
.ast-viewer :deep(.splitpanes--horizontal > .splitpanes__splitter:active) {
  background: var(--vp-c-brand-1);
}

.outer-split,
.inner-split {
  height: 100%;
}

/* 左栏 */
.left-pane {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  flex-shrink: 0;
}

.toolbar-label {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.error-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--el-color-danger);
}

.toolbar-spacer {
  flex: 1;
}

.editor-container {
  flex: 1;
  overflow: hidden;
  font-size: 13px;
}

/* 右栏 */
.right-pane {
  height: 100%;
  overflow: hidden;
}

.ast-tree-pane {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.pane-header {
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  flex-shrink: 0;
}

.detail-pane {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.detail-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.detail-tabs :deep(.el-tabs__header) {
  margin: 0;
  padding: 0 12px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
  flex-shrink: 0;
}

.detail-tabs :deep(.el-tabs__content) {
  flex: 1;
  overflow: hidden;
}

.detail-tabs :deep(.el-tab-pane) {
  height: 100%;
}
</style>
