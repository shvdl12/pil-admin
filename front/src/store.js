import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import auth from './reducer/auth'

// config
// localStorage의 key, value
const persistConfig = {
    key: 'root',  // localStorage에 저장될 때의 key값.
    storage,
    whitelist: ['auth']  // store에 있는 user reducer만 localStorage에 저장하겠다는 의미.
}
// persist가 store에 있는 user reducer만을 localStorage에 저장.
// localStorage에 있던 값을 store 안의 user reducer의 initialState 값으로 넣어준다.
 
const rootReducer = combineReducers({
    auth
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)
 
export {store, persistor}
// rootReducer와 persist를 묶어서 사용.
// persist와 관련된 reducer를 만들어준 것.