import React, { Component } from 'react'
import { Container, Box } from '@material-ui/core/';
import NavBar from './components/NavBar'
import Content from './components/Content'
import Footer from './components/Footer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Content />
        <Footer />
      </div>
    )
  }
}
export default App;