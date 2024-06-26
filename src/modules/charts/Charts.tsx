import React, { useRef, useEffect, useState, FC } from 'react';
import './Charts.scss';
import type { ChartData } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { useTypedSelector } from '../../hooks/useTypedSelector';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

type CoordType = {
  [key: number]: string
}

type EventsType = {
  [key: number]: boolean
}

interface ICharts {
  firstCoord: CoordType;
  setFirstCoord: any;
  requestPlayerEvents: EventsType;
  id: any
}

const Charts: FC<ICharts> = ({ firstCoord, setFirstCoord, requestPlayerEvents, id }) => {
  const serverData: any = useTypedSelector(state => state.data[id]?.finalData || []);

  const filters = useTypedSelector(state => state.filters.filters[id] || []);

  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  });

  const labels = serverData.length > 0 && serverData[0].data.map((pair: any) => pair[1]);

  const data = {
    labels,
    datasets: serverData.map((dataSet: any) => ({
      label: dataSet.id,
      data: dataSet.data.map((pair: any) => pair[0]),
      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
      pointRadius: (serverData.length > 0 && !requestPlayerEvents && filters[0] && filters[0].type === 'player') ? 10 
      : (filters[0] && (filters[0].type === 'polygon' || filters[0].type === 'server')) ? 3 : 1,
      pointHoverRadius: 10,
      borderWidth: filters[0] && filters[0].type === 'polygon' ? 0 : 2,
      backgroundColor: filters[0] && filters[0].type === 'polygon' && `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }))
  };

  const handleSetCoord = (coord: string) => {
    console.log(coord)
    setFirstCoord((prevCoords: CoordType) => {
      return { ...prevCoords, [id]: coord };
    });
  };

  useEffect(() => {
    const chart = chartRef.current;
  
    if (!chart) {
      return;
    }
  
    const newChartData: any = {
      ...data,
      datasets: data.datasets.map((dataset: any) => ({
        ...dataset
      })),
    };
  
    if (JSON.stringify(newChartData) !== JSON.stringify(chartData)) {
      setChartData(newChartData);
    }
  }, [serverData]);

  console.log(serverData.length > 0 && !requestPlayerEvents && filters[0].type === 'player')

  return (
    <div className="charts">
      <Chart ref={chartRef} type='line' data={chartData && chartData} className='charts__chart' />
      {serverData.length > 0 && filters[0] && !requestPlayerEvents[id] && filters[0].type === 'player' &&
        <div className="charts__inputs">
          <div className="inputs__OX">
            <p className='inputs-placeholder'>OX:</p>
            <select value={firstCoord[id]} onChange={(e) => handleSetCoord(e.target.value)}>
              <option value="X">X</option>
              <option value="Y">Y</option>
              <option value="Z">Z</option>
            </select>
          </div>
          <div className="inputs__OY">
            <p className='inputs-placeholder'>OY:</p>
            <select value={'Time Game'}>
              <option value="X">Time Game</option>
            </select>
          </div>
        </div>
      }
    </div>
  );
}

export { Charts };
