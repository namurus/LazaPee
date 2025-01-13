import { useState, useEffect } from 'react';
import axios from 'axios';
import { getMe } from '../../api/user/auth';

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe();
        const data = response;
        setUser(data);
        setFullName(data.fullName);
        setEmail(data.email);
        setPhone(data.phone);
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  // Update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setError(null);

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);

    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await axios.patch('https://lazapee-jivl.onrender.com/user/update', formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Cập nhật thông tin thành công');
        setUser(response.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h2 className='text-xl font-bold'>Hồ Sơ Của Tôi</h2>
      <p className='mb-4 text-gray-500'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      <hr className='mb-6 mt-4 border-gray-300' />
      <div className='flex flex-col md:flex-row'>
        <div className='w-full md:w-3/4'>
          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <div className='flex items-center'>
                <label className='w-full md:w-1/3 pr-4 text-right text-gray-700'>Tên đăng nhập</label>
                <div className='w-full md:w-2/3'>
                  <input type='text' value={user?.username || ''} className='w-full rounded border border-gray-300 p-2' disabled/>
                </div>
              </div>
            </div>
            <div className='mb-6'>
              <div className='flex items-center'>
                <label className='w-full md:w-1/3 pr-4 text-right text-gray-700'>Tên</label>
                <div className='w-full md:w-2/3'>
                  <input type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} className='w-full rounded border border-gray-300 p-2'/>
                </div>
              </div>
            </div>
            <div className='mb-6'>
              <div className='flex items-center'>
                <label className='w-full md:w-1/3 pr-4 text-right text-gray-700'>Email</label>
                <div className='w-full md:w-2/3'>
                  <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full rounded border border-gray-300 p-2'/>
                </div>
              </div>
            </div>
            <div className='mb-6'>
              <div className='flex items-center'>
                <label className='w-full md:w-1/3 pr-4 text-right text-gray-700'>Số điện thoại</label>
                <div className='w-full md:w-2/3'>
                  <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} className='w-full rounded border border-gray-300 p-2'/>
                </div>
              </div>
            </div>

            <div className='mb-6'>
              <div className='flex items-center'>
                <label className='w-full md:w-1/3 pr-4 text-right text-gray-700'>Ảnh đại diện</label>
                <div className='w-full md:w-2/3'>
                  <input type='file' accept='image/*' onChange={handleAvatarChange} className='w-full rounded border border-gray-300 p-2'/>
                </div>
              </div>
            </div>

            <button type='submit' className='rounded bg-red-500 px-4 py-2 text-white'>Lưu</button>
          </form>
          {successMessage && (<p className='mt-4 text-green-500'>{successMessage}</p>)}
          {error && <p className='mt-4 text-red-500'>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
