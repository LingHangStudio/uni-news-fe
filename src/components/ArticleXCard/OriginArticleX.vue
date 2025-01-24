<script setup>
import { defineProps, defineEmits } from 'vue'
import iconSrc from '@/assets/icon/icon-copy-efefef.svg';

defineProps({
  originHref: String
})

const emit = defineEmits(['showMessageBox'])

const emitMessage = () => {
  emit('showMessageBox')
}

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copied to clipboard successfully!');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
};

const copyHrefToClipboard = () => {
  const hrefText = document.querySelector('.article-link-bar-text span').innerText;
  copyToClipboard(hrefText);
  emitMessage();
};
</script>

<template>
  <div class="article-link-container">
    <div class="article-link-bar">
      <div class="article-link-bar-title">原文</div>
      <div class="article-link-bar-text">
        <span>{{ originHref }}</span>
      </div>
      <div class="article-link-bar-widgets">
        <div class="article-link-bar-widget-copy-text" @click="copyHrefToClipboard()">
          <img :src="iconSrc" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
