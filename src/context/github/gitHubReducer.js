import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER_AND_REPOS
} from '../types'

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_USER_AND_REPOS:
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false
      }
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false
      }
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    default:
      throw Error(`Unhandled Action: ${action.type}`)
  }
}
