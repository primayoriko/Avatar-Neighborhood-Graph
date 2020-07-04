import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

const NavBar = () => {
    return(
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        Avatar Neighborhood Graph Site
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;