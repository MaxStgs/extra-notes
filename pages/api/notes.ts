import type {NextApiRequest, NextApiResponse} from 'next';
import {createRouter} from 'next-connect';
import {connectToDatabase} from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

const router = createRouter<NextApiRequest, NextApiResponse>();

const handler = router.get(async (req: NextApiRequest, res: NextApiResponse) => {
    const {client, dbName} = await connectToDatabase();
    const notesCollection = client.db(dbName).collection('notes-collection');
    const notes = await notesCollection.find({}).toArray();
    res.status(200).json(notes);
}).post(async (req: NextApiRequest, res: NextApiResponse) => {
    const {title, description} = req.body;
    const {client, dbName} = await connectToDatabase();
    const notesCollection = client.db(dbName).collection('notes-collection');
    const result = await notesCollection.insertOne({title, description});
    const insertedNote = await notesCollection.findOne({_id: result.insertedId});
    res.status(201).json(insertedNote);
}).put(async (req, res) => {
    const { _id, title, description } = req.body;
    const { client, dbName } = await connectToDatabase();
    const notesCollection = client.db(dbName).collection('notes');
    const filter = { _id: new ObjectId(_id) };
    const update = { $set: { title, description } };
    await notesCollection.updateOne(filter, update);
    const updatedNote = await notesCollection.findOne(filter);
    res.status(200).json(updatedNote);
});

export default router.handler({
    onError: (err, req, res) => {
        console.error(err.stack);
        res.status(err.statusCode || 500).end(err.message);
    },
});