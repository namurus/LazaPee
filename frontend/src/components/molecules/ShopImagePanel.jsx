import Image from '../atoms/Image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import PropTypes from 'prop-types';

function ShopImagePanel({ shopInfo, onImageUpload }) {
  return (
    <div className='w-full py-8'>
      <div className='relative overflow-hidden'>
        <Image
          className='pointer-events-auto absolute inset-0 h-full w-full object-cover opacity-50'
          src={shopInfo.shopCover}
          alt='Shop cover'
        />
        <div className='group/panel relative flex items-center justify-center gap-4 px-4 py-6'>
          <Avatar className='group/avatar relative h-16 w-16 overflow-hidden'>
            <AvatarImage src={shopInfo.shopImage} alt={shopInfo.shopName} />
            <AvatarFallback>{shopInfo.shopName[0]}</AvatarFallback>
            <div className='absolute bottom-0 left-0 right-0 h-min translate-y-full bg-neutral-400 text-xs opacity-0 transition-all group-hover/avatar:translate-y-0 group-hover/avatar:opacity-100'>
              <div className='bg-primary-500 h-full text-center'>Sửa</div>
            </div>
          </Avatar>
          <div>
            <p className='max-w-[24ch] truncate'>
              {shopInfo.shopName || 'Tên của shop'}
            </p>
            <p>Đã tham gia {shopInfo.joinDate}</p>
            <p>Người theo dõi 0 | Theo dõi 1</p>
          </div>
        </div>
      </div>
      <div className='min-h-4 py-2 text-xs opacity-0 transition-all hover:last:translate-y-0 hover:last:opacity-100'>
        <div className='h-min bg-neutral-400 py-1'>
          <div className='bg-primary-500 h-full text-center'>
            <label htmlFor='background-image' className='cursor-pointer'>
              Sửa ảnh bìa
            </label>
            <input
              id='background-image'
              type='file'
              name='background'
              className='hidden'
              accept='image/*'
              onChange={onImageUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
ShopImagePanel.propTypes = {
  shopInfo: PropTypes.shape({
    shopImage: PropTypes.string,
    shopName: PropTypes.string,
    joinDate: PropTypes.string,
    shopCover: PropTypes.string,
  }).isRequired,
};

export default ShopImagePanel;
