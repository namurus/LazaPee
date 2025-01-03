import { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setPasswordError('Mật khẩu mới và xác nhận mật khẩu không khớp.');
      setPasswordSuccess('');
      return;
    }

    try {
      const response = await axios.post('/api/user/change-password', {
        oldPassword,
        newPassword,
      });

      if (response.status === 200) {
        setPasswordSuccess('Đổi mật khẩu thành công.');
        setPasswordError('');
      } else {
        setPasswordError('Đổi mật khẩu thất bại. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error(err);
      setPasswordError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
  };

  return (
    <>
      <h2 className='text-xl font-bold'>Đổi Mật Khẩu</h2>
      <p className='mb-4 text-gray-500'>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</p>
      <hr className='mb-6 mt-4 border-gray-300' />
      <form onSubmit={handlePasswordChange}>
        {passwordError && <p className='text-red-500'>{passwordError}</p>}
        {passwordSuccess && <p className='text-green-500'>{passwordSuccess}</p>}
        <div className='mb-4'>
          <label className="block text-gray-700">Mật khẩu cũ</label>
          <input type='password' className="w-1/3 p-2 border border-gray-300 rounded" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
        </div>
        <div className='mb-4'>
          <label className="block text-gray-700">Mật khẩu mới</label>
          <input type='password' className="w-1/3 p-2 border border-gray-300 rounded mt-2" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div className='mb-4'>
          <label className="block text-gray-700">Xác nhận mật khẩu mới</label>
          <input type='password' className="w-1/3 p-2 border border-gray-300 rounded mt-2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>
        <button type='submit' className='rounded bg-red-500 px-4 py-2 text-white mt-4'>Lưu</button>
      </form>
    </>
  );
};

export default ChangePassword;
