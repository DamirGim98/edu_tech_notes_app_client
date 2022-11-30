import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import EditNote from './features/notes/EditNote'
import NewUserForm from './features/users/NewUserForm'
import NewNote from './features/notes/NewNote'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import ROLES from './config/roles'
import NotesWrapper from './features/notes/NotesWrapper'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Login isRegister />} />
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            {/* Subscribing to Notes and User on the Protected route! */}
            <Route path="dash" element={<DashLayout />}>
              {/* Start of the Dash Route (Protected) */}

              <Route index element={<Welcome />} />

              <Route path="notes">
                <Route index element={<NotesWrapper />} />
                <Route path=":id" element={<EditNote />} />
                <Route path="new" element={<NewNote />} />
              </Route>

              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="users">
                  <Route index element={<UsersList />} />
                  <Route path=":id" element={<EditUser />} />
                  <Route path="new" element={<NewUserForm />} />
                </Route>
              </Route>
            </Route>{' '}
            {/* End of the Dash Route */}
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
