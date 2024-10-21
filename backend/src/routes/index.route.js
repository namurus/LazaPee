import authRoutes from "./auth.route";
import adminRoutes from "./admin.route";

export default (app) => { 
	app.use("/auth", authRoutes);
	app.use("/admin/auth", adminRoutes);
}
