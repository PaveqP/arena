import { createSlice } from "@reduxjs/toolkit";
import { dataCoordsType, dataEventsType, polygonsType, serverType } from "./data.types";

type ChartDataState = {
    [chartId: string]: {
        playerCoordsData: dataCoordsType[],
        playerEventsData: dataEventsType[],
        polygonsData: polygonsType[],
        serverData: serverType[],
        finalData: (dataEventsType | dataCoordsType)[]
    }
};

const initialState: ChartDataState = {};

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        addCoordinatesData: (state, action) => {
            const { chartId, data } = action.payload;
            if (!state[chartId]) {
                state[chartId] = {
                    playerCoordsData: [],
                    playerEventsData: [],
                    polygonsData: [],
                    serverData: [],
                    finalData: []
                };
            }
            state[chartId].playerCoordsData.push(data);
        },
        deleteCoordinatesData: (state, action) => {
            const { chartId, id } = action.payload;
            if (state[chartId]) {
                state[chartId].playerCoordsData = state[chartId].playerCoordsData.filter((elem) => elem.id !== id);
            }
        },
        /*------------------------------------------------------------------*/
        addEventsData: (state, action) => {
            const { chartId, data } = action.payload;
            if (!state[chartId]) {
                state[chartId] = {
                    playerCoordsData: [],
                    playerEventsData: [],
                    polygonsData: [],
                    serverData: [],
                    finalData: []
                };
            }
            state[chartId].playerEventsData.push(data);
        },
        deleteEventsData: (state, action) => {
            const { chartId, id } = action.payload;
            if (state[chartId]) {
                state[chartId].playerEventsData = state[chartId].playerEventsData.filter((elem) => elem.id !== id);
            }
        },
        /*------------------------------------------------------------------*/
        addPolygonsData: (state, action) => {
            const { chartId, data } = action.payload;
            if (!state[chartId]) {
                state[chartId] = {
                    playerCoordsData: [],
                    playerEventsData: [],
                    polygonsData: [],
                    serverData: [],
                    finalData: []
                };
            }
            state[chartId].polygonsData.push(data);
        },
        deletePolygonsData: (state, action) => {
            const { chartId, id } = action.payload;
            if (state[chartId]) {
                state[chartId].polygonsData = state[chartId].polygonsData.filter((elem) => elem.id !== id);
            }
        },
        /*------------------------------------------------------------------*/
        addServerData: (state, action) => {
            const { chartId, data } = action.payload;
            if (!state[chartId]) {
                state[chartId] = {
                    playerCoordsData: [],
                    playerEventsData: [],
                    polygonsData: [],
                    serverData: [],
                    finalData: []
                };
            }
            state[chartId].serverData = [data];
        },
        deleteServerData: (state, action) => {
            const { chartId, id } = action.payload;
            if (state[chartId]) {
                state[chartId].serverData = state[chartId].serverData.filter((elem) => elem.id !== id);
            }
        },
        /*------------------------------------------------------------------*/
        setFinalData: (state, action) => {
            const { chartId, data } = action.payload;
            if (!state[chartId]) {
                state[chartId] = {
                    playerCoordsData: [],
                    playerEventsData: [],
                    polygonsData: [],
                    serverData: [],
                    finalData: []
                };
            }
            state[chartId].finalData = data;
        },
        clearAllData: (state, action) => {
            const { chartId } = action.payload;
            if (state[chartId]) {
                state[chartId].playerCoordsData = [];
                state[chartId].playerEventsData = [];
                state[chartId].polygonsData = [];
                state[chartId].serverData = [];
                state[chartId].finalData = [];
            }
        },
    }
});

export const { actions, reducer } = dataSlice;
