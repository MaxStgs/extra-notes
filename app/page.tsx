'use client';
import type {NextPage} from 'next';
import {useState, useEffect} from 'react';
import NotesList from './NotesList';
import NoteModal from '../components/NoteModal';
import {OnSaveNote, Note} from '@/components/types';
import '@/src/styles.css';

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

    const handleCloseModal = () => {
        setSelectedNote(null);
        setIsModalOpen(false);
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
            setNotes((prevNotes) => prevNotes.map((note) => (note._id === savedNote._id ? savedNote : note)));
        } else {
            setNotes((prevNotes) => [...prevNotes, savedNote]);
        }

        setIsModalOpen(false);
    };

    const handleDeleteNote = async (_id: number) => {
        setSelectedNote(null);

        // Закрываем модальное окно сразу после нажатия кнопки "Удалить"
        setIsModalOpen(false);

        // Вначале обновляем состояние notes
        setNotes((prevNotes) =>
            prevNotes.map((note) => (note._id === _id ? {...note, isDeleted: true} : note))
        );

        // Затем обновляем данные на сервере
        const requestOptions: RequestInit = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({_id, isDeleted: true}),
        };

        try {
            const res = await fetch('/api/notes', requestOptions);
            const updatedNote = await res.json();

            if (!res.ok) {
                throw new Error('Ошибка при обновлении заметки на сервере');
            }
        } catch (error) {
            console.error('Ошибка при удалении заметки:', error);

            // Восстанавливаем состояние notes в случае ошибки
            setNotes((prevNotes) =>
                prevNotes.map((note) => (note._id === _id ? {...note, isDeleted: false} : note))
            );
        }
    };

    return (
        <div>
            <h1>Приложение "На каждый день"</h1>
            <button onClick={() => setIsModalOpen(true)}>Создать заметку</button>
            <NotesList notes={notes} onNoteClick={handleNoteClick}/>
            <NoteModal key={selectedNote?._id ?? "new"} note={selectedNote} isOpen={isModalOpen} onClose={handleCloseModal}
                       onSave={handleSaveNote} onDelete={handleDeleteNote}/>
        </div>
    );
};

export default Page;