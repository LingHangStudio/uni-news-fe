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
.news-card-0-pic {
  padding: 0 12px;
}

.news-card-0-pic-inner {
  padding: 8px 0;
}

.news-card-0-pic-title {
  font-size: 15px;
  line-height: 20px;
  font-weight: 800;
  margin-bottom: 16px;
  color: #333333;
}

.news-card-0-pic-time {
  font-size: 11px;
  color: #a0a0a0;
}
</style>
