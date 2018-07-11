import jsonp from './jsonp'
import {commonParams, options} from './config'
export function getRecommend(item) {
 const url = 'http://ip.taobao.com/service/getIpInfo.php?ip='+item //此处的url可以自行修改，本文是qq音乐链接
 const data = Object.assign({}, commonParams, {
    id: item
 })
 return jsonp(url, data, options)
}