import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

export default function TempGraph() {

  const xAxisData = [1,2,3,4,5,6,7,9];
  const yAxisData = [10,14,18,22,19,14,12,10];
  const xLabel = [
    '6am',
    '9am',
    '12pm',
    '03pm',
    '06pm',
    '09pm',
    '12am',
    '03am',
  ]
  

  return (
    <LineChart
      width={800}
      height = {200} 
      xAxis={[{scaleType:"point" , data: xLabel , label:"time"}]}
      yAxis={[{ label: 'temperature', width: 50 }]}
      series={[
        { data: yAxisData, label: 'degree', id: 'pvId' , area:true},
      ]}
    />
  );
}