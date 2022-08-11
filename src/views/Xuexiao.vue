<template>
  <div class="xuexiao-sub">
    <div class="horizon-menu-2">
      <div class="horizon-menu-inner-2">
        <div class="router-link-set-2">
          <router-link to="/xuexiao/yaowen">要闻</router-link>
          <router-link to="/xuexiao/meiti">媒体</router-link>
          <router-link to="/xuexiao/xueshu">学术</router-link>
          <router-link to="/xuexiao/zonghe">综合</router-link>
          <router-link to="/xuexiao/yuanxi">院系</router-link>
        </div>
      </div>
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Xiaoyuan'
}
</script>

<style>
.horizon-menu-2 {
  box-sizing: border-box;
  width: 100%;
  overflow-x: auto;
}

.horizon-menu-inner-2 {
  display: block;
  overflow-x: auto;
  padding: 12px 0;
}

.router-link-set-2 {
  padding: 0 12px;
  display: flex;
  width: max-content;
}

.router-link-set-2 a {
  display: block;
  height: var(--horizon-menu-height);
  line-height: var(--horizon-menu-height);
  color: #6e6e6e;
  text-decoration: none;
  font-size: 13px;
  background-color: white;
  border-radius: 5px;
  padding: 3px 10px;
  margin: 0 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
}

.router-link-set-2 a.router-link-active {
  font-weight: bold;
  background-color: #42b983;
  color: #ffffff;
}
</style>
