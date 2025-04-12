<script setup>
import CardGallery from '@/components/NewsCard/CardGallery.vue'
import { useRoute } from 'vue-router';

const route = useRoute()

const subName = () => {
  return route.params.sub
}
</script>

<template>
  <div>
    <CardGallery :sub-name="subName()"></CardGallery>
  </div>
</template>

<style>
.news-card-wrapper {
  background-color: white;
}

.news-card {
  border-radius: 5px;
  padding: 0 16px;
}

.news-card-inner {
  padding: 8px 0;
  border-bottom: 1px solid #e8e8e8;
}

.news-title {
  font-size: 16px;
  font-weight: 800;
  margin-bottom: 16px;
}

.news-time {
  font-size: 12px;
}
</style>
