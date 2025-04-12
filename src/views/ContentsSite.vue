<script setup>
import { ref, onActivated, onDeactivated, watch,onMounted,nextTick } from 'vue'
import { useRoute } from 'vue-router';
import { useRoutesStore } from '@/store';
import newsApi from '@/api/newsApi'

const scrollTopMemery = ref(0)
const route = useRoute()
const routerStore=useRoutesStore()
const routes=ref([])

onMounted(async()=>{
   const res=await newsApi.newsCategories();
   routes.value.push(...res.data.normal,{name:'学院',sub:[{news:'X'}]})
   routerStore.routes=res.data
   nextTick(()=> routerStore.routeName=routerStore.routes.normal[0].name)

})

onActivated(() => {
  const thisWindow = document.getElementsByClassName('contents')[0]
  thisWindow.scrollTop = scrollTopMemery.value
})

onDeactivated(() => {
  const thisWindow = document.getElementsByClassName('contents')[0]
  scrollTopMemery.value = thisWindow.scrollTop
})

watch(route, (to, from) => {
  const thisWindow = document.getElementsByClassName('contents')[0]
  const partNames = ['xuexiao', 'jiaowu', 'xueyuan', 'tuanwei', 'xuexiao-sub', 'jiaowu-sub', 'xueyuan-sub', 'tuanwei-sub']
  if (partNames.indexOf(to.name) != -1 && partNames.indexOf(from.name) != -1 && to.name != from.name) {
    thisWindow.scrollTop = 0
  }
})
</script>

<template>
  <div id="contents" class="contents">
    <div class="horizon-menu">
      <div class="horizon-menu-inner">
        <div class="router-link-set">
          <router-link v-for="(route) in routes" :key="route" :to="`/contents/${route.sub[0].news.substring(0,1)}`" @click="()=>{routerStore.changeRoute(route.name);}">{{route.name}}</router-link>
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


<style lang="scss">
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
  scrollbar-width: none;
  /* Firefox */
  padding: 10px 0;
}

.horizon-menu-inner-2::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
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
  background: #42b983;
  color: #ffffff;
}
</style>
