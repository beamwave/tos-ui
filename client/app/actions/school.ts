import React from 'react'
import api from '../api'

export const search = results => ({
  type: 'SEARCH_RESULTS',
  results
})

export const startSearch = data => {
  console.log('data:', data)
  return async dispatch => {
    const { userInput } = data

    // send api call here
    // const results = await api.school.search(data)
    const results = [
      {
        query: userInput,
        aicode: '471315',
        schoolName: 'PRINCESS ANNE HIGH SCHOOL',
        schoolAddress: '4400 VIRGINIA BEACH BOULEVARD VIRGINIA BEACH, VA 23462',
        schoolStatus: 'P',
        schoolAdmins: [
          {
            admin: 'SAT School Day',
            date: '10/08/2018',
            contract: 'S',
            study: 'N',
            research: 'N'
          },
          {
            admin: 'PSAT/NMSQT',
            date: '10/08/2018',
            contract: 'N',
            study: false,
            research: false
          },
          {
            admin: 'PSAT 8/9',
            date: '10/09/2018',
            contract: 'N',
            study: false,
            research: false
          }
        ]
      }
    ]

    //  dispatch results to store
    return dispatch(search(results))
  }
}
