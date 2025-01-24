// 在这个文件里封装请求
// 以下为示例
import request from '@/api/request'

function getMoleAndSequence() {
  return request({
    loading: true, //是否显示加载效果
    url: '/panda/info/getHeader',
    method: 'GET',
  })
}

export { getMoleAndSequence }
