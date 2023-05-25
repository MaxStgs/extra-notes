import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
    if (cachedClient) {
        return { client: cachedClient, dbName };
    }

    const client = await MongoClient.connect(uri);

    cachedClient = client;
    return { client, dbName };
}