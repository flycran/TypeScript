<template>
  <div class="find-flags vp-raw">
    <el-input
      v-model="query"
      :placeholder="`输入 ${enumName} 名称或数值`"
      clearable
    >
      <template #prefix>
        <el-icon><Search /></el-icon>
      </template>
    </el-input>

    <div v-if="query && results.length === 0" class="no-result">
      未找到匹配的 {{ enumName }}
    </div>

    <el-table
      v-if="results.length > 0"
      :data="results"
      size="small"
      class="result-table"
    >
      <el-table-column label="枚举名">
        <template #default="{ row }">
          <div class="cell-row">
            <span>{{ row.name }}</span>
            <el-tooltip :content="`复制 ts.${enumName}.${row.name}`" placement="top">
              <el-button
                size="small"
                text
                :icon="CopyDocument"
                @click="copy(`ts.${enumName}.${row.name}`, $event)"
              />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="数值" width="120">
        <template #default="{ row }">
          {{ isBitFlag ? `0x${row.value.toString(16).toUpperCase().padStart(8, '0')}` : row.value }}
        </template>
      </el-table-column>
      <el-table-column v-if="showGuard" label="类型守卫" width="200">
        <template #default="{ row }">
          <div v-if="row.guard" class="cell-row">
            <code>{{ row.guard }}</code>
            <el-tooltip content="复制守卫方法" placement="top">
              <el-button
                size="small"
                text
                :icon="CopyDocument"
                @click="copy(`ts.${row.guard}`, $event)"
              />
            </el-tooltip>
          </div>
          <span v-else class="no-guard">—</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import ts from 'typescript'

const props = defineProps<{
  enumName: string
  enumObj: Record<string, number | string>
  isBitFlag?: boolean
  showGuard?: boolean
}>()

const query = ref('')

interface Entry {
  name: string
  value: number
  guard: string | null
}

const allEntries = computed<Entry[]>(() =>
  Object.entries(props.enumObj)
    .filter(([key]) => isNaN(Number(key)))
    .map(([name, value]) => {
      const guardName = `is${name}`
      return {
        name,
        value: value as number,
        guard: props.showGuard && typeof (ts as any)[guardName] === 'function' ? guardName : null,
      }
    })
)

const results = computed<Entry[]>(() => {
  const q = query.value.trim()
  if (!q) return []

  if (/^\d+$/.test(q)) {
    const num = Number(q)
    if (props.isBitFlag) {
      // 位标志：输入值与枚举值有交集
      return allEntries.value.filter(e => e.value !== 0 && (num & e.value) === e.value)
    }
    return allEntries.value.filter(e => e.value === num)
  }

  // 十六进制输入
  if (/^0x[\da-fA-F]+$/.test(q)) {
    const num = parseInt(q, 16)
    if (props.isBitFlag) {
      return allEntries.value.filter(e => e.value !== 0 && (num & e.value) === e.value)
    }
    return allEntries.value.filter(e => e.value === num)
  }

  const lower = q.toLowerCase()
  return allEntries.value.filter(e => e.name.toLowerCase().includes(lower))
})

async function copy(text: string, e: MouseEvent) {
  e.stopPropagation()
  await navigator.clipboard.writeText(text)
  ElMessage({ message: '已复制', type: 'success', duration: 1500 })
}
</script>

<style scoped>
.find-flags {
  margin: 1.5rem 0;
}

.no-result {
  margin-top: 0.75rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.result-table {
  margin-top: 0.75rem;
  width: 100%;
}

.cell-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.no-guard {
  color: var(--vp-c-text-3);
}
</style>
