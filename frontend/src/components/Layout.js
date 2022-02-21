import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Grid container justifyContent="center" direction="column" >
                {children}
            </Grid>
            <Footer />
        </>
    );
}

export default Layout;