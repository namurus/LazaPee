import InputField from './InputField';
import PropTypes from 'prop-types';

function PriceInventoryInputs({ price, setPrice, inventory, setInventory }) {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <InputField
        label={'Giá sản phẩm'}
        type='number'
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder={'Nhập giá sản phẩm'}
      />
      <InputField
        label={'Số lượng'}
        type='number'
        value={inventory}
        onChange={(e) => setInventory(e.target.value)}
        placeholder={'Nhập số lượng sản phẩm'}
      />
    </div>
  );
}
PriceInventoryInputs.propTypes = {
  price: PropTypes.number.isRequired,
  setPrice: PropTypes.func.isRequired,
  inventory: PropTypes.number.isRequired,
  setInventory: PropTypes.func.isRequired,
};

export default PriceInventoryInputs;
