<template>
  <main class="demos">
    <div class="content-center">
      <h2>DEMOS</h2>
    </div>
    <div class="content-center">
      <div class="grid">
        <div class="demo-card">asdasd</div>
        <div class="demo-card">asdasd</div>
        <div class="demo-card">asdasd</div>
        <div class="demo-card">asdasd</div>
        <div class="demo-card">asdasd</div>
      </div>
    </div>
  </main>
</template>
<script setup></script>
<style scoped>
main {
  margin: 0;
  color: #ffffff;
  background: #000 url(./bg.jpg) no-repeat 50% 50% fixed;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  padding: 30px 0;
}

.content-center {
  position: relative;
  margin: 0 auto;
  padding: 0px 2rem;
  max-width: 1350px;
}

.grid {
  display: grid;
  margin-top: 6rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 4vw;
  grid-column-gap: 3rem;
}

.demo-card {
  width: 100%;
  max-width: 400px;
  position: relative;
  aspect-ratio: 800 / 600;
  overflow: hidden;
  border-radius: 10px;
  background: red;
}
</style>
