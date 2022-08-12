<template>
  <div class="news-card-1-pic-wrapper">
  <div class="news-card-1-pic">
    <div class="news-card-1-pic-inner">
      <div class="news-card-1-pic-left">
        <div class="news-card-1-pic-title">{{title}}</div>
        <div class="news-card-1-pic-time">{{time}}</div>
      </div>
      <div class="news-card-1-pic-right">
        <img v-bind:src="picSrc">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'NewsCard1Pic',

  props: ['title', 'time', 'picSrc']
}
</script>

<style>
.news-card-1-pic-wrapper {
  background-color: white;
}

.news-card-1-pic {
  border-radius: 5px;
  padding: 0 16px;
}

.news-card-1-pic-inner {
  display: flex;
  box-sizing: border-box;
  padding: 10px 0;
  border-bottom: 1px solid #e8e8e8;
}

.news-card-1-pic-left {
  position: relative;
  flex-grow: 1;
  padding-right: 8px;
}

.news-card-1-pic-title {
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 16px;
}

.news-card-1-pic-time {
  position: absolute;
  bottom: 0;
  font-size: 12px;
  color: #8a8a8a;
}

.news-card-1-pic-right {
  box-sizing: border-box;
  flex-shrink: 0;
  width: 150px;
  height: 90px;
}

.news-card-1-pic-right img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}
</style>
