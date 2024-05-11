import { createSlice } from "@reduxjs/toolkit";

type filterType = {
    type: string,
    value: Array<string>
}

type dataType = {
    id: string,
    data: []
}

const initialState = {
    filter: [] as Array<filterType>,
    data: [] as Array<dataType>
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        addFilter: (state, action) => {
            state.filter = [action.payload]
        },
        addData: (state, action) => {
            state.data.push(action.payload)
        },
        deleteData: (state, action) => {
            state.data = state.data.filter((elem) => elem.id !== action.payload)
        }
    }
})

export const {actions, reducer} = filterSlice