import PropType from 'prop-types';
import StarRating from '../atoms/StarRating';
import CurrencyFormatter from '../../helpers/CurrencyFormatter';
import ColorPicker from './ColorPicker';
import SizeList from './SizeList';
import QuantitySelector from '../atoms/QuantitySelector';
import InverseButton from '../atoms/InverseButton';
import { discountPercentageToPrice } from '../../helpers/CaculationHelper';
import config from '../../config/config';
import { useState } from 'react';
import { toast } from 'sonner';
import { addProductToCart } from '../../api/admin/cart';

const colorConfig = config.colors;
const sizeConfig = config.sizes;

function constructVariantListFromProductSKU(product) {
  let variant = {};
  product.skus.forEach((sku) => {
    if (sku.color) {
      // Find the color in the config list
      const color = Object.values(colorConfig).find(
        (color) => color.value === sku.color
      );
      if (color) {
        if (!variant['color']) {
          variant['color'] = [color];
        } else {
          variant['color'].push(color);
        }
      }
    }

    if (sku.size) {
      // Find the size in the config list
      const size = Object.values(sizeConfig).find(
        (size) => size.value === sku.size
      );
      if (size) {
        if (!variant['size']) {
          variant['size'] = [size];
        } else {
          variant['size'].push(size);
        }
      }
    }
  });
  return variant;
}

function ProductDetailInfo({ product }) {
  const variantList = constructVariantListFromProductSKU(product);
  const [selectedVariant, setSelectedVariant] = useState({
    quantity: 1,
  });
  const [renderPrice, setRenderPrice] = useState(product.skus[0]?.price || 0);

  const handleColorPick = (color) => {
    setSelectedVariant({ ...selectedVariant, color });
    product.skus.forEach((sku) => {
      if (sku.color === color.value) {
        if (sku.size && !selectedVariant.size) {
          return;
        }
        setRenderPrice(sku.price);
      }
    });
  };

  const handleSizePick = (size) => {
    setSelectedVariant({ ...selectedVariant, size });
    product.skus.forEach((sku) => {
      if (sku.size === size.value) {
        if (sku.color && !selectedVariant.color) {
          return;
        }
        setRenderPrice(sku.price);
      }
    });
  };

  const handleQuantityChange = (quantity) => {
    setSelectedVariant({ ...selectedVariant, quantity });
  };

  const handleAddToCart = async () => {
    // Add to cart logic here
    if (
      (!selectedVariant.color && variantList.color) ||
      (!selectedVariant.size && variantList.size)
    ) {
      toast.error('Vui lòng chọn phân loại cho sản phẩm', {
        className: 'bg-red-500 text-white',
        position: 'top-right',
        closeButton: true,
      });
      return;
    }
    try {
      const response = await addProductToCart({
        productId: product.id,
        quantity: selectedVariant.quantity,
        sku: {
          color: selectedVariant.color?.value,
          size: selectedVariant.size?.value,
        },
      });
      console.log(response);
      if (!response) {
        throw new Error('Error adding product to cart');
      }
      toast.success('Đã thêm sản phẩm vào giỏ hàng', {
        className: 'bg-green-500 text-white',
        position: 'top-right',
        closeButton: true,
      });
    } catch (error) {
      console.error(error);
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau', {
        className: 'bg-red-500 text-white',
        position: 'top-right',
        closeButton: true,
      });
    }
  };
  return (
    <div className='flex flex-col gap-4 *:py-6'>
      <div className='line-below space-y-3'>
        <h1 className='line-clamp-2 font-display text-2xl leading-tight lg:text-[2.5rem]'>
          {product.productName}
        </h1>
        <StarRating
          rating={product.rating || 0}
          name={`${product.id}-product`}
        />
        <div className='flex gap-3 text-2xl font-semibold'>
          <p>
            {CurrencyFormatter.formatWithLocaleInfo(
              isNaN(renderPrice) ? 0 : renderPrice,
              'VND'
            )}
          </p>
          {product.discount && (
            <>
              <p className='line-through opacity-30'>
                {CurrencyFormatter.formatWithLocaleInfo(
                  isNaN(product.discount)
                    ? 0
                    : discountPercentageToPrice(
                        product.price,
                        product.discount
                      ),
                  'VND'
                )}
              </p>
              <div className='flex items-center justify-center rounded-full bg-[#FF3333] bg-opacity-10 px-3 py-[0.375rem] text-sm font-normal leading-none text-[#FF3333] lg:px-4 lg:text-[0.75rem]'>
                {isNaN(product.discount) ? 0 : product.discount}%
              </div>
            </>
          )}
        </div>
        <p className='text-sm font-light opacity-60 lg:text-base'>
          {product.description}
        </p>
      </div>
      {variantList.color && (
        <div className='line-below'>
          <h2 className='mb-4 text-sm opacity-60'>Chọn màu</h2>
          <ColorPicker
            onPickColor={handleColorPick}
            colorList={variantList.color}
          />
        </div>
      )}
      {variantList.size && (
        <div className='line-below'>
          <h2 className='mb-4 text-sm opacity-60'>Kích cỡ</h2>
          <SizeList sizeList={variantList.size} onPickSize={handleSizePick} />
        </div>
      )}
      <div className='flex gap-3'>
        <QuantitySelector
          defaultQuantity={1}
          className='h-[52px] px-4 py-3'
          handleQuantityChange={handleQuantityChange}
        />
        <InverseButton
          onClick={handleAddToCart}
          style={'rounded-full py-4 px-[3.375rem] leading-none text-sm'}
        >
          Add to Cart
        </InverseButton>
      </div>
    </div>
  );
}

ProductDetailInfo.propTypes = {
  product: PropType.object.isRequired,
};

export default ProductDetailInfo;
