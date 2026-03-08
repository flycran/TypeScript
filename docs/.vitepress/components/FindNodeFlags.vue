<template>
  <FindFlagsBase
    enum-name="NodeFlags"
    :enum-obj="ts.NodeFlags"
    :is-bit-flag="true"
  />
</template>

<script setup lang="ts">
import ts from 'typescript'
import FindFlagsBase from './FindFlagsBase.vue'
</script>
