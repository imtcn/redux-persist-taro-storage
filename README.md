# tarojs-redux 简单使用 redux-persist 持久化

思路:把redux-persist storage 替换成 Taro数据缓存API

* [Taro](https://github.com/NervJS/taro)
* [redux-persist](https://github.com/rt2zz/redux-persist)


```
// store/index.ts

import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage' // 默认替换
import storage from './redux-persist-taro-storage/src'

import rootReducer from './reducers'

const persistConfig = {
  key: 'app',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}
```

```
//app.tsx
import configStore from './store'
import { Provider } from '@tarojs/redux'
import {PersistGate} from 'redux-persist/lib/integration/react';
const {store,persistor} = configStore()
class App extends Component {
...
render () {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Index />
        </PersistGate>        
      </Provider>
    )
  }
}
```
