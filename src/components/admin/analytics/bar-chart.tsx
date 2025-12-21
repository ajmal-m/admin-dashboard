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

const BarsDataset = memo( () => {
  return (
    <BarChart
      dataset={[{ value:90, name:"AC"} , { value :80 , name:"GV"}]}
      xAxis={[{ dataKey: 'name' }]}
      series={[
        { dataKey: 'value', label: 'Quantity', valueFormatter },
      ]}
       sx={{
    // Y-axis label
    "& .MuiChartsYAxis-label": {
      fill: "#000", // blue
      fontWeight: 600
    },

    // Y-axis tick labels
    "& .MuiChartsYAxis-tickLabel": {
      fill: "#000" // orange
    },

    // Y-axis line
    "& .MuiChartsYAxis-line": {
      stroke: "#000" // green
    },

    // Y-axis ticks
    "& .MuiChartsYAxis-tick": {
      stroke: "#000"
    }
  }}
      {...chartSetting}
    />
  );
});

export default BarsDataset;