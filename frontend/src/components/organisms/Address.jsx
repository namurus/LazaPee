import { useState } from 'react';

const Address = () => {
  const [addresses, setAddresses] = useState([]); // Danh sách địa chỉ
  const [showDialog, setShowDialog] = useState(false); // Trạng thái hiển thị dialog
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address: '',
  }); // Trạng thái địa chỉ mới

  const handleAddAddress = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setNewAddress({ name: '', phone: '', address: '' }); // Reset form
  };

  const handleSaveAddress = () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.address) {
      alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    setAddresses([...addresses, newAddress]); // Thêm địa chỉ mới vào danh sách
    handleCloseDialog(); // Đóng dialog
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index); // Xóa địa chỉ tại index
    setAddresses(updatedAddresses); // Cập nhật lại danh sách địa chỉ
  };

  return (
    <>
      <h2 className="text-xl font-bold">Địa Chỉ Của Tôi</h2>
      <p className="mb-4 text-gray-500">Quản lý địa chỉ của bạn</p>
      <hr className="mb-6 mt-4 border-gray-300" />

      {/* Danh sách địa chỉ */}
      <div className="mb-4">
        {addresses.length === 0 ? (
          <p className="text-gray-500">Chưa có địa chỉ nào.</p>
        ) : (
          <ul className="list-disc pl-5">
            {addresses.map((addr, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <div>
                <p>
                  <strong>{addr.name}</strong> - {addr.phone}
                </p>
                <p className="text-sm text-gray-600">{addr.address}</p>
                </div>
                 <button
                  onClick={() => handleDeleteAddress(index)} // Xóa địa chỉ
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Xóa
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Nút thêm địa chỉ */}
      <div className="flex justify-end">
        <button
          onClick={handleAddAddress}
          className="rounded bg-green-500 px-4 py-2 text-white"
        >
          Thêm Địa Chỉ
        </button>
      </div>

      {/* Dialog thêm địa chỉ */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="text-lg font-bold">Thêm Địa Chỉ Mới</h3>
            <p className="mb-4 text-sm text-gray-500">
              Nhập thông tin địa chỉ mới của bạn vào form bên dưới.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Họ và Tên
              </label>
              <input
                type="text"
                name="name"
                value={newAddress.name}
                onChange={handleChange}
                className="mt-1 w-full rounded border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Số Điện Thoại
              </label>
              <input
                type="text"
                name="phone"
                value={newAddress.phone}
                onChange={handleChange}
                className="mt-1 w-full rounded border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                placeholder="Nhập số điện thoại"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Địa Chỉ
              </label>
              <textarea
                name="address"
                value={newAddress.address}
                onChange={handleChange}
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
