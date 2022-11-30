import ClockLoader from 'react-spinners/ClockLoader'
import { useGetUsersQuery } from '../users/usersApiSlice'
import NewNoteForm from './NewNoteForm'

function NewNote() {
  const { users } = useGetUsersQuery('usersList', {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  })

  if (!users?.length) return <ClockLoader color="#FFF" />

  return <NewNoteForm users={users} />
}

export default NewNote
