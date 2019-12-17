import axios from 'axios'

const gitGet = query =>
  axios.get(
    `https://api.github.com${query}client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  )

// search user
export const searchUsers = async text => {
  const res = await gitGet(`/search/users?q=${text}&`)
  return res.data.items
}

// get user
export const getUser = async username => {
  const res = await gitGet(`/users/${username}?`)
  return res.data
}

// get users repos
export const getUserRepos = async username => {
  const res = await gitGet(
    `/users/${username}/repos?per_page=5&sort=created:asc?`
  )
  return res.data
}
