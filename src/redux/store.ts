import { configureStore, combineReducers  } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { logout } from './ducks/username/username-slice';

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

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: (state, action) => {
        if (action.type === logout.type) {
            storage.removeItem('persist:root')
            return state = {} as RootState
        }

        return persistedReducer(state, action);
    }
})

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;