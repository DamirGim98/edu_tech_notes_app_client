import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import ClockLoader from 'react-spinners/ClockLoader'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

import usePersist from '../../hooks/usePersist'
import { useAddNewUserMutation } from '../users/usersApiSlice'

function Login({ isRegister }) {
  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [persist, setPersist] = usePersist()

  const [login, { isLoading }] = useLoginMutation()

  const [addNewUser] = useAddNewUserMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const errClass = errMsg ? 'errmsg' : 'offscreen'

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (isRegister) {
        await addNewUser({ username, password, roles: ['Employee'] })
      }
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response')
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg(err.data?.message)
      }
      errRef.current.focus()
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handlePersist = () => setPersist((prevState) => !prevState)

  if (isLoading) {
    return <ClockLoader color="#FFF" />
  }

  return (
    <section className="public">
      <header>
        <h1>{isRegister ? 'Register' : 'Login'}</h1>
      </header>
      <main className="login">
        <p ref={errRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className="form__submit-button">Proceed</button>

          {!isRegister && (
            <label htmlFor="persist" className="form__persist">
              <input
                type="checkbox"
                className="form__checkbox"
                id="persist"
                onChange={handlePersist}
                checked={!!persist}
              />
              Trust This Device
            </label>
          )}
        </form>
      </main>
      <footer>
        <button
          className="text-button styled-button"
          title="HomePage"
          onClick={() => navigate('/')}
        >
          Back to Home page
        </button>
      </footer>
    </section>
  )
}

export default Login
