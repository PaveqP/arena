import React, { useState } from 'react';
import { Charts, Header, Config } from './modules';
import { Filters } from './components';
import './App.scss';
import { useTypedSelector } from './hooks/useTypedSelector';
import { stat } from 'fs';

type CoordType = {
  [key: number]: string
}

type EventsType = {
  [key: number]: boolean
}

function App() {

  const requestStatus = useTypedSelector(state => state.filters.requestStatus)

  const [requestPlayerEvents, setRequestPlyaerEvents] = useState<EventsType>({1: false})
  const [charts, setCharts] = useState<number[]>([1])

  const filters = useTypedSelector(state => state.filters.filters);

  const [firstCoord, setFirstCoord] = useState<CoordType>({1: 'X'})
  const [secondCoord, setSecondCoord] = useState('Y')

  const handleNewChart = (id: number) => {
    setCharts((charts) => [...charts, id])
    setFirstCoord((prevCoords: CoordType) => {
      return { ...prevCoords, [id]: 'X' };
    });
  }

  const deleteChart = (id: number) => {
    const newCharts = charts.filter((chart) => chart !== id)
    setCharts(newCharts)
  }

  return (
    <div className="App">
      <Header/>
      <div className="App__data">
        { requestStatus &&
          charts.map((chart, chartId) => (
            <div className="App__filter" key={chartId}>
              <Filters 
                firstCoord={firstCoord} 
                secondCoord={secondCoord} 
                requestPlayerEvents={requestPlayerEvents} 
                setRequestPlyaerEvents={setRequestPlyaerEvents}
                id={chart}
                prettyId={chartId + 1}
                deleteChart={deleteChart}
              />
              <Charts 
                firstCoord={firstCoord} 
                secondCoord={secondCoord} 
                setFirstCoord={setFirstCoord} 
                setSecondCoord={setSecondCoord} 
                requestPlayerEvents={requestPlayerEvents}
                id={chart}
              />
            </div>
          ))
        }
      </div>
      { requestStatus &&
        <div className="App-addView" onClick={() => handleNewChart(Math.random())}>
          + Добавить отображение
        </div>
      }
    </div>
  );
}

export default App;
