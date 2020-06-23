import React from 'react';
import { CssBaseline, Container, Box, Grid  } from '@material-ui/core/';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';

class Graph extends React.Component {
    constructor(props){
        super(props);
        this.state = { data : this.props.data };
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.data !== prevProps.data){
            this.setState({ data : this.props.data });
        }
    }

    render(){
        return (
            <Box>
                <Tree data={this.state.data} />
            </Box>
        );
    }
}

export default Graph;