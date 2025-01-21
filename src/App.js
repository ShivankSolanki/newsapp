import './App.css';
import Navbar from './componants/Navbar'
import News from './componants/News'
import LoadingBar from "react-top-loading-bar"

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import React, { Component } from 'react'

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      mode: 'dark',
      progress: 0,
    }
  }

  apiKey = process.env.REACT_APP_NEWS_API;

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mode !== this.state.mode) {
      document.body.className = this.state.mode;
    }
  }

  darkMode = () => {
    if (this.state.mode === 'light') {
      this.setState({ mode: 'dark' });
      document.getElementsByTagName("body")[0].style.backgroundColor = "#1a1d20";
      document.getElementsByTagName("body")[0].style.color = "white";
    }

    else {
      this.setState({
        mode: 'light'
      });
      document.getElementsByTagName("body")[0].style.backgroundColor = "white";
      document.getElementsByTagName("body")[0].style.color = "black";
    }
  };

  setProgress = (progress) => {
    this.setState({progress: progress})
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar mode={this.state.mode} darkMode={this.darkMode} />
          <LoadingBar
            height={3}
            color="#c62543"
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={8} mode={this.state.mode} country='us' category='general' />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={8} mode={this.state.mode} country='us' category='business' />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={8} mode={this.state.mode} country='us' category='sports' />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={8} mode={this.state.mode} country='us' category='health' />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={8} mode={this.state.mode} country='us' category='science' />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={8} mode={this.state.mode} country='us' category='technology' />} />
          </Routes>

        </div>
      </Router>
    )
  }
}