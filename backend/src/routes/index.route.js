import authRoutes from "./auth.route";
import categoryRoutes from './category.route'
import adminRoutes from "./admin.route";
export default (app) => { 
	app.use("/auth", authRoutes);
	app.use("/admin", adminRoutes);
	app.use("/categories", categoryRoutes);
}



