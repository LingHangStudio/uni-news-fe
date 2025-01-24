import axios from 'axios'
import { Toast } from 'vant'

// create an axios instance
const service = axios.create({
  // 请求根路径
  baseURL: 'www.xxxx.com/api',
  timeout: 5000,
})

//  请求拦截
service.interceptors.request.use(
  (config) => {
    //以下请求拦截不适用本资讯项目，但是我没删，方便留给你参考，需要什么请求拦截后面可以自己配置
    // if (config.url === "/login/mobile" || config.url === "/login/mp") {
    //   config.headers["token"] = store.state.platformToken;
    // } else if (
    //   config.url === "https://wusthelper.wustlinghang.cn/mobileapi/v2/jwc/login"
    // ) {
    // } else {
    //   config.headers["token"] = store.state.volunteerToken;
    // }
    // if (config.hideloading) {
    //   Toast.loading({
    //     message: "加载中...",
    //     forbidClick: true,
    //     loadingType: "spinner",
    //   });
    // }
    // console.log(config);
    return config
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error)
  },
)

// respone 响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data
    //请求失败的提示配置
    if (res.status && res.status !== 200) {
      Toast(res.msg)
      switch (res.status) {
        case 11101:
          // ...
          break
        case 11102:
          // ...
          break
        case 11103:
          // ...
          break
        default:
          return Promise.reject(res || 'error')
      }
    } else {
      return Promise.resolve(res)
    }
  },
  //请求错误的配置
  (error) => {
    console.log('err' + error) // for debug
    switch (error.response.status) {
      case 401:
        // ...
        break
      case 500:
        // ...
        break
      default:
        return Promise.reject(error)
    }
  },
)

export default service
