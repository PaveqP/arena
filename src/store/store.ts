import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { reducer as filterReducer } from './filters/filters.slice'

const reducers = combineReducers({filters: filterReducer})

export const store = configureStore({
    reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>