import { createSlice } from "@reduxjs/toolkit";
import { dataCoordsType, dataEventsType } from "./data.types";

const initialState = {
    playerCoordsData: [] as Array<dataCoordsType>,
    playerEventsData: [] as Array<dataEventsType>
}

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addCoordinatesData: (state, action) => {
            state.playerCoordsData.push(action.payload)
        },
        deleteCoordinatesData: (state, action) => {
            state.playerCoordsData = state.playerCoordsData.filter((elem) => elem.id !== action.payload)
        },
        addEventsData: (state, action) => {
            state.playerEventsData.push(action.payload)
        },
        deleteEventsData: (state, action) => {
            state.playerEventsData = state.playerEventsData.filter((elem) => elem.id !== action.payload)
        },
        clearAllData: (state) => {
            state.playerCoordsData = []
            state.playerEventsData = []
        },
    }
})

export const {actions, reducer} = dataSlice