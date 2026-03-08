<template>
  <div ref="containerRef" class="ast-tree vp-raw">
    <div class="ast-tree-inner">
      <AstTreeNode
        v-if="sourceFile"
        :node="sourceFile"
        :source-file="sourceFile"
        :selected-node="selectedNode"
        :hovered-node="hoveredNode"
        :tree-mode="treeMode"
        :depth="0"
        @select="$emit('select', $event)"
        @hover="$emit('hover', $event)"
      />
      <div v-else class="ast-tree-empty">输入代码后自动解析</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import ts from 'typescript'
import AstTreeNode from './AstTreeNode.vue'
import type { TreeMode } from './useAstCompiler'
import { isBoundNode } from './useAstCompiler'

const props = defineProps<{
  sourceFile: ts.SourceFile | null
  selectedNode: ts.Node | null
  hoveredNode: ts.Node | null
  treeMode: TreeMode
  cursorPos: number
}>()

const emit = defineEmits<{
  select: [node: ts.Node]
  hover: [node: ts.Node | null]
}>()

const containerRef = ref<HTMLElement | null>(null)

// 找到包含 pos 的最深节点
function findDeepestNode(node: ts.Node, pos: number): ts.Node {
  let deepest: ts.Node = node
  node.forEachChild(child => {
    if (child.pos <= pos && pos <= child.end) {
      if (props.treeMode === 'Bound' && !isBoundNode(child)) return
      const found = findDeepestNode(child, pos)
      if (found.end - found.pos <= deepest.end - deepest.pos) {
        deepest = found
      }
    }
  })
  return deepest
}

// 光标变化时自动选中最深匹配节点
watch(() => props.cursorPos, (pos) => {
  if (!props.sourceFile || pos < 0) return
  const node = findDeepestNode(props.sourceFile, pos)
  if (node !== props.sourceFile) {
    emit('select', node)
  }
})

// 选中节点变化时滚动到对应位置
watch(() => props.selectedNode, async () => {
  await nextTick()
  if (!containerRef.value || !props.selectedNode) return
  const selected = containerRef.value.querySelector('.selected > .ast-node-header')
  if (selected) {
    selected.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }
})
</script>

<style scoped>
.ast-tree {
  height: 100%;
  overflow: auto;
  padding: 4px 0;
}

.ast-tree-inner {
  min-width: max-content;
  padding-right: 12px;
}

.ast-tree-empty {
  padding: 24px;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 14px;
}
</style>
