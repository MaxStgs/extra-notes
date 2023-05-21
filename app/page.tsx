'use client';
import type {NextPage} from 'next';
import {useState, useEffect} from 'react';
import NotesList from './NotesList';
import NoteModal from '../components/NoteModal';

interface Note {
    _id: number;
    title: string;
    description: string;
}

const Page: NextPage = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

    const fetchNotes = async () => {
        const res = await fetch('/api/notes');
        const data = await res.json();
        setNotes(data);
    };

    // Использование useEffect для вызова fetchNotes при монтировании компонента
    useEffect(() => {
        fetchNotes();
    }, []);

    const handleNoteClick = (note: Note) => {
        setSelectedNote(note);
        console.log(note);
        setIsModalOpen(true);
    };

    const handleSaveNote = async (newNote: OnSaveNote) => {
        const requestOptions: RequestInit = {
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: newNote.name,
                description: newNote.description,
                _id: newNote._id,
            }),
        };

        if (newNote._id) {
            requestOptions.method = 'PUT';
        } else {
            requestOptions.method = 'POST';
        }

        const res = await fetch('/api/notes', requestOptions);
        const savedNote = await res.json();

        if (newNote._id) {
            setNotes((prevNotes) => prevNotes.map((note) => (note._id === savedNote.id ? savedNote : note)));
        } else {
            setNotes((prevNotes) => [...prevNotes, savedNote]);
        }

        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>Приложение "На каждый день"</h1>
            <button onClick={() => setIsModalOpen(true)}>Создать заметку</button>
            <NotesList notes={notes} onNoteClick={handleNoteClick}/>
            <NoteModal note={selectedNote} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
                       onSave={handleSaveNote}/>
        </div>
    );
};

export default Page;