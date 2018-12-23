import React from 'react'

const initialState = { results: [] }

export const schoolReducer = (state = initialState, action = {} as any) => {
  switch (action.type) {
    case 'LOGOUT':
      return {}

    case 'SEARCH_RESULTS':
      return {
        ...state,
        results: action.results
      }

    // case 'CATEGORY':
    //   return {
    //     ...state,
    //     category: action.option
    //   }
    // case 'USER_POINTS':
    //   return {
    //     ...state,
    //     points: action.points.points
    //   }

    // case 'ALL_POINTS':
    //   return {
    //     ...state,
    //     allPoints: action.points.sort((a, b) => b.points - a.points).slice(0, 3)
    //   }

    default:
      return state
  }
}
