import { createSlice } from "@reduxjs/toolkit";
import { dataCoordsType, dataEventsType, polygonsType, serverType } from "./data.types";

const initialState = {
    playerCoordsData: [] as Array<dataCoordsType>,
    playerEventsData: [] as Array<dataEventsType>,
    polygonsData: [] as Array<polygonsType>,
    serverData: [] as Array<serverType>,
    finalData: [] as Array<dataEventsType | dataCoordsType>
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
        /*------------------------------------------------------------------*/
        addEventsData: (state, action) => {
            state.playerEventsData.push(action.payload)
        },
        deleteEventsData: (state, action) => {
            state.playerEventsData = state.playerEventsData.filter((elem) => elem.id !== action.payload)
        },
        /*------------------------------------------------------------------*/
        addPolygonsData: (state, action) => {
            state.polygonsData.push(action.payload)
        },
        deletePolygonsData: (state, action) => {
            state.polygonsData = state.polygonsData.filter((elem) => elem.id !== action.payload)
        },
        /*------------------------------------------------------------------*/
        addServerData: (state, action) => {
            state.serverData.push(action.payload)
        },
        deleteServerData: (state, action) => {
            state.serverData = state.serverData.filter((elem) => elem.id !== action.payload)
        },
        /*------------------------------------------------------------------*/
        setFinalData: (state, action) => {
            state.finalData = action.payload
        },
        clearAllData: (state) => {
            state.playerCoordsData = []
            state.playerEventsData = []
            state.polygonsData = []
        },
    }
})

export const {actions, reducer} = dataSlice