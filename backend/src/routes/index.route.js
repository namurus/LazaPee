import authRoutes from "./auth.route";
import productRoutes from "./product.route";
import cartRoutes from "./cart.route";

export default (app) => { 
	app.use("/auth", authRoutes);
	app.use("/products", productRoutes);
	app.use("/cart", cartRoutes);
}

