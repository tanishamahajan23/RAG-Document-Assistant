import { Pinecone } from "@pinecone-database/pinecone";
import crypto from "crypto";

console.log("Top level:", process.env.PINECONE_API_KEY);


async function storeVectors(embeddings, documents,filename) {

    const pinecone = new Pinecone({

    apiKey: process.env.PINECONE_API_KEY

});

const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

   const vectors = documents.map((document, index) => ({

    id: crypto.randomUUID(),

    values: embeddings[index],

    metadata: {

        text: document.pageContent,

        filename,

        chunk: index + 1

    }

}));

await index.upsert({
    records: vectors
});

console.log(`Stored ${vectors.length} vectors in Pinecone.`);


}

export default storeVectors;