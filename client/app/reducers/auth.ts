import React from 'react'

// login user obj will be placed in auth because of auth reducer
export const authReducer = (state = {}, action: any = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        id: action.user.id,
        name: action.user.name,
        email: action.user.email,
        username: action.user.username,
        token: action.user.token
      }

    case 'PERSIST':
      return {
        email: action.identity.email,
        token: action.identity.token,
        uid: action.identity.uid
      }

    case 'UPDATE_USER':
      return {
        ...state,
        email: action.user.email,
        name: action.user.firstname,
        last: action.user.lastname,
        profileImage: action.user.url
      }
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'UPDATE_EMAIL':
      return {
        ...state,
        email: action.email
      }

    case 'UPDATE_USER':
      return {
        ...state,
        email: action.user.email,
        name: action.user.firstname,
        last: action.user.lastname,
        profileImage: action.user.url
      }

    case 'LOGOUT':
      return {}

    default:
      return state
  }
}
