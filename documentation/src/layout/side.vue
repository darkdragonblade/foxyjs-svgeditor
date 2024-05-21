<template>
  <div class="side">
    <div class="side-inner">
      <div class="classify" v-for="route in routes" :key="route">
        <h2>{{ t(`${route.meta?.title}`) }}</h2>
        <div
          class="title"
          v-for="childrenRoute in route.children"
          :key="childrenRoute"
          @click="goPage(childrenRoute)"
        >
          {{ t(`${childrenRoute.meta?.title}`) }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useRouter } from "vue-router";
const router = useRouter();
const routes = ref([]);
onBeforeMount(() => {
  routes.value = router.options.routes?.find(
    (item) => item.name === "root"
  )?.children;
});

const goPage = (item) => {
  router.push({ path: item.path });
};
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
