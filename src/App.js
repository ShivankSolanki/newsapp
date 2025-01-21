import './App.css';
import Navbar from './componants/Navbar'
import News from './componants/News'
import LoadingBar from "react-top-loading-bar"

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import React, { useState, useEffect } from 'react'

const App = () => {

  const apiKey = process.env.REACT_APP_NEWS_API;

  const [mode, setMode] = useState('dark');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  const darkMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.getElementsByTagName("body")[0].style.backgroundColor = "#1a1d20";
      document.getElementsByTagName("body")[0].style.color = "white";
    }

    else {
      setMode('light')
      document.getElementsByTagName("body")[0].style.backgroundColor = "white";
      document.getElementsByTagName("body")[0].style.color = "black";
    }
  };

  return (
    <Router>
      <div>

        <Navbar mode={mode} darkMode={darkMode} />
        <LoadingBar
          height={3}
          color="#c62543"
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={8} mode={mode} country='us' category='general' />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={8} mode={mode} country='us' category='business' />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={8} mode={mode} country='us' category='sports' />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={8} mode={mode} country='us' category='health' />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={8} mode={mode} country='us' category='science' />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={8} mode={mode} country='us' category='technology' />} />
        </Routes>

      </div>
    </Router>
  )
}

export default App