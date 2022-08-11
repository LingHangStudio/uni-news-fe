<template>
  <div class="horizon-menu">
    <div class="horizon-menu-inner">
      <div class="router-link-set">
        <router-link to="/xuexiao">学校</router-link>
        <router-link to="/jiaowu">教务</router-link>
        <router-link to="/xueyuan">学院</router-link>
        <router-link to="/tuanwei">团委</router-link>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<style lang="scss">
body {
  background-color: #f6f6f6;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.horizon-menu {
  position: sticky;
  top: 0;
  box-sizing: border-box;
  --horizon-menu-height: 40px;
  width: 100%;
  overflow-x: auto;
  background-color: white;
  border-bottom: 1px solid #e8e8e8;
  z-index: 100;
}

.horizon-menu-inner {
  display: block;
  overflow-x: auto;
}

.router-link-set {
  display: flex;
  width: max-content;
}

.router-link-set a {
  display: block;
  width: 90px;
  height: var(--horizon-menu-height);
  line-height: var(--horizon-menu-height);
  color: #6e6e6e;
  text-decoration: none;
  font-size: 15px;
  text-align: center;
}

.router-link-set a.router-link-active {
  font-weight: bold;
  color: #42b983;
}
</style>
