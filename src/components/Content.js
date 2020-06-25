import React from 'react';
import { TextField, Link, Button, Typography, makeStyles } from '@material-ui/core/';
import { CssBaseline, Container, Box, Grid  } from '@material-ui/core/';
import Graph from './Graph';

// import { spacing } from '@material-ui/system';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Avatar from '@material-ui/core/Avatar';
// import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
// import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import Button from '@material-ui/core/Button';
// import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://primayoriko.github.io/">
                Naufal Prima Yoriko - 13518146, IF ITB '18
            </Link>{' '}
            <p>{new Date().getFullYear()}</p>
        </Typography>
    );
}

class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = { query : "", status : -999, message : "", data : {}, show : false, test : {} };
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

    filterData(data, filteredValue){
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

    async fetchResult(event = null, key){
        if(!isNaN(key)){
            const url = 'https://avatar.labpro.dev/friends/' + key;
            const data = await fetch(url).then((res) => res.json())
                        .then((data) => this.parseData(data));
            if (this.state.status === 200){
                const filteredFriend = this.filterData(Object.values(data.friend), data.self.id)
                const child = filteredFriend.map((value) => {
                    return { name : value.id, gProps : { onClick : (event, key) => this.fetchResult(event, key) } };
                });
                this.setState({ data : { name : data.self.id, children : child }, show : true, test : data });
            } else {
                alert(`Error ${this.state.status}\n${this.state.message}`);
            }
        } else {
            alert(`Value inputted should be a number!\n${key} isn't a number`);
        }
        
    }

    async fetchResult2(event = null, key){
        this.setState({ data : { }, show : true });
    }

    showGraph(){
        if(this.state.show){
            if(this.state.status === 200){
                return (
                    <Box mt={3}>
                        <Graph data={this.state.data} height={400} width={400} />
                    </Box>
                );
            }
            else{
                return (
                    <Box>
                        <Typography component="h1" variant="h4">
                            ERROR {this.state.code}!
                        </Typography>
                        <Typography component="h1" variant="h6">
                            Image can't be displayed
                        </Typography>
                    </Box>
                );
            }
            
        }
    }

    displayElement(elmt){
        return (
            <Box>
                {
                    Object.keys(elmt).map((key, index) => ( 
                        <p key={index}> {key} : {elmt[key]} </p> 
                    ))
                }
            </Box>
        );
    }

    displayResult(){
        return (
            <Box>
                <Box>
                    { () => this.displayElement(this.state.self) }
                </Box>
                <Box>
                    {
                        Object.keys(this.state.friend).map((key, index) => ( 
                            <Box>
                                { () => this.displayElement(this.state.friend[key]) }
                            </Box> 
                        ))
                    } 
                </Box>
            </Box>
        );
    }

    render(){
        const classes = makeStyles((theme) => ({
            paper: {
                marginTop: theme.spacing(8),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            },
            avatar: {
                margin: theme.spacing(1),
                backgroundColor: theme.palette.secondary.main,
            },
            form: {
                width: '100%',
                marginTop: theme.spacing(3),
            },
            submit: {
                margin: theme.spacing(3, 0, 2),
            },
        }));
        
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box className={classes.paper} mt={6}>
                    <Typography component="h1" variant="h5">
                        Search ID
                    </Typography>
                    <Box className={classes.form}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
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
                        </Grid>
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => this.fetchResult(undefined, this.state.query)}
                        >
                            Search!
                        </Button>
                    </Box>
                </Box>
                {/* <Box>
                    { this.state.status }
                </Box> */}
                {/* <Box>
                    { JSON.stringify(this.state.test) }
                </Box> */}
                {/* <Box>
                    { JSON.stringify(this.state.data) }
                </Box> */}
                { this.showGraph() }
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

export default Content;