import {configureStore} from '@reduxjs/toolkit'

import counterReducer from './features/counter/counterSlice'
import layoutSlice from './features/layout/layoutSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        layout: layoutSlice
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch