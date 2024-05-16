import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { reducer as filterReducer } from './filters/filters.slice'
import { reducer as dataReducer } from './data/data.slice'

const reducers = combineReducers({filters: filterReducer, data: dataReducer})

export const store = configureStore({
    reducer: reducers,
})

export type RootState = ReturnType<typeof store.getState>