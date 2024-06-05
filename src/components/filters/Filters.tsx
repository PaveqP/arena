import React, { FC, useEffect, useState } from 'react';
import './Filters.scss';
import axios from 'axios';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ConfigurateData } from './ConfigurateData';
import { SelectFilter } from './SelectFilters';
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

  useEffect(() => {
    getDataDetails();
  }, []);

  useEffect(() => {
    dispatch.clearFilter({ chartId: id });
    dispatch.clearAllData({ chartId: id });
  }, [requestPlayerEvents]);

  useEffect(() => {
    ConfigurateData(id, firstCoord, serverCoordinatesData, serverEventData, polygonsData, serverData, dispatch)
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
                  onClick={() => SelectFilter('player', player, currentFilter, dispatch, filters, id, requestPlayerEvents, serverEventData, serverCoordinatesData, polygonsData, serverData)}
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
                  onClick={() => SelectFilter('polygon', polygon, currentFilter, dispatch, filters, id, requestPlayerEvents, serverEventData, serverCoordinatesData, polygonsData, serverData)}
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
                  onClick={() => SelectFilter('server', server, currentFilter, dispatch, filters, id, requestPlayerEvents, serverEventData, serverCoordinatesData, polygonsData, serverData)}
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
