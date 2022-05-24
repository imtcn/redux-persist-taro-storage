# tarojs-redux 简单使用 redux-persist 持久化

思路:把redux-persist storage 替换成 Taro数据缓存API

* [Taro](https://github.com/NervJS/taro)
* [redux-persist](https://github.com/rt2zz/redux-persist)

## Redux
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

## Redux Toolkit
```
// store/index.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import counterReducer from '../features/counter/counterSlice'; // 举例使用
import storage from './redux-persist-taro-storage/src';

const reducers = combineReducers({
  counter: counterReducer, // 这里放各种Reducer
});

const persistConfig = {
  key: 'root',
  storage,
  // 可以在这里配置黑名单或白名单，见后文参考
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
```

```
//app.tsx
import { Provider } from 'react-redux'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './store'
const persistor = persistStore(store)

export default function App(props) {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  )
}
```

参考：[How to use Redux-Persist with Redux-Toolkit](https://edvins.io/how-to-use-redux-persist-with-redux-toolkit)
