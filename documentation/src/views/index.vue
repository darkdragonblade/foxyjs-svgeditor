<template>
  <div class="home demo-salal">
    <main>
      <div class="content content--fixed">
        <header class="codrops-header">
          <img
            src="../../public/logo.svg"
            style="width: 24px; height: 24px; margin-right: 12px"
          />
          <h1 class="codrops-header__title">Foxy.js</h1>
        </header>
      </div>
      <section class="content">
        <nav class="menu menu--salal">
          <a class="menu__item" href="javascript:;" @click="linkTo('/demos')">
            <span class="menu__item-name">DEMOS</span>
            <span class="menu__item-label">Explore artists' portfolios.</span>
          </a>
          <a class="menu__item" href="javascript:;" @click="linkTo('/api')">
            <span class="menu__item-name">API DOCS</span>
            <span class="menu__item-label">API usage guide.</span>
          </a>
          <a
            class="menu__item"
            href="https://github.com/darkdragonblade/foxyjs-svgeditor"
          >
            <span class="menu__item-name">GITHUB</span>
            <span class="menu__item-label">The source code.</span>
          </a>
          <a class="menu__item" href="https://www.npmjs.com/package/foxyjs">
            <span class="menu__item-name">NPM</span>
            <span class="menu__item-label">Access package dependencies.</span>
          </a>
        </nav>
      </section>
    </main>
  </div>
</template>
<script setup>
import { nextTick, onMounted, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import swirl from "@/utils/swirl.js";
import hover from "@/utils/home-hover.js";
const router = useRouter();

const { t } = useI18n();

const linkTo = (path) => {
  router.push(path);
};

onMounted(() => {
  nextTick(() => {
    hover();
    swirl();
  });
});

onUnmounted(() => {
  window.cancelAnimationFrame(window.animate);
});
</script>
<style scoped>
.home {
  font-family: "Roboto", sans-serif;
  min-height: 100vh;
  width: 100vw;
  color: #57585c;
  color: var(--color-text);
  background-color: #fff;
  background-color: var(--color-background);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.demo-salal {
  --color-text: #b5b5b5;
  --color-background: #222325;
  --color-link: #515152;
  --color-link-hover: #fff;
}

a {
  text-decoration: none;
  color: #5d93d8;
  color: var(--color-link);
  outline: none;
}

.content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0 auto;
  padding: 3em 2em;
}

.content--fixed {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  display: grid;
  align-content: space-between;
  width: 100%;
  max-width: none;
  height: 100vh;
  padding: 1.5em;
  pointer-events: none;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto auto 4em;
  grid-template-areas:
    "header ..."
    "... ..."
    "github demos";
}

.content--fixed a {
  pointer-events: auto;
}

/* Header */
.codrops-header {
  position: relative;
  z-index: 100;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-items: center;
  align-self: start;
  grid-area: header;
  justify-self: start;
}

.codrops-header__title {
  font-size: 1em;
  font-weight: normal;
  margin: 0;
  padding: 0.75em 0;
}

/* Common styles for the menus */
.menu {
  position: relative;
  z-index: 10;
}

.menu__item {
  line-height: 1;
  position: relative;
  display: block;
  margin: 1em 0;
  outline: none;
}

.menu__item-name,
.menu__item-label {
  position: relative;
  display: inline-block;
}

.menu__item-name {
  font-size: 1.25em;
}

.menu__item-label {
  margin: 0 0 0 0.5em;
}

.menu--salal .menu__item {
  font-size: 1.25em;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  margin: 2em 0;
}

.menu--salal .menu__item:hover {
  color: #515152;
}

.menu--salal .menu__item:first-child {
  --menu-item-color: #f85f83;
}

.menu--salal .menu__item:nth-child(2) {
  --menu-item-color: #f7bd1f;
}

.menu--salal .menu__item:nth-child(3) {
  --menu-item-color: #24d261;
}

.menu--salal .menu__item:nth-child(4) {
  --menu-item-color: #6537f7;
}

.menu--salal .menu__item:nth-child(5) {
  --menu-item-color: pink;
}

.menu--salal .menu__item-name {
  font-family: "Lora", serif;
  font-weight: 700;
  padding: 0.25em;
  color: #fff;
}

.menu--salal .menu__item-name::before {
  content: "";
  position: absolute;
  z-index: -1;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: var(--menu-item-color);
  transform: scale3d(1, 0, 1);
  transform-origin: 50% 100%;
  transition: transform 0.3s;
  transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
}

.menu--salal .menu__item:hover .menu__item-name::before,
.menu--salal .menu__item:focus .menu__item-name::before {
  transform: scale3d(1, 1, 1);
  transform-origin: 50% 0%;
}

.menu--salal .menu__item-label {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0.5em 0 0 1.5em;
  white-space: pre;
  color: #515152;
}

.menu--salal .menu__item-label span {
  display: inline-block;
}

@media screen and (max-width: 50em) {
  .menu--salal .menu__item-label {
    font-size: 0.6em;
    margin-left: 0.25em;
  }
}
</style>
