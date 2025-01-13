import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SidebarMaincontentLayout from '../templates/SidebarMaincontentLayout';
import CurrencyFormatter from '../../helpers/CurrencyFormatter';

function AdminViewOrderDetail() {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const token = localStorage.getItem('ADMIN_ACCESS_TOKEN');
        const response = await axios.get(
          'https://lazapee-jivl.onrender.com/admin/order',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const order = response.data.data.find(
          (item) => item.id === parseInt(id)
        );

        console.log('id:', id);

        console.log('Order:', response.data.data);  
        console.log('Order:', order);

        if (order) {
          setOrderDetail(order);
        } else {
          console.error('Order not found');
        }
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (!orderDetail) {
    return (
      <SidebarMaincontentLayout>
        <div className="p-4">
          <p>Đang tải thông tin đơn hàng...</p>
        </div>
      </SidebarMaincontentLayout>
    );
  }

  const {
    order,
    sku: { product },
  } = orderDetail;

  const renderCustomerInfo = () => (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Thông tin khách hàng</h2>
      <p><strong>Họ và tên:</strong> {order.customer.fullName}</p>
      <p><strong>Email:</strong> {order.customer.email}</p>
      <p><strong>Số điện thoại:</strong> {order.customer.phone}</p>
      <p><strong>Địa chỉ:</strong> {order.customer.address}</p>
    </div>
  );

  const renderOrderInfo = () => (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Thông tin đơn hàng</h2>
      <p><strong>ID Đơn hàng:</strong> {order.id}</p>
      <p><strong>Trạng thái:</strong> {order.status}</p>
      <p><strong>Tổng tiền:</strong> {CurrencyFormatter.formatWithLocaleInfo(order.totalAmount, 'VND')}</p>
      <p><strong>Địa chỉ giao hàng:</strong> {order.shippingAddress}</p>
      <p><strong>Hình thức vận chuyển:</strong> {order.shippingType}</p>
      <p><strong>Phương thức thanh toán:</strong> {order.paymentMethod}</p>
      <p><strong>Đơn vị vận chuyển:</strong> {order.shippingCompany}</p>
      <p><strong>Phí vận chuyển:</strong> {CurrencyFormatter.formatWithLocaleInfo(order.shippingFee, 'VND')}</p>
      <p><strong>Ngày đặt hàng:</strong> {new Date(order.createdAt).toLocaleString()}</p>
    </div>
  );

  const renderProductInfo = () => (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Thông tin sản phẩm</h2>
      <p><strong>Tên sản phẩm:</strong> {product.productName}</p>
      <p><strong>Màu sắc:</strong> {orderDetail.sku.color}</p>
      <p><strong>Số lượng:</strong> {orderDetail.quantity}</p>
      <p><strong>Giá:</strong> {CurrencyFormatter.formatWithLocaleInfo(orderDetail.price, 'VND')}</p>
    </div>
  );

  return (
    <SidebarMaincontentLayout>
      <div className="p-4">
        <button
          className="mb-4 text-blue-600 underline"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
        {renderOrderInfo()}
        {renderCustomerInfo()}
        {renderProductInfo()}
      </div>
    </SidebarMaincontentLayout>
  );
}

export default AdminViewOrderDetail;
