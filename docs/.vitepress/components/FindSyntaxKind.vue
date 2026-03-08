<template>
  <FindFlagsBase
    enum-name="SyntaxKind"
    :enum-obj="ts.SyntaxKind"
    :show-guard="true"
  />
</template>

<script setup lang="ts">
import ts from 'typescript'
import FindFlagsBase from './FindFlagsBase.vue'
</script>
