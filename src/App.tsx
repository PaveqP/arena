import React, { useState } from 'react';
import { Charts, Header, Config } from './modules';
import { Filters } from './components';
import './App.scss';
import { useTypedSelector } from './hooks/useTypedSelector';
import { stat } from 'fs';

function App() {

  const requestStatus = useTypedSelector(state => state.filters.requestStatus)

  const [firstCoord, setFirstCoord] = useState('X')
  const [secondCoord, setSecondCoord] = useState('Y')

  console.log(firstCoord)
  console.log(secondCoord)

  return (
    <div className="App">
      <Header/>
      <div className="App__data">
        { requestStatus &&
          <div className="App__filter">
            <Filters firstCoord={firstCoord} secondCoord={secondCoord}/>
            <Charts firstCoord={firstCoord} secondCoord={secondCoord} setFirstCoord={setFirstCoord} setSecondCoord={setSecondCoord}/>
          </div>
        }
      </div>
      { requestStatus &&
        <div className="App-addView">
          + Добавить отображение
        </div>
      }
    </div>
  );
}

export default App;
