<template>
  <div>
    <div class="horizon-menu-2">
      <div class="horizon-menu-inner-2">
        <div class="router-link-set-2">
          <router-link to="/contents/jiaowu/tongzhigonggao">通知公告</router-link>
          <router-link to="/contents/jiaowu/jiaoxuedongtai">教学动态</router-link>
        </div>
      </div>
    </div>
    <div style="position: relative">
      <router-view v-slot="{ Component }">
        <transition v-bind:name="transitionName">
          <keep-alive>
            <component class="slide-target" v-if="$route.name=='jiaowu-sub'" :is="Component" :key="$route.fullPath"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Jiaowu',

  data: function() {
    return {
      index: {
        'tongzhigonggao': 1,
        'jiaoxuedongtai': 2
      },

      transitionName: 'slide-left'
    }
  },

  watch: {
    $route(to, from) {
      if (to.name == 'jiaowu-sub' && from.name == 'jiaowu-sub') {
        if (this.index[to.params.sub] > this.index[from.params.sub]) {
          this.transitionName = "slide-right"
        } else {
          this.transitionName = "slide-left"
        }
      }
      else {
        this.transitionName = "none"
      }
    }
  }
}
</script>

<style>
/* <transition> */
.slide-right-enter-active, .slide-right-leave-active {
  transition-property: left;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  width: 100%;
}
.slide-right-enter-from {
  left: 100%;
}
.slide-right-enter-active {
  left: 100%;
}
.slide-right-enter-to {
  left: 0;
}
.slide-right-leave-from {
  left: 0;
}
.slide-right-leave-active {
  left: 0;
}
.slide-right-leave-to {
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
/* </transition> */
</style>
