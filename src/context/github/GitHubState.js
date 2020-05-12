import React, { useState } from 'react'

import GithubContext from './gitHubContext'

const GithubState = props => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <GithubContext.Provider
      value={{
        users,
        setUsers,
        user,
        setUser,
        repos,
        setRepos,
        loading,
        setLoading
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState
