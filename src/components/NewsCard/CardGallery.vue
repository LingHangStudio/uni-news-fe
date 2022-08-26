<template>
  <div class="card-gallery">
    <div class="news-card-selector" v-for="obj in newsList" v-on:click="openArticle(obj)" v-bind:key="obj.id">
      <NewsCard3Pic
        v-if="is3PicCard(obj.piclist)"
        v-bind:title="obj.title"
        v-bind:time="obj.time"
        v-bind:pic-1-src="obj.piclist[0].pic"
        v-bind:pic-2-src="obj.piclist[1].pic"
        v-bind:pic-3-src="obj.piclist[2].pic"></NewsCard3Pic>
      <NewsCard1Pic
        v-else-if="is1PicCard(obj.piclist)"
        v-bind:title="obj.title"
        v-bind:time="obj.time"
        v-bind:pic-src="obj.piclist[0].pic"></NewsCard1Pic>
      <NewsCard0Pic
        v-else
        v-bind:title="obj.title"
        v-bind:time="obj.time"></NewsCard0Pic>
    </div>
  </div>
</template>

<script>
import { newsList } from '@/api/newsApi'
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

  props: ['partName', 'subName'],

  data: function() {
    return {
      newsList: [
      ]
    }
  },

  methods: {
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
    }
  },

  mounted: function() {
    var that = this
    var promise = newsList(this.partName, this.subName)
    promise.then(function(res) {
      console.log(res.data)
      that.newsList = res.data
    })
  }
}
</script>

<style>
</style>

