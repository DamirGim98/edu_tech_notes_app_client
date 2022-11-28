import {useParams} from 'react-router-dom'
import {useGetUsersQuery} from '../users/usersApiSlice'
import {useGetNotesQuery} from "./notesApiSlice";
import EditNoteForm from './EditNoteForm'
import ClockLoader from "react-spinners/ClockLoader";
import useAuth from "../../hooks/useAuth";


const EditNote = () => {
    const {id} = useParams()

    const {username, isManager, isAdmin} = useAuth();

    const {note} = useGetNotesQuery("notesList", {
        selectFromResult: ({data}) => ({
            note: data?.entities[id]
        })
    })
    const {users} = useGetUsersQuery("usersList", {
        selectFromResult: ({data}) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })

    if (!isManager && !isAdmin) {
        if(note.username !== username) {
            return <p className='errmsg'>No access</p>
        }
    }

    return note && users ? <EditNoteForm note={note} users={users}/> : <ClockLoader color={'#FFF'}/>

}
export default EditNote