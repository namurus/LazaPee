import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

// const chartData = [
//   { month: '1/1/2025', desktop: 200, mobile: 80 },
//   { month: '2/1/2025', desktop: 305, mobile: 200 },
//   { month: '4/1/2025', desktop: 237, mobile: 120 },
// ];
// const chartConfig = {
//   desktop: {
//     label: 'Desktop',
//     color: 'hsl(var(--chart-1))',
//   },
//   mobile: {
//     label: 'Mobile',
//     color: 'hsl(var(--chart-2))',
//   },
// };

export default function StatisticChart({
  data,
  lines,
  title = 'Biểu đồ',
  dateRange,
}) {
  const chartConfig = lines.reduce((acc, line) => {
    acc[line.key] = { label: line.label, color: line.color };
    return acc;
  }, {});
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {dateRange && <CardDescription>{dateRange}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='h-52 w-full'>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='timestamp'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            {lines.map((line) => (
              <Line
                key={line.dataKey}
                dataKey={line.dataKey}
                type='monotone'
                stroke={line.color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
