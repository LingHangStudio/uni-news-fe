<template>
  <div>
    <div class="horizon-menu-3">
      <div class="horizon-menu-inner-3">
        <div class="router-link-set-3">
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/cailiaoyuyejinxueyuan">材料与冶金学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/chengshijianshexueyuan">城市建设学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/hengdaguanlixueyuan">恒大管理学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/guojixueyuan">国际学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/huaxueyuhuagongxueyuan">化学与化工学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/jixiezidonghuaxueyuan">机械自动化学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/jisuanjikexueyujishuxueyuan">计算机科学与技术学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/lixueyuan">理学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/makesizhuyixueyuan">马克思主义学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/qicheyujiaotonggongchengxueyuan">汽车与交通工程学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/shengmingkexueyujiankangxueyuan">生命科学与健康学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/tiyuxueyuan">体育学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/waiguoyuxueyuan">外国语学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/wenfayujingjixueyuan">文法与经济学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/xinxikexueyugongchengxueyuan">信息科学与工程学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/yixueyuan">医学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/yishuyushejixueyuan">艺术与设计学院</router-link>
          <router-link v-on:click="scrollDown()" to="/contents/xueyuan/ziyuanyuhuanjinggongchengxueyuan">资源与环境工程学院</router-link>
        </div>
      </div>
    </div>
    <div id="scroll-to"></div>
    <div id="expand-target" style="position: relative;">
      <router-view v-slot="{ Component }">
        <transition>
          <keep-alive>
            <component class="slide-target" v-if="$route.name=='xueyuan-sub'" :is="Component" :key="$route.fullPath"></component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Xueyuan',

  methods: {
    scrollDown: function() {
      document.getElementById('expand-target').classList.add('expand')
      // document.getElementById('scroll-to').scrollIntoView()
      console.log(document.getElementById('scroll-to').offsetTop)
      document.getElementById('contents').classList.add('smooth-scroll')
      document.getElementById('contents').scrollTop = document.getElementById('scroll-to').offsetTop
      document.getElementById('contents').classList.remove('smooth-scroll')
    }
  }
}
</script>

<style>
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
  /* justify-content: center; */
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
  margin: 4px 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
}

.router-link-set-3 a.router-link-active {
  font-weight: bold;
  background-color: #42b983;
  color: #ffffff;
}

#scroll-to {
  position: relative;
  top: -40px;
}

.expand {
  height: 100vh;
}
</style>
