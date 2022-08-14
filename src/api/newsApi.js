import ApiList from "@/store/ApiList"
import axios from "axios"


var newsAxios = axios.create({
  baseURL: 'http://49.234.18.148:81',
  timeout: 5000
})


function xuexiaoNewsList(sub) {
	var tab1 = ApiList.xuexiao[sub][0]
	var tab2 = ApiList.xuexiao[sub][1]

  var promise = newsAxios.post('/get_text', {
    tab1: tab1,
    tab2: tab2,
    page: 0
  })

  return promise
}


export {
  xuexiaoNewsList
}
