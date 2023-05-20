'use client';

import type { NextPage } from 'next';
import { useState } from 'react';
import NotesList from './NotesList';
import NoteModal from '../components/NoteModal';

const generateNotes = () => {
  const notes = [...Array(10).keys()].map((i) => ({
    id: i,
    title: `Заметка - ${i}`,
  }));
  return notes;
};

const Page: NextPage = () => {
  const notes = generateNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h1>Приложение "На каждый день"</h1>
      <button onClick={() => setIsModalOpen(true)}>Создать заметку</button>
      <NotesList notes={notes} />
      <NoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
    );
};

export default Page;