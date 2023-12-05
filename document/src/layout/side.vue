<template>
  <div class="side">
    <div class="side-inner">
      <div class="classify" v-for="route in routes">
        <h2>{{ t(`${route.meta?.title}`) }}</h2>
        <div class="title" v-for="childrenRoute in route.children">
          {{ t(`${childrenRoute.meta?.title}`) }}
        </div>
      </div>
      <!-- <div class="classify">
        <h2>{{ t('message.guide') }}</h2>
        <div class="title">{{ t('message.install') }}</div>
        <div class="title">{{ t('message.theme') }}</div>
      </div>
      <div class="classify">
        <h2>{{ t('message.shapes') }}</h2>
        <div class="title">{{ t('message.star') }}</div>
      </div>
      <div class="classify">
        <h2>{{ t('message.tools') }}</h2>
        <div class="title">{{ t('message.transformTool') }}</div>
        <div class="title">{{ t('message.panTool') }}</div>
        <div class="title">{{ t('message.rectTool') }}</div>
        <div class="title">{{ t('message.ellipseTool') }}</div>
        <div class="title">{{ t('message.triangleTool') }}</div>
        <div class="title">{{ t('message.pathTool') }}</div>
        <div class="title">{{ t('message.freehandTool') }}</div>
        <div class="title">{{ t('message.textTool') }}</div>
        <div class="title">{{ t('message.nGonTool') }}</div>
        <div class="title">{{ t('message.starTool') }}</div>
        <div class="title">{{ t('message.crossTool') }}</div>
        <div class="title">{{ t('message.frameTool') }}</div>
        <div class="title">{{ t('message.ringTool') }}</div>
        <div class="title">{{ t('message.pieTool') }}</div>
        <div class="title">{{ t('message.crescentTool') }}</div>
        <div class="title">{{ t('message.cogTool') }}</div>
        <div class="title">{{ t('message.spiralTool') }}</div>
        <div class="title">{{ t('message.arrowTool') }}</div>
        <div class="title">{{ t('message.frenhandTool') }}</div>
        <div class="title">{{ t('message.penTool') }}</div>
        <div class="title">{{ t('message.vektorTool') }}</div>
      </div>
      <div class="classify">
        <h2>{{ t('message.methods') }}</h2>
        <div class="title">{{ t('message.history') }}</div>
        <div class="title">{{ t('message.clipboard') }}</div>
        <div class="title">{{ t('message.alignment') }}</div>
        <div class="title">{{ t('message.transform') }}</div>
        <div class="title">{{ t('message.order') }}</div>
        <div class="title">{{ t('message.group') }}</div>
        <div class="title">{{ t('message.geometry') }}</div>
        <div class="title">{{ t('message.text') }}</div>
        <div class="title">{{ t('message.shape') }}</div>
        <div class="title">{{ t('message.style') }}</div>
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { useRouter } from 'vue-router'
const router = useRouter()
const routes = ref([])
// console.log(routes)
onBeforeMount(() => {
  routes.value = router.options.routes?.find((item) => item.name === 'root')?.children
  console.log(routes.value)
})
</script>
<style scoped>
.side {
  height: 100%;
  overflow: hidden;
  height: 100%;
  padding: 16px 32px;
  min-width: 260px;
  overflow-y: auto;
}

h2,
.classify {
  margin-bottom: 24px;
}

.classify .title {
  cursor: pointer;
  color: #444444;
  margin-bottom: 6px;
  transition: all 0.32s;
  padding: 6px 0;
}

.classify .title:last-child {
  margin-bottom: 0;
}

.classify:last-child {
  margin-bottom: 0;
}

.title:hover {
  color: var(--fx-color-primary);
}
</style>
<script setup></script>
