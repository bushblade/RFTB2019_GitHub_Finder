import axios from 'axios'

const gitGet = query =>
  axios.get(
    `https://api.github.com${query}client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  )

export const searchUsers = async text => {
  const res = await gitGet(`/search/users?q=${text}&`)
  return res.data.items
}

export const getUserAndRepos = async username => {
  const repos = await gitGet(
    `/users/${username}/repos?per_page=5&sort=created:asc?`
  )
  const user = await gitGet(`/users/${username}?`)
  return { user: user.data, repos: repos.data }
}
