<template>
  <MdPreview
    prettier
    editorClass="mdpreview"
    :showCodeRowNumber="true"
    :modelValue="MD"
  >
  </MdPreview>
</template>
<script setup>
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import MD from "./install.md?raw";
</script>
