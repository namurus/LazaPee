import { useState } from 'react';
import LargeTextInputField from '../atoms/LargeTextInputField';
import TextInput from '../atoms/TextInput';
import InputField from '../molecules/InputField';
import ShopImagePanel from '../molecules/ShopImagePanel';
import ShopTitleSection from '../molecules/ShopTitleSection';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';
import { Button } from '../ui/button';
import TemporaryClosureDialog from '../molecules/TemporaryClosureDialog';

function ShopProfile() {
  const [shopInfo, setShopInfo] = useState({
    shopName: 'Shop của tôi',
    shopImage: 'https://via.placeholder.com/150',
    joinDate: '01/01/2021',
    state: 'active',
  });
  const [open, setOpen] = useState(false);
  return (
    <SidebarMaincontentLayout>
      <form>
        <ShopTitleSection title={'Thông tin cơ bản'} className='w-full'>
          <div className='grid grid-cols-3 gap-4'>
            <ShopImagePanel shopInfo={shopInfo} />
            <div className='col-span-2 space-y-6'>
              <InputField title={'Tên shop'}>
                <TextInput
                  placeholder='Nhập tên shop'
                  value={shopInfo.shopName}
                  onChange={(e) =>
                    setShopInfo({ ...shopInfo, shopName: e.target.value })
                  }
                />
              </InputField>
              <InputField title={'Mô tả shop'}>
                <LargeTextInputField
                  name='description'
                  maxLength={500}
                  placeholder='Nhập mô tả hoặc thông tin về Shop của bạn tại đây'
                />
              </InputField>
              <Button type='submit'>Lưu thông tin</Button>
            </div>
          </div>
        </ShopTitleSection>
      </form>
      <ShopTitleSection title={'Trạng thái hoạt động'}>
        <p className='font-semibold'>
          Trạng thái:{' '}
          <span
            className={`${shopInfo.state === 'active' ? 'text-green-500' : 'text-red-500'}`}
          >
            {shopInfo.state === 'active' ? 'Đang hoạt động' : 'Tạm nghỉ'}
          </span>
        </p>
        <TemporaryClosureDialog
          open={open}
          setOpen={setOpen}
          onConfirmed={() => setOpen(false)}
        />
        <Button onClick={() => setOpen(true)}>Tạm nghỉ</Button>
      </ShopTitleSection>
    </SidebarMaincontentLayout>
  );
}

export default ShopProfile;
