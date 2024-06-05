type CoordType = {
    [key: number]: string
}
export const ConfigurateData = (id: number, firstCoord: CoordType, serverCoordinatesData: any, serverEventData: any, polygonsData: any, serverData: any, dispatch: any) => {

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
}
