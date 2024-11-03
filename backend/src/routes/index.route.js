import authRoutes from "./auth.route";
import categoryRoutes from './category.route'
import adminCategoryRoutes from "./admin/category.route";
import adminCAuthRoutes from "./admin/auth.route";
export default (app) => { 
	app.use("/auth", authRoutes);
	app.use("/categories", categoryRoutes);


	//router for admin
	app.use("/admin/auth", adminCAuthRoutes);
	app.use("/admin/category", adminCategoryRoutes);
}



