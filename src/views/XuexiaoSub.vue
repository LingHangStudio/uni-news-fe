<template>
  <div v-bind:key="subLiteral">
    学校子页面 - {{subLiteral}}
  </div>
</template>

<script>
export default {
  name: 'XuexiaoSub',

  data: function() {
    return {
      box: {
        'yaowen': '要闻',
        'meiti': '媒体',
        'xueshu': '学术',
        'zonghe': '综合',
        'yuanxi': '院系'
      },
      subLiteral: '要闻'
    }
  },

  methods: {

  },

  mounted: function() {
    this.subLiteral = this.box[this.$route.params.sub]
  }
}
</script>