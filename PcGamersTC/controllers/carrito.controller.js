import Carrito from "../models/carrito.model.js";
import mongoose from "mongoose";

export const getCarritoById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Id no válido" });

    try {
        const item = await Carrito.findById(id, { __v: 0 });
        if (!item) return res.status(404).json({ msg: "Item no encontrado" });
        res.status(200).json({ item });
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener el item" });
    }
};

export const getCarrito = async (req, res) => {
    try {
        const items = await Carrito.find({}, { __v: 0 });
        if (items.length === 0) {
            return res.status(404).json({ msg: "El carrito está vacío" });
        }
        res.status(200).json({ items });
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener el carrito" });
    }
};

export const postCarrito = async (req, res) => {
    try {
        const nuevoItem = new Carrito(req.body);
        const error = nuevoItem.validateSync();
        if (error) {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ msg: messages });
        }
        await nuevoItem.save();
        res.status(201).json({ msg: "Item agregado al carrito", item: nuevoItem });
    } catch (error) {
        res.status(500).json({ msg: "Error al agregar al carrito" });
    }
};

export const deleteCarrito = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Id no válido" });
    const item = await Carrito.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ msg: "Item no encontrado" });
    res.status(200).json({ msg: "Item eliminado", item });
};

export const putCarrito = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Id no válido" });

    try {
        const item = await Carrito.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ msg: "Item no encontrado" });
        res.status(200).json({ msg: "Item actualizado", item });
    } catch (error) {
        res.status(500).json({ msg: "Error al actualizar el item" });
    }
};
