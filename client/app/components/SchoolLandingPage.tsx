import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import moment from 'moment'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { startAddTag } from '../actions/images'

interface IProps {
  results: any
  //   id?: string
  //   image: any
  //   editMode: boolean
  //   history?: any
  //   startAddTag?: any
}

// interface IState {
//   tagDropdownOpen: boolean
//   tagName: string
//   tagScrollbars: boolean
// }

export class SchoolLandingPage extends Component<IProps> {
  state = {
    //   image: this.props.image,
    //   tagDropdownOpen: false,
    //   tagScrollbars: false,
    //   tagName: ''
  }

  // private tagContainerWidth = createRef<HTMLDivElement>()
  // private tagContentWidth = createRef<HTMLDivElement>()

  // private toggleTagDropdown = () =>
  //   this.setState(prevState => ({
  //     tagDropdownOpen: !prevState.tagDropdownOpen
  //   }))

  // private handleTextValidation = async e => {
  //   const {
  //     target: { value: input }
  //   } = e

  //   // letters (case-insensitive), numbers, hash
  //   // TODO: cannot start with numbers
  //   const regex = /^[a-zA-Z\d\#]+$/

  //   if ((!input || input.match(regex)) && input.length < 18) {
  //     this.setState(() => ({ tagName: input }))
  //   }
  // }

  // private handleSubmit = async e => {
  //   e.preventDefault()

  //   const { tagName } = this.state
  //   const { id, image, startAddTag } = this.props
  //   const data = { userId: id, image: image._id, name: tagName }

  //   console.log('data', data)

  //   await startAddTag(data)
  //   this.toggleTagDropdown()
  // }

  // private formatImageDates = () => {
  //   const { image } = this.state
  //   if (image !== false) {
  //     let formattedImage = image

  //     if (
  //       moment(formattedImage.createdAt).isValid() ||
  //       moment(formattedImage.updatedAt).isValid()
  //     ) {
  //       // prettier-ignore
  //       formattedImage.createdAt = moment(Date.parse(image.createdAt)).format(
  //         "MMMM Do, YYYY"
  //       )

  //       // prettier-ignore
  //       formattedImage.updatedAt = moment(Date.parse(image.updatedAt)).format(
  //         "MMMM Do, YYYY"
  //       )
  //       this.setState({ image: formattedImage } as any)
  //     }
  //   }
  // }

  // private checkTagListOverflow = () => {
  //   const tagContainer = this.tagContainerWidth.current
  //   const tagContent = this.tagContentWidth.current

  //   // client width, scroll width, offset width
  //   if (tagContainer.clientWidth < tagContent.scrollWidth) {
  //     this.setState({ tagScrollbars: true })
  //   }
  // }

  // public componentDidMount = () => {
  //   this.formatImageDates()
  //   this.checkTagListOverflow()
  // }

