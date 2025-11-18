import Cotizacion from "../models/cotizacion.model.js";
import mongoose from "mongoose";

export const getCotizaciones = async (req, res) => {
    try {
        const items = await Cotizacion.find({}, { __v: 0 });
        if (!items.length) return res.status(404).json({ msg: "No hay cotizaciones" });
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener cotizaciones" });
    }
};

export const getCotizacionById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Id no válido" });

    try {
        const item = await Cotizacion.findById(id, { __v: 0 });
        if (!item) return res.status(404).json({ msg: "Cotización no encontrada" });
        res.status(200).json({ item });
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener la cotización" });
    }
};

export const postCotizacion = async (req, res) => {
    try {
        const nuevaCotizacion = new Cotizacion(req.body);
        const error = nuevaCotizacion.validateSync();
        if (error) {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ msg: messages });
        }
        await nuevaCotizacion.save();
        res.status(201).json({ msg: "Cotización agregada", item: nuevaCotizacion });
    } catch (error) {
        res.status(500).json({ msg: "Error al agregar cotización" });
    }
};

export const deleteCotizacion = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Id no válido" });

    try {
        const item = await Cotizacion.findByIdAndDelete(id);
        if (!item) return res.status(404).json({ msg: "Cotización no encontrada" });
        res.status(200).json({ msg: "Cotización eliminada", item });
    } catch (error) {
        res.status(500).json({ msg: "Error al eliminar cotización" });
    }
};

export const putCotizacion = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Id no válido" });

    try {
        const item = await Cotizacion.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ msg: "Cotización no encontrada" });
        res.status(200).json({ msg: "Cotización actualizada", item });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar cotización" });
    }
};
