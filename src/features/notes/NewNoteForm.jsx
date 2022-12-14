import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAddNewNoteMutation } from './notesApiSlice'
import useAuth from '../../hooks/useAuth'

function NewNoteForm({ users }) {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation()

  const navigate = useNavigate()
  const { username } = useAuth()

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const { id: name } = users.find((user) => user.username === username)
  const [userId, setUserId] = useState(name)

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setText('')
      setUserId('')
      navigate('/dash/notes')
    }
  }, [isSuccess, navigate])

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onTextChanged = (e) => setText(e.target.value)

  const canSave = [title, text, userId].every(Boolean) && !isLoading

  const onSaveNoteClicked = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewNote({ userId, title, text })
    }
  }

  const errClass = isError ? 'errmsg' : 'offscreen'
  const validTitleClass = !title ? 'form__input--incomplete' : ''
  const validTextClass = !text ? 'form__input--incomplete' : ''

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveNoteClicked}>
        <div className="form__title-row">
          <h2>New Note</h2>
          <div className="form__action-buttons">
            <button className="text-button" title="Save" disabled={!canSave}>
              Save
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Title:
        </label>
        <input
          className={`form__input ${validTitleClass}`}
          id="title"
          name="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={onTitleChanged}
        />

        <label className="form__label" htmlFor="text">
          Text:
        </label>
        <textarea
          className={`form__input form__input--text ${validTextClass}`}
          id="text"
          name="text"
          value={text}
          onChange={onTextChanged}
        />
      </form>
    </>
  )
}

export default NewNoteForm
