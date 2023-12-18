<template>
  <header class="flex flex-align-center flex-justify-between" style="cursor: pointer;">
    <div class="flex flex-align-center" style="gap: 12px;" @click="$router.push('/')">
      <img src="../../public/logo.svg" style="width: 30px; height: 30px" />
      <b style="font-family: BRLNSR; font-size: 20px">FOXY.JS</b>
    </div>

    <div class="flex flex-align-center" style="gap: 12px">
      <input class="nav-input" v-model="searchQuery" />
      <a href="https://darkdragonblade.github.io/foxyjs-svgeditor/demo/" target="_blank" class="nav-item">{{ t('message.demo') }}</a>
      <a href="https://github.com/darkdragonblade/foxyjs-svgeditor" target="_blank" class="nav-item">Github</a>

      <span class="dropdown-container">
        <span class="nav-item">Languages</span>
        <div class="dropdown-select">
          <div class="dropdown-item" @click="changeLanguage('en')">EN</div>
          <div class="dropdown-item" @click="changeLanguage('zh')">CN</div>
        </div>
      </span>
    </div>
  </header>
</template>
<script setup>
import { ref } from 'vue'
const searchQuery = ref('')
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

function changeLanguage(lang) {
  locale.value = lang
}
</script>
<style scoped>
header {
  background: #fff;
  min-height: 60px;
  padding: 0 32px;
  position: relative;
  z-index: 2;
  border-bottom: 1px solid #d1d1d1;
}
.nav-input {
  border: 1px solid #eaecef;
  padding: 8px 20px;
  border-radius: 8px;
}
.nav-input:hover {
  border-color: var(--fx-color-primary);
}
.nav-item {
  color: #242424;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  position: relative;
}
.nav-item:hover {
  color: var(--fx-color-primary);
}
.dropdown-container {
  position: relative;
}

.dropdown-select {
  position: absolute;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  top: 100%;
  left: 0;
  right: 0;
  height: auto;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  opacity: 0;
}
.dropdown-container:hover .dropdown-select {
  transition: all 0.6 ease-in-out;
  opacity: 1;
}
.dropdown-item {
  color: #242424;
  font-size: 14px;
  font-weight: bold;
  padding: 8px 0 !important;
  cursor: pointer;
}
.dropdown-item:hover {
  color: var(--fx-color-primary);
}
</style>
