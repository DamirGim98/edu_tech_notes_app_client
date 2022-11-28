import {useParams} from 'react-router-dom'
import EditUserForm from './EditUserForm'

import { useGetUsersQuery} from "./usersApiSlice";
import ClockLoader from 'react-spinners/ClockLoader'

const EditUser = () => {
    const {id} = useParams()

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({data}) => ({
            user: data?.entities[id]
        })
    })


    return (user ? <EditUserForm user={user}/> : <ClockLoader color={"#FFF"}/> )
}
export default EditUser