import { getPlayerCoordinates, getPlayerEvents, getPolygons, getServer } from '../../api/player/PlayersData';


type EventsType = {
  [key: number]: boolean
}
export const SelectFilter = (type: string, value: string, currentFilter: any, dispatch: any, filters: any, id: number, requestPlayerEvents: EventsType, serverEventData: any, serverCoordinatesData: any, polygonsData: any, serverData: any) => {
    if (currentFilter[id] !== type) {
      dispatch.clearFilter({ chartId: id });
      dispatch.clearAllData({ chartId: id });
      dispatch.setCurrentFilter({...currentFilter, [id]: type});
    }

    const existingFilter = filters.find((filter: any) => filter.type === type);
    let newFilters = [];

    if (existingFilter) {
      if (existingFilter.value.includes(value)) {
        newFilters = existingFilter.value.filter((val: any) => val !== value);
      } else {
        newFilters = [...existingFilter.value, value];
      }
    } else {
      newFilters = [value];
    }

    dispatch.addFilter({ chartId: id, filter: { type, value: newFilters } });

    switch (type) {
      case 'player':
        if (requestPlayerEvents[id]) {
          if (serverEventData.some((elem: any) => elem.id === value)) {
            dispatch.deleteEventsData({ chartId: id, id: value });
          } else {
            getPlayerEvents(id, value);
          }
        } else {
          if (serverCoordinatesData.some((elem: any) => elem.id === value)) {
            dispatch.deleteCoordinatesData({ chartId: id, id: value });
          } else {
            getPlayerCoordinates(id, value);
          }
        }
        break;
      case 'polygon':
        if (polygonsData.some((elem: any) => elem.id === value)) {
          dispatch.deletePolygonsData({ chartId: id, id: value });
        } else {
          getPolygons(id, value);
        }
        break;
      case 'server':
        if (serverData.some((elem: any) => elem.id === value)) {
          dispatch.deleteServerData({ chartId: id, id: value });
        } else {
          getServer(id);
        }
        break;
    }
  };