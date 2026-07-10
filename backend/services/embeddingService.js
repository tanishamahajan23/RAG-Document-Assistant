import { VoyageAIClient } from "voyageai";

const client = new VoyageAIClient({

    apiKey: process.env.VOYAGE_API_KEY

});

async function generateEmbeddings(documents) {

    const texts = documents.map(document => document.pageContent);

    const result = await client.embed({

        model: "voyage-3-lite",

        input: texts

    });

    const embeddings = result.data.map(item => item.embedding);

    return embeddings;

}

export default generateEmbeddings;