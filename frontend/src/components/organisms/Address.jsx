import { useState, useEffect } from 'react';
import axios from 'axios';
import { getMe } from '../../api/user/auth';

const Address = () => {
  const [address, setAddress] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe();
        setAddress(response.address);
      } catch (err) {
        console.error('Failed to load user data', err);
      }
    };

    fetchUserData();
  }, []);

  const handleAddOrUpdateAddress = () => {
    setShowDialog(true);
    if (address) {
      setNewAddress(address);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setNewAddress('');
  };

  const handleSaveAddress = async () => {
    if (!newAddress.trim()) {
      alert('Vui lòng nhập địa chỉ.');
      return;
    }

    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      await axios.patch('https://lazapee-jivl.onrender.com/user/update', { address: newAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = await getMe();
      setAddress(updatedUser.address);
      alert('Cập nhật địa chỉ thành công.');
      handleCloseDialog();
    } catch (error) {
      console.error('Lỗi khi cập nhật địa chỉ:', error);
      alert('Đã xảy ra lỗi khi cập nhật địa chỉ. Vui lòng thử lại sau.');
    }
  };

  const handleDeleteAddress = async () => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      await axios.patch(
        'https://lazapee-jivl.onrender.com/user/update',
        { address: null }, // Gửi địa chỉ là null để xóa
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      setAddress(null);
      alert('Xóa địa chỉ thành công.');
    } catch (error) {
      console.error('Lỗi khi xóa địa chỉ:', error);
      alert('Đã xảy ra lỗi khi xóa địa chỉ. Vui lòng thử lại sau.');
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold">Địa Chỉ Của Tôi</h2>
      <p className="mb-4 text-gray-500">Quản lý địa chỉ của bạn</p>
      <hr className="mb-6 mt-4 border-gray-300" />

      <div className="mb-4">
        {address ? (
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">{address}</p>
            </div>
            <div>
              <button
                onClick={handleAddOrUpdateAddress}
                className="mr-2 text-blue-500 hover:text-blue-700"
              >
                Sửa
              </button>
              <button
                onClick={handleDeleteAddress}
                className="text-red-500 hover:text-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Chưa có địa chỉ nào.</p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleAddOrUpdateAddress}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          {'Cập Nhật Địa Chỉ'}
        </button>
      </div>

      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-lg font-bold">
              {'Cập Nhật Địa Chỉ'}
            </h3>
            <p className="mb-4 text-sm text-gray-500">
              Nhập địa chỉ của bạn vào form bên dưới.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Địa Chỉ
              </label>
              <textarea
                name="address"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="mt-1 w-full rounded border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                placeholder="Nhập địa chỉ chi tiết"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseDialog}
                className="mr-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                Hủy
              </button>
              <button
                onClick={handleSaveAddress}
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Address;