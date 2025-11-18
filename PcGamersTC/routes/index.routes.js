import { Router } from "express";
import carritoRoutes from "./carrito.routes.js";
import cotizacionRoutes from "./cotizacion.routes.js";

const router = Router();

router.use("/carrito", carritoRoutes);
router.use("/cotizacion", cotizacionRoutes);

export default router;
