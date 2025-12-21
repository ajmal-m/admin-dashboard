import { BarChart , barElementClasses  } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
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
  {  data , loading } : { data : { name:string; value:number}[] , loading: boolean }
) => {
  return (
    <BarChart
      dataset={loading ? [] : data}
      xAxis={[{ dataKey: 'name' , tickPlacement:"middle" }]}
      series={[
        { dataKey: 'value', label: 'Quantity', valueFormatter },
      ]}
      loading={loading}
      sx={(theme) => ({
        [`.${barElementClasses.root}`]: {
          fill: '#1d6fad',
          strokeWidth: 2,
        },
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: 'white',
            strokeWidth: 1,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: 'white',
            fontWeight:400,
            fontFamily:"Montserrat",
          },
        },
        border: '1px solid rgba(0, 0, 0, 0.1)',
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
        backgroundSize: '35px 35px',
        backgroundPosition: '20px 20px, 20px 20px',
        ...theme.applyStyles('dark', {
          borderColor: 'rgba(255,255,255, 0.1)',
          backgroundImage:
            'linear-gradient(rgba(255,255,255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255, 0.1) 1px, transparent 1px)',
        }),
      })}
      {...chartSetting}
    />
  );
});

export default BarsDataset;