<template>
  <div v-if="node" class="detail-panel vp-raw">
    <el-descriptions :column="2" size="small" border>
      <el-descriptions-item label="kind">
        <code>{{ kindName }}</code>
        <span class="kind-value">({{ node.kind }})</span>
      </el-descriptions-item>
      <el-descriptions-item label="parent.kind">
        <code v-if="node.parent">{{ parentKindName }}</code>
        <span v-else class="text-muted">—</span>
      </el-descriptions-item>
      <el-descriptions-item label="pos">{{ node.pos }}</el-descriptions-item>
      <el-descriptions-item label="end">{{ node.end }}</el-descriptions-item>
      <el-descriptions-item label="flags" :span="2">
        <template v-if="flagNames.length">
          <el-tag
            v-for="f in flagNames"
            :key="f"
            size="small"
            type="info"
            class="flag-tag"
          >{{ f }}</el-tag>
        </template>
        <span v-else class="text-muted">None</span>
      </el-descriptions-item>
    </el-descriptions>

    <div v-if="nodeText" class="node-raw-text">
      <div class="section-label">原始文本</div>
      <pre class="raw-code">{{ nodeText }}</pre>
    </div>
  </div>

  <div v-else class="detail-empty">
    点击 AST 树中的节点查看详情
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ts from 'typescript'
import { decomposeBitFlags } from './useAstCompiler'

const props = defineProps<{
  node: ts.Node | null
  sourceFile: ts.SourceFile | null
}>()

const kindName = computed(() => props.node ? ts.SyntaxKind[props.node.kind] : '')
const parentKindName = computed(() =>
  props.node?.parent ? ts.SyntaxKind[props.node.parent.kind] : ''
)

const flagNames = computed(() => {
  if (!props.node) return []
  return decomposeBitFlags(ts.NodeFlags as any, props.node.flags)
})

const nodeText = computed(() => {
  if (!props.node || !props.sourceFile) return ''
  try {
    return props.node.getText(props.sourceFile)
  } catch {
    return ''
  }
})
</script>

<style scoped>
.detail-panel {
  padding: 12px;
  height: 100%;
  overflow-y: auto;
}

.detail-empty {
  padding: 24px;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.kind-value {
  margin-left: 6px;
  color: var(--vp-c-text-3);
  font-size: 12px;
}

.flag-tag {
  margin-right: 4px;
  margin-bottom: 2px;
}

.text-muted {
  color: var(--vp-c-text-3);
}

.section-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin: 12px 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.raw-code {
  background: var(--vp-c-default-soft);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 12px;
  font-family: var(--vp-font-family-mono);
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 160px;
  overflow-y: auto;
  margin: 0;
}
</style>
