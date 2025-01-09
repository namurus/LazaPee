import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileInfo = () => {
  const [user, setUser] = useState(null);
  const [gender, setGender] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile');
        const data = response.data.data;
        setUser(data);
        setGender(data.gender || '');
        setFullName(data.fullName || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Update user profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setError(null);

    try {
      const payload = {
        fullName,
        email,
        phone,
        gender,
      };

      await axios.patch('/api/user/update', payload);
      setSuccessMessage('Profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    }
  };

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
          <form onSubmit={handleSubmit}>
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
                <label className='w-1/3 pr-4 text-right text-gray-700'>Tên</label>
                <div className='w-2/3'>
                  <input
                    type='text'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className='w-full rounded border border-gray-300 p-2'
                  />
                </div>
              </div>
            </div>
            <div className='mb-6 mr-4'>
              <div className='flex items-center'>
                <label className='w-1/3 pr-4 text-right text-gray-700'>Email</label>
                <div className='w-2/3'>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full rounded border border-gray-300 p-2'
                  />
                </div>
              </div>
            </div>
            <div className='mb-6 mr-4'>
              <div className='flex items-center'>
                <label className='w-1/3 pr-4 text-right text-gray-700'>
                  Số điện thoại
                </label>
                <div className='w-2/3'>
                  <input
                    type='text'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className='w-full rounded border border-gray-300 p-2'
                  />
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
            <button
              type='submit'
              className='rounded bg-red-500 px-4 py-2 text-white'
            >
              Lưu
            </button>
          </form>
          {successMessage && <p className='text-green-500 mt-4'>{successMessage}</p>}
          {error && <p className='text-red-500 mt-4'>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
