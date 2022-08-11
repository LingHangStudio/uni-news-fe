<template>
  <div class="news-card-0-pic-wrapper">
  <div class="news-card-0-pic">
    <div class="news-card-0-pic-inner">
      <div class="news-card-0-pic-title">{{title}}</div>
      <div class="news-card-0-pic-time">{{time}}</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'NewsCard0Pic',

  props: ['title', 'time']
}
</script>

<style>
.news-card-0-pic-wrapper {
  background-color: white;
}

.news-card-0-pic {
  border-radius: 5px;
  padding: 0 16px;
}

.news-card-0-pic-inner {
  padding: 8px 0;
  border-bottom: 1px solid #e8e8e8;
}

.news-card-0-pic-title {
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 16px;
}

.news-card-0-pic-time {
  font-size: 12px;
}
</style>
