import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/gitHubContext'
import AlertContext from '../../context/alert/alertContext'
import { searchUsers } from '../../context/github/actions'

const Search = () => {
  const { setUsers, users, setLoading } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)

  const [text, setText] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    if (text === '') {
      setAlert('Please enter something', 'light')
    } else {
      setLoading(true)
      searchUsers(text).then(users => {
        setUsers(users)
        setText('')
        setLoading(false)
      })
    }
  }

  const onChange = e => setText(e.target.value)

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='text'
          value={text}
          placeholder='Search Users...'
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={() => setUsers([])}
        >
          Clear
        </button>
      )}
    </div>
  )
}

export default Search
