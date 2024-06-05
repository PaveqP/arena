import axios from "axios";
import { store } from "../../store/store";
import { actions as dataActions } from "../../store/data/data.slice";

const getPlayerEvents = async (chartId: number, playerId: string) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/description/player/${playerId}/events`);
        store.dispatch(dataActions.addEventsData({ chartId, data: { id: playerId, data: response.data } }));
    } catch (error: any) {
        console.error(`Error fetching player events for ${playerId}:`, error);
    }
}

const getPlayerCoordinates = async (chartId: number, playerId: string) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/description/player/${playerId}/coordinates`);
        store.dispatch(dataActions.addCoordinatesData({ chartId, data: { id: playerId, data: response.data } }));
    } catch (error: any) {
        console.error(`Error fetching player coordinates for ${playerId}:`, error);
    }
}

const getPolygons = async (chartId: number, polygonId: string) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/description/polygon/${polygonId}`);
        store.dispatch(dataActions.addPolygonsData({ chartId, data: { id: polygonId, data: response.data } }));
    } catch (error: any) {
        console.error(`Error fetching polygons for ${polygonId}:`, error);
    }
}

const getServer = async (chartId: number) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/description/server`);
        store.dispatch(dataActions.addServerData({ chartId, data: { id: 'server', data: response.data } }));
    } catch (error: any) {
        console.error('Error fetching server data:', error);
    }
}

export { getPlayerEvents, getPlayerCoordinates, getPolygons, getServer };
