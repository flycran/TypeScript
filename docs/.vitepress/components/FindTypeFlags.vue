<template>
  <FindFlagsBase
    enum-name="TypeFlags"
    :enum-obj="ts.TypeFlags"
    :is-bit-flag="true"
  />
</template>

<script setup lang="ts">
import ts from 'typescript'
import FindFlagsBase from './FindFlagsBase.vue'
</script>
