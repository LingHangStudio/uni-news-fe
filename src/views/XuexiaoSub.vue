<template>
  <div>
    <!-- <div class="news-gallery">
      <div class="news-card-wrapper" v-for="obj in newsList">
        <div class="news-card">
          <div class="news-card-inner">
            <div class="news-title">{{obj.title}}</div>
            <div class="news-time">{{obj.time}}</div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="news-card-0-test">
      <div class="news-card-selector" v-for="obj in newsList">
        <NewsCard3Pic
          v-if="is3PicCard(obj.piclist)"
          v-bind:title="obj.title"
          v-bind:time="obj.time"
          v-bind:pic-1-src="obj.piclist[0].pic"
          v-bind:pic-2-src="obj.piclist[1].pic"
          v-bind:pic-3-src="obj.piclist[2].pic"></NewsCard3Pic>
        <NewsCard1Pic
          v-else-if="is1PicCard(obj.piclist)"
          v-bind:title="obj.title"
          v-bind:time="obj.time"
          v-bind:pic-src="obj.piclist[0].pic"></NewsCard1Pic>
        <NewsCard0Pic
          v-else
          v-bind:title="obj.title"
          v-bind:time="obj.time"></NewsCard0Pic>
      </div>
    </div>
  </div>
</template>

<script>
import { xuexiaoNewsList } from '@/api/newsApi'
import NewsCard0Pic from '@/components/NewsCard/NewsCard0Pic.vue'
import NewsCard1Pic from '@/components/NewsCard/NewsCard1Pic.vue'
import NewsCard3Pic from '@/components/NewsCard/NewsCard3Pic.vue'

