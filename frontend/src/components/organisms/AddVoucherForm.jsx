import InputField from '../molecules/InputField';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';
import TextInput from '../atoms/TextInput';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import ShopTitleSection from '../molecules/ShopTitleSection';
import axios from 'axios';

function AddVoucherForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const errors = {};
    const formData = new FormData(e.target);

    const code = formData.get('code');
    const discount = parseFloat(formData.get('discount'));
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const quantity = parseInt(formData.get('quantity'), 10);

    if (!code) {
      errors.code = 'Mã giảm giá không được để trống';
    }

    if (!discount || discount <= 0) {
      errors.discount = 'Giảm giá phải lớn hơn 0';
    }

    if (!startDate) {
      errors.startDate = 'Ngày bắt đầu không được để trống';
    }

    if (!endDate) {
      errors.endDate = 'Ngày kết thúc không được để trống';
    }

    if (!quantity || quantity <= 0) {
      errors.quantity = 'Số lượng phải lớn hơn 0';
    }

    if (Object.keys(errors).length > 0) {
      toast.error('Vui lòng kiểm tra lại thông tin', {
        description: Object.values(errors).join('; '),
        className: 'bg-red-500 text-white',
        position: 'top-right',
        closeButton: true,
      });
      setLoading(false);
      return;
    }

    const voucherData = {
      code,
      discount,
      startDate,
      endDate,
      quantity,
    };

    // const voucherData = {
    //   code: 'CXVB12312',
    //   discount: 0.4,
    //   startDate: '2024-12-26',
    //   endDate: '2024-12-30',
    //   quantity: 102,
    // };

    // console.log('Voucher data:', voucherData);

    try {
      const token = localStorage.getItem('ADMIN_ACCESS_TOKEN');
      const response = await axios.post('https://lazapee-jivl.onrender.com/admin/voucher/create', voucherData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.code === 201) {
        toast.success('Voucher đã được thêm thành công', {
          className: 'bg-green-500 text-white',
          position: 'top-right',
          closeButton: true,
        });
      } 
      else
       {
        toast.error('Có lỗi xảy ra khi thêm voucher', {
          className: 'bg-red-500 text-white',
          position: 'top-right',
          closeButton: true,
        });
      }

    } catch (error) {
      console.error('Failed to add voucher:', error);
      toast.error('Voucher đã tồn tại', {
        className: 'bg-red-500 text-white',
        position: 'top-right',
        closeButton: true,
      });

      } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarMaincontentLayout>
      <form
        className='w-full space-y-8 p-6 font-primary'
        method='POST'
        onSubmit={handleSubmit}
      >
        <ShopTitleSection title={'Thông tin voucher'}>
          <InputField title={'Mã giảm giá'}>
            <TextInput
              placeholder='Nhập mã giảm giá'
              className={'max-w-[45ch]'}
              name='code'
            />
          </InputField>
          <InputField
            title={'Giảm giá'}
            helperText={'Nhập giá trị giảm (0.1 = 10%, 0.4 = 40%)'}
          >
            <TextInput
              type='number'
              step='0.01'
              placeholder='Nhập giá trị giảm'
              className={'max-w-[45ch]'}
              name='discount'
            />
          </InputField>
          <InputField title={'Ngày bắt đầu'}>
            <TextInput
              type='date'
              className={'max-w-[45ch]'}
              name='startDate'
            />
          </InputField>
          <InputField title={'Ngày kết thúc'}>
            <TextInput type='date' className={'max-w-[45ch]'} name='endDate' />
          </InputField>
          <InputField title={'Số lượng'}>
            <TextInput
              type='number'
              placeholder='Nhập số lượng'
              className={'max-w-[45ch]'}
              name='quantity'
            />
          </InputField>
        </ShopTitleSection>
        <div className='flex items-center justify-end'>
          <Button type='submit' disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu voucher'}
          </Button>
        </div>
      </form>
    </SidebarMaincontentLayout>
  );
}

export default AddVoucherForm;
