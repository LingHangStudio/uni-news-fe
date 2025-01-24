<template>
  <div class="article-link-container">
    <div class="article-link-bar">
      <div class="article-link-bar-title">原文</div>
      <div class="article-link-bar-text">
        <span>{{ originHref }}</span>
      </div>
      <div class="article-link-bar-widgets">
        <div class="article-link-bar-widget-copy-text" v-on:click="copyHrefToClipboard()">
          <img v-bind:src="require('@/assets/icon/icon-copy-efefef.svg')">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OriginArticleX',

  props: ['originHref'],

  methods: {
    copyToClipboard: function (text) {
      var tmp = document.createElement('input')
      tmp.style = 'position: fixed; z-index: -100;'
      document.body.appendChild(tmp)
      tmp.value = text
      tmp.select()
      document.execCommand('copy')
      document.body.removeChild(tmp)
    },

    copyHrefToClipboard: function () {
      this.copyToClipboard(document.querySelector('.article-link-bar-text span').innerHTML)
      // this.showMessageBox()
      this.$emit('showMessageBox')
    }
  }
}
</script>

<style>
.article-link-container {
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
</style>
