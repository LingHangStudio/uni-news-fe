<template>
  <div v-bind:key="$route.fullPath">
    <div class="article-wrapper">
      <div class="article">
        <div class="article-title">
          <h1>{{articleObj.title}}</h1>
        </div>
        <div class="article-time">{{articleObj.time}}</div>
        <div id="content" class="article-content content" v-html="articleObj.text"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleStore from '@/store/ArticleStore'

export default {
  name: 'Article',

  data: function() {
    return {
      articleObj: {}
    }
  },

  methods: {
    ficImgSrc: function(contentElement, piclist) {
      var imgs = contentElement.getElementsByTagName('img')
      var len = imgs.length < piclist.length ? imgs.length : piclist.length
      for (var idx = 0; idx < len; idx += 1) {
        imgs[idx]['src'] = piclist[idx]
      }
    },

    clearInlineStyle: function(contentElement) {
      function clearInlineStyleCore(contentElement) {
        var children = contentElement.children
        if (children != undefined && children.length > 0) {
          for (var idx = 0; idx < children.length; idx += 1) {
            console.log(children[idx])
            children[idx].style = undefined
            clearInlineStyleCore(children[idx])
          }
        }
        else {
          return null
        }
      }
      clearInlineStyleCore(contentElement)
    }
  },

  mounted: function() {
    console.log(this.$route.params.id)
    console.log(ArticleStore[this.$route.params.id])
    this.articleObj = ArticleStore[this.$route.params.id]
    var originPiclist = this.articleObj.piclist
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      var piclist = []
      for (var idx = 0; idx < originPiclist.length; idx += 1) {
        piclist.push(originPiclist[idx].pic)
      }
      console.log(piclist)
      var contentElement = document.getElementById('content')
      this.ficImgSrc(contentElement, piclist)
      this.clearInlineStyle(contentElement)
    })
  }
}
</script>

<style>
@import '@/assets/css/markdown.css';

.article-wrapper {
  padding: 16px 0 0 0;
}

.article {
  padding: 0 16px;
  color: #333333;
}

.article-title h1 {
  margin: 0;
  padding: 0;
  font-size: 22px;
  line-height: 32px;
  margin-bottom: 12px;
}

.article-time {
  font-size: 13px;
  color: #999999;
  margin-bottom: 32px;
}
</style>