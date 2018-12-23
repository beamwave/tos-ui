import React from 'react'
import api from '../api'
import { environment } from '../../../environment'

import { upload } from './images'

export const login = user => ({
  type: 'LOGIN',
  user
})

// id: action.user.id,
// name: action.user.name,
// email: action.user.email,
// username: action.user.username,
// token: action.user.token

export const startLogin = credentials => {
  return async dispatch => {
    // const userData = await api.user.login(credentials)
    const user = {
      username: 'eric',
      name: 'eric morrison',
      id: 'eachuserwillhaveuniqueid',
      email: 'eric@collegeboard.org',
      token: 'awstokenwillgohere'
    }
    localStorage.setItem('cb-token', user.token)
    // localStorage.setItem('cb-token', userData.token)

    // const imageData = await api.image.getAll(userData.id)

    // const user = {
    //   ...userData,
    //   imageData
    // }

    dispatch(login(user))
  }
}

export const startSignup = data => async dispatch => {
  const user = await api.user.signup(data)
  localStorage.setItem('arsenal', user.token)
  dispatch(login(user))
}

export const startRefresh = credentials => {
  return async dispatch => {
    const userData = await api.user.refresh(credentials)
    localStorage.setItem('arsenal', userData.token)

    const imageData = await api.image.getAll(userData.id)

    const user = {
      ...userData,
      imageData
    }

    dispatch(login(user))
  }
}

export const logout = () => ({
  type: 'LOGOUT'
})

export const startLogout = () => dispatch => {
  localStorage.clear()
  dispatch(logout())
}
