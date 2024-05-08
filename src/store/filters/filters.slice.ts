import { createSlice } from "@reduxjs/toolkit";

type filterType = {
    type: string,
    value: string
}

const initialState = {
    filter: [] as Array<filterType>,
    data: []
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        addFilter: (state, action) => {
            state.filter = [action.payload]
        },
        addData: (state, action) => {
            state.data = action.payload
        }
    }
})

export const {actions, reducer} = filterSlice