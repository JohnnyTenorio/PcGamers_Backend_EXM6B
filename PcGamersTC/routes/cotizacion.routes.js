import { Router } from "express";
import { getCotizaciones, postCotizacion, deleteCotizacion, putCotizacion, getCotizacionById } from "../controllers/cotizacion.controller.js";

const router = Router();

router.get("/", getCotizaciones);
router.get("/:id", getCotizacionById);
router.post("/", postCotizacion);
router.delete("/:id", deleteCotizacion);
router.put("/:id", putCotizacion);

export default router;
