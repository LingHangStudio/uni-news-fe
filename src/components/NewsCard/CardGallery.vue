<template>
  <div class="card-gallery">
    <div v-if="status=='loading'" class="load-container">
      <span class="load"></span>
    </div>
    <div v-if="status=='initial-error'">加载错误</div>
    <div class="news-card-selector" v-for="obj in newsList" v-on:click="openArticle(obj)" v-bind:key="obj.id">
      <div class="news-card-selector-inner">
        <NewsCard3Pic
          v-if="is3PicCard(obj.picList)"
          v-bind:title="obj.title"
          v-bind:time="strDate(obj.date['year'], obj.date['month'], obj.date['day'])"
          v-bind:pic-1-src="picUrl(obj.picList[0])"
          v-bind:pic-2-src="picUrl(obj.picList[1])"
          v-bind:pic-3-src="picUrl(obj.picList[2])"></NewsCard3Pic>
        <NewsCard1Pic
          v-else-if="is1PicCard(obj.picList)"
          v-bind:title="obj.title"
          v-bind:time="strDate(obj.date['year'], obj.date['month'], obj.date['day'])"
          v-bind:pic-src="picUrl(obj.picList[0])"></NewsCard1Pic>
        <NewsCard0Pic
          v-else
          v-bind:title="obj.title"
          v-bind:time="strDate(obj.date['year'], obj.date['month'], obj.date['day'])"></NewsCard0Pic>
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
  <div id="update-indicator" class="update-indicator">
    <span class="update-inner"></span>
  </div>
</template>

<script>
import newsApi from '@/api/newsApi'
import NewsCard0Pic from '@/components/NewsCard/NewsCard0Pic.vue'
import NewsCard1Pic from '@/components/NewsCard/NewsCard1Pic.vue'
import NewsCard3Pic from '@/components/NewsCard/NewsCard3Pic.vue'
import ArticleStore from '@/store/ArticleStore'
import router from '@/router'

