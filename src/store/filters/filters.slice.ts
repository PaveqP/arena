import { createSlice, current } from "@reduxjs/toolkit";

type filterType = {
    type: string,
    value: Array<string>
}

const initialState = {
    filter: [] as Array<filterType>,
    currentFilter: '',
    requestStatus: false
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        addFilter: (state, action) => {
            state.filter = [action.payload]
        },
        clearFilter: (state) => {
            state.filter = []
        },
        setCurrentFilter: (state, action) => {
            state.currentFilter = action.payload
        },
        setRequestStatus: (state, action) => {
            state.requestStatus = action.payload
        }
    }
})

export const {actions, reducer} = filterSlice