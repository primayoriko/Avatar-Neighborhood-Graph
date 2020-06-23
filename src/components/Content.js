import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { spacing } from '@material-ui/system';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Avatar from '@material-ui/core/Avatar';



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
        // this.searchQuery = this.searchQuery.bind(this);
        this.state = { query : "", show : false, friend : {}, self : {}, status : 200 };
    }

    searchQuery(event){
        this.setState({ query : event.target.value });
    }

    fetchResult(){
        const url = 'https://avatar.labpro.dev/friends/' + this.state.query;
        this.setState({ show : true});
        fetch(url).then((res) => res.json())
                    .then((data) => {
                        // this.setState({ result : data });
                        this.setState({ status : data.status });
                        if( data.status == 200 ){
                            this.setState({ friend : data.payload.friend,
                                            self : { "id" : data.payload.id,
                                                        "name" : data.payload.name,
                                                        "element" : data.payload.name
                                                    }
                                            });
                        } 
                        console.log(data.status);
                    });
            
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
                    {/* <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar> */}
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
                            //label="Search"
                            name="search"
                            onChange={(event) => this.searchQuery(event)}
                            //autoComplete="email"
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
                    {/* <Grid container justify="flex-end">
                        <Grid item>
                        <Link href="#" variant="body2">
                            Already have an account? Sign in
                        </Link>
                        </Grid>
                    </Grid> */}
                    </form>
                    <Box>
                        { () => {
                                // if(this.state.show){
                                    return this.state.result;
                                // }
                            }
                        }
                    </Box>
                    { 
                        // this.state.result.map(item => <Box>{item}</Box>)
                        // () => {
                        //     if(this.state.show){
                        //         return (
                        //             <Box>
                        //                 <p> this.state.query </p>
                        //                 {/* <p> this.state.result </p> */}
                        //             </Box>
                        //         );    
                        //     }  
                        // }
                    }
                </Box>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}

export default Content;