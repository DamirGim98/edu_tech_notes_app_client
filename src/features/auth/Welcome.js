import {Link} from 'react-router-dom'
import useAuth from "../../hooks/useAuth";

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat().format(date)
    const { username, isAdmin, isManager } = useAuth()

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome, {username}!</h1>

            <p><Link to="/dash/notes">View techNotes</Link></p>
            <p><Link to="/dash/notes/new">Add New TechNotes</Link></p>


            {isAdmin && <p><Link to="/dash/users">View User Settings</Link></p>}
            {isAdmin && <p><Link to="/dash/users/new">Add New User</Link></p>}


        </section>
    )

    return content
}
export default Welcome