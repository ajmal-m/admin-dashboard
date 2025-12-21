import { PieChart } from '@mui/x-charts/PieChart';
import { memo } from 'react';

export const valueFormatter = (item: { value: number }) => `${item.value}`;

const PieActiveArc = memo( (
  { data }: { data : {value: number; label: string;}[]}
)  => {
  return (
      <PieChart
        series={[
            {
              data: data,
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              valueFormatter,
            },
        ]}
        height={300}
        width={300}
      />
  );
});

export default PieActiveArc;
