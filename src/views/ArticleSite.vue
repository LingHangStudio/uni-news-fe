<script setup>
import OriginArticleX from '@/components/ArticleXCard/OriginArticleX.vue'
import newsApi from '@/api/newsApi'
import { ref, onMounted, nextTick,watch } from 'vue'
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()
const id = ref('0')
const articleObj = ref({})
const status = ref('created')
const messageColdDown = ref(false)



const loadArticle = async (articleId) => {
  try {

const res = await newsApi.newsContent(articleId)
status.value = 'loaded'
articleObj.value = res.data
articleObj.value.dateStr = strDate(
  articleObj.value.date['year'],
  articleObj.value.date['month'],
  articleObj.value.date['day']
)
const originPiclist = articleObj.value.picList
await nextTick()
// Code that will run only after the
// entire view has been rendered
const piclist = [...originPiclist];
const contentElement = document.getElementById('content')
ficImgSrc(contentElement, piclist)
clearInlineStyle(contentElement)
removeBlankLine(contentElement)
fixAHref(contentElement)
} catch (error) {
console.error('Error:', error)
}
};


watch(() => route.params.id, async (newId) => {
  if (newId) {
    id.value = newId;  // 更新 id
    await loadArticle(id.value)
  }
});


onMounted(async () => {
  id.value=route.params.id
  await loadArticle(id.value)
  console.log(articleObj.value)
});





const ficImgSrc = (contentElement, piclist) => {
  const imgs = contentElement.getElementsByTagName('img')
  const len = imgs.length < piclist.length ? imgs.length : piclist.length
  for (let idx = 0; idx < len; idx += 1) {
    imgs[idx]['src'] = piclist[idx]
  }
}

const fixAHref = (contentElement) => {
  const aTags = Array.from(contentElement.getElementsByTagName('a'));  // 转换为数组
  const baseUrl = articleObj.value.href.match(/https?:\/\/[a-zA-Z.:]+/)[0];

  aTags.forEach((aTag) => {
    const hrefValue = aTag.getAttribute('href');

    if (!hrefValue) return;  // 如果 href 不存在，跳过

    // 判断是否为相对路径
    if (hrefValue.startsWith('/')) {
      aTag.hrefBackup = baseUrl + hrefValue;
    } else {
      aTag.hrefBackup = hrefValue;
    }

    aTag.href = 'javascript: void(0)';  // 禁用默认跳转行为

    // 统一处理点击事件
    aTag.onclick = async () => {
      await copyToClipboard(aTag.hrefBackup);
      showMessageBox();
    };
  });
};


const clearInlineStyle = (contentElement) => {
  const clearInlineStyleCore = (contentElement) => {
    const children = contentElement.children
    if (children != undefined && children.length > 0) {
      for (let idx = 0; idx < children.length; idx += 1) {
        children[idx].removeAttribute('style')
        children[idx].removeAttribute('width')
        children[idx].removeAttribute('height')
        clearInlineStyleCore(children[idx])
      }
    }
    else {
      return null
    }
  }
  clearInlineStyleCore(contentElement)
}

const removeBlankLine = (contentElement) => {
  const removeBlankLineCore = (contentElement) => {
    const children = contentElement.children
    if (children != undefined && children.length > 0) {
      const deleteNodes = []
      for (let idx = 0; idx < children.length; idx += 1) {
        removeBlankLineCore(children[idx])
        if (children[idx].tagName != 'IMG' && children[idx].tagName != 'DIV') {  // Exclude.
          // Also remove <style> tag.
          if (children[idx].tagName == 'STYLE'
            || children[idx].innerHTML == ''
            || children[idx].innerHTML == '&nbsp;'
            || children[idx].innerHTML == '&nbsp;&nbsp;'
            || children[idx].innerHTML == ' &nbsp;'
            || children[idx].innerHTML == '&nbsp; &nbsp;&nbsp;'
            || children[idx].innerHTML == '<br>') {
            deleteNodes.push(children[idx])
          }
        }
      }
      for (let idx2 = 0; idx2 < deleteNodes.length; idx2 += 1) {
        contentElement.removeChild(deleteNodes[idx2])
      }
    }
    else {
      return null
    }
  }
  removeBlankLineCore(contentElement)
}

