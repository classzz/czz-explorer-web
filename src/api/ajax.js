
import axios from 'axios'
import qs from 'qs'


axios.defaults.timeout = 20000
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

const UserBaseUrl = window.location.protocol + '//' + window.location.host

const service = axios.create({
  withCredentials: true,
  baseURL: UserBaseUrl,
  headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json;charset=UTF-8' }
})
service.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

service.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error)
)

export const getUserAgent = function () {
  let agent = {};//ios,android,weixin,wap,client
  let u = navigator.userAgent;
  let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // 安卓终端
  let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

  if (u.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
    agent.client = true;
    agent.weixin = true;
  }
  if (isAndroid) {
    agent.android = true;
    agent.client = true;

  } else if (isIOS) {
    agent.ios = true;
    agent.client = true;
  }

  if (!agent.ios && !agent.android && !agent.weixin) {
    agent.wap = true;
  }

  return agent;
}

export default {
  post(url, data) {
    return service({
      method: 'post',
      url,
      data: qs.stringify(data)
    })
  },

  get(url, params) {
    return service({
      method: 'get',
      url,
      params
    })
  },
}