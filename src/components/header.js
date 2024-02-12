import React from 'react';
import {AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider, Button} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../CryptoContext';
const useStyles = makeStyles({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer"
    }
})

const Header = () => {

    const classes = useStyles()

    const navigate = useNavigate();

    const { currency, setCurrency } = CryptoState();
 
    const darkTheme = createTheme({
        palette: {
            prymary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    return(
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography onClick={() => navigate("/")} className={classes.title} variant='h5'>
                            Crypto View
                        </Typography>
                        <Button variant='primary' 
                            onClick={() => navigate("/transactionpage")}

                            style={{
                            height: 40,
                            marginRight: 15,
                        }}>
                            Buy/Send Crypto
                        </Button>
                        <Select variant='outlined' style={{
                            width: 100,
                            height: 40,
                            marginRight: 15,
                        }}
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={'USD'}>USD</MenuItem>
                            <MenuItem value={'EUR'}>EUR</MenuItem>
                            <MenuItem value={'RUB'}>RUB</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header;