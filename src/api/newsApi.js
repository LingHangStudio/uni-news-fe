
import axios from 'axios'

const newsAxios = axios.create({
  baseURL: 'http://127.0.0.1:3000/api/',
  timeout: 5000,
})

async function newsList(sub, pageSize, page) {
  const promise = newsAxios.post('/news-list', {
    sub: sub,
    pageSize: pageSize,
    page: page,
  })
  return promise
}

async function newsContent(id) {
  const promise = newsAxios.post('/news-content', {
    id: id,
  })
  return promise
}


async function houseSub(house) {
  const promise = newsAxios.post('/house-sub', {
    house: house,
  })
  return promise
}

async function newsCategories(){
  const promise= newsAxios.post('/news-categories')
  return promise
}

export default {
  newsList,
  newsContent,
  houseSub,
  newsCategories
}
