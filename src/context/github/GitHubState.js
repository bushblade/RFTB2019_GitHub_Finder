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

let githubClientId, githubClientSecret

if (process.env.NODE_ENV !== 'production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET
}

const gitGet = query =>
  axios.get(
    `https://api.github.com${query}client_id=${githubClientId}&client_secret=${githubClientSecret}`
  )

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }
  const [state, dispatch] = useReducer(githubReducer, initialState)

  // clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS })

  // set loading
  const setLoading = () => dispatch({ type: SET_LOADING })

  // search user
  const searchUsers = async text => {
    setLoading()
    const res = await gitGet(`/search/users?q=${text}&`)
    dispatch({ type: SEARCH_USERS, payload: res.data.items })
  }

  // get user
  const getUser = async username => {
    setLoading()
    const res = await gitGet(`/users/${username}?`)
    dispatch({ type: GET_USER, payload: res.data })
  }

  // get users repos
  const getUserRepos = async username => {
    setLoading()
    const res = await gitGet(
      `/users/${username}/repos?per_page=5&sort=created:asc?`
    )
    dispatch({ type: GET_REPOS, payload: res.data })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState
