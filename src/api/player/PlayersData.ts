import axios from "axios";
import { useActions } from "../../hooks/useActions";
import { store } from "../../store/store";
import { actions as filterActions } from "../../store/filters/filters.slice";
import { actions as dataActions } from "../../store/data/data.slice";

const getPlayerEvents = async (playerId: string) => {

    try {
        const response = await axios.get(`http://127.0.0.1:5000/description/player/${playerId}/events`)
        store.dispatch(dataActions.addEventsData({id: playerId, data: response.data}))
    } catch (error: any) {
        //throw Error(error)
    }
}

const getPlayerCoordinates = async (playerId: string) => {

    try {
        const response = await axios.get(`http://127.0.0.1:5000/description/player/${playerId}/coordinates`)
        store.dispatch(dataActions.addCoordinatesData({id: playerId, data: response.data})) 
    } catch (error: any) {
        //throw Error(error)
    }
}

const getPolygons = async (polygonId: string) => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/description/polygon/${polygonId}`)
        store.dispatch(dataActions.addPolygonsData({id: polygonId, data: response.data})) 
    } catch (error: any) {
        //throw Error(error)
    }
}

const getServer = async () => {
    try {
        const response = await axios.get(`http://127.0.0.1:5000/description/server`)
        store.dispatch(dataActions.addServerData({id: 'server', data: response.data})) 
    } catch (error: any) {
        //throw Error(error)
    }
}

export {getPlayerEvents}
export {getPlayerCoordinates}
export {getPolygons}
export {getServer}