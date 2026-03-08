<template>
  <div class="ast-node" :class="{ selected: isSelected, hovered: isHovered }">
    <div
      class="ast-node-header"
      :style="{ paddingLeft: depth * 16 + 'px' }"
      @click="handleClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- 展开/折叠箭头 -->
      <span
        v-if="hasChildren"
        class="expand-icon"
        @click.stop="toggleExpand"
      >
        <el-icon><ArrowRight v-if="!expanded" /><ArrowDown v-else /></el-icon>
      </span>
      <span v-else class="expand-icon expand-icon--leaf" />

      <!-- 节点类型名 -->
      <span class="node-kind" :class="kindClass">{{ kindName }}</span>

      <!-- 节点文本 -->
      <el-tooltip
        v-if="nodeText"
        :content="nodeText"
        placement="top"
        :disabled="nodeText.length <= 24"
      >
        <span class="node-text">{{ truncatedText }}</span>
      </el-tooltip>

      <!-- 位置 -->
      <span class="node-pos">[{{ node.pos }}, {{ node.end }}]</span>
    </div>

    <!-- 子节点 -->
    <template v-if="expanded && hasChildren">
      <AstTreeNode
        v-for="(child, i) in visibleChildren"
        :key="i"
        :node="child"
        :source-file="sourceFile"
        :selected-node="selectedNode"
        :hovered-node="hoveredNode"
        :tree-mode="treeMode"
        :depth="depth + 1"
        @select="$emit('select', $event)"
        @hover="$emit('hover', $event)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ArrowRight, ArrowDown } from '@element-plus/icons-vue'
import ts from 'typescript'
import { isBoundNode, type TreeMode } from './useAstCompiler'

const props = defineProps<{
  node: ts.Node
  sourceFile: ts.SourceFile
  selectedNode: ts.Node | null
  hoveredNode: ts.Node | null
  treeMode: TreeMode
  depth: number
}>()

const emit = defineEmits<{
  select: [node: ts.Node]
  hover: [node: ts.Node | null]
}>()

const expanded = ref(props.depth < 3)

const kindName = computed(() => ts.SyntaxKind[props.node.kind])

const nodeText = computed(() => {
  try {
    const text = props.node.getText(props.sourceFile)
    return text.replace(/\s+/g, ' ').trim()
  } catch {
    return ''
  }
})

const truncatedText = computed(() => {
  const t = nodeText.value
  return t.length > 24 ? t.slice(0, 24) + '…' : t
})

// 节点类型颜色分类
const kindClass = computed(() => {
  const k = props.node.kind
  if (k >= ts.SyntaxKind.FirstKeyword && k <= ts.SyntaxKind.LastKeyword) return 'kind-keyword'
  if (k === ts.SyntaxKind.Identifier) return 'kind-identifier'
  if (k >= ts.SyntaxKind.FirstLiteralToken && k <= ts.SyntaxKind.LastLiteralToken) return 'kind-literal'
  if (k >= ts.SyntaxKind.FirstPunctuation && k <= ts.SyntaxKind.LastPunctuation) return 'kind-punctuation'
  if (k >= ts.SyntaxKind.FirstStatement && k <= ts.SyntaxKind.LastStatement) return 'kind-statement'
  if (k >= ts.SyntaxKind.FirstDeclaration && k <= ts.SyntaxKind.LastDeclaration) return 'kind-declaration'
  return 'kind-other'
})

const allChildren = computed(() => {
  const children: ts.Node[] = []
  ts.forEachChild(props.node, child => { children.push(child) })
  return children
})

const visibleChildren = computed(() => {
  if (props.treeMode === 'Bound') {
    return allChildren.value.filter(isBoundNode)
  }
  return allChildren.value
})

const hasChildren = computed(() => visibleChildren.value.length > 0)

const isSelected = computed(() => props.selectedNode === props.node)
const isHovered = computed(() => props.hoveredNode === props.node)

// selectedNode 变化时，如果目标节点在本节点的后代范围内，自动展开
function isDescendant(target: ts.Node): boolean {
  return target.pos >= props.node.pos && target.end <= props.node.end && target !== props.node
}

watch(() => props.selectedNode, (target) => {
  if (target && isDescendant(target)) {
    expanded.value = true
  }
})

function toggleExpand() {
  expanded.value = !expanded.value
}

function handleClick() {
  if (!expanded.value && hasChildren.value) expanded.value = true
  emit('select', props.node)
}

function handleMouseEnter() {
  emit('hover', props.node)
}

function handleMouseLeave() {
  emit('hover', null)
}

// 供父组件调用：展开自身
function expandSelf() {
  expanded.value = true
}

defineExpose({ expandSelf, node: computed(() => props.node) })
</script>

<style scoped>
.ast-node-header {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-top: 2px;
  padding-bottom: 2px;
  padding-right: 8px;
  cursor: pointer;
  border-radius: 4px;
  user-select: none;
  font-size: 13px;
  line-height: 1.5;
  white-space: nowrap;
}

.ast-node-header:hover {
  background: var(--vp-c-default-soft);
}

.selected > .ast-node-header {
  background: var(--vp-c-brand-soft);
}

.hovered > .ast-node-header {
  background: var(--vp-c-default-soft);
  outline: 1px dashed var(--vp-c-brand-2);
}

.expand-icon {
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--vp-c-text-3);
}

.expand-icon--leaf {
  pointer-events: none;
}

.node-kind {
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  font-size: 12px;
}

.kind-keyword    { color: #9333ea; }
.kind-identifier { color: #2563eb; }
.kind-literal    { color: #16a34a; }
.kind-punctuation { color: var(--vp-c-text-3); }
.kind-statement  { color: #d97706; }
.kind-declaration { color: #dc2626; }
.kind-other      { color: var(--vp-c-text-2); }

.dark .kind-keyword    { color: #c084fc; }
.dark .kind-identifier { color: #60a5fa; }
.dark .kind-literal    { color: #4ade80; }
.dark .kind-statement  { color: #fbbf24; }
.dark .kind-declaration { color: #f87171; }

.node-text {
  font-family: var(--vp-font-family-mono);
  font-size: 11px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-default-soft);
  padding: 0 4px;
  border-radius: 3px;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.node-pos {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-left: auto;
  white-space: nowrap;
}
</style>
