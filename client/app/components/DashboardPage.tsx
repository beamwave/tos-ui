import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ReactGridGallery from 'react-grid-gallery'
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome'
import { check, deepEquals } from '../helpers/helpers'
import { startSearch } from '../actions/school'
import { throttle, debounce } from 'throttle-debounce'

// gradeAdjustmentStartDt = invoice start date

// invoice button display requirements: tests are shipped (not pending), correct invoice window, otherwise show invoice

// allow edit if invoice window still opened

// react acl

// public search is possible from any react page

// student names, prevent invoice generation

// fee waiver from order 30 (fee waivers available)

// data for students taking current test

// yearly changes to names, ie []

// order table: aicode (partition?), testDt, eventid (sort?), weborderid (index?), { lines } ?,

// get orders by aicode and possibly filter by year

// learn about aws playground

// get sample data for hyperloop events (orders, invoice, user)

// current possible tables: misgrid adjustments, orders, test takers, ship confirmation, reference (test date, window dates, event ids)

// add lambda tag: key: 'PERSISTENT': 'YES'

interface IProps {
  startSearch: (data: any) => any[]
  results: any
  // username: string
  // category: string
  // categories?: any
  // images: any[]
  // filters?: any[]
  // filter?: (by: FData) => any
  // history?: any
}

interface IState {
  // images: any[]
}

export class DashboardPage extends Component<IProps> {
  state = {
    state: 'all',
    filterType: 'school',
    stateCollege: 'bard college',
    districtCollege: 'bard college',
    stateContractCoverage: 'all',
    districtContractCoverage: 'state',
    schoolQuery: { active: true, query: '' },
    districtQuery: { active: false, query: '' },
    results: []
  }

  // componentWillReceiveProps = (nextProps, nextState) => {
  //   const { results } = nextProps
  //   this.setState({ results })
  // }

  onFieldChange = ({ target: { name, value } }) =>
    this.setState({ [name]: value } as any)

  onInputChange = ({ target: { name, value } }) =>
    this.setState({ [name]: { active: true, query: value } } as any)

  onFilterChange = ({ target: { name, value } }) => {
    // set filterType value
    this.setState({ [name]: value } as any)

    // set active state of queries
    if (value === 'school')
      this.state.districtQuery = { active: false, query: '' }

    if (value === 'district')
      this.state.schoolQuery = { active: false, query: '' }
  }

  onQuery = async userInput => this.props.startSearch(userInput)

  // call action creator 1 second after user finishes typing
  startSearchDebounce = debounce(1000, this.onQuery)

  // call action creator every 750 milliseconds during typing
  startSearchThrottle = throttle(750, this.onQuery)

  // store user input in local state ??
  onUserInput = userInput => this.setState({ userInput })

  // query db when user begins searching
  onSubmit = async e => {
    e.preventDefault()
    // const {
    //   target: { value: userInput }
    // } = e
    const { filterType } = this.state

    const data = {
      userInput: '',
      filters: {}
    }

    if (filterType === 'school') {
      const {
        schoolQuery: { query }
      } = this.state
      data.userInput = query
    }
    if (filterType === 'district') {
      const {
        districtQuery: { query },
        state,
        districtCollege,
        districtContractCoverage
      } = this.state
      data.userInput = query
      data.filters = { state, districtCollege, districtContractCoverage }
    }
    if (filterType === 'state') {
      const { stateCollege, stateContractCoverage } = this.state
      data.filters = { stateCollege, stateContractCoverage }
    }

    const { userInput } = data

    // start querying db at various intervals
    if (userInput.length < 5) this.startSearchThrottle(data)
    else this.startSearchDebounce(data)
  }

  displaySchoolInput = () => (
    <form onSubmit={this.onSubmit} className="school-input-container">
      <select
        name="filterType"
        className="searchbar-select"
        onChange={this.onFilterChange}
        value={this.state.filterType}
      >
        <option value="school">school</option>
        <option value="district">district</option>
        <option value="state">state</option>
      </select>
      <input
        type="text"
        name="schoolQuery"
        className="searchbar-input"
        value={this.state.schoolQuery.query}
        onChange={this.onInputChange}
        placeholder="search school by name or code"
      />
      <button className="blue-button">Search</button>

      <p className="link">Advanced Search</p>
    </form>
  )

