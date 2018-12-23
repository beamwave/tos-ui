import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadModal } from '../actions/modal'
import { GRADE_ADJUSTMENTS_MODAL } from '../constants/modaltypes'

import moment from 'moment'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { startTestTakerRetrieval } from '../actions/testTaker'

interface IProps {
  results: any
  loadModal: any
  testTakerData: any
  startTestTakerRetrieval: (data: any) => any
}

export class Invoice1Page extends Component<IProps> {
  state = {}

  gradeAdjustmentModal = () => this.props.loadModal(GRADE_ADJUSTMENTS_MODAL)

  componentDidMount = () => {
    const { startTestTakerRetrieval } = this.props
    // const { getDataFromStore } = this.state
    const data = { aicode: '471315' }
    startTestTakerRetrieval(data)
  }

  render = () => {
    const { results, testTakerData } = this.props

    console.log('test taker data:', testTakerData)

    return (
      <div className="invoice-1-page-container">
        <header>
          <div className="progress-bar">
            <div className="titles">
              <p>School Info</p>
              <p>Borrowed/Loaned Test Books</p>
              <p>Confirmation</p>
            </div>
            <div className="stages">
              <div className="stage" />
              <div className="stage" />
              <div className="stage" />
              <div className="line" />
            </div>
          </div>
        </header>
        <main>
          <section className="body">
            <section>
              <h2>Provide information to help us calculate your invoice</h2>
              <p>
                The information you are about to provide is used to calculate
                your invoice. Invoices will be sent to schools in mid-January.
                You must provide invoice information by 1/11/2019. You cannot
                make edits after this date.
              </p>
            </section>
            <section>
              <h2>Send bill to</h2>
              <form className="user-information-form">
                <div className="form-group">
                  <label>First Name *</label>
                  <input />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input />
                </div>
                <div className="form-group">
                  <label>Job Title *</label>
                  <select>
                    <option value="select">- Select Job Title -</option>
                    <option value="c">K12: Counselor</option>
                    <option value="tc">K12: Test Coordinator</option>
                    <option value="apc">K12: AP Coordinator</option>
                    <option value="p">K12: Principal</option>
                    <option value="ap/d">K12: Assistant Principal/Dean</option>
                    <option value="dh">K12: Department Head</option>
                    <option value="sf">K12: School Faculty</option>
                    <option value="apt">K12: AP Teacher</option>
                    <option value="t">K12: Teacher (non-AP)</option>
                    <option value="cs">K12: Curriculum Specialist</option>
                    <option value="o">K12: Other - K-12</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Email address *</label>
                  <input />
                </div>
                <div className="form-group">
                  <label>Purchase Order Number</label>
                  <input />
                </div>
              </form>
            </section>
            <section>
              <h2>Students tested</h2>
              <p>
                The numbers below show the number of standard tests shipped (for
                your reference) and the number of student answer sheets received
                and will be used to calculate your bill. If this isn't what you
                are expecting, it is possible that a student may have indicated
                an incorrect grade. Grade adjustments may be made for a limited
                time to ensure that your bill is accurate. Please note that any
                adjustments made here will not be reflected in score reports.
              </p>
              <div className="grade-adjustments">
                <p
                  className="link grade-adjustments-button"
                  onClick={this.gradeAdjustmentModal}
                >
                  Grade Adjustments
                </p>
                <p className="grade-adjustments-tooltip">
                  Grade is often used to determine who to bill for student test
                  fees (for example, whether fees are billed to the school,
                  district, or state), and occasionally students may indicate an
                  incorrect grade. Grade adjustments may be made for a limited
                  time to ensure that your bill is accurate. Please note that
                  any adjustments made here will not be reflected in score
                  reports. Also note that grade adjustments will be discarded if
                  there is a subsequent update to your school's answer sheet
                  data; any previous grade adjustments will need to be
                  re-entered.
                </p>
              </div>

              <div className="students-tested-table">
                <div className="headers">
                  <p>Grade</p>
                  <p>Tests Shipped</p>
                  <p>Ans Sheets Received</p>
                  <p>Contract</p>
                </div>
                {testTakerData.map(
                  ({ grade, shipped, ansSheets, contract }) => (
                    <div
                      className="grade-row"
                      key={`${grade}-${shipped}-${ansSheets}`}
                    >
                      <p>{grade}</p>
                      <p>{shipped}</p>
                      <p>{ansSheets}</p>
                      <p>{contract}</p>
                    </div>
                  )
                )}
                <div className="total-row">
                  <p>Total</p>
                  <p>
                    {testTakerData.reduce(
                      (store, { shipped }) => store + shipped,
                      0
                    )}
                  </p>
                  <p>
                    {testTakerData.reduce(
                      (store, { ansSheets }) => store + ansSheets,
                      0
                    )}
                  </p>
                </div>
              </div>
            </section>
            <section>
              <h2>Students covered by contracts</h2>
              <p>(table varies between psat/sat/)</p>
              <div className="contract-table">
                <div className="headers">
                  <p>Covered by</p>
                  <p>SAT (witout Essay)</p>
                  <p>SAT with Essay</p>
                </div>
                <div className="state">
                  <p>State Contract</p>
                  <p>0</p>
                  <p>0</p>
                </div>
                <div className="district">
                  <p>District Contract</p>
                  <p>0</p>
                  <p>0</p>
                </div>
              </div>
            </section>
          </section>
          <aside>
            <div className="sidepanel-container">
              {/* <h3>{name}</h3>
            <p>{aicode}</p>
            <p>{admin}</p>
            <p>{date}</p> */}
              <h3>Princess Anne high school</h3>
              <p>(471315)</p>
              <p>Sat School Day</p>
              <p>Wed. October 10, 2018</p>
              <p>Reason for modifying or submitting invoice</p>
              <textarea />
              <Link to="/invoice" className="blue-link-button">
                Continue
              </Link>
              <Link to="/school-landing" className="link">
                exit
              </Link>
            </div>
          </aside>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  results: state.school.results[0], // change to know which school was clicked on
  testTakerData: state.testTaker.data
})

export default connect(
  mapStateToProps,
  { startTestTakerRetrieval, loadModal }
)(Invoice1Page)
