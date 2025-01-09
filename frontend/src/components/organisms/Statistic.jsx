import { useState } from 'react';
import ShopTitleSection from '../molecules/ShopTitleSection';
import StatisticCardList from '../molecules/StatisticCartList';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DateRangePicker } from '../ui/date-range-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import ProductRankingTable from './ProductRankingTable';
import StatisticChart from './StatisticChart';
import ValueConverter from '../../helpers/ValueConverter';
import { sub } from 'date-fns';

function Statistic() {
  const [chartData, setChartData] = useState([]);
  const [dateRange, setDateRange] = useState({
    from: sub(new Date(), { months: 1 }),
    to: new Date(),
  });

  const data = {
    revenue: {
      value: 1000000,
      unit: 'VND',
      title: 'Doanh thu',
      isIncreased: true,
      compareValue: 100000,
      data: [
        { timestamp: '1/1/2025', revenue: 200 },
        { timestamp: '2/1/2025', revenue: 305 },
        { timestamp: '4/1/2025', revenue: 237 },
      ],
    },
    totalOrder: {
      value: 100,
      unit: 'đơn hàng',
      title: 'Tổng đơn hàng',
      isIncreased: false,
      compareValue: 10,
      data: [
        { timestamp: '1/1/2025', totalOrder: 101 },
        { timestamp: '2/1/2025', totalOrder: 262 },
        { timestamp: '4/1/2025', totalOrder: 237 },
      ],
    },
    conventionRate: {
      value: 10,
      unit: '%',
      title: 'Tỉ lệ chuyển đổi',
      isIncreased: true,
      compareValue: 1,
      data: [
        { timestamp: '1/1/2025', conventionRate: 55 },
        { timestamp: '2/1/2025', conventionRate: 212 },
        { timestamp: '4/1/2025', conventionRate: 286 },
      ],
    },
    accessTimes: {
      value: 1000,
      unit: 'lượt',
      title: 'Số lượt truy cập',
      isIncreased: true,
      compareValue: 100,
      data: [
        { timestamp: '1/1/2025', accessTimes: 132 },
        { timestamp: '2/1/2025', accessTimes: 249 },
        { timestamp: '4/1/2025', accessTimes: 261 },
      ],
    },
  };
  const productRanking = [
    {
      id: 1,
      productName: 'Áo thun nam',
      revenue: 645122,
      soldCount: 101,
      viewCount: 900,
    },
    {
      id: 2,
      productName: 'Áo thun nữ',
      revenue: 720526,
      soldCount: 163,
      viewCount: 1147,
    },
    {
      id: 3,
      productName: 'Quần jean nam',
      revenue: 371440,
      soldCount: 141,
      viewCount: 429,
    },
    {
      id: 4,
      productName: 'Quần jean nữ',
      revenue: 463027,
      soldCount: 1,
      viewCount: 1428,
    },
    {
      id: 5,
      productName: 'Áo khoác nam',
      revenue: 214343,
      soldCount: 64,
      viewCount: 1242,
    },
    {
      id: 6,
      productName: 'Áo khoác nữ',
      revenue: 394078,
      soldCount: 180,
      viewCount: 1364,
    },
  ];
  const lines = Object.keys(data).map((key, index) => {
    return {
      dataKey: key,
      label: data[key].title,
      color: `hsl(var(--chart-${index + 1}))`,
    };
  });

  const handleCardSelected = (card) => {
    const chartDataKeys = chartData.length > 0 ? Object.keys(chartData[0]) : [];
    if (chartDataKeys.includes(card.key)) {
      // Remove data from chartData
      const newChartData = chartData.map((data) => {
        delete data[card.key];
        return data;
      });
      setChartData(newChartData);
    } else {
      // Merge new data into chartData
      const newData = data[card.key].data;
      newData.forEach((data) => {
        const foundData = chartData.find(
          (chartData) => chartData.timestamp === data.timestamp
        );
        if (foundData) {
          foundData[card.key] = data[card.key];
        } else {
          const newChartData = { timestamp: data.timestamp };
          newChartData[card.key] = data[card.key];
          chartData.push(newChartData);
        }
      });

      setChartData([...chartData]);
    }
  };

  return (
    <SidebarMaincontentLayout>
      <ShopTitleSection title='Thống kê' className='w-full'>
        <div className='flex gap-7 text-sm'>
          <div className='flex items-center gap-4 px-4'>
            <p>Khung thời gian</p>
            <DateRangePicker
              align={'start'}
              onUpdate={(e) => console.log(e)}
              initialDateFrom={dateRange.from}
              initialDateTo={dateRange.to}
            />
          </div>
          <div className='flex items-center gap-4 px-4'>
            <p>Loại đơn hàng</p>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Chọn loại đơn hàng' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='confirmed'>Đơn đã xác nhận</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <StatisticCardList
          cards={Object.keys(data).map((key) => {
            return {
              title: data[key].title,
              value: data[key].value,
              unit: data[key].unit,
              isIncreased: data[key].isIncreased,
              compareValue: data[key].compareValue,
              key: key,
            };
          })}
          onCardSelected={(card) => handleCardSelected(card)}
        />
        <StatisticChart
          data={chartData}
          lines={lines}
          title='Biểu đồ thống kê'
          dateRange={`${ValueConverter.formatDateTime(dateRange.from, {
            dateOnly: true,
          })} - ${ValueConverter.formatDateTime(dateRange.to, {
            dateOnly: true,
          })}`}
        />
        <Card>
          <CardHeader>
            <CardTitle>Bảng xếp hạng sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductRankingTable data={productRanking} />
          </CardContent>
        </Card>
      </ShopTitleSection>
    </SidebarMaincontentLayout>
  );
}

export default Statistic;