  displayDistrictInput = () => (
    <form onSubmit={this.onSubmit} className="district-input-container">
      <select
        name="filterType"
        className="searchbar-select"
        value={this.state.filterType}
        onChange={this.onFilterChange}
      >
        <option value="school">school</option>
        <option value="district">district</option>
        <option value="state">state</option>
      </select>
      <input
        type="text"
        name="districtQuery"
        className="searchbar-input"
        value={this.state.districtQuery.query}
        onChange={this.onInputChange}
        placeholder="District Name, Code"
      />

      <p>in</p>
      <select
        name="state"
        className="searchbar-select"
        value={this.state.state}
        onChange={this.onFieldChange}
      >
        <option value="all">All</option>
        <option value="aa">AA</option>
        <option value="ae">AE</option>
        <option value="alabama">Alabama</option>
      </select>

      <select
        name="districtCollege"
        className="searchbar-select"
        value={this.state.districtCollege}
        onChange={this.onFieldChange}
      >
        <option value="bard college">Bard College</option>
        <option value="furman university">Furman University</option>
        <option value="harvard college">Harvard College</option>
        <option value="mercer university">Mercer University</option>
      </select>

      <p>Contract Coverage</p>
      <select
        name="stateContractCoverage"
        className="searchbar-select"
        value={this.state.stateContractCoverage}
        onChange={this.onFieldChange}
      >
        <option value="all">All</option>
        <option value="district">District</option>
        <option value="state">State</option>
        <option value="none">None</option>
      </select>

      <button className="blue-button">Search</button>
    </form>
  )

  displayStateInput = () => (
    <form onSubmit={this.onSubmit} className="state-input-container">
      <select
        name="filterType"
        className="searchbar-select"
        onChange={this.onFieldChange}
        value={this.state.filterType}
      >
        <option value="school">school</option>
        <option value="district">district</option>
        <option value="state">state</option>
      </select>

      <select
        name="stateCollege"
        className="searchbar-select"
        onChange={this.onFieldChange}
        value={this.state.stateCollege}
      >
        <option value="bards college">Bards College</option>
        <option value="charles r drew">
          Charles R. Drew University of Medicine and Science
        </option>
        <option value="dod">Department of Defense Education Activity</option>
      </select>

      <p>Contract Coverage</p>
      <select
        name="districtContractCoverage"
        className="searchbar-select"
        value={this.state.districtContractCoverage}
        onChange={this.onFieldChange}
      >
        <option value="state">State</option>
      </select>

      <button className="blue-button">View</button>
    </form>
  )

  render = () => {
    const { filterType } = this.state
    const { results } = this.props

    return (
      <div className="dashboard-container">
        <nav>
          <h2>Test Ordering</h2>
          <div>
            <p>Org Search</p>
            <p>Calendar</p>
            <p>Help</p>
          </div>
        </nav>
        <header>
          {filterType === 'school' && this.displaySchoolInput()}
          {filterType === 'district' && this.displayDistrictInput()}
          {filterType === 'state' && this.displayStateInput()}
        </header>
        <main>
          {results.length > 0 && (
            <h3>
              {results.length} Search Results for "{results[0].query}"
            </h3>
          )}
          <div className="results-table">
            {results &&
              results.map(
                ({
                  aicode,
                  schoolName,
                  schoolAddress,
                  schoolStatus,
                  schoolAdmins
                }) => [
                  <header key={`${aicode}-${schoolAddress}`}>
                    <p>School Name</p>
                    <p>Address</p>
                    <p>Status</p>
                    <p>Adminstration</p>
                    <div>
                      <p>Contract</p>
                      <div className="subhead">
                        <p>State</p>
                        <p>Distr.</p>
                      </div>
                    </div>
                    <p>Study</p>
                    <p>Research Group</p>
                  </header>,
                  <main key={`${aicode}-${schoolName}`}>
                    <div>
                      <p>{schoolName}</p>
                      <p>AI {aicode}</p>
                    </div>
                    <div>
                      <p>{schoolAddress}</p>
                    </div>
                    <div>
                      <p>{schoolStatus}</p>
                    </div>
                    <div className="admins">
                      {schoolAdmins.map(
                        ({ admin, date, contract, study, research }) => (
                          <div className="admin-row" key={`${admin}-${date}`}>
                            <div>
                              <p>{admin}</p>
                              <p className="date">{date}</p>
                            </div>
                            <p>{contract}</p>
                            <p>{study}</p>
                            <p>{research}</p>
                          </div>
                        )
                      )}
                    </div>
                    <div className="view-link">
                      <Link to="/school-landing">View</Link>
                    </div>
                  </main>

                ]
              )}
          </div>
          {/* <table>
            {results &&
              results.map(
                ({
                  aicode,
                  schoolName,
                  schoolAddress,
                  schoolStatus,
                  schoolAdmins
                }) => [
                  <thead>
                    <tr>
                      <th>School Name</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>Adminstration</th>
                      <th>Contract</th>
                      <th>Study</th>
                      <th>Research Group</th>
                    </tr>
                  <thead>,
                  <tbody>
                    <tr>
                      <td>
                        <tr>{schoolName}</tr>
                        <tr>AI {aicode}</tr>
                      </td>
                      <td>{schoolAddress}</td>
                      <td>{schoolStatus}</td>
                      <td colSpan={3}>
                        {schoolAdmins.map(
                          ({ admin, date, contract, study, research }) => [
                            <tr>
                              <td>
                                {admin}
                                {'\n'}
                                {date}
                              </td>
                              <td>{contract}</td>
                              <td>{study}</td>
                              <td>{research}</td>
                            </tr>
                          ]
                        )}
                      </td>
                    </tr>
                  </tbody>
                ]
              )}
          </table> */}
        </main>
      </div>
    )
  }
}

