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


const Charts: FC= () => {

  const filters = useTypedSelector(state => state.filters.filter)
  const serverData = useTypedSelector(state => state.filters.data)

  const dispatch = useActions()

  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<'bar'>>({
    datasets: [],
  });

  const labels = serverData.length > 0 && serverData[0].data.map((pair) => Math.floor(pair[0]))

  console.log(serverData)

  const data = {
    labels,
    // datasets: [
    //   {
    //     // label: `${filters[0].type} ${filters[0].value}`,
    //     label: 'test',
    //     data: serverData.length > 0 && serverData.map((pair) => Math.ceil(pair[1])),
    //   },
    // ],
    datasets: serverData.map((dataSet) => ({
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
  }, [serverData]);


  useEffect( () => {
    // console.log('called!', filters)
    // filters.length > 0 && filters[0].value.map((val) => {
    //   console.log(val)
    //   if(serverData.some((elem) => elem.id === val)){
    //     dispatch.deleteData(val)
    //   }else{
    //     getPlayerCoordinates(val)
    //   }
    // })
  }, [filters])

  return (
    <div className="charts">
        {chartData && <Chart ref={chartRef} type='line' data={chartData} className='charts__chart'/>}
        {/* <Chart ref={chartRef} type='line' data={chartData} /> */}
    </div>
  );
}

export {Charts}