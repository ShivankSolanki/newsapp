import React, { useState, useEffect } from 'react'

import {
  Link
} from "react-router-dom";

const Navbar = (props) => {

  const [mode, setMode] = useState(props.mode)

  useEffect(() => {
    setMode(props.mode)
  }, [props.mode])


  return (
    <div>
      <nav className={`navbar fixed-top navbar-expand-lg bg-${props.mode} navbar-${props.mode}`} >
        <div className="container-fluid mx-5">
          <Link className="navbar-brand" to='/'>NewsOwl</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><Link className="nav-link" to='/'>Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
            </ul>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" role="switch" onChange={props.darkMode} checked={props.mode === 'dark'} id="flexSwitchCheckDefault" />
              <label className="form-check-label" style={{ color: props.mode === 'dark' ? 'white' : 'black' }} htmlFor="flexSwitchCheckDefault">Enable Dark Mode</label>
            </div>

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
