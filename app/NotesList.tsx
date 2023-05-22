import React from 'react';
import { Note } from '@/components/types';

interface NotesListProps {
    notes: Note[];
    onNoteClick: Function;
}

const NotesList: React.FC<NotesListProps> = ({notes, onNoteClick}) => {
    console.log(notes)
    return (
        <ul>
            {notes
                .filter((note) => !note.isDeleted)
                .map((note) => (
                    <li key={note._id} onClick={() => onNoteClick(note)}>
                        {note.title}
                    </li>
                ))}
        </ul>
    );
};

export default NotesList;