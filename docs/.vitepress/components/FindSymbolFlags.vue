<template>
  <FindFlagsBase
    enum-name="SymbolFlags"
    :enum-obj="ts.SymbolFlags"
    :is-bit-flag="true"
  />
</template>

<script setup lang="ts">
import ts from 'typescript'
import FindFlagsBase from './FindFlagsBase.vue'
</script>
