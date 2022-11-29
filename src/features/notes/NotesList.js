import {useGetNotesQuery} from "./notesApiSlice"
import Note from "./Note"
import useAuth from "../../hooks/useAuth";

const NotesList = () => {
    const {username, isAdmin, isManager} = useAuth()

    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const {ids, entities} = notes

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(noteId => entities[noteId].username === username)
        }

        const startedNotes = ids?.length && filteredIds.filter(noteId => entities[noteId].completed === 1).map(noteId =>
            <Note key={noteId} noteId={noteId}/>)
        const inProgressNotes = ids?.length && filteredIds.filter(noteId => entities[noteId].completed === 2).map(noteId =>
            <Note key={noteId} noteId={noteId}/>)
        const completedNotes = ids?.length && filteredIds.filter(noteId => entities[noteId].completed === 3).map(noteId =>
            <Note key={noteId} noteId={noteId}/>)
        content = (
            <div className="list-container">
                <div className="list">
                    <p className="list__title">Not started yet</p>
                    {startedNotes}
                </div>
                <div className="list">
                    <p className="list__title">In progress</p>
                    {inProgressNotes}
                </div>
                <div className="list">
                    <p className="list__title">Completed</p>
                    {completedNotes}
                </div>
            </div>
        )
    }

    return content
}
export default NotesList