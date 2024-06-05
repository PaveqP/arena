import React, { useState } from 'react';
import { Charts, Header, Config } from './modules';
import { Filters } from './components';
import './App.scss';
import { useTypedSelector } from './hooks/useTypedSelector';
import { stat } from 'fs';

type CoordType = {
  [key: number]: string
}

function App() {

  const requestStatus = useTypedSelector(state => state.filters.requestStatus)

  const [requestPlayerEvents, setRequestPlyaerEvents] = useState(false)
  const [charts, setCharts] = useState(['chart'])

  const [firstCoord, setFirstCoord] = useState<CoordType>({1: 'X'})
  const [secondCoord, setSecondCoord] = useState('Y')

  const handleNewChart = () => {
    setCharts((charts) => [...charts, 'chart'])
    setFirstCoord((prevCoords: CoordType) => {
      return { ...prevCoords, [charts.length + 1]: 'X' };
    });
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
                id={chartId + 1}
              />
              <Charts 
                firstCoord={firstCoord} 
                secondCoord={secondCoord} 
                setFirstCoord={setFirstCoord} 
                setSecondCoord={setSecondCoord} 
                requestPlayerEvents={requestPlayerEvents}
                id={chartId + 1}
              />
            </div>
          ))
        }
      </div>
      { requestStatus &&
        <div className="App-addView" onClick={() => handleNewChart()}>
          + Добавить отображение
        </div>
      }
    </div>
  );
}

export default App;
