import DataTable from '../molecules/DataTable';

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
