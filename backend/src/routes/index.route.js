import authRoutes from "./auth.route";
import categoryRoutes from './category.route'

export default (app) => { 
	app.use("/auth", authRoutes);
	app.use("/categories", categoryRoutes);
}



