import ApiList from '@/stores/ApiList'
import axios from 'axios'

const newsAxios = axios.create({
  baseURL: 'https://wust-news.api.monkeyhbd.cn/v1/api/',
  timeout: 5000,
})

async function newsList(partName, subName, num, page) {
  const part = ApiList[partName][subName][0]
  const sub = ApiList[partName][subName][1]

  const promise = newsAxios.post('/post/news-list', {
    part: part,
    sub: sub,
    num: num,
    page: page,
  })
  return promise
}

async function newsContent(id) {
  const promise = newsAxios.post('/post/news-content', {
    id: id,
  })
  return promise
}

async function houseNews(house, sub, num, page) {
  const promise = newsAxios.post('/post/house-news', {
    house: house,
    sub: sub,
    num: num,
    page: page,
  })
  return promise
}

async function houseSub(house) {
  const promise = newsAxios.post('/post/house-sub', {
    house: house,
  })
  return promise
}

export default {
  newsList,
  newsContent,
  houseNews,
  houseSub,
}
