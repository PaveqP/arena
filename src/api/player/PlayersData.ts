import axios from "axios";
import { useActions } from "../../hooks/useActions";
import { store } from "../../store/store";
import { actions } from "../../store/filters/filters.slice";

const getPlayerEvents = (playerId: string) => {

    try {
        const response = axios.get(`http://127.0.0.1:5000/description/player/${playerId}/events`)
        return response
    } catch (error: any) {
        //throw Error(error)
    }
}

const getPlayerCoordinates = async (playerId: string) => {

    try {
        const response = await axios.get(`http://127.0.0.1:5000/description/player/${playerId}/coordinates`)
        store.dispatch(actions.addData({id: playerId, data: response.data.coordinates})) 
    } catch (error: any) {
        //throw Error(error)
    }
}

export {getPlayerEvents}
export {getPlayerCoordinates}