import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '../../../node_modules/@fortawesome/react-fontawesome'

import { startLogin } from '../actions/auth'

interface ICredentials {
  username: string
  password: string
}

interface IProps {
  history?: any
  startLogin(data: ICredentials): any
}

interface IState {
  username: string
  password: string
  errors: {
    username: string
    password: string
    global?: string
  }
}

export class LoginPage extends Component<IProps, IState> {
  state = {
    username: '',
    password: '',
    errors: {
      username: '',
      password: '',
      global: ''
    }
  }

  handleCredentialError = property =>
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [property]: `${property} password field cannot be blank`
      }
    }))

  handleCredentialReset = property =>
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        [property]: ``
      }
    }))

  onFieldChange = ({ target }) => {
    const { name, value }: { name: keyof IState; value: string } = target
    this.setState({ [name]: value } as any)
  }

  onSubmit = async e => {
    e.preventDefault()

    // extract submission helpers from props
    const { startLogin, history } = this.props

    // extract entered username and password from state
    const { username, password } = this.state

    // build credentials object for submission
    const credentials = { username, password }

    // check that username is not empty
    if (username.length === 0) this.handleCredentialError(`username`)
    if (username.length !== 0) this.handleCredentialReset(`username`)

    // check that password is not empty
    if (password.length === 0) this.handleCredentialError(`password`)
    if (password.length !== 0) this.handleCredentialReset(`password`)

    // if frontend validations pass, send user credentials to the server
    if (username.length > 0 && password.length > 0) {
      try {
        await startLogin(credentials)
        console.log('login success')
        history.push('/dashboard')
      } catch (err) {
        console.log('frontend error', err)
        return this.setState({ errors: err.response.data.errors })
      }
    }
  }

  render = () => {
    const { errors } = this.state
    return (
      <div className="credentials-container">
        <section className="login-section">
          <h1>Welcome back. Please sign in.</h1>
          <hr />
          <form onChange={this.onFieldChange} onSubmit={this.onSubmit}>
            <hr />
            <label>Username</label>
            <input name="username" />
            <label>Password</label>
            <input name="password" />
            <button className="yellow-button">Sign In</button>
            <div className="checkbox-container">
              <input type="checkbox" />
              <p>Remember me</p>
            </div>
            <p>
              Forgot
              <Link to="/reset" className="link">
                &nbsp;username
              </Link>
              &nbsp;or
              <Link to="/reset" className="link">
                &nbsp;password
              </Link>
            </p>
          </form>
        </section>
        <section className="signup-section">
          <img />
          <h2>Don't have an account?</h2>
          <Link to="/dashboard" className="yellow-button">
            Sign Up
          </Link>
        </section>
      </div>

      // <div className="login-page">
      //   <div className="login-bg" />
      //   <Link to="/" className="header">
      //     <div className="globe">
      //       <FontAwesomeIcon icon="globe" />
      //     </div>
      //     <h1 className="app-name">Arsenalsssss</h1>
      //   </Link>
      //   <form
      //     className="login-form"
      //     onChange={this.onFieldChange}
      //     onSubmit={this.onSubmit}
      //   >
      //     {errors.global && <p className="global-errors">{errors.global}</p>}
      //     <div className="input-group">
      //       <label className="title">username</label>
      //       <input
      //         type="text"
      //         name="username"
      //         style={{
      //           border: !!errors.username ? '2px solid #e87c7c' : 'none'
      //         }}
      //       />
      //       {errors.username && (
      //         <p className="inline-errors">{errors.username}</p>
      //       )}
      //     </div>
      //     <div className="input-group">
      //       <label className="title">password</label>
      //       <input
      //         type="password"
      //         name="password"
      //         style={{
      //           border: !!errors.password ? '2px solid #e87c7c' : 'none'
      //         }}
      //       />
      //       {errors.password && (
      //         <p className="inline-errors">{errors.password}</p>
      //       )}
      //     </div>
      //     <div className="input-group">
      //       <div className="switch-page">
      //         <p className="text">Don't have an account?</p>
      //         <Link to="/signup" className="signup-link">
      //           &nbsp;Signup
      //         </Link>
      //       </div>
      //       <button type="submit" className="login-button button">
      //         Login
      //       </button>
      //     </div>
      //   </form>
      //   <div className="overlay" />
      //   <div className="bg" />
      // </div>
    )
  }
}

export default connect(
  null,
  { startLogin }
)(LoginPage)
