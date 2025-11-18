import mongoose from "mongoose";

const componenteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true }
});

const cotizacionSchema = new mongoose.Schema({
    cliente: { type: String, required: true },
    componentes: [componenteSchema],
    total: { type: Number, required: true },
    categoria: { type: String, default: "pc" },
    fecha: { type: Date, default: Date.now }
});

const Cotizacion = mongoose.model("Cotizacion", cotizacionSchema);

export default Cotizacion;
