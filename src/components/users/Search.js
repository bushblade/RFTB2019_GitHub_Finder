import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/gitHubContext'
import AlertContext from '../../context/alert/alertContext'
import { searchUsers } from '../../context/github/actions'
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS } from '../../context/types'

const Search = () => {
  const { dispatch, users } = useContext(GithubContext)
  const { setAlert } = useContext(AlertContext)

  const [text, setText] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    if (text === '') {
      setAlert('Please enter something', 'light')
    } else {
      dispatch({ type: SET_LOADING })
      searchUsers(text).then(users => {
        dispatch({ type: SEARCH_USERS, payload: users })
        setText('')
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
          onClick={() => dispatch({ type: CLEAR_USERS })}
        >
          Clear
        </button>
      )}
    </div>
  )
}

export default Search
