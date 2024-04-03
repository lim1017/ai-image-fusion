import { PineconeClient } from "@pinecone-database/pinecone";

const pineconeClient = new PineconeClient();

await pineconeClient.init({
  apiKey: process.env.PINECONE_API_KEY,
  environment: process.env.PINECONE_ENVIRONEMENT,
});

console.log(pineconeClient, "pineconeClient in module");

export { pineconeClient };
