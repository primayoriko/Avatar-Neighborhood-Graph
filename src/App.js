import React, { Component } from 'react'
import NavBar from './components/NavBar'
import Content from './components/Content'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Content />
      </div>
    )
  }
}
export default App;