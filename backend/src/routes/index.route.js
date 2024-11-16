import authRoutes from "./auth.route";
import categoryRoutes from './category.route'
import adminCategoryRoutes from "./admin/category.route";
import productRoutes from './product.route';
import cartRoutes from './cart.route'; 
import adminCAuthRoutes from "./admin/auth.route";
import adminProductRoutes from "./admin/product.route";
export default (app) => { 
	app.use("/auth", authRoutes);
	app.use("/categories", categoryRoutes);
	app.use("/products", productRoutes);
	app.use("/cart", cartRoutes);


	//router for admin
	app.use("/admin/auth", adminCAuthRoutes);
	app.use("/admin/category", adminCategoryRoutes);
	app.use("/admin/product", adminProductRoutes);
}
