import React from 'react';
import { TextField, Link, Button, Typography, makeStyles } from '@material-ui/core/';
import { CssBaseline, Container, Box, Grid  } from '@material-ui/core/';
import Tree from 'react-tree-graph';
import RevertIcon from '@material-ui/icons/Replay';
import Footer from './Footer'

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
            textProps: { x: xPos, y: 20 }
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

    showRevert(){
        if(this.state.show){
            return (
                <Box mt={2}>
                    <RevertIcon style={{ fontSize: 32 }} />
                </Box>
            );
        }
        return <Box></Box>;
    }

    showRes(){
        if(this.state.show){
            return (
                <Box my={2}>
                    <Typography component="h1" variant="h6" align="left">
                        Result:
                    </Typography>
                </Box>
            );
        }
        return <Box></Box>;
    }

    showGraph(turn){
        if(this.state.show && this.state.turn === turn){
            return (
                <Box component="div">
                    <Tree data={this.state.data} height={580} width={500} />
                </Box>
            );
        } else if(!this.state.show) {
            return <Box component="div" style={{ height: "170px" }} > </Box>
        }
        return <Box component="div"> </Box>
    }

    render(){
        return (
            <Container className="contentContainer">
                <Box component="div" className="contentBox" mt={15} mb={4} pb={5}>
                    <Container maxWidth="xs">
                        <Typography component="h1" variant="h5" align="left">
                            Search ID
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={11}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="search"
                                    name="search"
                                    onChange={(event) => this.changeQuery(event)}
                                    autoComplete="search"
                                />
                            </Grid>
                            <Grid item xs={1}>
                                { this.showRevert() }
                            </Grid>
                            <Grid item xs={11}>
                                <Box mb={4}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => this.fetchResult(undefined, this.state.query)}
                                    >
                                        Search!
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>

                    { this.showRes() }
                    { this.showGraph(1) }
                    { this.showGraph(2) }
                    <Footer />
                </Box>
            </Container>
        );
    }
}

export default Content;