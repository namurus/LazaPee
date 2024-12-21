import { useState } from 'react';


const Profile = () => {
    const [gender, setGender] = useState('');

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    return (
        <div className="flex flex-col md:flex-row p-4">
            <div className="w-full md:w-1/4 bg-gray-100 p-4 shadow-md pl-12">
                <div className="flex items-center mb-5">
                    <img src="https://placehold.co/50x50" alt="User avatar" className="rounded-full w-12 h-12" />
                    <div className="ml-4">
                        <div className="font-bold">sorachan721</div>
                        <div className="text-sm text-gray-500">
                            <i className="fas fa-pen"></i> Sửa Hồ Sơ
                        </div>
                    </div>
                </div>
                <hr className="mt-4 mb-4 border-gray-300" />
                <nav>
                    <ul>
                        <li className="mb-2">
                            <a href="#" className="flex items-center text-blue-500">
                                <i className="fas fa-user mr-2"></i> Tài Khoản Của Tôi
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="flex items-center text-red-500">
                                <i className="fas fa-id-card mr-2"></i> Hồ Sơ
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="flex items-center text-gray-700">
                                <i className="fas fa-university mr-2"></i> Ngân Hàng
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="flex items-center text-gray-700">
                                <i className="fas fa-map-marker-alt mr-2"></i> Địa Chỉ
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="flex items-center text-gray-700">
                                <i className="fas fa-key mr-2"></i> Đổi Mật Khẩu
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="flex items-center text-blue-500">
                                <i className="fas fa-box mr-2"></i> Đơn Mua
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="flex items-center text-red-500">
                                <i className="fas fa-bell mr-2"></i> Thông Báo
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="flex items-center text-red-500">
                                <i className="fas fa-ticket-alt mr-2"></i> Kho Voucher
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="w-full md:w-3/4 bg-gray-100 p-4 shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
                <h2 className="text-xl font-bold">Hồ Sơ Của Tôi</h2>
                <p className="text-gray-500 mb-4">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                <hr className="mt-4 mb-6 border-gray-300" />
                <div className="flex">
                    {/* Left: User Information */}
                    <div className="w-2/3 pr-4 border-r border-gray-300">
                        <form>
                            <div className="mb-6 mr-4">
                                <div className="flex items-center">
                                    <label className="w-1/3 text-right pr-4 text-gray-700">Tên đăng nhập</label>
                                    <div className="w-2/3">
                                        <input
                                            type="text"
                                            value="sorachan721"
                                            className="w-full p-2 border border-gray-300 rounded"
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 mr-4">
                                <div className="flex items-center">
                                    <label className="w-1/3 text-right pr-4 text-gray-700">Tên</label>
                                    <div className="w-2/3">
                                        <input
                                            type="text"
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 mr-4">
                                <div className="flex items-center">
                                    <label className="w-1/3 text-right pr-4 text-gray-700">Email</label>
                                    <div className="w-2/3 flex items-center">
                                        <span className="flex-grow">so************@gmail.com</span>
                                        <a href="#" className="text-blue-500 ml-4">Thay đổi</a>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 mr-4">
                                <div className="flex items-center">
                                    <label className="w-1/3 text-right pr-4 text-gray-700">Số điện thoại</label>
                                    <div className="w-2/3 flex items-center">
                                        <span className="flex-grow">********19</span>
                                        <a href="#" className="text-blue-500 ml-4">Thay đổi</a>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 mr-4">
                                <div className="flex items-center">
                                    <label className="w-1/3 text-right pr-4 text-gray-700">Giới tính</label>
                                    <div className="w-2/3 flex items-center">
                                        <label className="flex items-center mr-6">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="male"
                                                checked={gender === 'male'}
                                                onChange={handleGenderChange}
                                                className="mr-4"
                                            />
                                            Nam
                                        </label>
                                        <label className="flex items-center mr-6">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="female"
                                                checked={gender === 'female'}
                                                onChange={handleGenderChange}
                                                className="mr-4"
                                            />
                                            Nữ
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="gender"
                                                value="other"
                                                checked={gender === 'other'}
                                                onChange={handleGenderChange}
                                                className="mr-4"
                                            />
                                            Khác
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-6 mr-4">
                                <div className="flex items-center">
                                    <label className="w-1/3 text-right pr-4 text-gray-700">Ngày sinh</label>
                                    <div className="w-2/3 flex">
                                        <select className="p-2 border border-gray-300 rounded mr-4">
                                            <option>Ngày</option>
                                        </select>
                                        <select className="p-2 border border-gray-300 rounded mr-4">
                                            <option>Tháng</option>
                                        </select>
                                        <select className="p-2 border border-gray-300 rounded">
                                            <option>Năm</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Lưu</button>
                        </form>
                    </div>
                    {/* Right: Change Profile Picture */}
                    <div className="w-1/3 flex flex-col items-center mt-8">
                        <img
                            src="https://placehold.co/112x112"
                            alt="Profile"
                            className="w-28 h-28 rounded-full mb-4"
                        />
                        <button className="border border-gray-300 px-4 py-2 rounded">
                            Chọn Ảnh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;