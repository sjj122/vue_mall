// 防抖函数(执行操作函数，延迟时间)
export function debounce(func, delay) {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 时间格式化函数  yyyy-MM-dd hh:mm:ss
export function formatDate(date, fmt) {
  // 1.获取年份 (如果传了y，就要获取年份，否则不获取年份)
  if (/(y+)/.test(fmt)) {
    // console.log(RegExp.$1)   结果为： yyyy
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      // console.log(str, RegExp.$1.length)
      // 判断传进来的格式(hh:mm:ss)是否只有一位，如果不是只有一位，那么就要自动进行补零操作
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : str.padStart(2, '0'))
    }
  }
  return fmt
}

// padLeftZero 函数，给前面补0的算法，很巧妙
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
