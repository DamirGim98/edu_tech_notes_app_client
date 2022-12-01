import { Outlet, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ClockLoader from 'react-spinners/ClockLoader'
import { useRefreshMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { selectAccessToken } from './authSlice'

const PersistLogin = () => {
  const [persist] = usePersist()
  const token = useSelector(selectAccessToken)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh()
        setTrueSuccess(true)
      } catch (err) {
        console.error(err)
      }
    }
    if (!token && persist) verifyRefreshToken()
    // eslint-disable-next-line
  }, [])

  let content
  if (!persist) {
    content = <Outlet />
  } else if (isLoading) {
    content = <ClockLoader className="loader" color="#FFF" />
  } else if (isError) {
    content = (
      <p className="errmsg">
        {`${error.data?.message} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    )
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />
  } else if (token && isUninitialized) {
    content = <Outlet />
  }

  return content
}

export default PersistLogin
