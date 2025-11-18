import { Router } from "express";
import { getCarrito, postCarrito, deleteCarrito, putCarrito, getCarritoById } from "../controllers/carrito.controller.js";

const router = Router();

router.get("/:id", getCarritoById);
router.get("/", getCarrito);
router.post("/", postCarrito);
router.delete("/:id", deleteCarrito);
router.put("/:id", putCarrito); 


export default router;
