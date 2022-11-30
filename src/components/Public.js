import {useNavigate} from "react-router-dom";


const Public = () => {
    const navigate = useNavigate()
    return (
        <section className="public">
            <header>
                <h1>This is <span className="nowrap">simple CRUD App written with<br/>RTK Query and React JS</span></h1>
            </header>
            <main className="public__main">
                <p>Backend part is written with Express in NodeJS environment, using AsyncHandler, JWT and some built in
                    middlewares. For database part MongoDb and Mongoose were used, for sake of simplicity and wide
                    functionality</p>
                <br/>
                <p>Frontend communication is supported by RTK Query, allowing precise control for caching data,
                    invalidating data, making subscriptions for endpoints and great integration with Redux API</p>
                <br/>
                <p>Written by Damir G.</p>
                <br/>
                <p>Inspired by greatest Dave Gray :)</p>
            </main>
            <footer>
                <button
                    className="text-button styled-button"
                    title="Authenticate"
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
            </footer>
        </section>

    )
}
export default Public