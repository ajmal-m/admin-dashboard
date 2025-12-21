import { BarChart } from '@mui/x-charts/BarChart';
import { memo } from 'react';

export function valueFormatter(value: number | null) {
  return `${value}kg`;
}

const chartSetting = {
  yAxis: [
    {
      label: 'Quantity',
      width: 60,
    },
  ],
  height: 300,
};

const BarsDataset = memo( (
  {  data } : { data : { name:string; value:number}[] }
) => {
  return (
    <BarChart
      dataset={data}
      xAxis={[{ dataKey: 'name' }]}
      series={[
        { dataKey: 'value', label: 'Quantity', valueFormatter },
      ]}
      {...chartSetting}
    />
  );
});

export default BarsDataset;