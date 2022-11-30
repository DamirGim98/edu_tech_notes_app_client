import {Link} from 'react-router-dom'
import useAuth from "../../hooks/useAuth";

const Welcome = () => {

    const today = new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'2-digit', year:'numeric'}).format(new Date())
    const { username, isAdmin } = useAuth()

    return (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome, {username}!</h1>

            <p><Link to="/dash/notes">View techNotes</Link></p>
            <p><Link to="/dash/notes/new">Add New TechNotes</Link></p>


            {isAdmin && <p><Link to="/dash/users">View User Settings</Link></p>}
            {isAdmin && <p><Link to="/dash/users/new">Add New User</Link></p>}
        </section>
    )
}
export default Welcome