import ClockLoader from 'react-spinners/ClockLoader'
import { useGetNotesQuery } from './notesApiSlice'
import NotesList from './NotesList'

function NotesWrapper() {
  const { data, isLoading, isError, error } = useGetNotesQuery('notesList', {
    pollingInterval: 120000,
  })

  if (isLoading)
    return <ClockLoader cssOverride={{ margin: '0 auto' }} color="#FFF" />

  if (isError) {
    return <p className="errmsg">{error?.data?.message}</p>
  }

  return <NotesList notes={data} />
}

export default NotesWrapper
