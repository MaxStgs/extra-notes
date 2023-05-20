import type {NextApiRequest, NextApiResponse} from 'next';
import {createRouter} from 'next-connect';
import {connectToDatabase} from '../../lib/mongodb';

const router = createRouter<NextApiRequest, NextApiResponse>();

const handler = router.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const {client, dbName} = await connectToDatabase();
    const notesCollection = client.db(dbName).collection('notes-collection');
    const notes = await notesCollection.find({}).toArray();
    res.status(200).json(notes);
}).post(async (req: NextApiRequest, res: NextApiResponse) => {
    const {title, description} = req.body;
    const {client, dbName} = await connectToDatabase();
    const notesCollection = client.db(dbName).collection('notes');
    const result = await notesCollection.insertOne({title, description});
    const insertedNote = await notesCollection.findOne({_id: result.insertedId});
    res.status(201).json(insertedNote);
});

export default router.handler({
    onError: (err, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});