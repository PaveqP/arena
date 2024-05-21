import React, { useState } from 'react';
import { Charts, Header, Config} from './modules';
import './App.scss';
import { useTypedSelector } from './hooks/useTypedSelector';
import { stat } from 'fs';

function App() {

  return (
    <div className="App">
      <Header/>
      <div className="App__data">
        <div className="App__config">
          <Config />
        </div>
        <div className="App__separator">

        </div>
        <div className="App__filter">
          {
            <Charts />
          }
        </div>
      </div>
    </div>
  );
}

export default App;
