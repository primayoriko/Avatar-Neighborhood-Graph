import React, { Component } from 'react'
import NavBar from './components/NavBar'
import Content from './components/Content'
import Footer from './components/Footer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Content />
        <Footer />
      </div>
    )
  }
}
export default App;