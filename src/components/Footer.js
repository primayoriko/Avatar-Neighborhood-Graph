import React from 'react';
import { Link, Typography } from '@material-ui/core/';
import { Container, Box} from '@material-ui/core/';

import './style/footer.css';

class Footer extends React.Component {
    render(){
        return (
            <Box mt={5} className="footer" pb={2} pt={4}>
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