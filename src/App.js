import React, { Component } from 'react'
import { Box } from '@material-ui/core/';
import NavBar from './components/NavBar'
import Content from './components/Content'
import './App.css';

class App extends Component {
  render() {
    // const appStyle  = {
    //   backgroundColor: "rgba(255, 255, 255, 0.7)",
    //   height: "100%"
    // };
    return (
      <Box component="div" className="App" pt={1}>
        <NavBar />
        <Content />
      </Box>
    )
  }
}
export default App;