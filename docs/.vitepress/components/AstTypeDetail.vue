<template>
  <div class="detail-panel vp-raw">
    <!-- 无节点 -->
    <div v-if="!node" class="detail-empty">点击 AST 树中的节点查看 Type</div>

    <!-- 无类型 -->
    <div v-else-if="!typeStr" class="detail-hint">
      <el-empty :image-size="48">
        <template #description>
          <p class="hint-text">该节点无类型信息</p>
          <p class="hint-sub">尝试选中表达式或标识符节点</p>
        </template>
      </el-empty>
    </div>

    <!-- 有类型 -->
    <template v-else>
      <!-- 类型字符串标题 -->
      <div class="type-string">{{ typeStr }}</div>

      <!-- TypeFlags -->
      <div class="section-label">TypeFlags</div>
      <div class="flags-wrap">
        <el-tag
          v-for="f in flagNames"
          :key="f"
          size="small"
          type="warning"
          class="flag-tag"
        >{{ f }}</el-tag>
        <span v-if="!flagNames.length" class="text-muted">None</span>
      </div>

      <!-- 联合/交叉类型成员 -->
      <template v-if="unionTypes.length">
        <div class="section-label">Union Members ({{ unionTypes.length }})</div>
        <div v-for="(t, i) in unionTypes" :key="i" class="type-member">
          <code>{{ t }}</code>
        </div>
      </template>

      <template v-else-if="intersectionTypes.length">
        <div class="section-label">Intersection Members ({{ intersectionTypes.length }})</div>
        <div v-for="(t, i) in intersectionTypes" :key="i" class="type-member">
          <code>{{ t }}</code>
        </div>
      </template>

      <!-- 对象类型属性 -->
      <template v-else-if="properties.length">
        <div class="section-label">Properties ({{ properties.length }})</div>
        <div
          v-for="prop in properties"
          :key="prop.name"
          class="prop-item"
        >
          <span class="prop-name">{{ prop.name }}</span>
          <span class="prop-colon">:</span>
          <code class="prop-type">{{ prop.type }}</code>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ts from 'typescript'
import { decomposeBitFlags } from './useAstCompiler'

const props = defineProps<{
  node: ts.Node | null
  checker: ts.TypeChecker | null
}>()

const tsType = computed(() => {
  if (!props.node || !props.checker) return null
  try {
    return props.checker.getTypeAtLocation(props.node)
  } catch {
    return null
  }
})

const typeStr = computed(() => {
  if (!tsType.value || !props.checker) return ''
  try {
    const str = props.checker.typeToString(tsType.value)
    return str === 'error' ? '' : str
  } catch {
    return ''
  }
})

const flagNames = computed(() => {
  if (!tsType.value) return []
  return decomposeBitFlags(ts.TypeFlags as any, tsType.value.flags)
})

const unionTypes = computed(() => {
  if (!tsType.value || !props.checker) return []
  if (!(tsType.value.flags & ts.TypeFlags.Union)) return []
  const ut = tsType.value as ts.UnionType
  return ut.types.map(t => props.checker!.typeToString(t))
})

const intersectionTypes = computed(() => {
  if (!tsType.value || !props.checker) return []
  if (!(tsType.value.flags & ts.TypeFlags.Intersection)) return []
  const it = tsType.value as ts.IntersectionType
  return it.types.map(t => props.checker!.typeToString(t))
})

const properties = computed(() => {
  if (!tsType.value || !props.checker) return []
  if (unionTypes.value.length || intersectionTypes.value.length) return []
  try {
    return tsType.value.getProperties().slice(0, 50).map(sym => ({
      name: sym.name,
      type: props.checker!.typeToString(
        props.checker!.getTypeOfSymbolAtLocation(sym, props.node!)
      ),
    }))
  } catch {
    return []
  }
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

.type-string {
  font-family: var(--vp-font-family-mono);
  font-size: 16px;
  font-weight: 700;
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  padding: 6px 12px;
  border-radius: 6px;
  margin-bottom: 10px;
  word-break: break-all;
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
}

.flag-tag {
  margin: 0;
}

.text-muted {
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.type-member {
  background: var(--vp-c-default-soft);
  border-radius: 4px;
  padding: 3px 8px;
  margin-bottom: 2px;
  font-size: 13px;
}

.prop-item {
  display: flex;
  align-items: baseline;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 4px;
  background: var(--vp-c-default-soft);
  margin-bottom: 2px;
  font-size: 13px;
}

.prop-name {
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.prop-colon {
  color: var(--vp-c-text-3);
}

.prop-type {
  color: var(--vp-c-brand-1);
  font-size: 12px;
  word-break: break-all;
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
