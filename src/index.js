import Taro from '@tarojs/taro'
export default {
    getItem(key) {
      return Taro.getStorage({ key }).then(res => {
        return res.data
      })
    },
  
    setItem(key, data) {
      return Taro.setStorage({ key, data })
    },
  
    removeItem(key) {
      return Taro.removeStorage({ key })
    },
  
    clear() {
      return Taro.clearStorage()
    }
}
