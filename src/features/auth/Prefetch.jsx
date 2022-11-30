import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import store from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'

function Prefetch() {
  useEffect(() => {
    store.dispatch(notesApiSlice.util.prefetch('getNotes', 'notesList', {}))
    store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', {}))
  }, [])

  return <Outlet />
}

export default Prefetch
