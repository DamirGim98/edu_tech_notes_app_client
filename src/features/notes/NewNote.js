import {useGetUsersQuery} from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm"
import ClockLoader from "react-spinners/ClockLoader";

const NewNote = () => {
    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({data}) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })


    if (!users?.length) return <ClockLoader color={"#FFF"}/>

    return (<NewNoteForm users={users}/>)
};

export default NewNote;