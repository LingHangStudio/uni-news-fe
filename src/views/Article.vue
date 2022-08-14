<template>
  <div>文章 {{articleObj.title}}</div>
</template>

<script>
import ArticleStore from '@/store/ArticleStore'

export default {
  name: 'Article',

  data: function() {
    return {
      articleObj: {}
    }
  },

  mounted: function() {
    console.log(ArticleStore[this.$route.params.id].title)
    console.log(this.$route.params.id)
    this.articleObj = ArticleStore[this.$route.params.id]
  }
}
</script>