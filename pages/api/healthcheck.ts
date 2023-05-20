import {MongoClient} from 'mongodb';
import {NextApiRequest, NextApiResponse} from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MONGODB_URI is not defined');
        }

        const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

        await client.connect();
        await client.close();

        res.status(200).json({message: 'Connection to MongoDB is successful'});
    } catch (error) {
        res.status(500).json({message: 'Error connecting to MongoDB', error: error.message});
    }
};

export default handler;