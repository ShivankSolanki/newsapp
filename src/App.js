// ApiKey : a9d5947216294a3bb2b897c52168e35d

import './App.css';
import Navbar from './componants/Navbar'
import News from './componants/News'

import React, { Component} from 'react'

export default class App extends Component {

  constructor(){
    super();
    this.state = {
      mode: 'light'
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.mode !== this.state.mode) {
      document.body.className = this.state.mode;
    }
  }

  darkMode = () => {
    console.log("clicked");
    if(this.state.mode==='light'){
      this.setState({mode: 'dark'});
      document.getElementsByTagName("body")[0].style.backgroundColor = "#1a1d20";
      document.getElementsByTagName("body")[0].style.color = "white";
    }

    else{
      this.setState({
        mode: 'light'
      });
      document.getElementsByTagName("body")[0].style.backgroundColor = "white";
      document.getElementsByTagName("body")[0].style.color = "black";
    }
  };
  
      // this.setState((prevState) => ({
    //   mode: prevState.mode === 'light' ? 'dark' : 'light',
    // }));

  render() {
    return (
      <div>
        <Navbar mode={this.state.mode} darkMode={this.darkMode}/>
        <News pageSize={8} mode={this.state.mode}/>
      </div>
    )
  }
}