import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';


const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
      width: 60,
    },
  ],
  height: 300,
};

const ylabels = [
    '09 am',
    '12 pm',
    '03 pm',
    '06 pm',
    '09 pm',
    '12 am',
    '03 am'
];

const xLabel = [
    'Sunny',
    'Rainy',
    'Heavy Rain'
]

export default function BarGraph() {
  return (
    <BarChart
      yAxis={[{ scaleType: 'band', data: xLabel , label:"time"}]}
      xAxis={[{scaleType: 'band',data :ylabels}]}
      series={[
        {data:[1.5,20,30,12,9,1,1,0]},
        {data : [10,20,30]}
      ]}
      {...chartSetting}
    />
  );
}