// aicode: action.results.aicode,
// schoolName: action.results.schoolName,
// schoolAddress: action.results.schoolAddress,
// schoolStatus: action.results.schoolStatus,
// schoolAdmins: action.results.schoolAdmins

const mapStateToProps = (state, props) => ({
  results: state.school.results
  // token: state.auth.token,
  // username: state.auth.username,
  // category: state.app.category,
  // categories: state.images.categories,
  // images: state.images.all,
  // filters: state.filters
})

export default connect<any>(
  mapStateToProps,
  { startSearch }, // enables use of startSearch action creator
  null,
  { pure: false }
)(DashboardPage)

// state = {
//   images: [],
//   categories: 'map an object'
// }

// filter images
// handleFilterChange = ({ target }) => {
//   const { filters, filter } = this.props
//   // "medium", "device", "wardrobe", "mood", etc.
//   // console.log('dataset', target.dataset.filterName)
//   // console.log('value', target.value)

//   const by = {
//     category: target.dataset.filterName,
//     value: target.value
//   }

//   filter(by)
// }

// handleThumbnailClick = (i, e) => {
//   const { images, history } = this.props
//   const imageId = images[i]._id
//   history.push(`/image/${imageId}`)
// }

// componentDidMount = () => {
//   const { images: imagesFromServer } = this.props
//   // console.log('imagesFromServer', imagesFromServer)
//   let images
//   if (check(imagesFromServer) && Array.isArray(imagesFromServer))
//     images = imagesFromServer.map(image => ({
//       src: image.url,
//       thumbnail: image.url,
//       thumbnailHeight: image.height,
//       thumbnailWidth: image.width
//     }))

//   this.setState({ images })
// }

// componentWillReceiveProps = (nextProps, nextState) => {
//   if (
//     check(nextProps.images) &&
//     Array.isArray(nextProps.images) &&
//     (check(this.state.images) && Array.isArray(this.state.images))
//   ) {
//     if (!deepEquals(nextProps.images, this.state.images.length)) {
//       // if (nextProps.images.length !== this.state.images.length) {
//       let { images } = nextProps
//       images = images.map(image => ({
//         src: image.url,
//         thumbnail: image.url,
//         thumbnailHeight: image.height,
//         thumbnailWidth: image.width
//       }))

//       this.setState({ images })
//     }
//   }
// }