const showMessageBox = () => {
  const messageBox = document.getElementById('message-box')
  if (!messageColdDown.value) {
    messageColdDown.value = true
    messageBox.classList.add('open')
    messageBox.classList.remove('close')
    setTimeout(() => {
      messageBox.classList.add('close')
      messageBox.classList.remove('open')
      setTimeout(() => {
        messageColdDown.value = false
      }, 500)
    }, 3000)
  }
}

const strDate = (year, month, day) => {
  return `${year}-${month}-${day}`
}

const goBack = () => {
  router.go(-1)
}



const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}


</script>

<template>
  <div class="article-page" v-if="route.name=='article'" :key="route.params.id">
    <div class="article-head-bar">
      <div class="article-head-bar-back-button" @click="goBack">
        <div class="article-head-bar-back-button-inner">
          <svg t="1660669430811" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="1356" width="200" height="200">
            <path
              d="M532.526499 904.817574L139.506311 511.797385 532.526499 118.777197c12.258185-12.258185 12.432147-32.892131-0.187265-45.51052-12.707416-12.707416-32.995485-12.703323-45.511543-0.187265L75.166957 484.739123c-7.120165 7.120165-10.163477 17.065677-8.990768 26.624381-1.500167 9.755178 1.5104 20.010753 8.990768 27.491121l411.660734 411.660734c12.258185 12.258185 32.892131 12.432147 45.511543-0.187265 12.707416-12.707416 12.7023-32.995485 0.187265-45.51052z"
              p-id="1357"></path>
          </svg>
        </div>
      </div>
      <div class="article-head-bar-text">正文</div>
    </div>
    <div class="article-wrapper" v-if="status == 'loaded'">
      <div class="article">
        <div class="article-title">
          <h1>{{ articleObj.title }}</h1>
        </div>
        <div class="article-time">发布时间：{{ articleObj.dateStr }}</div>
        <div id="content" class="article-content content" v-html="articleObj.content"></div>
        <OriginArticleX class="origin-article-x" :origin-href="articleObj.href" @show-message-box="showMessageBox">
        </OriginArticleX>
      </div>
    </div>
    <div id="message-box" class="message-box close">
      <div class="message-box-text">复制成功，请在浏览器中打开</div>
    </div>
  </div>
</template>

<style lang="scss" >
@import '@/assets/css/markdown.css';

.article-page {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.article-page {
  background-color: #ffffff;
}

.article-head-bar {
  --article-head-bar-height: 40px;
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  width: 100%;
  height: var(--article-head-bar-height);
  color: #333333;
}

.article-head-bar-back-button {
  position: absolute;
  left: 0;
  top: 0;
  padding-left: 8px;
}

.article-head-bar-back-button-inner {
  box-sizing: border-box;
  width: var(--article-head-bar-height);
  height: var(--article-head-bar-height);
  padding: 10px;
}

.article-head-bar-back-button svg {
  width: 100%;
  height: 100%;
}

.article-head-bar-text {
  height: var(--article-head-bar-height);
  line-height: var(--article-head-bar-height);
  font-size: 16px;
}

.article-wrapper {
  padding: 16px 0 40px 0;
}

.article {
  padding: 0 16px;
  color: #333333;
}

.article-title h1 {
  margin: 0;
  padding: 0;
  font-size: 22px;
  line-height: 32px;
  margin-bottom: 12px;
}

.article-time {
  font-size: 13px;
  color: #999999;
  margin-bottom: 24px;
}

/* Extend Card */
:root {
  --x-bar-line-height: 30px;
}

.origin-article-x {
  margin-top: 32px;
}

.message-box {
  position: fixed;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 200;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  width: fit-content;
  padding: 8px 16px;
  border-radius: 1000px;
  box-shadow: 0 0px 24px 0px rgba(10, 10, 10, 0.25);
  transition: top 0.5s, opacity 0.5s;
}

.message-box.open {
  top: 80px;
  opacity: 1;
}

.message-box.close {
  top: -60px;
  opacity: 0;
}

.message-box-text {
  max-width: 200px;
  font-size: 13px;
  line-height: 24px;
  vertical-align: middle;
  color: #333333;
}
</style>
