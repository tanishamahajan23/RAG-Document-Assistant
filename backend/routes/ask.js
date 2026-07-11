import express from "express";

import search from "../services/question.js";
import generateAnswer from "../services/aiService.js";

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const question = req.body.question;
        const matches = await search(question);

        
        const context = matches.map(match => match.metadata.text).join("\n\n");

        const answer = await generateAnswer(
          question,
          context
        );

        console.log("Answer generated:", answer);

        res.status(200).json({

        success: true,

        answer: answer

    });

}
    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

});

export default router;