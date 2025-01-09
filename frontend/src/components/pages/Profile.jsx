import { NavLink, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMe } from '../../api/user/auth';

const Profile = () => {
  const [user, setUser] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (err) {
        console.error('Failed to fetch user data', err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='flex flex-col p-4 md:flex-row px-4 md:px-20'>
      <div className='w-full bg-gray-100 p-4 lg:px-12 shadow-md md:w-1/4'>
        <div className='mb-5 flex items-center'>
          <img
            src={user?.avatar || 'https://placehold.co/50x50'}
            alt='image'
            className='h-12 w-12 rounded-full object-cover'
          />
          <div className='ml-4'>
            <div className='font-bold'>
              {user?.username || 'Tên Người Dùng'}
            </div>
            <div className='text-sm text-gray-500'>
              <NavLink
                to='/user/account/profile'
                className='text-blue-500'
              >
                <i className='fas fa-pen'></i> Sửa Hồ Sơ
              </NavLink>
            </div>
          </div>
        </div>
        <hr className='mb-4 mt-4 border-gray-300' />
        <nav>
          <ul>
            <li className='mb-4'>
              <NavLink
                to='/user/account/profile'
                className={({ isActive }) =>
                  isActive ? 'font-bold text-blue-500' : 'text-gray-700'
                }
              >
                <i className='fas fa-user mr-2'></i> Tài Khoản Của Tôi
              </NavLink>
            </li>
            <li className='mb-4'>
              <NavLink
                to='/user/account/profile'
                className={({ isActive }) =>
                  isActive ? 'font-bold text-blue-500' : 'text-gray-700'
                }
              >
                <i className='fas fa-id-card mr-2'></i> Hồ Sơ
              </NavLink>
            </li>
            <li className='mb-4'>
              <NavLink
                to='/user/account/address'
                className={({ isActive }) =>
                  isActive ? 'font-bold text-blue-500' : 'text-gray-700'
                }
              >
                <i className='fas fa-map-marker-alt mr-2'></i> Địa Chỉ
              </NavLink>
            </li>
            <li className='mb-4'>
              <NavLink
                to='/user/account/change-password'
                className={({ isActive }) =>
                  isActive ? 'font-bold text-blue-500' : 'text-gray-700'
                }
              >
                <i className='fas fa-key mr-2'></i> Đổi Mật Khẩu
              </NavLink>
            </li>
            <li className='mb-4'>
              <NavLink
                to='/user/orders'
                className={({ isActive }) =>
                  isActive ? 'font-bold text-blue-500' : 'text-gray-700'
                }
              >
                <i className='fas fa-box mr-2'></i> Đơn Mua
              </NavLink>
            </li>
            <li className='mb-4'>
              <NavLink
                to='/user/account/vouchers'
                className={({ isActive }) =>
                  isActive ? 'font-bold text-blue-500' : 'text-gray-700'
                }
              >
                <i className='fas fa-ticket-alt mr-2'></i> Kho Voucher
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className='mt-4 w-full bg-gray-100 p-4 shadow-md md:ml-4 md:mt-0 md:w-3/4'>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
