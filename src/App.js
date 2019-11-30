import React, { useState, Fragment } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import User from './components/users/User'
import GithubState from './context/github/GitHubState'
import './App.css'

const App = () => {
  const [users, setUsers] = useState([]),
    [user, setUser] = useState({}),
    [repos, setRepos] = useState([]),
    [loading, setLoading] = useState(false),
    [alert, setAlert] = useState(null)

  // search github users

  // get single github user
  const getUser = async username => {
    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    setUser(res.data)
    setLoading(false)
  }

  // get users repos
  const getUserRepos = async username => {
    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    )
    setRepos(res.data)
    setLoading(false)
  }

  // clear users
  const clearUsers = () => {
    setUsers([])
    setLoading(false)
  }

  // set Alert
  const showAlert = (msg, type) => {
    setAlert({ msg, type })
    setTimeout(() => setAlert(null), 5000)
  }

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      clearUsers={clearUsers}
                      showClear={users.length > 0}
                      setAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path={`/user/:login`}
                render={props => (
                  <User
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    repos={repos}
                    user={user}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  )
}

export default App
