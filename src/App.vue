<template>
  <main class="root-frame">
    <router-view v-slot="{ Component }">
      <transition name="open-article">
        <keep-alive exclude="Article">
          <component class="root-transition-target" :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </main>
</template>

<style>
.open-article-leave-active {
  transition-delay: 0.5s;
}
.open-article-leave-active * {
  transition-delay: 0.5s;
}
.open-article-enter-active {
  transition-property: left;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  width: 100%;
}
.open-article-enter-from {
  left: 100%;
}
.open-article-enter-active {
  left: 100%;
}
.open-article-enter-to {
  left: 0;
}
/* .open-article-leave-from {
  left: 0;
}
.open-article-leave-active {
  left: 0;
}
.open-article-leave-to {
  left: -100%;
} */
.open-article-enter-active.root-transition-target {
  position: fixed;
  top: 0;
  z-index: 200;
}

body {
  background-color: #f6f6f6;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.root-frame {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>
