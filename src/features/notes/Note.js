import { useNavigate } from 'react-router-dom'
import { memo} from "react";

import { useGetNotesQuery} from "./notesApiSlice";

const Note = ({ noteId }) => {

    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({data}) => ({
            note: data?.entities[noteId]
        })
    })

    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'short' })
        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <section className="note-container">
                <p className="note__title">{note.title}</p>
                <p className="note__creation">Created on {created} by <span className="note__author">{note.username}</span></p>
                <p className="note__text">{note.text}</p>
                <button onClick={handleEdit} className="text-button note__edit">Check out</button>
            </section>
        )

    } else return null
}

const memoizedNote = memo(Note);
export default memoizedNote