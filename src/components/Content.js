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
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}

class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = { query : "", status : -999, data : {}, show : false, test : {} };
        // this.searchQuery = this.searchQuery.bind(this);
    }

    searchQuery(event){
        this.setState({ query : event.target.value });
    }

    parseData(data){
        this.setState({ status : data.status });
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

    async fetchResult(){
        const url = 'https://avatar.labpro.dev/friends/' + this.state.query;
        const data = await fetch(url).then((res) => res.json())
                    .then((data) => this.parseData(data));
        const child = Object.keys(data.friend).map((key) => {
            return { name : data.friend[key].id };
        });
        this.setState({ data : { name : data.self.id, children : child }, show : true });
    }

    showGraph(){
        if(this.state.show){
            return (
                <Graph data={this.state.data} height={400} width={400} />
            );
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
                    Avatar Neighborhood Site
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="search"
                                name="search"
                                onChange={(event) => this.searchQuery(event)}
                                autoComplete="search"
                            />
                            </Grid>
                        </Grid>
                        <Button
                            //type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => this.fetchResult()}
                        >
                            Search!
                        </Button>
                    </form>
                </Box>
                <Box mt={5}>
                    <Copyright />
                </Box>
                <Box>
                    { this.state.status }
                </Box>
                { this.showGraph() }
                {/* <Box>
                    { JSON.stringify(this.state.data) }
                </Box> */}
                {/* <Box>
                    { JSON.stringify(this.state.test) }
                </Box> */}
                {/* <Box>
                    { () => this.displayResult() }
                </Box> */}
            </Container>
        );
    }
}

export default Content;