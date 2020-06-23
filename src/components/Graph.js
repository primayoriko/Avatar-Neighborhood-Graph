import React from 'react';
import { CssBaseline, Container, Box, Grid  } from '@material-ui/core/';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import './style/graph.css'

class Graph extends Tree {
    // constructor(props){
    //     super(props);
    //     this.state = { data : this.props.data, height: this.props.height, width : this.props.width };
    // }

    // componentDidUpdate(prevProps, prevState, snapshot){
    //     if(this.props.data !== prevProps.data){
    //         this.setState({ data : this.props.data });
    //     }
    // }

    // render(){
    //     return (
    //         <Box>
    //             <Tree data={this.state.data} height={this.state.height} width={this.state.width}  />
    //         </Box>
    //     );
    // }
}

export default Graph;