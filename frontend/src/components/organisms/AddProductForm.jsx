import InputField from '../molecules/InputField';
import LargeTextInputField from '../atoms/LargeTextInputField';

import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';
import ShopTitleSection from '../molecules/ShopTitleSection';
import TextInput from '../atoms/TextInput';
import ImageInput from '../molecules/ImageInput';
import CategoryAdderInput from './CategoryAdderInput';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { getCategories } from '../../api/admin/product';
import { useAuth } from '../../hooks/useAuth';

function AddProductForm() {
  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    const formData = new FormData(e.target);

    files.forEach((file) => {
      formData.append('images', file);
    });

    if (!formData.get('productName')) {
      errors.name = 'Tên sản phẩm không được để trống';
    }

    if (!formData.get('description')) {
      errors.description = 'Mô tả sản phẩm không được để trống';
    }

    if (!formData.get('categoryId')) {
      errors.category = 'Ngành hàng không được để trống';
    }

    if (formData.getAll('images').length === 0) {
      errors.images = 'Hình ảnh sản phẩm không được để trống';
    }

    if (Object.keys(errors).length > 0) {
      console.log(Object.values(errors).join('\n'));
      toast.error('Vui lòng kiểm tra lại thông tin', {
        className: 'bg-red-500 text-white',
        description: Object.values(errors).join('; '),
        position: 'top-right',
        closeButton: true,
      });
      return;
    }

    const response = await fetch('https://lazapee-jivl.onrender.com/products', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });
    console.log(response);
    if (response.ok) {
      toast.success('Sản phẩm đã được thêm thành công', {
        className: 'bg-green-500 text-white',
        position: 'top-right',
        closeButton: true,
      });
    } else {
      toast.error('Có lỗi xảy ra khi thêm sản phẩm', {
        className: 'bg-red-500 text-white',
        position: 'top-right',
        closeButton: true,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const json = await getCategories();
        console.log(json);
        if (json.code !== 200) {
          throw new Error('No categories found');
        }
        setCategories(json.categories);
      } catch (error) {
        console.log('Error fetching categories:', error);
        setCategories([]);
      }
    };
    fetchData();
  }, []);

  return (
    <SidebarMaincontentLayout>
      <form
        className='w-full space-y-8 p-6 font-primary'
        method='POST'
        onSubmit={handleSubmit}
      >
        <ShopTitleSection title={'Thông tin cơ bản'}>
          <InputField
            title={'Tên sản phẩm'}
            helperText={
              'Tên sản phẩm + Thương hiệu + Model + Thông số kỹ thuật'
            }
          >
            <TextInput
              placeholder='Nhập tên sản phẩm'
              className={'max-w-[45ch]'}
              name='productName'
            />
          </InputField>
          <InputField title={'Mô tả sản phẩm'} className={'max-w-[45ch]'}>
            <LargeTextInputField name='description' maxLength={500} />
          </InputField>
          <InputField title={'Chọn ngành hàng'}>
            <Select name='categoryId'>
              <SelectTrigger>
                <SelectValue placeholder='Chọn ngành hàng' />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </InputField>
          <InputField
            title={'Thêm hình ảnh sản phẩm'}
            helperText={'Tối đa 9 hình ảnh'}
          >
            <ImageInput
              maxImages={9}
              onSetFiles={(images) => setFiles(images)}
            />
          </InputField>
        </ShopTitleSection>
        <ShopTitleSection title={'Thông tin bán hàng'}>
          <InputField title={'Phân loại sản phẩm'}>
            <CategoryAdderInput />
          </InputField>
        </ShopTitleSection>
        <div className='flex items-center justify-end'>
          <Button type='submit'>Lưu sản phẩm</Button>
        </div>
      </form>
    </SidebarMaincontentLayout>
  );
}

export default AddProductForm;
