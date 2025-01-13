import { Plus, Trash2 } from 'lucide-react';
import CategorySelector from '../molecules/CategorySelector';
import CategoryTable from '../molecules/CategoryTable';
import { Button } from '../ui/button';
import { Fragment, useState } from 'react';
import InputField from '../molecules/InputField';
import { InputNumber } from 'antd';
import config from '../../config/config';

function constructTableData(categories) {
  const headers = categories.map((category) => category.type);
  if (headers.length === 0 || headers[0] === '') {
    return null;
  }
  const rows = {};
  categories[0].items.forEach((item) => {
    rows[item.text] = {};
  });
  if (categories.length === 2) {
    categories[0].items.forEach((item) => {
      categories[1].items.forEach((subItem) => {
        rows[item.text][subItem.text] = { price: 0, stock: 0 };
      });
    });
  } else {
    categories[0].items.forEach((item) => {
      rows[item.text] = { price: 0, stock: 0 };
    });
  }

  return {
    headers,
    rows,
  };
}

const headerMap = Object.values({ ...config.colors, ...config.sizes }).reduce(
  (acc, color) => {
    acc[color.text] = color.value;
    return acc;
  },
  {}
);

const headerNameMap = {
  'Màu sắc': 'color',
  'Kích thước': 'size',
};

function constructSKUData(categories, tableData) {
  if (!tableData) {
    return null;
  }
  const skus = [];
  const headers = tableData.headers;
  const rows = tableData.rows;
  if (headers.length === 1) {
    Object.keys(rows).forEach((key) => {
      skus.push({
        [headerNameMap[headers[0]]]: headerMap[key] || key,
        price: rows[key].price,
        stock_quantity: rows[key].stock,
      });
    });
  } else {
    Object.keys(rows).forEach((key) => {
      Object.keys(rows[key]).forEach((subKey) => {
        skus.push({
          [headerNameMap[headers[0]]]: headerMap[key] || key,
          [headerNameMap[headers[1]]]: headerMap[subKey] || subKey,
          price: rows[key][subKey].price,
          stock_quantity: rows[key][subKey].stock,
        });
      });
    });
  }
  return skus;
}

function CategoryAdderInput() {
  const [categories, setCategories] = useState([]);
  const [tableData, setTableData] = useState(null);
  const handleAddCategory = () => {
    if (categories.length < 2) {
      setCategories([...categories, { type: '', items: [] }]);
    }
  };
  const handleRemoveCategory = (category) => {
    const newCategories = categories.filter((c) => c !== category);
    setCategories(newCategories);
    setTableData(constructTableData(newCategories));
  };
  const handleCategorySelect = (index, value) => {
    const newCategories = [...categories];
    newCategories[index] = {
      ...newCategories[index],
      ...value,
    };
    setCategories(newCategories);
    setTableData(constructTableData(newCategories));
  };
  console.log('sku', constructSKUData(categories, tableData));
  return (
    <div>
      <div className='space-y-4'>
        {categories.map((category, index) => (
          <Fragment key={index}>
            <CategorySelector
              key={index}
              onCategorySelect={(value) => handleCategorySelect(index, value)}
              notAllowedOptions={categories
                .filter((c, i) => i !== index)
                .map((c) => {
                  switch (c.type) {
                    case 'Màu sắc':
                      return 'color';
                    case 'Kích thước':
                      return 'size';
                    default:
                      return [];
                  }
                })}
            />
            <Button
              type='button'
              onClick={() => handleRemoveCategory(category)}
              className='mx-4'
            >
              Xoá nhóm phân loại <Trash2 />
            </Button>
          </Fragment>
        ))}
        {categories.length < 2 && (
          <Button type='button' onClick={handleAddCategory}>
            Thêm nhóm phân loại <Plus />
          </Button>
        )}
      </div>
      {tableData && <CategoryTable data={tableData} setData={setTableData} />}
      {categories.length === 0 ? (
        <>
          <InputField title={'Giá bán'} className='mt-4'>
            <InputNumber
              placeholder='Nhập giá bán'
              className='flex w-full min-w-40 max-w-72 items-center px-4 before:mr-2 before:text-gray-500 before:content-["đ|"]'
              name='price'
              min={0}
              step={1000}
            />
          </InputField>
          <InputField title={'Tồn kho'} className='mt-4'>
            <InputNumber
              placeholder='Nhập số lượng tồn kho'
              className='flex w-full min-w-40 max-w-72 items-center px-4'
              name='stock_quantity'
              step={1}
              min={0}
            />
          </InputField>
        </>
      ) : (
        <textarea
          type='hidden'
          name='skus'
          value={JSON.stringify(constructSKUData(categories, tableData))}
          className='hidden'
        />
      )}
      {/* A textarea for storing the price data in an object typed */}
    </div>
  );
}

export default CategoryAdderInput;
