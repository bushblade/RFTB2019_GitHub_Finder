import React, { useEffect, Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

import GithubContext from '../../context/github/gitHubContext'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'

const User = ({ repos, getUserRepos }) => {
  const { login: userLogin } = useParams()
  const {
    user: {
      name,
      avatar_url,
      location,
      bio,
      login,
      html_url,
      followers,
      following,
      public_gists,
      public_repos,
      hireable,
      blog,
      company,
    },
    loading,
    getUser,
  } = useContext(GithubContext)

  useEffect(() => {
    getUser(userLogin)
    getUserRepos(userLogin)
    // eslint-disable-next-line
  }, [])

  if (loading) return <Spinner />

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable:{' '}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-centre'>
          <img
            src={avatar_url}
            alt=''
            className='round-img'
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit GitHub profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username: {login} </strong>
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company: {company}</strong>
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>
                    Website: <a href={`https://${blog}`}>{blog}</a>{' '}
                  </strong>
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='car text-centre'>
        <div className='badge badge-primary'>Followers: {followers}</div>
        <div className='badge badge-success'>Following: {following}</div>
        <div className='badge badge-light'>Public repos: {public_repos}</div>
        <div className='badge badge-dark'>Public gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  )
}

User.propTypes = {
  repos: PropTypes.array.isRequired,
}

export default User
