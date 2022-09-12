import ApiList from "@/store/ApiList"
import axios from "axios"


var newsAxios = axios.create({
  baseURL: 'https://api.424neko.top/api',
  timeout: 5000
})


async function newsList(partName, subName, num, page) {
  var part = ApiList[partName][subName][0]
	var sub = ApiList[partName][subName][1]

  var promise = newsAxios.post('/post/news-list', {
    part: part,
    sub: sub,
    num: num,
    page: page
  })
  return promise
}


async function newsContent(id) {
  var promise = newsAxios.post('/post/news-content', {
    id: id
  })
  return promise
}


async function houseNews(house, sub, num, page) {
  var promise = newsAxios.post('/post/house-news', {
    house: house,
    sub: sub,
    num: num,
    page: page
  })
  return promise
}


async function houseSub(house) {
  var promise = newsAxios.post('/post/house-sub', {
    house: house
  })
  return promise
}


export default {
  newsList,
  newsContent,
  houseNews,
  houseSub
}
