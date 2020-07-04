import React from 'react';
import { TextField, Link, Button, Typography, makeStyles } from '@material-ui/core/';
import { CssBaseline, Container, Box, Grid  } from '@material-ui/core/';
import Tree from 'react-tree-graph';

import 'react-tree-graph/dist/style.css';
import './style/content.css';
import './style/tree.css';

class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = { query : "", status : -9999, message : "", data : {}, show : false, test : {}, turn : 1 };
    }

    changeQuery(event){
        this.setState({ query : event.target.value });
    }

    parseData(data){
        this.setState({ status : data.status, message : data.message });
        if( data.status === 200 ){
            return { 
                        friend : data.payload.friends,
                        self : { 
                                    id : data.payload.id,
                                    name : data.payload.name,
                                    element : data.payload.element
                                }
                    };
        } 
        return {};
    }

    filterFriendData(data, filteredValue){
        data.sort()
        var res = []
        if(data.length !== 0 && data[0].id !== filteredValue){
            res.push(data[0]);
        }
        for(var i = 1; i < data.length; i++){
            if(data[i].id !== data[i - 1].id && data[i].id !== filteredValue ){
                res.push(data[i]);
            }
        }
        return res;
    }

    fillNodeData(node, parent=false){
        var xPos;
        if(parent){
            xPos = -10;
        } else{
            xPos = -70;
        }
        return { 
            name : `${node.id} ${node.name}`, 
            gProps : { 
                        className : `node ${node.element}`, 
                        onClick : (event, key) => this.fetchResult(event, key)
                    },
            nodeProps : { cx: 70 },
            // textProps: { x: xPos, y: 25 }
        };
    }

    async fetchResult(event = null, key){
        key = key.split(" ")[0];

        if(!isNaN(key)){
            const url = 'https://avatar.labpro.dev/friends/' + key;
            const data = await fetch(url).then((res) => res.json(), (error) => { throw new Error(error) })
                        .then((data) => this.parseData(data))
                        .catch((error) => { alert(error) });

            if (this.state.status === 200){
                const filteredFriend = this.filterFriendData(Object.values(data.friend), data.self.id)
                const self = this.fillNodeData(data.self, true) 
                const child = filteredFriend.map((node) => this.fillNodeData(node)) //{
                self["children"] = child;
                this.setState({ 
                                data : self,
                                show : true,
                                turn : (this.state.turn % 2) + 1 
                                // test : data 
                            });
            } else if (this.state.status !== -9999){
                alert(`Error ${this.state.status}\n${this.state.message}`);
            }
        } else {
            alert(`Value inputted should be a number!\n${key} isn't a number`);
        }
        
    }

    showGraph(turn){
        if(this.state.show && this.state.turn === turn){
            return (
                <Box mt={3} component="div">
                    <Tree data={this.state.data} height={430} width={500} />
                </Box>
            );
        } else {
            return <Box component="div"> </Box>
        }
    }

    render(){
        return (
            <Container>
                <Box component="div" className="content">
                    <Container maxWidth="xs">
                        <Box mt={6}>
                            <Typography component="h1" variant="h5" align="left">
                                Search ID
                            </Typography>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="search"
                                name="search"
                                onChange={(event) => this.changeQuery(event)}
                                autoComplete="search"
                            />
                        </Box>
                        <Box mt={3} mb={4}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => this.fetchResult(undefined, this.state.query)}
                            >
                                Search!
                            </Button>
                        </Box>
                    </Container>

                    { this.showGraph(1) }
                    { this.showGraph(2) }
                </Box>
            </Container>
        );
    }
}

export default Content;