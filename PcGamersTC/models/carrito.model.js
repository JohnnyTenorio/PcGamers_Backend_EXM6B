import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false },
    precio: { type: Number, required: true },
    imagen: { type: String, required: true },
    categoria: { type: String, required: true }
});

const Carrito = mongoose.model('Carrito', carritoSchema);

export default Carrito;
