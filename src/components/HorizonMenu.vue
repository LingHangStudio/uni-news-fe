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
</template>

<script>
export default {
  name: "HorizonMenu"
}
</script>

<style>
.horizon-menu {
  position: sticky;
  top: 0;
  box-sizing: border-box;
  --horizon-menu-height: 40px;
  width: 100%;
  overflow-x: auto;
  background-color: white;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
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
