<template>
  <div class="card-gallery">
    <div v-if="status=='loading'" class="load-container">
      <span class="load"></span>
    </div>
    <div v-if="status=='initial-error'">加载错误</div>
    <div class="news-card-selector" v-for="obj in newsList" v-on:click="openArticle(obj)" v-bind:key="obj.id">
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
      status: 'created',

      newsList: [
      ]
    }
  },

  methods: {
    init: function(idx=0) {
      var that = this
      console.log(that)
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
        console.log(that.newsList)
        that.status = 'initiated'
      })
      promise.catch(function(err) {
        console.log('Error:', err)
        that.status = 'initial-error'
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
      if (year == 2022) {
        return `${month}月${day}日`
      }
      else {
        return `${year}年${month}月${day}日`
      }
    }
  },

  activated: function() {
    console.log('status:', this.status)
    if (this.status == 'created') {
      this.status = 'loading'
      this.init()
    }
  }
}
</script>

<style>
</style>
