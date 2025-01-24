<script setup>
import { defineProps } from 'vue'

defineProps({
  title: String,
  time: String,
  pic1Src: String,
  pic2Src: String,
  pic3Src: String
})

import brokenImg from '@/assets/img/img-broken.png';

const handleError = (e) => {
  e.target.src = brokenImg
}
</script>

<template>
  <div class="news-card-3-pic-wrapper">
    <div class="news-card-3-pic">
      <div class="news-card-3-pic-inner">
        <div class="news-card-3-pic-title">{{ title }}</div>
        <div class="news-card-3-pic-pictures-bar">
          <div class="news-card-3-pic-picture">
            <img :src="pic1Src" @error="handleError">
          </div>
          <div class="news-card-3-pic-picture">
            <img :src="pic2Src" @error="handleError">
          </div>
          <div class="news-card-3-pic-picture">
            <img :src="pic3Src" @error="handleError">
          </div>
        </div>
        <div class="news-card-3-pic-time">{{ time }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.news-card-3-pic {
  padding: 0 12px;
}

.news-card-3-pic-inner {
  padding: 8px 0;
}

.news-card-3-pic-title {
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
  margin-bottom: 12px;
  color: #333333;
  word-break: break-all;
}

.news-card-3-pic-pictures-bar {
  display: flex;
  width: 100%;
  height: 80px;
  margin-bottom: 12px;
}

.news-card-3-pic-picture {
  box-sizing: border-box;
  width: 33%;
  padding: 0 2px;
  flex-grow: 1;
}

.news-card-3-pic-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #dddddd;
  border: none;
}

.news-card-3-pic-picture:first-child img {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.news-card-3-pic-picture:last-child img {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.news-card-3-pic-time {
  font-size: 11px;
  color: #8a8a8a;
}
</style>
