import React, { useState } from 'react';
import { makeStyles, Button, ThemeProvider, createTheme, Typography } from '@material-ui/core';
import { utils } from 'ethers';

const useStyles = makeStyles((theme) => ({
    walletCard: {
        alignItems: 'center',
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
        fontFamily: "Montserrat",
    },
    values: {
        color: "tomato",
        overflow: 'break-word',
        fontFamily: 'Montserat',
        fontWeight: 'bold',
    },
    button: {
        cursor: "pointer",
        backgroundColor: "gold",
        color: "black",
        fontWeight: 700,
        "&:hover": {
          backgroundColor: "goldenrod",
          color: "Black",
        },
        width: "22%",
        marginBottom: 15,
        [theme.breakpoints.down("xs")]:{
            width: "40%",
        },
    },
    UserWalletAddress: {
        fontFamily: "Montserrat", 
        marginBottom:15,
        [theme.breakpoints.down("lg")]:{
            display: 'flex',
            flexDirection:'row',
            alignItems: 'center',
        },
        [theme.breakpoints.down("md")]:{
            display: 'flex',
            flexDirection:'row',
            alignItems: 'center',
        },
        [theme.breakpoints.down("sm")]:{
            display: 'flex',
            flexDirection:'column',
            alignItems: 'center',
        },
        [theme.breakpoints.down("xs")]:{
            display: 'flex',
            flexDirection:'column',
            alignItems: 'center',

        },
    }

}));



const WalletCard = () => {

    const darkTheme = createTheme({
        palette: {
            prymary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const classes = useStyles();

    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const [connButtonText, setConnButtonText] = useState('Connect Wallet');

    function connectWalletHandler ()  {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result);
				setConnButtonText('Wallet Connected');
				getAccountBalance(result[0]);
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount[0]);
		getAccountBalance(newAccount[0]);
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
		.then(balance => {
			setUserBalance(utils.formatEther(balance));
		})
		.catch(error => {
			setErrorMessage(error.message);
		});
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}

    // listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);
    
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.walletCard} >
                <h2 style={{marginBottom: 15}}>{"Connection to MetaMask"}</h2>
                <Button className={classes.button} onClick={connectWalletHandler}>{connButtonText}</Button>
                <div>
                    <h3 className={classes.UserWalletAddress}> 
                        <u style={{marginTop: '5px', marginBottom: '5px'}}>Address:</u>&nbsp; 
                        <Typography sx={{wordBreak: "break-word"}} className={classes.values}>  
                            {defaultAccount} 
                        </Typography>
                    </h3>
                </div>
                <div>
                    <h3 style={{marginBottom: 15 }}><u>Balance</u>: <span className={classes.values}> {userBalance} </span> ETH</h3>
                </div>
                {errorMessage}
            </div>
        </ThemeProvider>
    )
}

export default WalletCard;