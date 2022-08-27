<template>
  <div class="article-page" v-bind:key="$route.fullPath">
    <div class="article-head-bar">
      <div class="article-head-bar-back-button" v-on:click="$router.back()">
        <div class="article-head-bar-back-button-inner">
          <svg t="1660669430811" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1356" width="200" height="200"><path d="M532.526499 904.817574L139.506311 511.797385 532.526499 118.777197c12.258185-12.258185 12.432147-32.892131-0.187265-45.51052-12.707416-12.707416-32.995485-12.703323-45.511543-0.187265L75.166957 484.739123c-7.120165 7.120165-10.163477 17.065677-8.990768 26.624381-1.500167 9.755178 1.5104 20.010753 8.990768 27.491121l411.660734 411.660734c12.258185 12.258185 32.892131 12.432147 45.511543-0.187265 12.707416-12.707416 12.7023-32.995485 0.187265-45.51052z" p-id="1357"></path></svg>
        </div>
      </div>
      <div class="article-head-bar-text">正文</div>
    </div>
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
            // console.log(children[idx])
            children[idx].removeAttribute('style')
            children[idx].removeAttribute('width')
            children[idx].removeAttribute('height')
            clearInlineStyleCore(children[idx])
          }
        }
        else {
          return null
        }
      }
      clearInlineStyleCore(contentElement)
    },

    removeBlankLine: function(contentElement) {
      function removeBlankLineCore(contentElement) {
        var children = contentElement.children
        if (children != undefined && children.length > 0) {
          var deleteNodes = []
          for (var idx = 0; idx < children.length; idx += 1) {
            removeBlankLineCore(children[idx])
            if (children[idx].tagName != 'IMG') {  // Exclude.
              if (children[idx].innerHTML == '' || children[idx].innerHTML == '&nbsp;' || children[idx].innerHTML == '&nbsp;&nbsp;' || children[idx].innerHTML == '<br>') {
                deleteNodes.push(children[idx])
              }
            }
          }
          for (var idx2 = 0; idx2 < deleteNodes.length; idx2 += 1) {
            contentElement.removeChild(deleteNodes[idx2])
          }
        }
        else {
          return null
        }
      }
      removeBlankLineCore(contentElement)
    },
  },

  mounted: function() {
    console.log(this.$route.params.id)
    console.log(ArticleStore[this.$route.params.id])
    this.articleObj = ArticleStore[this.$route.params.id]
    var originPiclist = this.articleObj.piclist
    var that = this
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
      var piclist = []
      for (var idx = 0; idx < originPiclist.length; idx += 1) {
        piclist.push(originPiclist[idx].pic)
      }
      // console.log(piclist)
      var contentElement = document.getElementById('content')
      console.log(contentElement)
      that.ficImgSrc(contentElement, piclist)
      that.clearInlineStyle(contentElement)
      that.removeBlankLine(contentElement)
    })
  }
}
</script>

<style>
@import '@/assets/css/markdown.css';

.article-page {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.article-page {
  background-color: #ffffff;
}

.article-head-bar {
  --article-head-bar-height: 40px;
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  width: 100%;
  height: var(--article-head-bar-height);
  color: #333333;
}

.article-head-bar-back-button {
  position: absolute;
  left: 0;
  top: 0;
  padding-left: 8px;
}

.article-head-bar-back-button-inner {
  box-sizing: border-box;
  width: var(--article-head-bar-height);
  height: var(--article-head-bar-height);
  padding: 10px;
}

.article-head-bar-back-button svg {
  width: 100%;
  height: 100%;
}

.article-head-bar-text {
  height: var(--article-head-bar-height);
  line-height: var(--article-head-bar-height);
  font-size: 16px;
}

.article-wrapper {
  padding: 16px 0 40px 0;
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
  margin-bottom: 24px;
}
</style>