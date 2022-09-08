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
        <div class="article-time">发布时间：{{articleObj.dateStr}}</div>
        <div id="content" class="article-content content" v-html="articleObj.content"></div>
        <div class="article-link-container">
          <div class="article-link-bar">
            <div class="article-link-bar-title">原文</div>
            <div class="article-link-bar-text">
              <span>{{articleObj.href}}</span>
            </div>
            <div class="article-link-bar-widgets">
              <div class="article-link-bar-widget-copy-text" v-on:click="copyHrefToClipboard()">
                <img v-bind:src="require('@/assets/icon/icon-copy-efefef.svg')">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="message-box" class="message-box close">
      <div class="message-box-text">链接已复制到剪切板</div>
    </div>
  </div>
</template>

<script>
import ArticleStore from '@/store/ArticleStore'
import newsApi from '@/api/newsApi'

export default {
  name: 'Article',

  data: function() {
    return {
      id: '0-0-0-0',

      articleObj: {},

      messageColdDown: false
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

    fixAHref: function(contentElement) {
      var aTags = contentElement.getElementsByTagName('a')
      var baseUrl = this.articleObj.href.match(/http[a-zA-Z.:\/]+/)[0]
      console.log(baseUrl)
      for (var idx = 0; idx < aTags.length; idx += 1) {
        console.log(aTags[idx].attributes['href'].value)
        if (aTags[idx].attributes['href'].value.startsWith('/')) {  // Absolute path.
          console.log('ABC')
          aTags[idx].hrefBackup = baseUrl.concat(aTags[idx].attributes['href'].value.slice(1))
          aTags[idx].href = 'javascript: void(0)'
          var that = this
          aTags[idx].onclick = function() {
            that.copyToClipboard(this.hrefBackup)
            that.showMessageBox()
          }
        }
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
            if (children[idx].tagName != 'IMG' && children[idx].tagName != 'DIV') {  // Exclude.
              // Also remove <style> tag.
              if (children[idx].tagName == 'STYLE'
              || children[idx].innerHTML == ''
              || children[idx].innerHTML == '&nbsp;'
              || children[idx].innerHTML == '&nbsp;&nbsp;'
              || children[idx].innerHTML == '　&nbsp;'
              || children[idx].innerHTML == '&nbsp; &nbsp;&nbsp;'
              || children[idx].innerHTML == '<br>') {
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

    copyToClipboard: function(text) {
      var tmp = document.createElement('input')
      tmp.style = 'position: fixed; z-index: -100;'
      document.body.appendChild(tmp)
      tmp.value = text
      tmp.select()
      document.execCommand('copy')
      document.body.removeChild(tmp)
    },

    copyHrefToClipboard: function() {
      this.copyToClipboard(document.querySelector('.article-link-bar-text span').innerHTML)
      this.showMessageBox()
    },

    strDate: function(year, month, day) {
      return `${year}-${month}-${day}`
    },

    showMessageBox: function() {
      var messageBox = document.getElementById('message-box')
      if (!this.messageColdDown) {
        this.messageColdDown = true
        messageBox.classList.add('open')
        messageBox.classList.remove('close')
        var that = this
        setTimeout(function() {
          messageBox.classList.add('close')
          messageBox.classList.remove('open')
          setTimeout(function() {
            that.messageColdDown = false
          }, 500)
        }, 3000)
      }
    }
  },

  mounted: async function() {
    this.id = this.$route.params.id
    console.log(this.id)
    var that = this
    await newsApi.newsContent(this.id)
    .then(function(res) {
      that.articleObj = res.data
      that.articleObj.dateStr = that.strDate(
        that.articleObj.date['year'],
        that.articleObj.date['month'],
        that.articleObj.date['day']
      )
      console.log(that.articleObj)
      var originPiclist = that.articleObj.picList
      that.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
        var piclist = []
        for (var idx = 0; idx < originPiclist.length; idx += 1) {
          piclist.push(originPiclist[idx])
        }
        console.log(piclist)
        var contentElement = document.getElementById('content')
        console.log(contentElement)
        that.ficImgSrc(contentElement, piclist)
        that.clearInlineStyle(contentElement)
        that.removeBlankLine(contentElement)
        this.fixAHref(contentElement)
      })
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

/* Extend Card */
:root {
  --x-bar-line-height: 30px;
}

.article-link-container {
  margin-top: 32px;
  background: linear-gradient(to right, rgb(0, 50, 255), rgb(185, 199, 255));
  padding: 4px 0;
  border-radius: 8px;
}

.article-link-bar {
  display: flex;
  padding: 0 10px;
  height: var(--x-bar-line-height);
  line-height: var(--x-bar-line-height);
  font-size: 14px;
}

.article-link-bar-title {
  flex-grow: 0;
  flex-shrink: 0;
  padding-left: 2px;
  padding-right: 10px;
  color: #ffffff;
  font-size: 13px;
}

.article-link-bar-text {
  flex-grow: 1;
  flex-shrink: 1;
  overflow-x: auto;
  overflow-y: hidden;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
}

.article-link-bar-text span {
  display: inline-block;
  padding: 0 8px;
  width: max-content;
}

.article-link-bar-widgets {
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.article-link-bar-widget-copy-text {
  width: calc(var(--x-bar-line-height) - 2px);
  height: calc(var(--x-bar-line-height) - 2px);
  border-radius: 50%;
  background-color: rgb(0, 50, 255);
  display: flex;
  box-sizing: border-box;
  padding: 7px;
}

.article-link-bar-widget-copy-text img {
  width: 100%;
  height: 100%;
}

.message-box {
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 200;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  width: fit-content;
  padding: 12px 16px;
  border-radius: 1000px;
  box-shadow: 0 0px 24px 0px rgba(40, 10, 10, 0.25);
  transition: top 0.5s, opacity 0.5s;
}

.message-box.open {
  top: 80px;
  opacity: 1;
}

.message-box.close {
  top: -60px;
  opacity: 0;
}

.message-box-text {
  max-width: 160px;
  font-size: 14px;
  line-height: 24px;
  vertical-align: middle;
  color: #333333;
}
</style>