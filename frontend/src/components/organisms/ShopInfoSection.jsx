import ShopImagePanel from '../molecules/ShopImagePanel';
const shopInfo = {
  shopName: 'Shop Name',
  shopImage: 'https://via.placeholder.com/150',
  shopCover: 'https://via.placeholder.com/150',
  shopDescription: 'Shop Description',
  joinDate: '2021-10-01',
  state: {
    active: true,
    returnDate: '2021-10-01',
  },
};

function ShopInfoSection({ product }) {
  // Return mock data for now

  return (
    <div className='container mx-auto my-7 lg:my-12'>
      <ShopImagePanel shopInfo={shopInfo} allowEdit={false} />
    </div>
  );
}

export default ShopInfoSection;
