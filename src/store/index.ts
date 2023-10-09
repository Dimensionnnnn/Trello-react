import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { columnReducer } from 'reducers/column-reducer/column-reducer';
import { commentReducer } from 'reducers/comment-reducer/comment-reducer';
import { cardReducer } from 'reducers/card-reducer/card-reducer';

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