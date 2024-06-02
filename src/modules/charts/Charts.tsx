import React, { useRef, useEffect, useState, FC } from 'react';
import './Charts.scss'
import type { ChartData, ChartArea } from 'chart.js';
import { getPlayerCoordinates } from '../../api/player/PlayersData';
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
import { useActions } from '../../hooks/useActions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface ICharts {
  firstCoord: string
  secondCoord: string
  setFirstCoord: (firstCoord: string) => void
  setSecondCoord: (secondCoord: string) => void
  requestPlayerEvents: boolean
}

const Charts: FC<ICharts> = ({firstCoord, secondCoord, setFirstCoord, setSecondCoord, requestPlayerEvents}) => {

  const serverData: any = useTypedSelector(state => state.data.finalData)
  const filterType = useTypedSelector(state => state.filters.currentFilter)

  console.log(serverData)

  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  });

  const labels = serverData.length > 0 && serverData[0].data.map((pair: any) => pair[1])

  const data = {
    labels,
    // datasets: [
    //   {
    //     // label: `${filters[0].type} ${filters[0].value}`,
    //     label: 'test',
    //     data: serverData.length > 0 && serverData.map((pair) => Math.ceil(pair[1])),
    //   },
    // ],
    datasets: serverData.map((dataSet: any) => ({
      label: dataSet.id,
      data: dataSet.data.map((pair: any) =>  pair[0]),
      borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }))
  };

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData: any = {
      ...data,
      datasets: data.datasets.map((dataset: any) => ({
        ...dataset
      })),
    };

    setChartData(chartData);
  }, [serverData]);


  return (
    <div className="charts">
        <Chart ref={chartRef} type='line' data={chartData} className='charts__chart'/>
        {serverData.length > 0 && !requestPlayerEvents && filterType === 'player' &&
          <div className="charts__inputs">
            <div className="inputs__OX">
              <p className='inputs-placeholder'>OX:</p>
              <select value={firstCoord} onChange={(e) => setFirstCoord(e.target.value)}>
                <option value="X">X</option>
                <option value="Y">Y</option>
                <option value="Z">Z</option>
              </select>
            </div>
            <div className="inputs__OY">
              <p className='inputs-placeholder'>OY:</p>
              <select value={secondCoord} onChange={(e) => setSecondCoord(e.target.value)}>
                <option value="X">Time Game</option>
              </select>
            </div>
          </div>
        }
        {/* <Chart ref={chartRef} type='line' data={chartData} /> */}
    </div>
  );
}

export {Charts}