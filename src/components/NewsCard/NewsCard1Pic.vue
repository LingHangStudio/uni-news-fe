<template>
  <div class="news-card-1-pic-wrapper">
    <div class="news-card-1-pic">
      <div class="news-card-1-pic-inner">
        <div class="news-card-1-pic-left">
          <div class="news-card-1-pic-title">{{title}}</div>
          <div class="news-card-1-pic-time">{{time}}</div>
        </div>
        <div class="news-card-1-pic-right">
          <img v-bind:src="picSrc" v-bind:onerror="brokenImg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsCard1Pic',

  props: ['title', 'time', 'picSrc'],

  data: function() {
    return {
      brokenImg: `this.src="${require('@/assets/img/img-broken.png')}"`
    }
  }
}
</script>

<style>
.news-card-1-pic {
  padding: 0 12px;
}

.news-card-1-pic-inner {
  display: flex;
  box-sizing: border-box;
  padding: 8px 0;
}

.news-card-1-pic-left {
  position: relative;
  flex-grow: 1;
  padding-right: 8px;
}

.news-card-1-pic-title {
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #333333;
}

.news-card-1-pic-time {
  position: absolute;
  bottom: 0;
  font-size: 11px;
  color: #8a8a8a;
}

.news-card-1-pic-right {
  box-sizing: border-box;
  flex-shrink: 0;
  width: 33%;
  height: 80px;
}

.news-card-1-pic-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  background: #dddddd;
}
</style>
