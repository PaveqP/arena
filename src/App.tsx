import React, { useState } from 'react';
import { Charts, Header, Config } from './modules';
import { Filters } from './components';
import './App.scss';
import { useTypedSelector } from './hooks/useTypedSelector';
import { stat } from 'fs';

function App() {

  const requestStatus = useTypedSelector(state => state.filters.requestStatus)

  const [requestPlayerEvents, setRequestPlyaerEvents] = useState(false)
  const [charts, setCharts] = useState(['chart'])

  const [firstCoord, setFirstCoord] = useState('X')
  const [secondCoord, setSecondCoord] = useState('Y')

  console.log(firstCoord)
  console.log(secondCoord)

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
            />
          </div>
          ))
        }
      </div>
      { requestStatus &&
        <div className="App-addView" onClick={() => setCharts((charts) => [...charts, 'chart'])}>
          + Добавить отображение
        </div>
      }
    </div>
  );
}

export default App;
