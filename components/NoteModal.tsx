import React, { useState } from 'react';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    console.log('Note submitted:', { name, description });
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
      <button onClick={onClose}>Закрыть</button>
    </div>
    );
};

export default NoteModal;