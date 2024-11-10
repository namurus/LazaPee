function ShopInfoSection({ product }) {
  // Return mock data for now
  return (
    <div className='container mx-auto my-7 lg:my-12'>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-2'>
            <h2 className='text-2xl font-semibold'>Shop Information</h2>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-gray-500'>Shop Name</span>
            <span className='text-lg font-semibold'>Shop Name</span>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-gray-500'>Shop Description</span>
            <span className='text-lg font-semibold'>Shop Description</span>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-gray-500'>Shop Location</span>
            <span className='text-lg font-semibold'>Shop Location</span>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-gray-500'>Shop Rating</span>
            <span className='text-lg font-semibold'>Shop Rating</span>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='flex gap-2'>
            <h2 className='text-2xl font-semibold'>Shop Contact</h2>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-gray-500'>Phone Number</span>
            <span className='text-lg font-semibold'>Phone Number</span>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-gray-500'>Email Address</span>
            <span className='text-lg font-semibold'>Email Address</span>
          </div>
          <div className='flex flex-col gap-2'>
            <span className='text-gray-500'>Social Media</span>
            <span className='text-lg font-semibold'>Social Media</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopInfoSection;
