import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import usernameReducer from './ducks/username/username-slice';
import cardReducer from './ducks/cards/cards-slice';
import columnReducer from './ducks/columns/columns-slice';
import commentReducer from './ducks/comments/comments-slice';

const rootReducer = combineReducers({
    username: usernameReducer,
    columns: columnReducer,
    comments: commentReducer,
    cards: cardReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store);