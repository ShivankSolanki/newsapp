import React, { Component } from 'react'

export default class Navbar extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.mode !== this.props.mode) {
      this.setState({ mode: this.props.mode });
    }
  }

  render() {
    return (
      <div>
        <nav className={`navbar navbar-expand-lg bg-${this.props.mode} navbar-${this.props.mode}`} >
            <div className="container-fluid mx-5">
                <a className="navbar-brand" href='/'>NewsOwl</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href='/'>Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/">About</a>
                    </li>
                </ul>
                <div className="form-check form-switch">
                  <input className="form-check-input" onClick={this.props.darkMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                  <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
                </div>

                </div>
            </div>
          </nav>
      </div>
    )
  }
}
