import DataTable from '../molecules/DataTable';

function ProductRankingTable() {
  const data = [
    {
      id: 1,
      productName: 'Áo thun nam',
      revenue: 1000000,
      soldCount: 100,
      viewCount: 1000,
    },
    {
      id: 2,
      productName: 'Áo thun nữ',
      revenue: 1000000,
      soldCount: 100,
      viewCount: 1000,
    },
    {
      id: 3,
      productName: 'Quần jean nam',
      revenue: 1000000,
      soldCount: 100,
      viewCount: 1000,
    },
    {
      id: 4,
      productName: 'Quần jean nữ',
      revenue: 1000000,
      soldCount: 100,
      viewCount: 1000,
    },
    {
      id: 5,
      productName: 'Áo khoác nam',
      revenue: 1000000,
      soldCount: 100,
      viewCount: 1000,
    },
    {
      id: 6,
      productName: 'Áo khoác nữ',
      revenue: 1000000,
      soldCount: 100,
      viewCount: 1000,
    },
  ];

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
      header: 'Doanh thu',
      accessorKey: 'revenue',
    },
    {
      header: 'Số lượng đã bán',
      accessorKey: 'soldCount',
    },
    {
      header: 'Lượt xem',
      accessorKey: 'viewCount',
    },
  ];
  return <DataTable data={data} columns={columns} searchColumn='productName' />;
}

export default ProductRankingTable;
