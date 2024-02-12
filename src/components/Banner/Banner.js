import { Container, Typography, makeStyles } from '@material-ui/core';
import React from 'react';
import Background from '../../images/compute-ea4c57a4.png'
import Carousel from './Carousel';

const useStyles = makeStyles({
    banner: {
        backgroundImage: `url(${Background})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'      
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around"
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center"
    }
});

const Banner = () => {
    const classes = useStyles();

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                    variant="h2"
                    style={{
                        fontWeight: "bold",
                        marginBottom: 15,
                        gontFamily: "Montserrat",
                    }}>
                        Crypto View
                    </Typography>
                    <Typography 
                    variant="subtitle2"
                    style={{
                        color: "darkgray",
                        textTransform: "capitalize",
                        fontFamily: "Montserrat"
                    }}>
                        Get all the info regarding Crypto Currency
                    </Typography>
                </div>
                <Carousel />
            </Container>
    </div>
    );
};

export default Banner;