export default {
  name: 'XuexiaoSub',

  components: {
    NewsCard0Pic: NewsCard0Pic,
    NewsCard1Pic: NewsCard1Pic,
    NewsCard3Pic: NewsCard3Pic,
    NewsCard1Pic
},

  data: function() {
    return {
      box: {
        'yaowen': '要闻',
        'meiti': '媒体',
        'xueshu': '学术',
        'zonghe': '综合',
        'yuanxi': '院系'
      },
      subLiteral: '要闻',
      newsList: [
        {
          "id": 1008,
          "tab1": "1",
          "tab2": "2",
          "text": "<div class=\"wp_articlecontent\"><p>&nbsp; &nbsp; 8月1日，为进一步挖掘高桥镇传统村落保护价值，丰富乡村文化，助推乡村振兴发展，咸安区高桥镇特邀武汉科技大学城市建设学院城乡规划专业责任教授团队一行对白岩泉村山里饶传统村落进行调查建档，助力申报第六批中国传统村落和认定国家、省、市三级传统村落保护名录。</p><p>&nbsp; &nbsp; 走进山里绕，村湾古树掩映、古屋成群。古民居环山抱塘而建，房屋依山就势，错落有致。古民居建筑群房屋相连，廊道相通，石门石柱，青瓦盖顶，门庭严谨，古朴典雅。专家团一行纷纷赞叹山里饶古民居规模之庞大，保存之完好，大家兴趣浓厚，拿着相机深入村湾进行拍照记录。</p><p>&nbsp; &nbsp; 据了解，山里饶村湾皆为饶姓，村民祖籍江西，约为明武宗正德年间迁入此地，至今已有500多年，25代有余。村湾占地约13000㎡，有保存完好的古民居40余栋，建筑面积近8000㎡。该湾主要建筑为庭院式，大多一进两重。各院设有采光通风的精石砌天井。外墙青砖，单檐硬山灰瓦顶,马头墙。内为木质结构,木头抬梁制成,大梁上有各种云纹雕刻和彩绘图案,门窗饰以各种花纹图案雕饰。户与户之间还建有封火墙,栋与栋之间铺有大青石板路，临天井的客堂大都宽敞明亮，古色古香。</p><p>&nbsp; &nbsp; 武汉科技大学城市建设学院城乡规划系主任刘伟毅表示，高桥镇山里饶传统村落规模集中，保存完好，是目前咸安区保存规模最大的传统村落，村湾历史悠久，房屋聚族而居，建筑群呈现出明显的向心性，具有重要的历史文化研究价值。</p><p>&nbsp; &nbsp; 近年来，高桥镇积极响应文旅、住建等部门要求，对白岩泉山里绕传统村落加大保护力度，政府投入一定资金对破败古民居开展修缮，多次邀请专家团队开展专题调研，不断挖掘村落历史文化和保护价值，同时积极动员社会资本和当地村民开展自我保护，在政府和社会的共同保护下，山里饶古民居才得以保存完好，时至今日仍能看出它当年的绚美与辉煌。</p><p>&nbsp; &nbsp; 下一步，高桥镇将坚定不移实施乡村振兴发展战略，依托山区乡镇优势，做足绿水青山文章，大力发掘乡村文化，做好传统村落保护，厚植发展底蕴，走好农旅文旅相结合的发展道路。</p><p>&nbsp; &nbsp; 专家团也表示，将围绕乡村振兴重点工作，一如既往践行高校的使命担当，发挥专业优势，为地方提供全方位的技术支持，为实现乡村全面振兴和乡村建设高质量发展赋能增效。</p><p>&nbsp; &nbsp;&nbsp;<a href=\"http://app.xnnews.com.cn/news/bd/202208/t20220805_2752809.shtml\">http://app.xnnews.com.cn/news/bd/202208/t20220805_2752809.shtml</a></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p></div>",
          "title": "咸宁日报：开展传统村落保护，助推乡村振兴发展",
          "time": "发布时间：2022-08-03",
          "href": "https://news.wust.edu.cn//2022/0806/c66a265657/page.htm",
          "piclist": []
        },
        {
          "id": 1026,
          "tab1": "1",
          "tab2": "2",
          "text": "<div class=\"wp_articlecontent\"><p cms-style=\"font-L\">&nbsp; &nbsp; 襄城融媒讯(记者欧阳纯朴 通讯员张政)8月1日，“八一”建军节当天，在襄城区卧龙镇谭庄村希望家园，一批来自武汉科技大学的博士研究生、硕士研究生与村里近20名留守儿童一同开展了爱国主题教育活动，以多种活动形式向建军节献礼。</p><div><img src=\"/_upload/article/images/ac/73/a50bc369486e83558aa224f2fcd7/b2487707-2a5b-4fe3-a941-8df40ace9233.jpg\" w=\"640\" h=\"427\" wh=\"1.50\" style=\"margin:0px auto;padding:0px;border:0px none;vertical-align:top;max-width:640px;display:block;\"></div><p><span style=\"font-size:14px;\">&nbsp; &nbsp;&nbsp;</span></p><p><span style=\"font-size:14px;\">&nbsp; &nbsp; 课上，通过讲述“身边的英雄”，以他们的事迹教育孩子们向英雄学习，学习他们为国家为人民勇于奉献的精神和责任担当。“大家认识这位我们湖北的航天英雄吗？”武汉科技大学博士研究生陈锦涛指着PPT上的内容与孩子们提问互动。“知道，聂海胜！”“是我的偶像！”，孩子们异同同声的回答在希望家园响起。</span></p><p cms-style=\"font-L\">　　在这场别具一格的由“大朋友”和“小朋友”共同开展的爱国主题教育活动中，来自武汉科技大学参与暑期社会实践的研究生们不仅利用投影仪给孩子们讲解航空航天有关知识和红色教育课，还利用科普书籍给孩子们讲历史，教孩子们唱军歌、红歌。</p><p cms-style=\"font-L\">　　据了解，此次武汉科技大学化学化工学院研究生暑期三下乡社会实践活动为期一周，由武汉科技大学的8名博士研究生、硕士研究生为谭庄村留守儿童授课，不仅丰富了孩子们的暑假生活，也让孩子在玩中学、学中玩，开拓眼界，增长见识。</p><p cms-style=\"font-L\">&nbsp; &nbsp;&nbsp;<a href=\"http://k.sina.com.cn/article_2660900803_9e9a1fc3020013lgx.html\">http://k.sina.com.cn/article_2660900803_9e9a1fc3020013lgx.html</a></p><p cms-style=\"font-L\"><br></p><p cms-style=\"font-L\"><br></p><p cms-style=\"font-L\"><br></p><p cms-style=\"font-L\"><br></p><p><br></p></div>",
          "title": "襄阳网：武汉科技大学研究生实践队来襄城区卧龙镇开展暑期三下乡社会实践活动",
          "time": "发布时间：2022-08-02",
          "href": "https://news.wust.edu.cn//2022/0802/c66a265588/page.htm",
          "piclist": []
        },
        {
          "id": 1088,
          "tab1": "1",
          "tab2": "2",
          "text": "<div class=\"wp_articlecontent\"><p>&nbsp; &nbsp; 视频：<a href=\"http://www.stdaily.com/index/kejixinwen/202207/f705359ea9c142f8a79b630a48e22429.shtml\">http://www.stdaily.com/index/kejixinwen/202207/f705359ea9c142f8a79b630a48e22429.shtml</a></p><p>&nbsp; &nbsp; 记者吴纯新&nbsp; 拍摄王永琦</p><p>&nbsp; &nbsp;&nbsp;</p><p>&nbsp; &nbsp; 李锐，在武汉科技大学做科研助理。</p><p>&nbsp; &nbsp; 2021年本科毕业后，他以科研助理的身份加入高温材料与炉衬技术国家地方联合工程研究中心。一年中，他协助团队开展高炉炭砖的产业化工作。完成炭砖试样的制备与性能优化实验，并与现场生产炭砖性能进行比对。</p><p>&nbsp; &nbsp; “我们与企业合作开发的第一代炭砖已经用于实际生产，性能达到世界先进水平，正在逐步取代3200立方米高炉国外同类产品。”李锐说。</p><p>&nbsp; &nbsp; 作为科研助理，他希望能成为这个团队的“一块砖”，为中国耐火材料行业的进步做出贡献。<span style=\"font-size:14px;\">（科技日报记者 吴纯新）</span></p><p><br></p></div>",
          "title": "科技日报：我是科研助理丨李锐：烤“砖”有温度更有高度",
          "time": "发布时间：2022-07-29",
          "href": "https://news.wust.edu.cn//2022/0729/c66a265495/page.htm",
          "piclist": []
        }
      ]
    }
  },

  methods: {
    is3PicCard: function(piclist) {
      if (piclist.length >= 3) {
        return true
      }
      return false
    },

    is1PicCard: function(piclist) {
      if (1 <= piclist.length && piclist.length <= 2) {
        return true
      }
    }
  },

  mounted: function() {
    this.subLiteral = this.box[this.$route.params.sub]
    var that = this

    var promise = xuexiaoNewsList(this.$route.params.sub)
    promise.then(function(res) {
      console.log(res.data)
      that.newsList = res.data
    })
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
