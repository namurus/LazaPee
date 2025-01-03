const Address = () => {
  return (
    <>
      <h2 className='text-xl font-bold'>Địa Chỉ Của Tôi</h2>
      <p className='mb-4 text-gray-500'>Quản lý địa chỉ của bạn</p>
      <hr className='mb-6 mt-4 border-gray-300' />
      <div className='flex justify-end'>
        <button className='rounded bg-green-500 px-4 py-2 text-white'>Thêm Địa Chỉ</button>
      </div>
    </>
  );
};

export default Address;
