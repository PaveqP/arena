import React, { FC, useEffect, useState } from 'react'
import './Filters.scss'
import { Charts } from '../../modules'
import axios from 'axios'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { getPlayerCoordinates } from '../../api/player/PlayersData'

// interface IFilter{
//     setSelectedFilter: (selectedFilter: any) => void,
//     selectedFilter: any
// }
const Filters: FC = () => {

    const filters = useTypedSelector(state => state.filters.filter)
    const serverData = useTypedSelector(state => state.filters.data)

    const [teams, setTeams] = useState([])
    const [players, setPlayers] = useState([])
    const [polygons, setPolygons] = useState([])
    const [server, setServer] = useState('')

    const dispatch = useActions()

    const getDataDetails = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/description')
            console.log(response)
            //setTeams(response.data.descriptionPlayers.numInTeam)
            setServer(response.data.Server)
            setPlayers(response.data.descriptionPlayers.numPlayer)
            setPolygons(response.data.descriptionPolygons.numPolygon)
        } catch (error: any) {
            throw new Error(error)
        }
    }

    const handleSelectFilter = (type: string, value: string) => {
        let prevType = filters.length > 0 && filters[0].type 
        let prevFilters: Array<string> = filters.length > 0 ? [...filters[0].value] : []
        let newFilters = []

        // filters.length > 0 && filters[0].value.map((val) => {
        if(serverData.some((elem) => elem.id === value))
        {
            dispatch.deleteData(value)
        } 
        else 
        {
            getPlayerCoordinates(value)
        }

        if (prevType !== type){
            prevFilters = []
        }

        if (prevFilters.includes(value)){
            newFilters = prevFilters.filter((val) => val !== value)
        } else{
            newFilters = [...prevFilters, value]
        }

        dispatch.addFilter({type, "value": newFilters})
    }

    // console.log(filters[0].value)
    console.log(serverData)

    useEffect(() => {
        getDataDetails()
    }, [])

    console.log(filters)

  return (
    <div className='filters'>
      <div className="filters__row">
        <div className="filters__teams">
            <div className="filters-filter">
                Сервер
            </div>
            {
            <div className="filters-content">
                {server &&
                    <button 
                        className={filters[0] && filters[0].type === 'server' ? 'content-activeSelectButton' : 'content-selectButton'} 
                        onClick={() => handleSelectFilter('server', server)}
                    >
                        {server}
                    </button>
                }
            </div>
            }
        </div>
        <div className="filters__players">
            <div className="filters-filter">
                Игроки
            </div>
            <div className="filters-content">
                {players.length > 0 ?
                players.map((player: string) => (
                    <button 
                        className={(filters[0] && filters[0].type === 'player' && filters[0].value.includes(player)) ? 'content-activeSelectButton' : 'content-selectButton'} 
                        onClick={() => handleSelectFilter('player', player)}
                    >
                        {player}
                    </button>
                )) 
                :
                <p>Игроки не найдены</p>
                }
            </div>
        </div>
        <div className="filters__polygons">
            <div className="filters-filter">
                Полигоны
            </div>
            <div className="filters-content">
                {polygons.length > 0 ?
                polygons.map((polygon: string) => (
                    <button 
                        className={(filters[0] && filters[0].type === 'polygon' && filters[0].value.includes(polygon)) ? 'content-activeSelectButton' : 'content-selectButton'} 
                        onClick={() => handleSelectFilter('polygon', polygon)}
                    >
                        {polygon}
                    </button>
                )) 
                :
                <p>Полигоны не найдены</p>
                }
            </div>
        </div>
      </div>
      {/* {
        (selectedFilter && selectedFilter.value !== '') && <Charts requestData={selectedFilter}/>
      } */}
    </div>
  )
}

export {Filters}