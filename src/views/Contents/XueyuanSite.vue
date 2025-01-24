<script setup>
import newsApi from '@/api/newsApi'
import { ref, onMounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute()
const house = ref(7)
const houseSubList = ref([])
const houseDict = ref({
  1: '材料与冶金学院',
  2: '城市建设学院',
  3: '恒大管理学院',
  4: '国际学院',
  5: '化学与化工学院',
  6: '机械自动化学院',
  7: '计算机科学与技术学院',
  8: '理学院',
  9: '马克思主义学院',
  10: '汽车与交通工程学院',
  11: '生命科学与健康学院',
  12: '体育学院',
  13: '外国语学院',
  14: '文法与经济学院',
  15: '信息科学与工程学院',
  16: '医学院',
  17: '艺术与设计学院',
  18: '资源与环境工程学院'
})

const toggleXueyuanSelector = () => {
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

const toggleSubSelector = () => {
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
    houseSubList.value = res.data.subList ? res.data.subList : []
  }
  catch (error) {
    console.error(error)
  }
}

const houseName = () => {
  return houseDict.value[route.params.part] || '请选择学院'
}

const subName = () => {
  const obj = houseSubList.value[route.params.sub - 1]
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
  if ((to.name == 'xueyuan-sub' || to.name == 'xueyuan') && (from.name == 'xueyuan-sub' || from.name == 'xueyuan')) {
    if (to.params.part != from.params.part) {
      await updateHouseSub()
    }
  }
  const nameList = ['xuexiao', 'xuexiao-sub', 'jiaowu', 'jiaowu-sub', 'tuanwei', 'tuanwei-sub']

  if (nameList.includes(from.name) && to.name == 'xueyuan') {
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
            <div class="xueyuan-name">{{ houseName() }}</div>
            <div class="xueyuan-list">
              <div class="xueyuan-list-column">
                <router-link to="/contents/xueyuan/1/1">材料与冶金学院</router-link>
                <router-link to="/contents/xueyuan/2/1">城市建设学院</router-link>
                <router-link to="/contents/xueyuan/3/1">恒大管理学院</router-link>
                <router-link to="/contents/xueyuan/4/1">国际学院</router-link>
                <router-link to="/contents/xueyuan/5/1">化学与化工学院</router-link>
                <router-link to="/contents/xueyuan/6/1">机械自动化学院</router-link>
                <router-link to="/contents/xueyuan/7/1">计算机科学与技术学院</router-link>
                <router-link to="/contents/xueyuan/8/1">理学院</router-link>
                <router-link to="/contents/xueyuan/9/1">马克思主义学院</router-link>
              </div>
              <div class="xueyuan-list-column">
                <router-link to="/contents/xueyuan/10/1">汽车与交通工程学院</router-link>
                <router-link to="/contents/xueyuan/11/1">生命科学与健康学院</router-link>
                <router-link to="/contents/xueyuan/12/1">体育学院</router-link>
                <router-link to="/contents/xueyuan/13/1">外国语学院</router-link>
                <router-link to="/contents/xueyuan/14/1">文法与经济学院</router-link>
                <router-link to="/contents/xueyuan/15/1">信息科学与工程学院</router-link>
                <router-link to="/contents/xueyuan/16/1">医学院</router-link>
                <router-link to="/contents/xueyuan/17/1">艺术与设计学院</router-link>
                <router-link to="/contents/xueyuan/18/1">资源与环境工程学院</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="sub-selector-container">
          <div class="sub-selector close" @click="toggleSubSelector">
            <div class="sub-name">{{ subName() }}</div>
            <div class="sub-list">
              <router-link v-for="obj in houseSubList" :key="obj.sub" :to="`/contents/xueyuan/${house}/${obj.sub}`">
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
            <component class="slide-target" v-if="route.name == 'xueyuan-sub'" :is="Component" :key="route.fullPath">
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
