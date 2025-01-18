import { ArrowUpDown } from 'lucide-react';
import DataTable from '../molecules/DataTable';
import { Button } from '../ui/button';
import ValueConverter from '../../helpers/ValueConverter';

function ProductRankingTable({ data }) {
  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: 'Tên sản phẩm',
      accessorKey: 'productName',
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant={'ghost'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Doanh thu
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      accessorKey: 'revenue',
      cell: ({ row }) => {
        return ValueConverter.formatCurrency(row.original.revenue, 'VND');
      },
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant={'ghost'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Số lượng đã bán
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      accessorKey: 'soldCount',
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant={'ghost'}
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Lượt xem
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      accessorKey: 'viewCount',
    },
  ];
  return (
    <DataTable
      data={data}
      columns={columns}
      options={{
        search: {
          searchColumn: 'productName',
          allowSearch: true,
        },
      }}
    />
  );
}

export default ProductRankingTable;
