import { Pinecone } from "@pinecone-database/pinecone";

async function storeVectors(embeddings, documents,filename) {

    const pinecone = new Pinecone({

    apiKey: process.env.PINECONE_API_KEY

});

const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

await index.deleteAll();

   const vectors = documents.map((document, index) => ({

    id: `${filename}-${index + 1}`,

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