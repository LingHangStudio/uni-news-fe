<template>
  <div class="news-card-3-pic-wrapper">
    <div class="news-card-3-pic">
      <div class="news-card-3-pic-inner">
        <div class="news-card-3-pic-title">{{title}}</div>
        <div class="news-card-3-pic-pictures-bar">
          <div class="news-card-3-pic-picture">
            <img v-bind:src="pic1Src" onerror="this.src='https://one.oss.monkeyhbd.cn/monkeyhbd.jpg'">
          </div>
          <div class="news-card-3-pic-picture">
            <img v-bind:src="pic2Src" onerror="this.src='https://one.oss.monkeyhbd.cn/monkeyhbd.jpg'">
          </div>
          <div class="news-card-3-pic-picture">
            <img v-bind:src="pic3Src" onerror="this.src='https://one.oss.monkeyhbd.cn/monkeyhbd.jpg'">
          </div>
        </div>
        <div class="news-card-3-pic-time">{{time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsCard3Pic',

  props: ['title', 'time', 'pic1Src', 'pic2Src', 'pic3Src']
}
</script>

<style>
.news-card-3-pic-wrapper {
  background-color: white;
}

.news-card-3-pic {
  border-radius: 5px;
  padding: 0 16px;
}

.news-card-3-pic-inner {
  padding: 12px 0;
  border-bottom: 0.6px solid #e8e8e8;
}

.news-card-3-pic-title {
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
  margin-bottom: 12px;
  color: #333333;
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
