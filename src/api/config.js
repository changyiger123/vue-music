import axios from 'axios'

axios.defaults.timeout = 4000
if(process.env.NODE_ENV === 'production'){
  //生产环境部署
  axios.defaults.baseURL = 'http://123.456.7.89'
}else if(process.env.NODE_ENV === 'development'){
  //开发环境部署 http://106.14.44.87:8886
  axios.defaults.baseURL = 'http://123.456.7.89:8081'
}else if(process.env.NODE_ENV === 'test'){
  //测试环境部署
  axios.defaults.baseURL = 'http://123.456.7.89:8082'
}
//其他axios配置
//....
