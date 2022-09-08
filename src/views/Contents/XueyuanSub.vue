<template>
  <div>
    <CardGallery type-name="2" v-bind:part-name="partName()" v-bind:sub-name="subName()"></CardGallery>
  </div>
</template>

<script>
import CardGallery from '@/components/NewsCard/CardGallery.vue'

export default {
  name: 'XueyuanSub',

  components: {
    CardGallery: CardGallery
  },

  methods: {
    partName: function() {
      console.log(this.$route.params.part)
      return this.$route.params.part
    },

    subName: function() {
      console.log(this.$route.params.sub)
      return this.$route.params.sub
    }
  }
}
</script>

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