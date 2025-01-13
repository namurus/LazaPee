import InputField from '../molecules/InputField';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';
import TextInput from '../atoms/TextInput';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import ShopTitleSection from '../molecules/ShopTitleSection';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateVoucherForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [voucherData, setVoucherData] = useState({
    code: '',
    discount: '',
    startDate: '',
    endDate: '',
    quantity: '',
  });

  useEffect(() => {
    // Fetch voucher data by ID
    const fetchVoucher = async () => {
      try {
        const token = localStorage.getItem('ACCESS_TOKEN');
        const response = await axios.get(
          `https://lazapee-jivl.onrender.com/admin/voucher/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setVoucherData(response.data);
      } catch (error) {
        console.error('Failed to fetch voucher:', error);
        toast.error('Không thể tải dữ liệu voucher', {
          className: 'bg-red-500 text-white',
          position: 'top-right',
          closeButton: true,
        });
      }
    };

    fetchVoucher();
  }, [id]);

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

    const updatedVoucherData = {
      code,
      discount,
      startDate,
      endDate,
      quantity,
    };

    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await axios.put(
        `https://lazapee-jivl.onrender.com/admin/voucher/update/${id}`,
        updatedVoucherData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        toast.success('Voucher đã được cập nhật thành công', {
          className: 'bg-green-500 text-white',
          position: 'top-right',
          closeButton: true,
        });
        navigate('/admin/voucher-management'); // Điều hướng về trang quản lý voucher
      } else {
        throw new Error('Có lỗi xảy ra khi cập nhật voucher');
      }
    } catch (error) {
      toast.error(error.message, {
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
        className="w-full space-y-8 p-6 font-primary"
        method="POST"
        onSubmit={handleSubmit}
      >
        <ShopTitleSection title={'Chỉnh sửa voucher'}>
          <InputField title={'Mã giảm giá'}>
            <TextInput
              placeholder="Nhập mã giảm giá"
              className={'max-w-[45ch]'}
              name="code"
              defaultValue={voucherData.code}
            />
          </InputField>
          <InputField
            title={'Giảm giá'}
            helperText={'Nhập giá trị giảm (0.1 = 10%, 0.4 = 40%)'}
          >
            <TextInput
              type="number"
              step="0.01"
              placeholder="Nhập giá trị giảm"
              className={'max-w-[45ch]'}
              name="discount"
              defaultValue={voucherData.discount}
            />
          </InputField>
          <InputField title={'Ngày bắt đầu'}>
            <TextInput
              type="date"
              className={'max-w-[45ch]'}
              name="startDate"
              defaultValue={voucherData.startDate}
            />
          </InputField>
          <InputField title={'Ngày kết thúc'}>
            <TextInput
              type="date"
              className={'max-w-[45ch]'}
              name="endDate"
              defaultValue={voucherData.endDate}
            />
          </InputField>
          <InputField title={'Số lượng'}>
            <TextInput
              type="number"
              placeholder="Nhập số lượng"
              className={'max-w-[45ch]'}
              name="quantity"
              defaultValue={voucherData.quantity}
            />
          </InputField>
        </ShopTitleSection>
        <div className="flex items-center justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </div>
      </form>
    </SidebarMaincontentLayout>
  );
}

export default UpdateVoucherForm;
