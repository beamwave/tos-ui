import React from 'react'
import { connect } from 'react-redux'

// import all modal components
import AddImageModal from './modals/AddImageModal'
import gradeAdjustmentsModal from './modals/GradeAdjustmentsModal'

// import modal type constants
import {
  ADD_IMAGE_MODAL,
  GRADE_ADJUSTMENTS_MODAL
} from '../constants/modaltypes'

// modal directory based on props.modalType
const MODAL_COMPONENTS = {
  ADD_IMAGE_MODAL: AddImageModal,
  GRADE_ADJUSTMENTS_MODAL: gradeAdjustmentsModal
}

export const ModalContainer = props => {
  // if no modal set in store, do not render one
  if (!props.modalType) {
    return null
  }

  // object lookup
  const SpecificModal = MODAL_COMPONENTS[props.modalType]

  return <SpecificModal />
}

const mapStateToProps = state => ({
  modalType: state.modal.modalType
})

export default connect(mapStateToProps)(ModalContainer)
