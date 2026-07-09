const CHUNK_SIZE = 800;

function splitIntoChunks(text) {

    const chunks = [];

    for (let i = 0; i < text.length; i += CHUNK_SIZE) {

        chunks.push(text.slice(i, i + CHUNK_SIZE));

    }

    return chunks;

}

export default splitIntoChunks;