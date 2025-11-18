import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { conectarMongoDB } from "../db/cnn_mongodb.js";
import indexRoutes from "../routes/index.routes.js";

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 9000;

        this.middlewares();
        this.routes();
        this.dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static("public")); // para JS, CSS, imágenes
    }

    routes() {
        this.app.use("/api", indexRoutes);
    }

    async dbConnection() {
        await conectarMongoDB();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

export default Server;
