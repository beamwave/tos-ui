import React from 'react'
import api from '../api'

export const testTakerRetrieval = results => ({
  type: 'RETRIEVE_TEST_TAKER_DATA',
  results
})

export const startTestTakerRetrieval = data => {
  return async dispatch => {
    const { userInput } = data

    // send api call here
    // const results = await api.school.gettestTaker(data)
    const results = [
      {
        grade: '12',
        shipped: 0,
        ansSheets: 234,
        contract: false
      },
      {
        grade: '11',
        shipped: 220,
        ansSheets: 165,
        contract: false
      },
      {
        grade: '10',
        shipped: 400,
        ansSheets: 0,
        contract: false
      },
      {
        grade: '9',
        shipped: 0,
        ansSheets: 300,
        contract: false
      },
      {
        grade: '8',
        shipped: 0,
        ansSheets: 99,
        contract: false
      },
      {
        grade: 'Other',
        shipped: 0,
        ansSheets: 0,
        contract: false
      }
    ]

    // dispatch results to store
    return dispatch(testTakerRetrieval(results))
  }
}
