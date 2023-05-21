import React, {useEffect, useState} from 'react';
import { OnSaveNote } from './types';

interface Note {
  _id: number;
  title: string;
  description: string;
} 

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: OnSaveNote) => void;
  note: Note;
}

const NoteModal: React.FC<NoteModalProps> = ({ note, isOpen, onClose, onSave }) => {
  const [name, setName] = useState(note?.title || '');
  const [description, setDescription] = useState(note?.description || '');

  console.log(`NoteModal: ${note}, ${name}, ${description}`);

  const handleSubmit = () => {
      onSave({
          _id: note?._id,
          name,
          description,
      });
    setName('');
    setDescription('');
    onClose();
  };

  useEffect(() => {
    setName(note?.title || '');
    setDescription(note?.description || '');
  }, [note]);

  const handleClose = () => {
    setName('');
    setDescription('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <h3>Заметка</h3>
      <label>
        Имя заметки:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Описание заметки:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <br />
      <p>Просмотров: 1000</p>
      <button onClick={handleSubmit}>Сохранить</button>
      <button onClick={handleClose}>Закрыть</button>
    </div>
    );
};

export default NoteModal;