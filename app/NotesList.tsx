import React from 'react';
import {TFunc} from "ts-interface-checker";

interface Note {
  _id: number;
  title: string;
  description: string;
}

interface NotesListProps {
  notes: Note[];
  onNoteClick: Function;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onNoteClick }) => {
  console.log(notes)
  return (
    <ul>
      {notes.map((note) => (
        <li key={note._id} onClick={() => onNoteClick(note)}>
          {note.title}
        </li>
      ))}
    </ul>
    );
};

export default NotesList;