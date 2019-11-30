import React, { useReducer } from 'react'
import axios from 'axios'
import GithubContext from './gitHubContext'
import githubReducer from './gitHubReducer'
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types'

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }
  const [state, dispatch] = useReducer(githubReducer, initialState)

  // search user

  // get user

  // get repos

  // clear users

  // set loading

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState
