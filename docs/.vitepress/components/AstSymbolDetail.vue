<template>
  <div class="detail-panel vp-raw">
    <!-- 无节点 -->
    <div v-if="!node" class="detail-empty">点击 AST 树中的节点查看 Symbol</div>

    <!-- 有节点但无 Symbol -->
    <div v-else-if="!symbol" class="detail-hint">
      <el-empty description="该节点无关联 Symbol" :image-size="48">
        <template #description>
          <p class="hint-text">该节点无关联 Symbol</p>
          <p class="hint-sub">尝试选中标识符（Identifier）节点</p>
        </template>
      </el-empty>
    </div>

    <!-- 有 Symbol -->
    <template v-else>
      <div class="symbol-name">
        <el-icon class="symbol-icon"><Connection /></el-icon>
        <span>{{ symbol.name }}</span>
      </div>

      <!-- Flags -->
      <div class="section-label">SymbolFlags</div>
      <div class="flags-wrap">
        <el-tag
          v-for="f in flagNames"
          :key="f"
          size="small"
          type="success"
          class="flag-tag"
        >{{ f }}</el-tag>
        <span v-if="!flagNames.length" class="text-muted">None (0)</span>
      </div>

      <!-- valueDeclaration -->
      <div v-if="symbol.valueDeclaration" class="section-label">valueDeclaration</div>
      <div v-if="symbol.valueDeclaration" class="decl-item decl-item--value">
        <code>{{ ts.SyntaxKind[symbol.valueDeclaration.kind] }}</code>
        <span class="decl-pos">[{{ symbol.valueDeclaration.pos }}, {{ symbol.valueDeclaration.end }}]</span>
      </div>

      <!-- declarations -->
      <div class="section-label">declarations ({{ symbol.declarations?.length ?? 0 }})</div>
      <div
        v-for="(decl, i) in symbol.declarations ?? []"
        :key="i"
        class="decl-item"
        @click="$emit('jumpTo', decl.pos)"
      >
        <code>{{ ts.SyntaxKind[decl.kind] }}</code>
        <span class="decl-pos">[{{ decl.pos }}, {{ decl.end }}]</span>
        <el-icon class="jump-icon"><Position /></el-icon>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ts from 'typescript'
import { Connection, Position } from '@element-plus/icons-vue'
import { decomposeBitFlags } from './useAstCompiler'

const props = defineProps<{
  node: ts.Node | null
  checker: ts.TypeChecker | null
}>()

defineEmits<{ jumpTo: [pos: number] }>()

const symbol = computed(() => {
  if (!props.node || !props.checker) return null
  try {
    return props.checker.getSymbolAtLocation(props.node) ?? null
  } catch {
    return null
  }
})

const flagNames = computed(() => {
  if (!symbol.value) return []
  return decomposeBitFlags(ts.SymbolFlags as any, symbol.value.flags)
})
</script>

<style scoped>
.detail-panel {
  padding: 12px;
  height: 100%;
  overflow-y: auto;
}

.detail-empty,
.detail-hint {
  padding: 24px;
  text-align: center;
  color: var(--vp-c-text-3);
  font-size: 14px;
}

.symbol-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-1);
  margin-bottom: 12px;
}

.symbol-icon {
  font-size: 18px;
}

.section-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin: 10px 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.flags-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 4px;
}

.flag-tag {
  margin: 0;
}

.text-muted {
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.decl-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-bottom: 2px;
  background: var(--vp-c-default-soft);
}

.decl-item:hover {
  background: var(--vp-c-brand-soft);
}

.decl-item--value {
  cursor: default;
  border: 1px solid var(--vp-c-brand-2);
}

.decl-pos {
  color: var(--vp-c-text-3);
  font-size: 12px;
  margin-left: auto;
}

.jump-icon {
  color: var(--vp-c-brand-2);
}

.hint-text {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.hint-sub {
  font-size: 12px;
  color: var(--vp-c-text-3);
  margin: 4px 0 0;
}
</style>
