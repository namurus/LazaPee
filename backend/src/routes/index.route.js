import authRoutes from './auth.route';
import customerCategoryRoutes from './category.route';
import adminCategoryRoutes from './admin/category.route';
import productRoutes from './product.route';
import adminCAuthRoutes from './admin/auth.route';
import adminProductRoutes from './admin/product.route';
import cartRoutes from './cart.route';
import userRoutes from './user.route';
import isAdmin from '@/middlewares/isAdmin';
import authenticate from '@/middlewares/authentication';

export default (app) => {
	app.use('/auth', authRoutes);
	app.use('/products', productRoutes);
	app.use('/cart', cartRoutes);
	app.use('/user', authenticate, userRoutes);

	//router for admin
	app.use('/admin/auth', adminCAuthRoutes);
	app.use('/admin/category', isAdmin, adminCategoryRoutes);
	app.use('/admin/product', isAdmin, adminProductRoutes);

	app.use('/category', customerCategoryRoutes);
};
