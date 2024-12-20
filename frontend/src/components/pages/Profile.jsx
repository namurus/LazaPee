const Profile = () => {
    return (
        <div className="flex flex-col md:flex-row p-4">
            <div className="w-full md:w-1/4 bg-white p-4 shadow-md">
                <div className="flex items-center mb-4">
                    <img src="https://placehold.co/50x50" alt="User avatar" className="rounded-full w-12 h-12"/>
                    <div className="ml-4">
                        <div className="font-bold">sorachan721</div>
                        <div className="text-sm text-gray-500"><i className="fas fa-pen"></i> Sửa Hồ Sơ</div>
                    </div>
                </div>
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
                            <a href="#" className="flex items-center text-gray-700">
                                <i className="fas fa-bell mr-2"></i> Cài Đặt Thông Báo
                            </a>
                        </li>
                        <li className="mb-2">
                            <a href="#" className="flex items-center text-gray-700">
                                <i className="fas fa-lock mr-2"></i> Những Thiết Lập Riêng Tư
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
                        <li className="mb-2">
                            <a href="#" className="flex items-center text-yellow-500">
                                <i className="fas fa-coins mr-2"></i> Shopee Xu
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="w-full md:w-3/4 bg-white p-4 shadow-md ml-0 md:ml-4 mt-4 md:mt-0">
                <h2 className="text-xl font-bold mb-2">Hồ Sơ Của Tôi</h2>
                <p className="text-gray-500 mb-4">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tên đăng nhập</label>
                        <input type="text" value="sorachan721" className="w-full p-2 border border-gray-300 rounded" disabled />
                        <p className="text-gray-500 text-sm">Tên Đăng nhập chỉ có thể thay đổi một lần.</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tên</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <div className="flex items-center">
                            <span className="flex-grow">so************@gmail.com</span>
                            <a href="#" className="text-blue-500 ml-2">Thay Đổi</a>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Số điện thoại</label>
                        <div className="flex items-center">
                            <span className="flex-grow">********19</span>
                            <a href="#" className="text-blue-500 ml-2">Thay Đổi</a>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Giới tính</label>
                        <div className="flex items-center">
                            <label className="mr-4">
                                <input type="radio" name="gender" className="mr-1" /> Nam
                            </label>
                            <label className="mr-4">
                                <input type="radio" name="gender" className="mr-1" /> Nữ
                            </label>
                            <label>
                                <input type="radio" name="gender" className="mr-1" /> Khác
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Ngày sinh</label>
                        <div className="flex">
                            <select className="p-2 border border-gray-300 rounded mr-2">
                                <option>Ngày</option>
                            </select>
                            <select className="p-2 border border-gray-300 rounded mr-2">
                                <option>Tháng</option>
                            </select>
                            <select className="p-2 border border-gray-300 rounded">
                                <option>Năm</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">Lưu</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;