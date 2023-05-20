import React from 'react';

interface Note {
  _id: number;
  title: string;
  description: string;
}

interface NotesListProps {
  notes: Note[];
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  console.log(notes)
  return (
    <ul>
      {notes.map((note) => (
        <li key={note._id}>
          {note.title}
        </li>
      ))}
    </ul>
    );
};

export default NotesList;