import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        setUser(response.data);
        setGender(response.data.gender || '');
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <h2 className='text-xl font-bold'>Hồ Sơ Của Tôi</h2>
      <p className='mb-4 text-gray-500'>
        Quản lý thông tin hồ sơ để bảo mật tài khoản
      </p>
      <hr className='mb-6 mt-4 border-gray-300' />
      <div className='flex'>
        {/* Left: User Information */}
        <div className='w-2/3 border-r border-gray-300 pr-4'>
          <form>
            <div className='mb-6 mr-4'>
              <div className='flex items-center'>
                <label className='w-1/3 pr-4 text-right text-gray-700'>
                  Tên đăng nhập
                </label>
                <div className='w-2/3'>
                  <input
                    type='text'
                    value={user?.username || ''}
                    className='w-full rounded border border-gray-300 p-2'
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className='mb-6 mr-4'>
              <div className='flex items-center'>
                <label className='w-1/3 pr-4 text-right text-gray-700'>
                  Tên
                </label>
                <div className='w-2/3'>
                  <input
                    type='text'
                    value={user?.firstName || ''}
                    className='w-full rounded border border-gray-300 p-2'
                  />
                </div>
              </div>
            </div>
            <div className='mb-6 mr-4'>
              <div className='flex items-center'>
                <label className='w-1/3 pr-4 text-right text-gray-700'>
                  Email
                </label>
                <div className='flex w-2/3 items-center'>
                  <span className='flex-grow'>{user?.email || ''}</span>
                  <a href='#' className='ml-4 text-blue-500'>
                    Thay đổi
                  </a>
                </div>
              </div>
            </div>
            <div className='mb-6 mr-4'>
              <div className='flex items-center'>
                <label className='w-1/3 pr-4 text-right text-gray-700'>
                  Số điện thoại
                </label>
                <div className='flex w-2/3 items-center'>
                  <span className='flex-grow'>********89</span>
                  <a href='#' className='ml-4 text-blue-500'>
                    Thay đổi
                  </a>
                </div>
              </div>
            </div>
            <div className='mb-6 mr-4'>
              <div className='flex items-center'>
                <label className='w-1/3 pr-4 text-right text-gray-700'>
                  Giới tính
                </label>
                <div className='flex w-2/3 items-center'>
                  <label className='mr-6 flex items-center'>
                    <input
                      type='radio'
                      name='gender'
                      value='male'
                      checked={gender === 'male'}
                      onChange={() => setGender('male')}
                      className='mr-4'
                    />
                    Nam
                  </label>
                  <label className='mr-6 flex items-center'>
                    <input
                      type='radio'
                      name='gender'
                      value='female'
                      checked={gender === 'female'}
                      onChange={() => setGender('female')}
                      className='mr-4'
                    />
                    Nữ
                  </label>
                  <label className='flex items-center'>
                    <input
                      type='radio'
                      name='gender'
                      value='other'
                      checked={gender === 'other'}
                      onChange={() => setGender('other')}
                      className='mr-4'
                    />
                    Khác
                  </label>
                </div>
              </div>
            </div>
            <div className='mb-6 mr-4'>
              <div className='flex items-center'>
                <label className='w-1/3 pr-4 text-right text-gray-700'>
                  Ngày sinh
                </label>
                <div className='flex w-2/3'>
                  <select className='mr-4 rounded border border-gray-300 p-2'>
                    <option>Ngày</option>
                  </select>
                  <select className='mr-4 rounded border border-gray-300 p-2'>
                    <option>Tháng</option>
                  </select>
                  <select className='rounded border border-gray-300 p-2'>
                    <option>Năm</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              type='submit'
              className='rounded bg-red-500 px-4 py-2 text-white'
            >
              Lưu
            </button>
          </form>
        </div>
        {/* Right: Change Profile Picture */}
        <div className='mt-8 flex w-1/3 flex-col items-center'>
          <img
            src={user?.image || 'https://placehold.co/112x112'}
            alt='Profile'
            className='mb-4 h-28 w-28 rounded-full'
          />
          <button className='rounded border border-gray-300 px-4 py-2'>
            Chọn Ảnh
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
