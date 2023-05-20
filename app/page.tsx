'use client';
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import NotesList from './NotesList';
import NoteModal from '../components/NoteModal';

interface Note {
  id: number;
  title: string;
  description: string;
}

const Page: NextPage = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchNotes = async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();
    setNotes(data);
  };

  // Использование useEffect для вызова fetchNotes при монтировании компонента
  useEffect(() => {
    fetchNotes();
    }, []);

  const handleSaveNote = async (newNote: { name: string; description: string }) => {
    const res = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newNote.name, description: newNote.description }),
    });

    const savedNote = await res.json();
    setNotes((prevNotes) => [...prevNotes, savedNote]);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Приложение "На каждый день"</h1>
      <button onClick={() => setIsModalOpen(true)}>Создать заметку</button>
      <NotesList notes={notes} />
      <NoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveNote} />
    </div>
    );
};

export default Page;