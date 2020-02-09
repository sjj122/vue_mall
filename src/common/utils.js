// 防抖函数(执行操作函数，延迟时间)
export function debounce(func, delay) {
  let timer = null
  return (...args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func(args)
    }, delay)
  }
}

