<template>
  <MdPreview prettier editorClass="mdpreview" :showCodeRowNumber="true" :modelValue="testMd"> </MdPreview>
</template>
<script setup>
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import testMd from '../../md/test.md?raw'
</script>
<style scoped></style>
