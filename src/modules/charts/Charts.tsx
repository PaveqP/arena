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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const colors = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'teal',
  'blue',
  'purple',
];

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = '#8C7DFE';
  const colorMid = '#C2FF5E'
  const colorEnd = '#56A3FF'

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

// interface ICharts{
//   requestData: {
//     type: string, 
//     value: string
//   }
// }



const Charts: FC= () => {

  // const [coordinates, setCoordinates] = useState([])

  const filters = useTypedSelector(state => state.filters.filter)
  const serverData = useTypedSelector(state => state.filters.data)

  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  });

  const preparelabels: any = []
  serverData.length > 0 && serverData.map((pair) => {
    const ifFound = preparelabels.some((l: any) => l === pair[1])
    if(!ifFound){
      preparelabels.push(pair[1])
    }
  })
  const labels = serverData.length > 0 && serverData.map((pair) => Math.floor(pair[0]))

  console.log(serverData)

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: serverData.length > 0 && serverData.map((pair) => Math.ceil(pair[1])),
      },
    ],
  };

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData: any = {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  }, [serverData]);


  useEffect( () => {
    filters[0] && getPlayerCoordinates(filters[0].value)
  }, [filters])

  return (
    <div className="charts">
        {chartData && <Chart ref={chartRef} type='line' data={chartData} className='charts__chart'/>}
        {/* <Chart ref={chartRef} type='line' data={chartData} /> */}
    </div>
  );
}

export {Charts}