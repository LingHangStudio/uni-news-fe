<template>
  <div id="contents" class="contents">
    <div class="horizon-menu">
      <div class="horizon-menu-inner">
        <div class="router-link-set">
          <router-link to="/contents/xuexiao">学校</router-link>
          <router-link to="/contents/jiaowu">教务</router-link>
          <router-link to="/contents/xueyuan">学院</router-link>
          <router-link to="/contents/tuanwei">团委</router-link>
        </div>
      </div>
    </div>
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive exclude="Xueyuan,XueyuanSub">
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'Contents',

  data: function() {
    return {
      'scrollTopMemery': 0
    }
  },

  activated: function() {
    var thisWindow = document.getElementsByClassName('contents')[0]
    thisWindow.scrollTop = this.scrollTopMemery
    console.log(thisWindow.scrollTop)
  },

  deactivated: function() {
    var thisWindow = document.getElementsByClassName('contents')[0]
    this.scrollTopMemery = thisWindow.scrollTop
    console.log(thisWindow.scrollTop)
  },

  watch: {
    $route(to, from) {
      console.log('From:', from.name)
      console.log('To:', to.name)
      var thisWindow = document.getElementsByClassName('contents')[0]
      var partNames = ['xuexiao', 'jiaowu', 'xueyuan', 'tuanwei', 'xuexiao-sub', 'jiaowu-sub', 'xueyuan-sub', 'tuanwei-sub']
      if (partNames.indexOf(to.name) != -1 && partNames.indexOf(from.name) != -1 && to.name != from.name) {
        thisWindow.scrollTop = 0
      }
    }
  }
}
</script>

<style>
.contents {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.smooth-scroll {
  scroll-behavior: smooth;
}

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
  /* width: max-content; */
  width: 100%;
}

.router-link-set a {
  display: block;
  flex-grow: 1;
  flex-shrink: 1;
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

.horizon-menu-2 {
  box-sizing: border-box;
  width: 100%;
  background-color: #f6f6f6;
}

.horizon-menu-inner-2 {
  display: block;
  overflow-x: auto;
  scrollbar-width: none;  /* Firefox */
  padding: 10px 0;
}

.horizon-menu-inner-2::-webkit-scrollbar {
  display: none;  /* Chrome Safari */
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
  background: white;
  border-radius: 5px;
  padding: 4px 10px;
  margin: 0 4px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
}

.router-link-set-2 a.router-link-active {
  font-weight: bold;
  background: linear-gradient(45deg, #42b983, #86e6e8);
  color: #ffffff;
}
</style>