import React from 'react'

const initialState = { data: [] }

export const testTakerReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case 'LOGOUT':
      return {}

    case 'RETRIEVE_TEST_TAKER_DATA':
      return {
        ...state,
        data: action.results
      }

    default:
      return state
  }
}
