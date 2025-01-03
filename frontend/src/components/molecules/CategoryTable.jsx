import { InputNumber, Table } from 'antd';
import PropTypes from 'prop-types';

function CategoryTable({ data, setData }) {
  const processedData = [];
  const headers = data.headers;
  const rows = data.rows;
  // TECHNICAL DEPT: Should be dynamic to the data but fixed to 2 cases here.
  // Should be dynamic in real-world scenario, but for the requirement deadline, we will keep it simple.
  if (headers.length === 1) {
    Object.entries(rows).forEach(([key, value]) => {
      processedData.push({
        col1: key,
        price: value.price,
        rowSpan: 1,
      });
    });
  } else {
    Object.entries(rows).forEach(([col1, col2Data]) => {
      const col2Keys = Object.keys(col2Data);
      col2Keys.forEach((key, index) => {
        processedData.push({
          col1: col1,
          col2: key,
          price: col2Data[key].price,
          rowSpan: index === 0 ? col2Keys.length : 0,
        });
      });
    });
  }
  let columns = [
    {
      title: headers[0],
      dataIndex: 'col1',
      render: (value, record) => {
        // Render rowSpan nếu có
        const obj = {
          children: value,
          props: {},
        };
        if (record.rowSpan) {
          obj.props.rowSpan = record.rowSpan;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (value, record) => {
        return (
          <InputNumber
            placeholder='Nhập giá bán'
            className='flex w-full items-center px-4 before:mr-2 before:text-gray-500 before:content-["đ|"]'
            min={0}
            onChange={(e) => {
              const rows = data.rows;
              let a = rows;
              const values = Object.values(record);
              values.forEach((key) => {
                if (a[key] === undefined) {
                  // Do nothing
                } else {
                  if (Object.keys(a[key]).includes('price')) {
                    a[key].price = e;
                    setData({
                      headers: data.headers,
                      rows: rows,
                    });
                  } else {
                    a = a[key];
                  }
                }
              });
            }}
          />
        );
      },
    },
  ];

  if (headers.length === 2) {
    columns = [
      ...columns.slice(0, 1),
      {
        title: headers[1],
        dataIndex: 'col2',
      },
      ...columns.slice(1),
    ];
  }

  return (
    <Table
      columns={columns}
      dataSource={processedData}
      bordered
      pagination={false}
    />
  );
}
CategoryTable.propTypes = {
  data: PropTypes.shape({
    headers: PropTypes.arrayOf(PropTypes.string).isRequired,
    rows: PropTypes.object.isRequired,
  }).isRequired,
};

export default CategoryTable;
