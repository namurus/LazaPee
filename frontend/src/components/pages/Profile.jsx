import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [view, setView] = useState('profile');

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
    <div className='flex flex-col p-4 md:flex-row'>
      <div className='w-full bg-gray-100 p-4 pl-12 shadow-md md:w-1/4'>
        <div className='mb-5 flex items-center'>
          <img
            src='https://placehold.co/50x50'
            alt='User avatar'
            className='h-12 w-12 rounded-full'
          />
          <div className='ml-4'>
            <div className='font-bold'>{user?.username || ''}</div>
            <div className='text-sm text-gray-500'>
              <i className='fas fa-pen'></i> Sửa Hồ Sơ
            </div>
          </div>
        </div>
        <hr className='mb-4 mt-4 border-gray-300' />
        <nav>
          <ul>
            <li className='mb-4'>
              <a href='#' className='flex items-center text-blue-500'>
                <i className='fas fa-user mr-2'></i> Tài Khoản Của Tôi
              </a>
            </li>
            <li className='mb-4'>
              <button
                className='flex items-center text-gray-700'
                onClick={() => setView('profile')}
              >
                <i className='fas fa-id-card mr-2'></i> Hồ Sơ
              </button>
            </li>
            <li className='mb-4'>
              <a href='#' className='flex items-center text-gray-700'>
                <i className='fas fa-university mr-2'></i> Ngân Hàng
              </a>
            </li>
            <li className='mb-4'>
              <button
                className='flex items-center text-gray-700'
                onClick={() => setView('address')}
              >
                <i className='fas fa-map-marker-alt mr-2'></i> Địa Chỉ
              </button>
            </li>
            <li className='mb-4'>
              <a href='#' className='flex items-center text-gray-700'>
                <i className='fas fa-key mr-2'></i> Đổi Mật Khẩu
              </a>
            </li>
            <li className='mb-4'>
              <a href='#' className='flex items-center text-blue-500'>
                <i className='fas fa-box mr-2'></i> Đơn Mua
              </a>
            </li>
            <li className='mb-4'>
              <a href='#' className='flex items-center text-red-500'>
                <i className='fas fa-bell mr-2'></i> Thông Báo
              </a>
            </li>
            <li className='mb-4'>
              <a href='#' className='flex items-center text-red-500'>
                <i className='fas fa-ticket-alt mr-2'></i> Kho Voucher
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className='ml-0 mt-4 w-full bg-gray-100 p-4 shadow-md md:ml-4 md:mt-0 md:w-3/4'>
        {view === 'profile' && (
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
        )}
        {view === 'address' && (
          <>
            <h2 className='text-xl font-bold'>Địa Chỉ Của Tôi</h2>
            <p className='mb-4 text-gray-500'>Quản lý địa chỉ của bạn</p>
            <hr className='mb-6 mt-4 border-gray-300' />
            <div className='flex justify-end'>
              <button className='rounded bg-green-500 px-4 py-2 text-white'>
                Thêm Địa Chỉ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
