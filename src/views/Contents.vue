<template>
  <div class="contents">
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
        <keep-alive>
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
  }
}
</script>

<style lang="scss">
.contents {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: auto;
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