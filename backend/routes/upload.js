import express from "express";
import multer from "multer";

import extractText from "../services/pdfService.js";
import splitText from "../services/textSplitter.js";
import generateEmbeddings from "../services/embeddingService.js";
import storeVectors from "../config/pinecone.js";

const router = express.Router();

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "backend/uploads/");

    },

    filename: function (req, file, cb) {

        cb(null, Date.now() + "-" + file.originalname);

    }

});

const upload = multer({

    storage

});

router.post(

    "/",

    upload.single("document"),

    async (req, res) => {

        try {

            console.log("File received.");

            console.log(req.file);

            const text = await extractText(req.file.path);
            const documents = await splitText(text);
            const embedding = await generateEmbeddings(documents);
            const vector = await storeVectors(embedding, documents,req.file.originalname);

             res.status(200).json({

                success: true,

                message: "Document uploaded successfully."

            });
        }

        catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

);

export default router;