import { useParams } from 'react-router-dom'
import ClockLoader from 'react-spinners/ClockLoader'
import EditUserForm from './EditUserForm'

import { useGetUsersQuery } from './usersApiSlice'

function EditUser() {
  const { id } = useParams()

  const { user } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  })

  return user ? <EditUserForm user={user} /> : <ClockLoader color="#FFF" />
}
export default EditUser