  public render = () => {
    const { results } = this.props

    //   const { tagName, image, tagScrollbars, tagDropdownOpen } = this.state
    //   const extraneous = [
    //     '_id',
    //     'url',
    //     'owner',
    //     'height',
    //     'width',
    //     'tags',
    //     'comments', // deactivate later
    //     'trainingWheels',
    //     'imageAttributes',
    //     'deleted',
    //     '__v'
    //   ]
    //   const artDefaults = ['device', 'palette']
    //   const commentDefaults = ['device', 'palette']
    //   const clothDefaults = ['gender', 'palette']
    //   const peopleDefaults = ['gender', 'palette']

    return (
      <div className="school-landing-container">
        <header>
          <section>
            <h1>Welcome</h1>
            <p>
              Welcome to the ordering tool for SAT® School Day, PSAT/NMSQT®,
              PSAT™10, and PSAT™8/9.
            </p>
            <p>
              Your scheduled administrations are listed below, where you can
              view important messages, review quantities, and update orders.
            </p>
            <p>
              To set up a new exam or new test date, click the Add New
              Administration button.
            </p>
            <p>
              You may also search for other schools that are planning to
              administer PSAT/NMSQT®, PSAT™10, and PSAT™8/9 exams to help
              students that are looking for locations to take an exam.
            </p>
            <p>
              See the number of students that tested and used fee waivers last
              year to help inform your order for this year.
            </p>
          </section>
          <aside>
            <div className="button-container">
              <Link to="/test-ordering" className="blue-button-lg">
                Add New Administration
              </Link>
            </div>
          </aside>
        </header>
        <main>
          <h2>Your Administrations</h2>
          <div className="admins">
            {results.schoolAdmins.map(
              ({ admin, date, contract, study, research }) => (
                <section className="admin" key={`${admin}-${date}-${contract}`}>
                  <header>
                    <h2 className="title">
                      {admin} - {date}
                    </h2>
                    <Link to="/order-details" className="link">
                      View Order Details
                    </Link>
                  </header>
                  <main>
                    <section>
                      <p>Primary Date: {date}</p>
                      <hr />
                      <div className="messages">
                        <div className="message">
                          <div className="icon">.</div>
                          <h3 className="text">The test date has passed.</h3>
                        </div>
                      </div>
                    </section>
                    <aside>
                      <Link to="invoice-1-page" className="blue-link-button">
                        Enter Invoice Information
                      </Link>
                    </aside>
                  </main>
                </section>
              )
            )}
          </div>
        </main>
      </div>

      // <div className="image-page">
      //   <header>
      //     <h1>{image.name}</h1>
      //     <div className="locksmith">
      //       {image.trainingWheels ? (
      //         <FontAwesomeIcon icon="lock" className="icon" />
      //       ) : (
      //         <FontAwesomeIcon icon="unlock" className="icon" />
      //       )}
      //     </div>
      //   </header>
      //   <main>
      //     <img src={image.url} height="350" width="500" />
      //     <div className="caption">
      //       <div className="tags">
      //         <Dropdown
      //           isOpen={this.state.tagDropdownOpen}
      //           toggle={this.toggleTagDropdown}
      //           direction="up"
      //           className="dropdown-root"
      //         >
      //           <DropdownToggle className="dropdown-toggle">
      //             <FontAwesomeIcon icon="plus" className="plus-icon" />
      //           </DropdownToggle>
      //           <DropdownMenu
      //             className="dropdown-menu"
      //             style={{
      //               display: tagDropdownOpen === false ? 'none' : 'block'
      //             }}
      //           >
      //             <form className="tag-form" onSubmit={this.handleSubmit}>
      //               <input
      //                 type="text"
      //                 value={tagName}
      //                 placeholder={'New tag...'}
      //                 onChange={this.handleTextValidation}
      //               />
      //             </form>
      //           </DropdownMenu>
      //         </Dropdown>
      //         <div className="tag-list" ref={this.tagContainerWidth}>
      //           {tagScrollbars && (
      //             <div className="angle-left-icon">
      //               <FontAwesomeIcon icon="angle-left" />
      //             </div>
      //           )}
      //           <div className="content" ref={this.tagContentWidth}>
      //             {image.tags !== undefined &&
      //               image.tags.map(tag => (
      //                 <p key={tag.id} data-id={tag.id}>
      //                   {tag.name}
      //                 </p>
      //               ))}
      //           </div>
      //           {tagScrollbars && (
      //             <div className="angle-right-icon">
      //               <FontAwesomeIcon icon="angle-right" />
      //             </div>
      //           )}
      //         </div>
      //       </div>
      //       <div className="dimensions">
      //         <p>
      //           {image.height} x {image.width}
      //         </p>
      //       </div>
      //     </div>
      //   </main>
      //   <aside>
      //     <div className="properties">
      //       {Object.entries(image)
      //         .sort(
      //           (a, b) =>
      //             // sort by length, if equal then // sort by dictionary order
      //             a[0].length - b[0].length || a[0].localeCompare(b[0])
      //         )
      //         .map(
      //           (property: any) =>
      //             extraneous.every(spec => property[0] !== spec) && (
      //               <p key={property[0]}>{property[0]} :</p>
      //             )
      //         )}
      //     </div>
      //     <div className="values">
      //       {!editMode &&
      //         Object.entries(image)
      //           .sort(
      //             (a, b) =>
      //               // sort by length, if equal then // sort by dictionary order
      //               a[0].length - b[0].length || a[0].localeCompare(b[0])
      //           )
      //           .map(
      //             (property: any) =>
      //               extraneous.every(spec => property[0] !== spec) && (
      //                 <p key={property[0]}>
      //                   {typeof property[1] === 'string' && (
      //                     <span>{property[1]}</span>
      //                   )}
      //                   {typeof property[1] === 'object' && (
      //                     <span>{property[1].name}</span>
      //                   )}
      //                 </p>
      //               )
      //           )}
      //       {editMode &&
      //         Object.entries(image)
      //           .sort(
      //             (a, b) =>
      //               // sort by length, if equal then // sort by dictionary order
      //               a[0].length - b[0].length || a[0].localeCompare(b[0])
      //           )
      //           .map(
      //             (property: any) =>
      //               extraneous.every(spec => property[0] !== spec) && (
      //                 <input
      //                   key={property[0]}
      //                   value={
      //                     typeof property[1] === 'string'
      //                       ? property[1]
      //                       : property[1].name
      //                   }
      //                 />
      //               )
      //           )}
      //     </div>
      //   </aside>
      // </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  results: state.school.results[0] // change to know which school was clicked on
  // id: state.auth.id,
  // image:
  //   state.images.all !== undefined &&
  //   state.images.all.find(image => image._id === props.match.params._id),
  // editMode: state.app.editMode
})

export default connect(
  mapStateToProps,
  { startAddTag }
)(SchoolLandingPage)
