<template>
  <div class="home">
    <header class="flex flex-align-center flex-justify-between">
      <div class="flex flex-align-center" style="gap: 12px">
        <img src="../../public/logo.svg" style="width: 30px; height: 30px" />
        <b style="font-family: BRLNSR; font-size: 20px">{{ t('message.pageTitle') }}</b>
      </div>
      <button class="start-btn" @click="$router.push('/guide')">{{ t('message.start') }}</button>
    </header>
    <div class="blur"></div>
    <div class="common-ball purple-ball" style="left: -50vw; top: -35vw; width: 100vw; height: 100vw; border-radius: 50vw"></div>
    <div class="common-ball pink-ball" style="right: -50vw; bottom: -35vw; width: 100vw; height: 100vw; border-radius: 50vw"></div>

    <div class="clip-bg"></div>
    <div class="container"></div>
  </div>
</template>
<script setup>
import { nextTick, onMounted, onUnmounted } from 'vue'
import Sketch from '@/libs/circle-text'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
let sketch = void 0

onMounted(() => {
  nextTick(() => {
    sketch = new Sketch({
      dom: document.querySelector('.container'),
    })
  })
})
onUnmounted(() => {
  sketch.dispose()
})
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  background: #ffffff;
}

header {
  background: #fff;
  box-shadow: 0 0 6px #cccccc;
  height: 60px;
  padding: 0 12px;
  position: relative;
  z-index: 2;
}

.clip-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  transition: all 0.25s;
}

.container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}

.start-btn {
  color: #ffffff;
  border-radius: 40px;
  height: 40px;
  padding: 0 22px;
  background: var(--fx-color-primary);
  transition: all 0.08s;
  font-size: 14px;
  cursor: pointer;
  right: 32px;
  bottom: 32px;
  overflow: hidden;
  font-family: BRLNSR;
}

.start-btn:hover {
  opacity: 0.72;
}

.blur {
  -webkit-backdrop-filter: blur(80px);
  backdrop-filter: blur(80px);
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

.purple-ball {
  background-color: #a192ff;
}

.pink-ball {
  background-color: #ff94a7;
}

.common-ball {
  animation-delay: 0s;
  animation-direction: normal;
  animation-duration: 6s;
  animation-iteration-count: infinite;
  animation-name: ball;
  animation-play-state: running;
  animation-timing-function: ease-in-out;
  position: absolute;
  z-index: 0;
}

@keyframes ball {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.4;
    transform: scale(1.4);
  }
}
</style>
