import React from 'react';
import { Link, Typography } from '@material-ui/core/';
import { Container, Box, Grid } from '@material-ui/core/';

class Footer extends React.Component {
    render(){
        return (
            <Box mt={5}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {/* {'Copyright © '} */}
                    <Link color="inherit" href="https://primayoriko.github.io/">
                        Naufal Prima Yoriko - 13518146, IF ITB '18
                    </Link>{' '}
                    <p>{new Date().getFullYear()}</p>
                </Typography>
            </Box>
        );
    }
}

export default Footer;