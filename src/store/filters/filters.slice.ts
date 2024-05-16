import { createSlice } from "@reduxjs/toolkit";

type filterType = {
    type: string,
    value: Array<string>
}

const initialState = {
    filter: [] as Array<filterType>,
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
        }
    }
})

export const {actions, reducer} = filterSlice