<script setup>
import { ref, watch,onMounted,nextTick } from 'vue'
import { useRoute} from 'vue-router';
import {useRoutesStore}from '../../store'
const route = useRoute()
const routerStore=useRoutesStore()
const subList=ref([])

onMounted(()=>{
  nextTick(()=>{
    handleIndex();
  })
})
const transitionName = ref('none')
const index = ref({})


const handleIndex=()=>{
  if(routerStore.routes.normal.find(item=>item.name==routerStore.routeName)){
  subList.value=routerStore.routes.normal.find(item=>item.name==routerStore.routeName).sub
  }
  index.value = subList.value.reduce((acc, element, i) => {
  acc[element.news] = i + 1
  return acc;
}, {})
  // console.log(index.value)
}

watch(() => routerStore.routeName,()=>{
  handleIndex();
  // console.log(routerStore.routeName)
  // subList.value=routerStore.routes.normal.find(item=>item.name==newVal).sub
})
watch(
  () => route.params.sub,
  (newSub, oldSub) => {
    // console.log(route.name)
    if (route.name === 'part-sub' && newSub !== oldSub) {
      // console.log('new',newSub)
      // console.log('old',oldSub)
      if(newSub&&oldSub&&newSub[0]===oldSub[0]){
        if (index.value[newSub] > index.value[oldSub]) {
         transitionName.value = "slide-right"
       } else {
         transitionName.value = "slide-left"
       }
     }else {
       transitionName.value = "none"
     }
  }
  }
)


</script>

<template>
  <div>
    <div class="horizon-menu-2">
      <div class="horizon-menu-inner-2">
        <div class="router-link-set-2">
          <router-link v-for="item in subList" :key="item.news" :to="`/contents/${item.news.substring(0,1)}/${item.news}`">{{item.name}}</router-link>
        </div>
      </div>
    </div>
    <div style="position: relative">
      <router-view v-slot="{ Component }">
        <transition :name="transitionName">
          <keep-alive>
            <component class="slide-target" v-if="route.name == 'part-sub'" :is="Component" :key="route.fullPath">
            </component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* <transition> */
.slide-right-enter-active,
.slide-right-leave-active {
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

.slide-left-enter-active,
.slide-left-leave-active {
  transition-property: left;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  width: 100%;
}

.slide-left-enter {
  left: -100%;
}

.slide-left-enter-active {
  left: -100%;
}

.slide-left-enter-to {
  left: 0;
}

.slide-left-leave {
  left: 0;
}

.slide-left-leave-active {
  left: 0;
}

.slide-left-leave-to {
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
