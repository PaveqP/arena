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


const Charts: FC= () => {

  const filters = useTypedSelector(state => state.filters.filter)
  const serverCoordinatesData = useTypedSelector(state => state.data.playerCoordsData)
  const serverEventsData = useTypedSelector(state => state.data.playerEventsData)

  const [actualData, setActualData] = useState([])

  console.log(serverCoordinatesData)
  console.log(serverEventsData)

  const dispatch = useActions()

  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  });

  const labels = serverCoordinatesData.length > 0 && serverCoordinatesData[0].data.map((pair) => Math.floor(pair[0]))

  console.log(serverCoordinatesData)

  const data = {
    labels,
    // datasets: [
    //   {
    //     // label: `${filters[0].type} ${filters[0].value}`,
    //     label: 'test',
    //     data: serverData.length > 0 && serverData.map((pair) => Math.ceil(pair[1])),
    //   },
    // ],
    datasets: serverCoordinatesData.map((dataSet) => ({
      label: dataSet.id,
      data: dataSet.data.map((pair) =>  Math.ceil(pair[1])),
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
      datasets: data.datasets.map(dataset => ({
        ...dataset
      })),
    };

    setChartData(chartData);
  }, [serverCoordinatesData]);


  return (
    <div className="charts">
        {chartData && <Chart ref={chartRef} type='line' data={chartData} className='charts__chart'/>}
        {/* <Chart ref={chartRef} type='line' data={chartData} /> */}
    </div>
  );
}

export {Charts}