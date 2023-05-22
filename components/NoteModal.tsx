import React, {useEffect, useState} from 'react';
import {OnSaveNote, Note} from './types';

interface NoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (note: OnSaveNote) => void;
    onDelete: (_id: number) => void;
    note: Note | null;
}

const NoteModal: React.FC<NoteModalProps> = ({note, isOpen, onClose, onSave, onDelete}) => {
    const [name, setName] = useState(note?.title || '');
    const [description, setDescription] = useState(note?.description || '');

    useEffect(() => {
        setName(note?.title || '');
        setDescription(note?.description || '');
    }, [note]);

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
        resetFormFields();
        onClose();
    };

    const resetFormFields = () => {
        setName('');
        setDescription('');
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2 className="modal-title">{note?._id ? "Редактировать заметку" : "Создать заметку"}</h2>
                <div className="form-group">
                    <label htmlFor="title">Заголовок:</label>
                    <input
                        type="text"
                        id="title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Описание:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <button onClick={handleSubmit}>{note?._id ? "Сохранить" : "Создать"}</button>
                {note?._id && <button onClick={() => onDelete(note._id)}>Удалить</button>}
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default NoteModal;