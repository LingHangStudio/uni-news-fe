<template>
  <div>
    <div class="horizon-menu-3">
      <div class="horizon-menu-inner-3">
        <div class="router-link-set-3">
          <router-link to="/contents/xueyuan/cailiaoyuyejinxueyuan">材料与冶金学院</router-link>
          <router-link to="/contents/xueyuan/chengshijianshexueyuan">城市建设学院</router-link>
          <router-link to="/contents/xueyuan/hengdaguanlixueyuan">恒大管理学院</router-link>
          <router-link to="/contents/xueyuan/guojixueyuan">国际学院</router-link>
          <router-link to="/contents/xueyuan/huaxueyuhuagongxueyuan">化学与化工学院</router-link>
          <router-link to="/contents/xueyuan/jixiezidonghuaxueyuan">机械自动化学院</router-link>
          <router-link to="/contents/xueyuan/jisuanjikexueyujishuxueyuan">计算机科学与技术学院</router-link>
          <router-link to="/contents/xueyuan/lixueyuan">理学院</router-link>
          <router-link to="/contents/xueyuan/makesizhuyixueyuan">马克思主义学院</router-link>
          <router-link to="/contents/xueyuan/qicheyujiaotonggongchengxueyuan">汽车与交通工程学院</router-link>
          <router-link to="/contents/xueyuan/shengmingkexueyujiankangxueyuan">生命科学与健康学院</router-link>
          <router-link to="/contents/xueyuan/tiyuxueyuan">体育学院</router-link>
          <router-link to="/contents/xueyuan/waiguoyuxueyuan">外国语学院</router-link>
          <router-link to="/contents/xueyuan/wenfayujingjixueyuan">文法与经济学院</router-link>
          <router-link to="/contents/xueyuan/xinxikexueyugongchengxueyuan">信息科学与工程学院</router-link>
          <router-link to="/contents/xueyuan/yixueyuan">医学院</router-link>
          <router-link to="/contents/xueyuan/yishuyushejixueyuan">艺术与设计学院</router-link>
          <router-link to="/contents/xueyuan/ziyuanyuhuanjinggongchengxueyuan">资源与环境工程学院</router-link>
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
  name: 'Xueyuan',

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
      if (to.name == 'xuexiao-sub' && from.name == 'xuexiao-sub') {
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

.horizon-menu-2 {
  box-sizing: border-box;
  width: 100%;
  background-color: #f6f6f6;
}

.horizon-menu-inner-3 {
  display: block;
  padding: 12px 0;
}

.horizon-menu-inner-2::-webkit-scrollbar {
  display: none;  /* Chrome Safari */
}

.router-link-set-3 {
  padding: 0 12px;
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
}

.router-link-set-3 a {
  display: block;
  height: var(--horizon-menu-height);
  line-height: var(--horizon-menu-height);
  color: #6e6e6e;
  text-decoration: none;
  font-size: 13px;
  background-color: white;
  border-radius: 5px;
  padding: 3px 10px;
  margin: 3px 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
}

.router-link-set-3 a.router-link-active {
  font-weight: bold;
  background-color: #42b983;
  color: #ffffff;
}
</style>
