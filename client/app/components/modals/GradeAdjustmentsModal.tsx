import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Modal from '../Modal'
import { hideModal } from '../../actions/modal'
import { startUpload } from '../../actions/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Dropzone from 'react-dropzone'

interface IProps {
  id: string
  username: string
  testTakerData: any
  startUpload: (any) => any
  hideModal: () => any
}

export class GradeAdjustmentsModal extends Component<IProps> {
  state = {
    page: 1
  }

  onClose = () => this.props.hideModal()

  handleFieldChange = async ({ target }) => {
    await this.setState({
      [target.name]: target.value
    })
  }

  submit = async () => {
    // const { name, type, medium, artist, height, width, file } = this.state
    // const { id, startUpload } = this.props

    // startUpload(data)
    this.onClose()
  }

  nextPage = () => this.setState({ page: this.state.page + 1 })

  renderPageOne = () => (
    <div className="grade-adjustments-modal">
      <h4>The number of students tested isn’t what you were expecting?</h4>
      <p>
        Grade is often used to determine who to bill for student test fees (for
        example, whether fees are billed to the school, district, or state), and
        occasionally students may indicate an incorrect grade. Grade adjustments
        may be made for a limited time to ensure that your bill is accurate.
        Please note that any adjustments made here will not be reflected in
        score reports. Also note that grade adjustments will be discarded if
        there is a subsequent update to your school’s answer sheet data; any
        previous grade adjustments will need to be re-entered.
      </p>
      <p>
        Prior to making any grade adjustments, rule out some other factors that
        could explain why the numbers might not look right to you- make sure
        that all answer sheet shipments or boxes arrived (check the tracking
        number on your dashboard).
      </p>
      <p>Do you want to continue with making grade adjustments?</p>
      <div className="button-group">
        <button className="cancel" onClick={this.onClose}>
          Cancel
        </button>
        <button className="continue" onClick={this.nextPage}>
          Continue
        </button>
      </div>
    </div>
  )
  renderPageTwo = () => {
    const { testTakerData } = this.props
    return (
      <div className="grade-adjustments-modal">
        <h4>Grade Adjustments for Billing Purposes</h4>
        <p>
          To ensure accurate billing, you may update the quantity for each
          grade. The total may not be changed, only the distribution of students
          across grades. Requests for grade adjustments for more than 20
          students will need to be submitted to Customer Service for approval.
          Please note that any adjustments made here will not be reflected in
          score reports. Also note that grade adjustments will be discarded if
          there is a subsequent update to your school’s answer sheet data; any
          previous grade adjustments will need to be re-entered.
        </p>
        <div className="students-tested-table-modal">
          <div className="headers">
            <p>Grade</p>
            <p>Ans Sheets Received</p>
            <p>Change To</p>
          </div>
          {testTakerData.map(({ grade, shipped, ansSheets, contract }) => (
            <div className="grade-row" key={`${grade}-${shipped}-${ansSheets}`}>
              <p>{grade}</p>
              <p>{ansSheets}</p>
              <div className="change-to-column">
                <input value={ansSheets} />
              </div>
            </div>
          ))}
          <div className="total-row">
            <p>Total</p>
            <p>
              {testTakerData.reduce(
                (store, { ansSheets }) => store + ansSheets,
                0
              )}
            </p>
          </div>
        </div>
        <div className="button-group">
          <button className="cancel" onClick={this.onClose}>
            Cancel
          </button>
          <button className="continue" onClick={this.nextPage}>
            Submit
          </button>
        </div>
      </div>
    )
  }

  renderPageThree = () => (
    <div className="grade-adjustments-modal">
      <h4>Your grade adjustments have been applied</h4>
      <p>
        Please remember that these adjustments will not be reflected in score
        reports and will be used for billing purposes only. Also note that any
        subsequent updates to your school’s answer sheet data will cause these
        adjustments to be discarded and any previous adjustments will need to be
        re-entered.
      </p>
      <div className="button-group">
        <button className="continue" onClick={this.onClose}>
          Ok
        </button>
      </div>
    </div>
  )

  //@ts-ignore
  render = () => {
    const { page } = this.state
    return (
      <Modal onClose={this.onClose}>
        {page === 1 && this.renderPageOne()}
        {page === 2 && this.renderPageTwo()}
        {page === 3 && this.renderPageThree()}
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  testTakerData: state.testTaker.data
})

export default connect(
  mapStateToProps,
  { startUpload, hideModal }
)(GradeAdjustmentsModal)

// may be needed in the future so that modal has access to reduce store
// export default withRouter(
//   connect(
//     mapStateToProps,
//     { hideModal }
//   )(ReportQuestionModal)
// )
