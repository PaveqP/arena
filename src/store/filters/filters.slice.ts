import { createSlice } from "@reduxjs/toolkit";

type FilterType = {
    type: string,
    value: string[]
}

type ChartFiltersType = {
    [chartId: number]: FilterType[]
}

type CurrentFilterType = {
    [chartId: number]: string
}

const initialState = {
    filters: {} as ChartFiltersType,
    currentFilter: {} as CurrentFilterType,
    requestStatus: false
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        addFilter: (state, action) => {
            const { chartId, filter } = action.payload;
            if (!state.filters[chartId]) {
                state.filters[chartId] = [filter];
            } else {
                // Find if the filter type already exists for this chartId
                const filterIndex = state.filters[chartId].findIndex(f => f.type === filter.type);
                if (filterIndex > -1) {
                    // Update the existing filter values
                    state.filters[chartId][filterIndex].value = filter.value;
                } else {
                    // Add new filter type for this chartId
                    state.filters[chartId].push(filter);
                }
            }
        },
        clearFilter: (state, action) => {
            console.log(action.payload)
            state.filters[action.payload] = [];
        },
        clearAllFilters: (state) => {
            state.filters = {};
        },
        setCurrentFilter: (state, action) => {
            state.currentFilter = action.payload;
        },
        setRequestStatus: (state, action) => {
            state.requestStatus = action.payload;
        }
    }
})

export const { actions, reducer } = filterSlice;

