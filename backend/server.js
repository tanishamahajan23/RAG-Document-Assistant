import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use("/upload", uploadRoutes);

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});