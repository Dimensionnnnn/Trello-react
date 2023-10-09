import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import cardReducer from 'card/card-slice';
import columnReducer from 'column/column-slice';
import commentReducer from 'comment/comment-slice';

const rootReducer = combineReducers({
    column: columnReducer,
    comment: commentReducer,
    card: cardReducer
})

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);