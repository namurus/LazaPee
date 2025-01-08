import authRoutes from './auth.route';
import customerCategoryRoutes from './category.route';
import productRoutes from './product.route';
import userRoutes from './user.route';
import isAdmin from '@/middlewares/isAdmin';
import adminCategoryRoutes from "./admin/category.route";

import cartRoutes from './cart.route'; 
import adminCAuthRoutes from "./admin/auth.route";
import adminProductRoutes from "./admin/product.route";
import orderRoutes from "./order.route";
import authentication from "@/middlewares/authentication";
import paymentRoutes from "./payment.route";
import shopRoutes from "./shop.route";
import adminVoucherRoutes from "./admin/voucher.route";
import searchRoutes from "./search.route";
import shopShipmentRoutes from "./shipment.route";
import voucherRoutes from './voucher.route';
import shopRevenueRoutes from './revenue.route';
import reviewRoutes from './review.route';

export default (app) => { 
	app.use("/auth", authRoutes);
	app.use("/products", productRoutes);
	app.use("/cart", cartRoutes);
	app.use("/search", searchRoutes);
	//router for shop
	app.use("/shop/shipment",shopShipmentRoutes);
	app.use("/shop/revenue", shopRevenueRoutes)
  	app.use('/user', userRoutes);
	app.use("/voucher", voucherRoutes)
	app.use("/review", reviewRoutes)

	//router for admin
	app.use('/admin/auth', adminCAuthRoutes);
	app.use('/admin/category', isAdmin, adminCategoryRoutes);
	app.use('/admin/product', isAdmin, adminProductRoutes);
	app.use('/admin/voucher', isAdmin, adminVoucherRoutes);

	app.use("/category", customerCategoryRoutes);

	app.use("/order", authentication, orderRoutes);

	app.use("/payment", authentication, paymentRoutes);

    app.use("/shop", shopRoutes);
};
