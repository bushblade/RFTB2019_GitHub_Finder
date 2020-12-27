import axios from 'axios'

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN }
})

export const searchUsers = async (text) => {
  const res = await github.get(`/search/users?q=${text}`)
  return res.data.items
}

export const getUserAndRepos = async (username) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${username}?`),
    github.get(`/users/${username}/repos?per_page=5&sort=created:asc?`)
  ])
  return { user: user.data, repos: repos.data }
}
