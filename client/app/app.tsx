import React from 'react'
import { render } from 'react-dom'
import AppRouter from './routers/AppRouters'
import { library, dom } from '@fortawesome/fontawesome-svg-core'

import {
  faTimes,
  faEllipsisH,
  faBars,
  faSearch,
  faBell,
  faCaretDown,
  faAngleLeft,
  faAngleDown,
  faAngleRight,
  faArrowLeft,
  faPlus,
  faHome,
  faDollarSign,
  faShoppingCart,
  faSlidersH,
  faSitemap,
  faEraser,
  faTrash,
  faUpload,
  faGlobe
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faTimes,
  faEllipsisH,
  faBars,
  faSearch,
  faBell,
  faHome,
  faCaretDown,
  faAngleLeft,
  faAngleDown,
  faAngleRight,
  faArrowLeft,
  faPlus,
  faDollarSign,
  faShoppingCart,
  faSlidersH,
  faSitemap,
  faEraser,
  faTrash,
  faUpload,
  faGlobe
)

// finds <i> tags and replacing with <svg>
dom.watch()

import './styles/styles.sass'
import 'react-toggle/style.css'

render(<AppRouter />, document.getElementById('root'))
