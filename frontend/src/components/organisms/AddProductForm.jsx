import { useSubmit } from 'react-router-dom';
import InputField from '../molecules/InputField';
import LargeTextInputField from '../atoms/LargeTextInputField';

import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';
import ShopTitleSection from '../molecules/ShopTitleSection';
import TextInput from '../atoms/TextInput';
import ImageInput from '../molecules/ImageInput';
import CategoryAdderInput from './CategoryAdderInput';
import { Button } from '../ui/button';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

function AddProductForm() {
  const [files, setFiles] = useState([]);
  const formRef = useRef();
  const submit = useSubmit();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    const formData = new FormData(formRef.current);

    files.forEach((file) => {
      formData.append('images', file);
    });

    if (!formData.get('name')) {
      errors.name = 'Tên sản phẩm không được để trống';
    }

    if (!formData.get('description')) {
      errors.description = 'Mô tả sản phẩm không được để trống';
    }

    if (!formData.get('category')) {
      errors.category = 'Ngành hàng không được để trống';
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

    submit(formData, { method: 'post', encType: 'multipart/form-data' });
  };

  return (
    <SidebarMaincontentLayout>
      <form
        ref={formRef}
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
              name='name'
            />
          </InputField>
          <InputField title={'Mô tả sản phẩm'} className={'max-w-[45ch]'}>
            <LargeTextInputField name='description' maxLength={500} />
          </InputField>
          <InputField title={'Chọn ngành hàng'}>
            <TextInput
              name='category'
              placeholder='Nhập ngành hàng cho sản phẩm'
              className={'max-w-[45ch]'}
            />
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
