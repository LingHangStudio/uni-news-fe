<script setup>
import newsApi from '@/api/newsApi'
import NewsCard0Pic from '@/components/NewsCard/NewsCard0Pic.vue'
import NewsCard1Pic from '@/components/NewsCard/NewsCard1Pic.vue'
import NewsCard3Pic from '@/components/NewsCard/NewsCard3Pic.vue'
// import ArticleStore from '@/stores/ArticleStore'
import { ref, defineProps, onActivated, onDeactivated } from 'vue'
import { useRouter } from 'vue-router';

const { subName } = defineProps({
  subName: String
})

const router = useRouter()
const status = ref('created')
const page = ref(0)
const newsList = ref([])
const uptimeTouchStartPosition = ref(-100)
let appendingTimer = ref(null)

const init = async () => {
  let promise = null
  promise = newsApi.newsList(subName, 20, 1)
  try {
    const res = await promise
    // console.log(res)
    newsList.value = res.data.newsList
    status.value = 'initiated'
    page.value = res.data.page
  } catch (error) {
    console.error('Error:', error)
    status.value = 'initial-error'
  }
  return promise
}

const append = async () => {
  let promise = null
  promise = newsApi.newsList(subName, 20, page.value + 1)
  status.value = 'appending'
  try {
    const res = await promise
    const appendNewsList = res.data.newsList
    if (appendNewsList == 0) {
      status.value = 'no-more'
    }
    else {
      newsList.value.push(...appendNewsList)
      status.value = 'appended'
      page.value = res.data.page
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

const is3PicCard = (piclist) => {
  return piclist.length >= 3
}

const is1PicCard = (piclist) => {
  return (1 <= piclist.length && piclist.length <= 2)
}

const openArticle = (obj) => {
  // ArticleStore[obj.id] = obj
  router.push({
    name: 'article',
    params: {
      id: obj.id
    }
  })
}

//使用new URL .herf
const picUrl = (originUrl) => {
  if (originUrl.endsWith('_ueditor/themes/default/images/icon_doc.gif')) {
    return new URL('@/assets/img/img-word.png', import.meta.url).href
  } else if (originUrl.endsWith('_ueditor/themes/default/images/icon_rar.gif')) {
    return new URL('@/assets/img/img-zip.png', import.meta.url).href
  } else if (originUrl.endsWith('_ueditor/themes/default/images/icon_xls.gif')) {
    return new URL('@/assets/img/img-excel.png', import.meta.url).href
  } else if (originUrl.endsWith('_ueditor/themes/default/images/icon_pdf.gif')) {
    return new URL('@/assets/img/img-pdf.png', import.meta.url).href
  } else if (originUrl.endsWith('_ueditor/themes/default/images/icon_ppt.gif')) {
    return new URL('@/assets/img/img-ppt.png', import.meta.url).href
  } else {
    return originUrl
  }
}

const strtime = (year, month, day) => {
  let today = new Date()
  let publishtime = new Date(year, month - 1, day)
  let timeStr = ''
  if (year == today.getFullYear()) {
    timeStr = `${month}月${day}日`
  }
  else {
    timeStr = `${year}年${month}月${day}日`
  }
  let diffDay = (today - publishtime) / 1000 / 60 / 60 / 24
  if (diffDay < 1) {
    timeStr = '今天'
  }
  else if (diffDay < 2) {
    timeStr = '昨天'
  }
  else if (diffDay < 3) {
    timeStr = '前天'
  }
  return timeStr
}

const touchstartHandle = (e) => {
  const contents = document.getElementById('contents')
  if (contents.scrollTop == 0) {
    uptimeTouchStartPosition.value = e.touches[0].pageY
  }
  const uptimeIndicator = document.getElementById('uptime-indicator')
  uptimeIndicator.style.transition = ''
}

const touchmoveHandle = (e) => {
  if (uptimeTouchStartPosition.value > 0) {
    const offset = e.touches[0].pageY - uptimeTouchStartPosition.value
    const indicatorTop = 0 + offset * 0.5
    const uptimeIndicator = document.getElementById('uptime-indicator')
    uptimeIndicator.style.top = `${indicatorTop}px`
  }
}

const touchendHandle = async () => {
  const uptimeIndicator = document.getElementById('uptime-indicator')
  if (uptimeIndicator.offsetTop > 70) {  // 刷新页面
    document.getElementsByClassName('uptime-inner')[0].style.animation = 'circle 1s infinite linear'
    try {
      await init()
      setTimeout(() => {
        uptimeIndicator.style.top = '0px'
        setTimeout(() => {
          document.getElementsByClassName('uptime-inner')[0].style.animation = ''
        }, 300)
      }, 500)
    } catch (error) {
      console.error(error)
    }

    uptimeIndicator.style.transition = 'top 0.3s'
    uptimeIndicator.style.top = '70px'
  }
  else {
    uptimeIndicator.style.transition = 'top 0.3s'
    uptimeIndicator.style.top = '0px'
  }
  uptimeTouchStartPosition.value = -100
}

const isNearBottom = (scrollElement, bottom) => {
  return (scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight <= bottom)
}

const appendingTimerHandle = () => {
  const contents = document.getElementById('contents')
  if (isNearBottom(contents, 30)) {
    console.log('Near Bottom.')
    if (status.value == 'initiated' || status.value == 'appended') {
      append()
    }
  }
}

onActivated(() => {
  if (status.value == 'created') {
    status.value = 'loading'
    init()
  }
  const uptimeIndicator = document.getElementById('uptime-indicator')
  uptimeIndicator.style.top = '0px'
  const contents = document.getElementById('contents')
  contents.addEventListener('touchstart', touchstartHandle)
  contents.addEventListener('touchmove', touchmoveHandle)
  contents.addEventListener('touchend', touchendHandle)
  appendingTimer.value = setInterval(appendingTimerHandle, 500)
})

onDeactivated(() => {
  const contents = document.getElementById('contents')
  contents.removeEventListener('touchstart', touchstartHandle)
  contents.removeEventListener('touchmove', touchmoveHandle)
  contents.removeEventListener('touchend', touchendHandle)
  clearInterval(appendingTimer.value)
})
</script>

<template>
  <div class="card-gallery">
    <div v-if="status == 'loading'" class="load-container">
      <span class="load"></span>
    </div>
    <div v-if="status == 'initial-error'">加载错误</div>
    <div class="news-card-selector" v-for="obj in newsList" @click="openArticle(obj)" :key="obj.id">
      <div class="news-card-selector-inner">
        <NewsCard3Pic v-if="is3PicCard(obj.other.picList)" :title="obj.title"
          :time="strtime(obj.time['year'], obj.time['month'], obj.time['day'])" :pic-1-src="picUrl(obj.other.picList[0])"
          :pic-2-src="picUrl(obj.other.picList[1])" :pic-3-src="picUrl(obj.other.picList[2])"></NewsCard3Pic>
        <NewsCard1Pic v-else-if="is1PicCard(obj.other.picList)" :title="obj.title"
          :time="strtime(obj.time['year'], obj.time['month'], obj.time['day'])" :pic-src="picUrl(obj.other.picList[0])">
        </NewsCard1Pic>
        <NewsCard0Pic v-else :title="obj.title" :time="strtime(obj.time['year'], obj.time['month'], obj.time['day'])">
        </NewsCard0Pic>
      </div>
      <div class="news-card-divider">
        <div class="news-card-divider-inner"></div>
      </div>
    </div>
  </div>
  <div id="appending-indicator" class="appending-indicator">
    <div class="appending-indicator-appending" v-if="status == 'appending'">
      <div class="appending-indicator-appending-inner">
        <span></span>
      </div>
    </div>
    <div class="appending-indicator-no-more" v-if="status == 'no-more'">
      已加载全部
    </div>
  </div>
  <div id="uptime-indicator" class="uptime-indicator">
    <span class="uptime-inner"></span>
  </div>
</template>

<style lang="scss" >
/* Loading Animation */
.load-container {
  display: block;
  position: absolute;
  width: 36px;
  height: 36px;
  left: 50%;
  top: 40vh;
  transform: translate(-50%, -50%);
}

.load {
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  width: 100%;
  border: 4px solid transparent;
  border-top-color: #42b983;
  border-left-color: #42b983;
  border-bottom-color: #42b983;
  animation: circle 1s infinite linear;
  border-radius: 50%
}

@keyframes circle {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg)
  }
}

/* Uptime */
.uptime-indicator {
  box-sizing: border-box;
  padding: 5px;
  position: fixed;
  background-color: white;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.1);
  z-index: 80;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.uptime-inner {
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  width: 100%;
  border: 3px solid transparent;
  border-right-color: #42b983;
  border-left-color: #42b983;
  border-bottom-color: #42b983;
  border-radius: 50%
}

/* Append */
.appending-indicator {
  height: 50px;
}

.appending-indicator-appending {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.appending-indicator-appending-inner {
  display: inline-block;
  width: 30px;
  height: 30px;
}

.appending-indicator-appending-inner span {
  box-sizing: border-box;
  display: inline-block;
  height: 100%;
  width: 100%;
  border: 3px solid transparent;
  border-top-color: #42b983;
  border-left-color: #42b983;
  border-bottom-color: #42b983;
  animation: circle 1s infinite linear;
  border-radius: 50%
}

.appending-indicator-no-more {
  padding: 12px 0;
  text-align: center;
  font-size: 14px;
  color: #999999;
}

.news-card-selector {
  position: relative;
  padding: 4px;
  background-color: white;
}

.news-card-selector-inner {
  border-radius: 8px;
}

.news-card-selector-inner:active {
  background-color: rgba(0, 0, 0, 0.08);
}

.news-card-divider {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0.6px;
  width: 100%;
  height: 0;
  padding: 0 12px;
}

.news-card-divider-inner {
  width: 100%;
  height: 0;
  border-top: 0.6px solid #e8e8e8;
}
</style>
