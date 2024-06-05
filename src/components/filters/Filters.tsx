import React, { FC, useEffect, useState } from 'react';
import './Filters.scss';
import axios from 'axios';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { getPlayerCoordinates, getPlayerEvents, getPolygons, getServer } from '../../api/player/PlayersData';

type CoordType = {
    [key: number]: string
  }

interface IFilter {
  firstCoord: CoordType;
  secondCoord: string;
  requestPlayerEvents: boolean;
  setRequestPlyaerEvents: (requestPlayerEvents: boolean) => void;
  id: number; 
}

const Filters: FC<IFilter> = ({ firstCoord, secondCoord, requestPlayerEvents, setRequestPlyaerEvents, id }) => {
  const filters = useTypedSelector(state => state.filters.filters[id] || []);
  const currentFilter = useTypedSelector(state => state.filters.currentFilter);

  const serverCoordinatesData = useTypedSelector(state => state.data[id]?.playerCoordsData || []);
  const serverEventData = useTypedSelector(state => state.data[id]?.playerEventsData || []);
  const polygonsData = useTypedSelector(state => state.data[id]?.polygonsData || []);
  const serverData = useTypedSelector(state => state.data[id]?.serverData || []);

  const [players, setPlayers] = useState<string[]>([]);
  const [polygons, setPolygons] = useState<string[]>([]);
  const [server, setServer] = useState<string>('');

  const dispatch = useActions();

  const getDataDetails = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/description');
      setServer(response.data.Server);
      setPlayers(response.data.descriptionPlayers.numPlayer);
      setPolygons(response.data.descriptionPolygons.numPolygon);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const handleSelectFilter = (type: string, value: string) => {
    if (currentFilter !== type) {
      dispatch.clearFilter({ chartId: id });
      dispatch.clearAllData({ chartId: id });
      dispatch.setCurrentFilter(type);
    }

    const existingFilter = filters.find(filter => filter.type === type);
    let newFilters = [];

    if (existingFilter) {
      if (existingFilter.value.includes(value)) {
        newFilters = existingFilter.value.filter(val => val !== value);
      } else {
        newFilters = [...existingFilter.value, value];
      }
    } else {
      newFilters = [value];
    }

    dispatch.addFilter({ chartId: id, filter: { type, value: newFilters } });

    switch (type) {
      case 'player':
        if (requestPlayerEvents) {
          if (serverEventData.some((elem) => elem.id === value)) {
            dispatch.deleteEventsData({ chartId: id, id: value });
          } else {
            getPlayerEvents(id, value);
          }
        } else {
          if (serverCoordinatesData.some((elem) => elem.id === value)) {
            dispatch.deleteCoordinatesData({ chartId: id, id: value });
          } else {
            getPlayerCoordinates(id, value);
          }
        }
        break;
      case 'polygon':
        if (polygonsData.some((elem) => elem.id === value)) {
          dispatch.deletePolygonsData({ chartId: id, id: value });
        } else {
          getPolygons(id, value);
        }
        break;
      case 'server':
        if (serverData.some((elem) => elem.id === value)) {
          dispatch.deleteServerData({ chartId: id, id: value });
        } else {
          getServer(id);
        }
        break;
    }
  };

  useEffect(() => {
    getDataDetails();
  }, []);

  useEffect(() => {
    dispatch.clearFilter({ chartId: id });
    dispatch.clearAllData({ chartId: id });
  }, [requestPlayerEvents]);

  useEffect(() => {
    if (serverCoordinatesData.length > 0) {
      let chartCoordinatesData: any = [];

      if (firstCoord[id] === 'X') {
        chartCoordinatesData = serverCoordinatesData.map((dataElement: any) => (
          { id: dataElement.id, data: dataElement.data.coordinates.map((el: any, elIndex: number) => [el[0], dataElement.data.timeGameCoordinates[elIndex]]) }
        ));
      } else if (firstCoord[id] === 'Y') {
        chartCoordinatesData = serverCoordinatesData.map((dataElement: any) => (
          { id: dataElement.id, data: dataElement.data.coordinates.map((el: any, elIndex: number) => [el[1], dataElement.data.timeGameCoordinates[elIndex]]) }
        ));
      } else if (firstCoord[id] === 'Z') {
        chartCoordinatesData = serverCoordinatesData.map((dataElement: any) => (
          { id: dataElement.id, data: dataElement.data.coordinates.map((el: any, elIndex: number) => [el[2], dataElement.data.timeGameCoordinates[elIndex]]) }
        ));
      }

      dispatch.setFinalData({ chartId: id, data: chartCoordinatesData });
    } else if (serverEventData.length > 0) {
      const chartEventData = serverEventData.map((dataElement: any) => (
        { id: dataElement.id, data: dataElement.data.event.map((el: any, elId: number) => [el, dataElement.data.timeGameEvents[elId]]) }
      ));
      dispatch.setFinalData({ chartId: id, data: chartEventData });
    } else if (polygonsData.length > 0) {
      const chartPolygonsData = polygonsData.map((dataElement: any) => (
        { id: dataElement.id, data: dataElement.data.event.map((el: any, elId: number) => [el, dataElement.data.timeGame[elId]]) }
      ));
      dispatch.setFinalData({ chartId: id, data: chartPolygonsData });
    } else if (serverData.length > 0) {
      const chartServerData = serverData.map((dataElement: any) => (
        { id: dataElement.id, data: dataElement.data.event.map((el: any, elId: number) => [el, dataElement.data.timeGame[elId]]) }
      ));
      dispatch.setFinalData({ chartId: id, data: chartServerData });
    }
  }, [serverCoordinatesData, serverEventData, polygonsData, serverData, firstCoord, secondCoord, id]);

  return (
    <div className='filters'>
      <div className="filters-number">
        {id}
      </div>
      <div className="filters__row">
        <div className="filters__players">
          <div className="filters-filter">
            Игроки
            events
            <input type="checkbox" checked={requestPlayerEvents} onChange={() => setRequestPlyaerEvents(!requestPlayerEvents)} />
          </div>
          <div className="filters-content">
            {players.length > 0 ?
              players.map((player: string, playerId: number) => (
                <button
                  className={(filters.some((f: any) => f.type === 'player' && f.value.includes(player)) ? 'content-activeSelectButton' : 'content-selectButton')}
                  onClick={() => handleSelectFilter('player', player)}
                  key={playerId}
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
              polygons.map((polygon: string, polygonId: number) => (
                <button
                  className={(filters.some((f: any) => f.type === 'polygon' && f.value.includes(polygon)) ? 'content-activeSelectButton' : 'content-selectButton')}
                  onClick={() => handleSelectFilter('polygon', polygon)}
                  key={polygonId}
                >
                  {polygon}
                </button>
              ))
              :
              <p>Полигоны не найдены</p>
            }
          </div>
        </div>
        <div className="filters__teams">
          <div className="filters-filter">
            Сервер
          </div>
          {
            <div className="filters-content">
              {server &&
                <button
                  className={filters.some((f: any) => f.type === 'server' && f.value.includes(server)) ? 'content-activeSelectButton' : 'content-selectButton'}
                  onClick={() => handleSelectFilter('server', server)}
                >
                  Отобразить данные сервера
                </button>
              }
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export { Filters };