export default {
  name: 'CardGallery',

  components: {
    NewsCard0Pic: NewsCard0Pic,
    NewsCard1Pic: NewsCard1Pic,
    NewsCard3Pic: NewsCard3Pic
  },

  props: ['typeName', 'partName', 'subName'],

  data: function() {
    return {
      // created
      // loading
      // initiated
      // initial-error
      // appending
      // no-more
      // appended
      // append-error
      status: 'created',

      page: 0,

      newsList: [
      ],

      updateTouchStartPosition: -100,

      appendingTimer: null
    }
  },

  methods: {
    init: async function(idx=0) {
      var that = this
      var promise = null
      if (this.typeName == 1) {
        promise = newsApi.newsList(this.partName, this.subName, 20, 0)
      }
      else if (this.typeName == 2) {
        promise = newsApi.houseNews(this.partName, this.subName, 20, 0)
      }
      promise.then(function(res) {
        console.log(res.data)
        that.newsList = res.data.newsList
        that.status = 'initiated'
        that.page = res.data.page
      })
      promise.catch(function(err) {
        console.log('Error:', err)
        that.status = 'initial-error'
      })
      return promise
    },

    append: async function(idx=0) {
      var that = this
      var promise = null
      if (this.typeName == 1) {
        promise = newsApi.newsList(this.partName, this.subName, 20, that.page + 1)
      }
      else if (this.typeName == 2) {
        promise = newsApi.houseNews(this.partName, this.subName, 20, that.page + 1)
      }
      that.status = 'appending'
      promise.then(function(res) {
        console.log(res.data)
        var appendNewsList = res.data.newsList
        if (appendNewsList == 0) {
          that.status = 'no-more'
        }
        else {
          for (var i = 0; i < appendNewsList.length; i += 1) {
            that.newsList.push(appendNewsList[i])
          }
          that.status = 'appended'
          that.page = res.data.page
        }
      })
    },

    is3PicCard: function(piclist) {
      if (piclist.length >= 3) {
        return true
      }
      return false
    },

    is1PicCard: function(piclist) {
      if (1 <= piclist.length && piclist.length <= 2) {
        return true
      }
    },

    openArticle: function(obj) {
      ArticleStore[obj.id] = obj
      router.push({
        name: 'article',
        params: {
          id: obj.id
        }
      })
    },

    picUrl: function(originUrl) {
      if (originUrl.endsWith('_ueditor/themes/default/images/icon_doc.gif')) {
        return require('@/assets/img/img-word.png')
      }
      else if (originUrl.endsWith('_ueditor/themes/default/images/icon_rar.gif')) {
        return require('@/assets/img/img-zip.png')
      }
      else if (originUrl.endsWith('_ueditor/themes/default/images/icon_xls.gif')) {
        return require('@/assets/img/img-excel.png')
      }
      else if (originUrl.endsWith('_ueditor/themes/default/images/icon_pdf.gif')) {
        return require('@/assets/img/img-pdf.png')
      }
      else if (originUrl.endsWith('_ueditor/themes/default/images/icon_ppt.gif')) {
        return require('@/assets/img/img-ppt.png')
      }
      else {
        return originUrl
      }
    },

    strDate: function(year, month, day) {
      var today = new Date()
      var publishDate = new Date(year, month-1, day)
      var dateStr = ''
      if (year == today.getFullYear()) {
        dateStr = `${month}月${day}日`
      }
      else {
        dateStr = `${year}年${month}月${day}日`
      }
      var diffDay = (today - publishDate) / 1000 / 60 / 60 / 24
      if (diffDay < 1) {
        dateStr = '今天'
      }
      else if (diffDay < 2) {
        dateStr = '昨天'
      }
      else if (diffDay < 3) {
        dateStr = '前天'
      }
      return dateStr
    },

    touchstartHandle: function(e) {
      var contents = document.getElementById('contents')
      if (contents.scrollTop == 0) {
        this.updateTouchStartPosition = e.touches[0].pageY
      }
      var updateIndicator = document.getElementById('update-indicator')
      updateIndicator.style.transition = ''
    },

    touchmoveHandle: function(e) {
      if (this.updateTouchStartPosition > 0) {
        var offset = e.touches[0].pageY - this.updateTouchStartPosition
        var indicatorTop = 0 + offset * 0.5
        var updateIndicator = document.getElementById('update-indicator')
        updateIndicator.style.top = `${indicatorTop}px`
      }
    },

    touchendHandle: function(e) {
      var updateIndicator = document.getElementById('update-indicator')
      if (updateIndicator.offsetTop > 70) {  // 刷新页面
        document.getElementsByClassName('update-inner')[0].style.animation = 'circle 1s infinite linear'
        this.init().then(
          function() {
            setTimeout(function() {
              updateIndicator.style.top = '0px'
              setTimeout(function() {
                document.getElementsByClassName('update-inner')[0].style.animation = ''
              }, 300)
            }, 500)
          }
        )
        updateIndicator.style.transition = 'top 0.3s'
        updateIndicator.style.top = '70px'
      }
      else {
        updateIndicator.style.transition = 'top 0.3s'
        updateIndicator.style.top = '0px'
      }
      this.updateTouchStartPosition = -100
    },

    isNearBottom: function(scrollElement, bottom) {
      if (scrollElement.scrollHeight - scrollElement.scrollTop - scrollElement.clientHeight <= bottom) {
        return true
      }
      else {
        return false
      }
    },

    appendingTimerHandle: function() {
      var contents = document.getElementById('contents')
      if (this.isNearBottom(contents, 30)) {
        console.log('Near Bottom.')
        if (this.status == 'initiated' || this.status == 'appended') {
          this.append()
        }
      }
    }
  },

  activated: function() {
    console.log('status:', this.status)
    if (this.status == 'created') {
      this.status = 'loading'
      this.init()
    }
    var updateIndicator = document.getElementById('update-indicator')
    updateIndicator.style.top = '0px'
    var contents = document.getElementById('contents')
    contents.addEventListener('touchstart', this.touchstartHandle)
    contents.addEventListener('touchmove', this.touchmoveHandle)
    contents.addEventListener('touchend', this.touchendHandle)
    this.appendingTimer = setInterval(this.appendingTimerHandle, 500)
  },

  deactivated: function() {
    var contents = document.getElementById('contents')
    contents.removeEventListener('touchstart', this.touchstartHandle)
    contents.removeEventListener('touchmove', this.touchmoveHandle)
    contents.removeEventListener('touchend', this.touchendHandle)
    clearInterval(this.appendingTimer)
  }
}
</script>

<style>
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

/* Update */
.update-indicator {
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

.update-inner {
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
