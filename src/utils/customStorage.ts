// 不同环境或者不同的项目（网站）部署在同一域名下的不同路径下，location.pathname 不一样，这样可以区分不同项目（网站）的存储
const pathName = location.pathname

export const genKey = (key: string) => {
  return `${pathName}-${key}`
}
const btoaString = (str: string) => window.btoa(str)
class CustomStorage {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getItem(key: string): string | null {
    const uniqueKey = genKey(key)
    let item = localStorage.getItem(uniqueKey)
    if (item === null) return null
    try {
      item = window.atob(item)
    } catch (e) {
      // console.warn(e)
    }
    return item
  }

  setItem(key: string, value: any) {
    const uniqueKey = genKey(key)
    try {
      value = btoaString(value)
    } catch (e) {
      console.warn(e)
    }
    localStorage.setItem(uniqueKey, value)
  }

  clear() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      const uniqueKey = genKey(String(key))
      localStorage.removeItem(uniqueKey)
    }
  }

  removeItem(key: string) {
    const uniqueKey = genKey(key)
    localStorage.removeItem(uniqueKey)
  }
}

const storage = new CustomStorage()
export default storage
