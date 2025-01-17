// ApiKey : a9d5947216294a3bb2b897c52168e35d

import './App.css';
import Navbar from './componants/Navbar'
import News from './componants/News'

import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <News/>
        
      </div>
    )
  }
}

