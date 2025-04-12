<script setup>
import newsApi from '@/api/newsApi'
import { ref, onMounted,watch,nextTick } from 'vue'
import { useRoute } from 'vue-router';
const houseList=ref([])
const houseSubList=ref([])
const sliceHouseList=ref([])
const houseName=ref('')
onMounted(async()=>{
   const res=await newsApi.newsCategories();
   houseList.value=res.data.house
   houseName.value=houseList.value.find(item=>item.sub[0].news.includes(route.params.part)).name
   groupHouses()
})
const route = useRoute()
const house = ref(7)

const groupHouses = () => {
  sliceHouseList.value = [];
  for (let i = 0; i < houseList.value.length; i += 10) {
    sliceHouseList.value.push(houseList.value.slice(i, i + 10));
  }
};
 


const toggleXueyuanSelector = async() => {
  await updateHouseSub()
  const xueyuanSelector = document.getElementsByClassName('xueyuan-selector')[0]
  if (xueyuanSelector.classList.contains('close')) {
    xueyuanSelector.classList.add('open')
    xueyuanSelector.classList.remove('close')
  }
  else {
    xueyuanSelector.classList.add('close')
    xueyuanSelector.classList.remove('open')
  }
}

const toggleSubSelector = async () => {
  
  const subSelector = document.getElementsByClassName('sub-selector')[0]
  if (subSelector.classList.contains('close')) {
    subSelector.classList.add('open')
    subSelector.classList.remove('close')
  }
  else {
    subSelector.classList.add('close')
    subSelector.classList.remove('open')
  }
}

const updateHouseSub = async () => {
  try {
   
    const res = await newsApi.houseSub(route.params.part)
    house.value = res.data.house
    houseSubList.value = res.data.result
    houseName.value=houseList.value.find(item=>item.sub[0].news.includes(route.params.part)).name
  }
  catch (error) {
    console.error(error)
  }
}



const subName = () => {
  const obj = houseSubList.value.find(item=>item.news===route.params.sub)
  if (obj == null) {
    return null
  }
  return obj.name
}

onMounted(async () => {
  await updateHouseSub()
  const xueyuanSelector = document.getElementsByClassName('xueyuan-selector')[0]
  if (xueyuanSelector.classList.contains('close')) {
    xueyuanSelector.classList.add('open')
    xueyuanSelector.classList.remove('close')
  }
})

watch(route, async (to, from) => {
  if ((to.name == 'X-sub' || to.name == 'X') && (from.name == 'X-sub' || from.name == 'X')) {
    if (to.params.part != from.params.part) {
      await updateHouseSub()
    }
  }
  const nameList = ['xuexiao', 'xuexiao-sub', 'jiaowu', 'jiaowu-sub', 'tuanwei', 'tuanwei-sub']

  if (nameList.includes(from.name) && to.name == 'X') {
    await nextTick()
    const xueyuanSelector = document.getElementsByClassName('xueyuan-selector')[0]
    if (xueyuanSelector.classList.contains('close')) {
      xueyuanSelector.classList.add('open')
      xueyuanSelector.classList.remove('close')
    }
  }
})
</script>

<template>
  <div>
    <div class="xueyuan-menu-bar">
      <div class="xueyuan-menu-bar-inner">
        <div class="xueyuan-selector-container">
          <div class="xueyuan-selector close" @click="toggleXueyuanSelector">
            <div class="xueyuan-name">{{ houseName }}</div>
            <div class="xueyuan-list">
              <div class="xueyuan-list-column" v-for="(item,index) in sliceHouseList" :key="index">
                <router-link v-for="item in houseList" :key="item.news" :to="`/contents/X/${item.sub[0].news.substring(0,3)}`">{{item.name}}</router-link>
              </div>

            </div>
          </div>
        </div>
        <div class="sub-selector-container">
          <div class="sub-selector close" @click="toggleSubSelector">
            <div class="sub-name">{{subName()}}</div>
            <div class="sub-list">
              <router-link v-for="obj in houseSubList" :key="obj.name" :to="`/contents/X/${route.params.part}/${obj.news}`">
                {{ obj.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="expand-target" style="position: relative;">
      <router-view v-slot="{ Component }">
        <transition>
          <keep-alive>
            <component class="slide-target" v-if="route.name == 'X-sub'" :is="Component" :key="route.fullPath">
            </component>
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.xueyuan-menu-bar {
  padding: 10px 0;
}

.xueyuan-menu-bar-inner {
  --xueyuan-menu-bar-height: 28px;
  font-size: 13px;
  display: flex;
}

.xueyuan-selector-container {
  padding-left: 20px;
}

.xueyuan-selector {
  position: relative;
  box-sizing: border-box;
  width: 160px;
  height: var(--xueyuan-menu-bar-height);
  line-height: var(--xueyuan-menu-bar-height);
  background: linear-gradient(to right, rgb(255, 201, 210), rgb(255, 239, 242));
  border-radius: 5px;
  z-index: 50;
}

.xueyuan-name {
  padding: 0 10px;
}

.xueyuan-selector .xueyuan-list {
  position: absolute;
  width: max-content;
  top: calc(var(--xueyuan-menu-bar-height) + 5px);
  transition: opacity 0.3s, visibility 0.3s, left 0.3s;
}

.close .xueyuan-list {
  left: 5px;
  opacity: 0;
  visibility: hidden;
}

.open .xueyuan-list {
  left: 0;
  opacity: 1;
  visibility: visible;
}

.xueyuan-list {
  display: flex;
  width: max-content;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 5px;
  padding: 8px 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
}

.xueyuan-list-column {
  width: 146px;
}

.xueyuan-list a {
  display: block;
  line-height: 26px;
  padding: 0 6px;
  color: #444444;
  font-size: 13px;
  text-decoration: none;
  border-radius: 5px;
}

.xueyuan-list a.router-link-active {
  background: linear-gradient(to right, rgb(220, 255, 255), rgb(240, 255, 255));
}

.xueyuan-list a:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.sub-selector-container {
  margin-left: 20px;
}

.sub-selector {
  position: relative;
  box-sizing: border-box;
  width: 110px;
  height: var(--xueyuan-menu-bar-height);
  line-height: var(--xueyuan-menu-bar-height);
  background: linear-gradient(to right, rgb(218, 201, 255), rgb(242, 236, 255));
  border-radius: 5px;
  z-index: 50;
}

.sub-name {
  padding: 0 10px;
}

.sub-selector .sub-list {
  position: absolute;
  width: max-content;
  top: calc(var(--xueyuan-menu-bar-height) + 5px);
  transition: opacity 0.3s, visibility 0.3s, left 0.3s;
}

.close .sub-list {
  left: 5px;
  opacity: 0;
  visibility: hidden;
}

.open .sub-list {
  left: 0;
  opacity: 1;
  visibility: visible;
}

.sub-list {
  width: max-content;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: 5px;
  padding: 8px 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.08);
}

.sub-list a {
  display: block;
  line-height: 26px;
  padding: 0 6px;
  color: #444444;
  font-size: 13px;
  text-decoration: none;
  border-radius: 5px;
}

.sub-list a.router-link-active {
  background: linear-gradient(to right, rgb(220, 255, 255), rgb(240, 255, 255));
}
</style>
