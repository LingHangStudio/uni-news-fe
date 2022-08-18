<template>
  <div class="xuexiao-sub">
    <div class="horizon-menu-2">
      <div class="horizon-menu-inner-2">
        <div class="router-link-set-2">
          <router-link to="/contents/xuexiao/yaowen">要闻</router-link>
          <router-link to="/contents/xuexiao/meiti">媒体</router-link>
          <router-link to="/contents/xuexiao/xueshu">学术</router-link>
          <router-link to="/contents/xuexiao/zonghe">综合</router-link>
          <router-link to="/contents/xuexiao/yuanxi">院系</router-link>
        </div>
      </div>
    </div>
    <div style="position: relative">
      <router-view v-slot="{ Component }">
        <transition v-bind:name="transitionName">
          <keep-alive>
            <component class="slide-target" :is="Component" :key="$route.fullPath"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Xiaoyuan',

  data: function() {
    return {
      index: {
        'yaowen': 1,
        'meiti': 2,
        'xueshu': 3,
        'zonghe': 4,
        'yuanxi': 5
      },

      transitionName: 'slide-left'
    }
  },

  watch: {
    $route(to, from) {
      if (this.index[to.params.sub] > this.index[from.params.sub]) {
        this.transitionName = "slide-right";
      } else {
        this.transitionName = "slide-left";
      }
    },
  }
}
</script>

<style>
.slide-right-enter-active, .slide-right-leave-active {
  transition-property: left;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  width: 100%;
}
.slide-right-enter{
  left: 100%;
}
.slide-right-enter-active {
  left: 100%;
}
.slide-right-enter-to{
  left: 0;
}
.slide-right-leave{
  left: 0;
}
.slide-right-leave-active {
  left: 0;
}
.slide-right-leave-to{
  left: -100%;
}
.slide-left-enter-active, .slide-left-leave-active {
  transition-property: left;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  width: 100%;
}
.slide-left-enter{
  left: -100%;
}
.slide-left-enter-active {
  left: -100%;
}
.slide-left-enter-to{
  left: 0;
}
.slide-left-leave{
  left: 0;
}
.slide-left-leave-active {
  left: 0;
}
.slide-left-leave-to{
  left: 100%;
}
.slide-right-enter-active.slide-target,
.slide-right-leave-active.slide-target,
.slide-left-enter-active.slide-target,
.slide-left-leave-active.slide-target {
  position: absolute;
  top: 0;
}

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
