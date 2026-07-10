import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({

    chunkSize: 1000,

    chunkOverlap: 200

});

async function splitText(text) {

    const documents = await splitter.createDocuments([text]);

    // console.log(documents);

    return documents;

}

export default splitText;