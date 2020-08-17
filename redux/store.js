import { persistReducer } from 'redux-persist'
import { createStore, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import reducer from './reducer'
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const pReducer = persistReducer(persistConfig, reducer);

const store = createStore(pReducer, applyMiddleware(thunk))

export default store;
