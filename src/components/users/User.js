import React, { useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'

import GithubContext from '../../context/github/gitHubContext'
import Spinner from '../layout/Spinner'
import Repos from '../repos/Repos'
import { getUserAndRepos } from '../../context/github/actions'
import { GET_USER_AND_REPOS, SET_LOADING } from '../../context/types'

function User() {
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
      company
    },
    loading,
    dispatch,
    repos
  } = useContext(GithubContext)

  const { userId } = useParams()

  useEffect(() => {
    dispatch({ type: SET_LOADING })
    getUserAndRepos(userId).then((res) =>
      dispatch({ type: GET_USER_AND_REPOS, payload: res })
    )
  }, [dispatch, userId])

  if (loading) return <Spinner />

  return (
    <>
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
            <>
              <h3>Bio</h3>
              <p>{bio}</p>
            </>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit GitHub profile
          </a>
          <ul>
            <li>{login && <strong>Username: {login} </strong>}</li>
            <li>{company && <strong>Company: {company}</strong>}</li>
            <li>
              {blog && (
                <strong>
                  Website: <a href={`https://${blog}`}>{blog}</a>{' '}
                </strong>
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
    </>
  )
}

export default User
