import { Pinecone } from "@pinecone-database/pinecone";
import { VoyageAIClient } from "voyageai";

const client = new VoyageAIClient({

    apiKey: process.env.VOYAGE_API_KEY

});

async function generateQuestionEmbedding(question) {
    const result = await client.embed({

        model: "voyage-3-lite",

        input: question

    });

    return result.data[0].embedding;

}

async function search(question) {

    const pinecone = new Pinecone({

        apiKey: process.env.PINECONE_API_KEY

    });

    const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

    const embedding = await generateQuestionEmbedding(question);

    const results = await index.query({

        vector: embedding,

        topK: 4,

        includeMetadata: true

    });

    return results.matches;

}

export default search;