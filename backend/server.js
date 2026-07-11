import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import uploadRoutes from "./routes/upload.js";
import askRoutes from "./routes/ask.js";
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use("/upload", uploadRoutes);

app.use("/ask", askRoutes);

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});

app.get("/",(req,res)=>{

    res.send({ message: "Upload endpoint" }); 
    console.log("Upload endpoint hit");

});