import {useEffect} from "react";
import {useNavigate, Link, useLocation} from "react-router-dom";
import {useSendLogoutMutation} from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";

const DashHeader = () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {username, isManager, isAdmin, status} = useAuth()


    const DASH_REGEX = /^\/dash(\/)?$/
    const NOTES_REGEX = /^\/dash\/notes(\/)?$/
    const USERS_REGEX = /^\/dash\/users(\/)?$/

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) {
            navigate('/')
        }
    }, [isSuccess, navigate])

    const onNewNoteClicked = () => navigate('/dash/notes/new')
    const onNewUserClicked = () => navigate('/dash/users/new')
    const onNotesClicked = () => navigate('/dash/notes')
    const onUsersClicked = () => navigate('/dash/users')

    if (isLoading) {
        return <p>Logging out...</p>
    }

    if (isError) {
        return <p>Error: {error.data?.message}</p>
    }

    const onGoHomeClicked = () => navigate('/dash');

    let goHomeButton = null;

    if (pathname !== '/dash') {
        goHomeButton = (
            <button
                className={"text-button"}
                title={"Home"}
                onClick={onGoHomeClicked}
            >
                Back to Home
            </button>
        )
    }

    let newNoteButton = null
    if (NOTES_REGEX.test(pathname)) {
        newNoteButton = (
            <button
                className="text-button"
                title="New Note"
                onClick={onNewNoteClicked}
            >
                Create new Note
            </button>
        )
    }

    let newUserButton = null
    if (USERS_REGEX.test(pathname)) {
        newUserButton = (
            <button
                className="text-button"
                title="New User"
                onClick={onNewUserClicked}
            >
                Create New User
            </button>
        )
    }

    let userButton = null
    if (isManager || isAdmin) {
        if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
            userButton = (
                <button
                    className="text-button"
                    title="Users"
                    onClick={onUsersClicked}
                >
                    Check all users
                </button>
            )
        }
    }

    let notesButton = null
    if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
        notesButton = (
            <button
                className="text-button"
                title="Notes"
                onClick={onNotesClicked}
            >
                View notes
            </button>
        )
    }
    const logoutButton = (
        <button
            className="text-button"
            title="Logout"
            onClick={sendLogout}
        >
            Logout
        </button>
    )

    let buttonContent
    if (isLoading) {
        buttonContent = <p>Logging Out...</p>
    } else {
        buttonContent = (
            <>
                {newNoteButton}
                {newUserButton}
                {notesButton}
                {userButton}
                {goHomeButton}
                {logoutButton}
            </>
        )
    }

    const errClass = isError ? "errmsg" : "offscreen"

    return (

        <><p className={errClass}>{error?.data?.message}</p>
            <header className="dash-header">
                <Link to="/dash">
                    <h1 className="dash-header__title">techNotes</h1>
                </Link>
                <div className={`dash-header__container`}>
                    <nav className="dash-header__nav">
                        {buttonContent}
                    </nav>
                </div>
                <section className="dash-header__user">
                    <p>Nice to see you back, {username}</p>
                    <p>Role: {status}</p>
                </section>
            </header>
        </>
    )
}
export default DashHeader