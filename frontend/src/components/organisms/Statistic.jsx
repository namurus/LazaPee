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

function Statistic() {
  const data = {
    revenue: {
      value: 1000000,
      unit: 'VND',
      title: 'Doanh thu',
      isIncreased: true,
      compareValue: 100000,
    },
    totalOrder: {
      value: 100,
      unit: 'đơn hàng',
      title: 'Tổng đơn hàng',
      isIncreased: false,
      compareValue: 10,
    },
    conventionRate: {
      value: 10,
      unit: '%',
      title: 'Tỉ lệ chuyển đổi',
      isIncreased: true,
      compareValue: 1,
    },
    accessTimes: {
      value: 1000,
      unit: 'lượt',
      title: 'Số lượt truy cập',
      isIncreased: true,
      compareValue: 100,
    },
  };
  return (
    <SidebarMaincontentLayout>
      <ShopTitleSection title='Thống kê' className='w-full'>
        <div className='flex gap-7 text-sm'>
          <div className='flex items-center gap-4 px-4'>
            <p>Khung thời gian</p>
            <DateRangePicker align={'start'} onUpdate={(e) => console.log(e)} />
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
            };
          })}
          onCardSelected={(card) => console.log(card)}
        />
        <StatisticChart />
        <Card>
          <CardHeader>
            <CardTitle>Bảng xếp hạng sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductRankingTable />
          </CardContent>
        </Card>
      </ShopTitleSection>
    </SidebarMaincontentLayout>
  );
}

export default Statistic;
