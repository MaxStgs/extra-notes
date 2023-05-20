import {MongoClient} from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedClient = null;

export async function connectToDatabase() {
    if (cachedClient) {
        return {client: cachedClient, dbName};
    }

    const client = await MongoClient.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

    cachedClient = client;
    return {client: cachedClient, dbName};
}