// render = () => {
//   const {
//     category,
//     categories,
//     images: imagesFromServer,
//     filters
//   } = this.props
//   const { images } = this.state
//   const alive = check(imagesFromServer)
//   return (
//     <main className="dashboard-page">
//       {
//         <div>
//           <section className="image-results">
//             {alive &&
//               imagesFromServer.length === 0 && (
//                 <p className="null-case">No images to display.</p>
//               )}
//             {alive &&
//               imagesFromServer.length > 0 && (
//                 <ReactGridGallery
//                   images={check(imagesFromServer) ? images : []}
//                   enableImageSelection={false}
//                   onClickThumbnail={this.handleThumbnailClick}
//                 />
//               )}
//           </section>
//           <aside className="primary-config">
//             {category === 'art' && (
//               <main>
//                 <form className="filter-container">
//                   <label htmlFor="select">medium</label>
//                   <div className="angle-down">
//                     <FontAwesomeIcon icon="angle-down" className="icon" />
//                   </div>
//                   <select
//                     name="select"
//                     className="select"
//                     value={filters['medium']}
//                     data-filter-name="medium"
//                     onChange={this.handleFilterChange}
//                   >
//                     {categories !== undefined &&
//                     categories.hasOwnProperty('medium') ? (
//                       categories['medium'].map(option => (
//                         <option key={option.name} value={option.name}>
//                           {option.name}
//                         </option>
//                       ))
//                     ) : (
//                       <option value="n/a">n/a</option>
//                     )}
//                   </select>
//                 </form>
//                 <form className="filter-container">
//                   <label htmlFor="select">device</label>
//                   <div className="angle-down">
//                     <FontAwesomeIcon icon="angle-down" className="icon" />
//                   </div>
//                   <select
//                     name="select"
//                     className="select"
//                     value={filters['device']}
//                     data-filter-name="device"
//                     onChange={this.handleFilterChange}
//                   >
//                     {categories !== undefined &&
//                     categories.hasOwnProperty('device') ? (
//                       categories['medium'].map(option => (
//                         <option key={option.name} value={option.name}>
//                           {option.name}
//                         </option>
//                       ))
//                     ) : (
//                       <option value="n/a">n/a</option>
//                     )}
//                   </select>
//                 </form>
//                 <form className="filter-container">
//                   <label htmlFor="select">project</label>
//                   <div className="angle-down">
//                     <FontAwesomeIcon icon="angle-down" className="icon" />
//                   </div>
//                   <select
//                     name="select"
//                     className="select"
//                     value={filters['project']}
//                     data-filter-name="project"
//                     onChange={this.handleFilterChange}
//                   >
//                     {categories !== undefined &&
//                     categories.hasOwnProperty('device') ? (
//                       categories['medium'].map(option => (
//                         <option key={option.name} value={option.name}>
//                           {option.name}
//                         </option>
//                       ))
//                     ) : (
//                       <option value="n/a">n/a</option>
//                     )}
//                   </select>
//                 </form>
//               </main>
//             )}
//             {category === 'comments' && (
//               <main>
//                 <form className="filter-container">
//                   <label htmlFor="select">topic</label>
//                   <div className="angle-down">
//                     <FontAwesomeIcon icon="angle-down" className="icon" />
//                   </div>
//                   <select
//                     name="select"
//                     className="select"
//                     value={filters['topic']}
//                     data-filter-name="topic"
//                     onChange={this.handleFilterChange}
//                   >
//                     <option value="art">art</option>
//                     <option value="comments">comments</option>
//                     <option value="clothes">clothes</option>
//                     <option value="people">people</option>
//                   </select>
//                 </form>
//                 <form className="filter-container">
//                   <label htmlFor="select">style</label>
//                   <div className="angle-down">
//                     <FontAwesomeIcon icon="angle-down" className="icon" />
//                   </div>
//                   <select
//                     name="select"
//                     className="select"
//                     value={filters['style']}
//                     data-filter-name="style"
//                     onChange={this.handleFilterChange}
//                   >
//                     <option value="art">art</option>
//                     <option value="comments">comments</option>
//                     <option value="clothes">clothes</option>
//                     <option value="people">people</option>
//                   </select>
//                 </form>
//                 <form className="filter-container">
//                   <label htmlFor="select">site</label>
//                   <div className="angle-down">
//                     <FontAwesomeIcon icon="angle-down" className="icon" />
//                   </div>
//                   <select
//                     name="select"
//                     className="select"
//                     value={filters['site']}
//                     data-filter-name="site"
//                     onChange={this.handleFilterChange}
//                   >
//                     <option value="art">art</option>
//                     <option value="comments">comments</option>
//                     <option value="clothes">clothes</option>
//                     <option value="people">people</option>
//                   </select>
//                 </form>
//               </main>
//             )}
//             {category === 'clothes' && (
//               <main>
//                 <form className="filter-container">
//                   <label htmlFor="select">wardrobe</label>
//                   <div className="angle-down">
//                     <FontAwesomeIcon icon="angle-down" className="icon" />
//                   </div>
//                   <select
//                     name="select"
//                     className="select"
//                     value={filters['wardrobe']}
//                     data-filter-name="wardrobe"
//                     onChange={this.handleFilterChange}
//                   >
//                     <option value="art">art</option>
//                     <option value="comments">comments</option>
//                     <option value="clothes">clothes</option>
//                     <option value="people">people</option>
//                   </select>
//                 </form>
//                 <form className="filter-container">
//                   <label htmlFor="select">attire</label>
//                   <div className="angle-down">
//                     <FontAwesomeIcon icon="angle-down" className="icon" />
//                   </div>
//                   <select
//                     name="select"
//                     className="select"
//                     value={filters['attire']}
//                     data-filter-name="attire"
//                     onChange={this.handleFilterChange}
//                   >
//                     <option value="art">art</option>
//                     <option value="comments">comments</option>
//                     <option value="clothes">clothes</option>
//                     <option value="people">people</option>
//                   </select>
//                 </form>
//               </main>
//             )}
//             {category === 'people' && (
//               <main>
//                 <form className="filter-container">
//                   <label htmlFor="select">mood</label>
//                   <div className="angle-down">
//                     <FontAwesomeIcon icon="angle-down" className="icon" />
//                   </div>
//                   <select
//                     name="select"
//                     className="select"
//                     value={filters['mood']}
//                     data-filter-name="mood"
//                     onChange={this.handleFilterChange}
//                   >
//                     <option value="art">art</option>
//                     <option value="comments">comments</option>
//                     <option value="clothes">clothes</option>
//                     <option value="people">people</option>
//                   </select>
//                 </form>
//                 <form className="filter-container">
//                   <label htmlFor="select">group</label>
//                   <div className="angle-down">
//                     <FontAwesomeIcon icon="angle-down" className="icon" />
//                   </div>
//                   <select
//                     name="select"
//                     className="select"
//                     value={filters['group']}
//                     data-filter-name="group"
//                     onChange={this.handleFilterChange}
//                   >
//                     <option value="art">art</option>
//                     <option value="comments">comments</option>
//                     <option value="clothes">clothes</option>
//                     <option value="people">people</option>
//                   </select>
//                 </form>
//                 <form className="filter-container">
//                   <label htmlFor="select">angle</label>
//                   <div className="angle-down">
//                     <FontAwesomeIcon icon="angle-down" className="icon" />
//                   </div>
//                   <select
//                     name="select"
//                     className="select"
//                     value={filters['angle']}
//                     data-filter-name="angle"
//                     onChange={this.handleFilterChange}
//                   >
//                     <option value="art">art</option>
//                     <option value="comments">comments</option>
//                     <option value="clothes">clothes</option>
//                     <option value="people">people</option>
//                   </select>
//                 </form>
//               </main>
//             )}
//           </aside>
//           <aside className="secondary-config">
//             {category === 'art' && (
//               <main>
//                 <div className="filter-group">
//                   <div className="input-group">
//                     <label htmlFor="color">color</label>
//                     <input
//                       className="input"
//                       name="color"
//                       type="text"
//                       placeholder="#hex or name"
//                     />
//                     <div className="color-group">
//                       <div className="color-1" />
//                       <div className="color-2" />
//                       <div className="color-3" />
//                       <FontAwesomeIcon icon="angle-right" className="icon" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="filter-group">
//                   <div className="input-group">
//                     <label htmlFor="length">length</label>
//                     <input name="length" type="text" placeholder="px" />
//                   </div>
//                   <div className="input-group">
//                     <label htmlFor="width">width</label>
//                     <input name="width" type="text" placeholder="px" />
//                   </div>
//                 </div>
//               </main>
//             )}
//             {category === 'comments' && (
//               <main>
//                 <div className="filter-group">
//                   <div className="input-group">
//                     <label htmlFor="username">username</label>
//                     <input className="names" name="username" type="text" />
//                   </div>
//                 </div>
//               </main>
//             )}
//             {category === 'clothes' && (
//               <main>
//                 <div className="filter-group">
//                   <div className="input-group">
//                     <label htmlFor="color">color</label>
//                     <input
//                       className="input"
//                       name="color"
//                       type="text"
//                       placeholder="#hex or name"
//                     />
//                     <div className="color-group">
//                       <div className="color-1" />
//                       <div className="color-2" />
//                       <div className="color-3" />
//                       <FontAwesomeIcon icon="angle-right" className="icon" />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="filter-group gender">
//                   <div className="input-group">
//                     <label>gender</label>
//                     <FontAwesomeIcon icon="male" className="male-icon" />
//                   </div>
//                   <div className="input-group">
//                     <FontAwesomeIcon icon="female" className="female-icon" />
//                   </div>
//                 </div>
//               </main>
//             )}
//             {category === 'people' && (
//               <main>
//                 <div className="filter-group">
//                   <div className="input-group">
//                     <label htmlFor="name">name</label>
//                     <input className="names" name="name" type="text" />
//                   </div>
//                 </div>
//                 <div className="filter-group gender">
//                   <div className="input-group">
//                     <label>gender</label>
//                     <FontAwesomeIcon icon="male" className="male-icon" />
//                   </div>
//                   <div className="input-group">
//                     <FontAwesomeIcon icon="female" className="female-icon" />
//                   </div>
//                 </div>
//               </main>
//             )}
//           </aside>
//         </div>
//       }
//     </main>
//   )
// }
