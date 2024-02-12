import  React,  { useState } from 'react';
import { makeStyles, TextField, createTheme, ThemeProvider, Typography, Button, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import image from '../images/ethereum.png';
import { Web3 } from 'web3';
import {ethers} from 'ethers'; 


const useStyles = makeStyles((theme) => ({
    transactionForm: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Montserrat",
        fontWeight: 'bold',
        paddingBottom: "5%",
        [theme.breakpoints.down("md")]:{
            display:"flex",
            flexDirection: "column",
            justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]:{
            display:"flex",
            flexDirection: "column",
            alignItems: "center",
        },
        [theme.breakpoints.down("xs")]:{
            alignItems: "center",
        },
    },
    transactionFormComponents: {
        marginBottom: '20px',
        [theme.breakpoints.down("lg")]:{
            width: "50%",
            alignContent: "center",
        },
        [theme.breakpoints.down("md")]:{
            width: "50%",
            alignContent: "center",
        },
        [theme.breakpoints.down("sm")]:{
            width: "80%",
            alignContent: "center",
        },
        [theme.breakpoints.down("xs")]:{
            width: "80%",
            alignContent: "center",
        }
    },
    transactionFormComponentsDiv: {
        marginBottom: '20px',
        [theme.breakpoints.down("lg")]:{
            display: 'flex',
            flexDirection: 'row',
            width:"100%",            
            justifyContent:'center'
        },
        [theme.breakpoints.down("md")]:{
            display: 'flex',
            flexDirection: 'row',
            width:"100%",            
            justifyContent:'center'
        },
        [theme.breakpoints.down("sm")]:{
            display: 'flex',
            flexDirection: 'row',
            width: "100%",
            justifyContent:'center'
        },
        [theme.breakpoints.down("xs")]:{
            display: 'flex',
            flexDirection: 'row',
            width: "100%",
            justifyContent:'center'
        }
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
        width: "35%",
        alignSelf: 'center', 
        display: "flex", 
        flexDirection: "column", 
        marginTop:30,
    },
    image: { 
        flexDirection: "column",
        [theme.breakpoints.down("lg")]:{
            display:"flex",
            justifyContent: "space-around",
            marginTop:-1200,
            marginBottom:-1150,
            scale:'5%', 
        },
        [theme.breakpoints.down("md")]:{
            display:"flex",
            justifyContent: "space-around",
            marginTop:-1200,
            marginBottom:-1150,
            scale:'5%', 
        },
        [theme.breakpoints.down("sm")]:{
            flexDirection: "column",
            alignItems: "center",
            marginTop:-1200,
            marginBottom:-1150,
            scale:'5%',
        },
        [theme.breakpoints.down("xs")]:{
            alignItems: "center",
            marginTop:-1200,
            marginBottom:-1150,
            scale:'5%',
        },
    },
    AmountTextField: {
        [theme.breakpoints.down("lg")]:{
            flexBasis: '40%', 
            alignSelf:'center'
        },
        [theme.breakpoints.down("md")]:{
            flexBasis: '40%', 
            alignSelf:'center'
        },
        [theme.breakpoints.down("sm")]:{
            flexBasis: '65%', 
            alignSelf:'center'
        },
        [theme.breakpoints.down("xs")]:{
            flexBasis: '65%', 
            alignSelf:'center'
        },
    },
    Select: {
        [theme.breakpoints.down("lg")]:{
            flexBasis: '10%',
            alignSelf: 'center',
        },
        [theme.breakpoints.down("md")]:{
            flexBasis: '10%',
            alignSelf: 'center',
        },
        [theme.breakpoints.down("sm")]:{
            flexBasis: '15%',
            alignSelf: 'center',
        },
        [theme.breakpoints.down("xs")]:{
            flexBasis: '15%', 
            alignSelf:'center'
        },  
    },
}));


const SendTransactionForm = () => {

    const classes = useStyles();

    const darkTheme = createTheme({
        palette: {
            prymary: {
                main: "#fff",
            },
            type: "dark",
        },
    });
    
    const[recipient, setRecipient] = useState("");    
    const [value, setValue] = React.useState('Ether');
    const [amount, setAmount] = React.useState('');

    let convertedAmount = 0;

    async function requestAccount(){
        await window.ethereum.request( { method: 'eth_requestAccounts'});
    } 

    const updateSelectVal = (event) => {
        setValue(event.target.value);
        return;
    }
    
    async function getProviderAndSignerAndTranser() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        
        const tx = await signer.sendTransaction({
            to: recipient,
            value: converterToEther(),
        });
        return;
    }

    const converterToEther = () => {
        if(value==='Ether') {
            convertedAmount = Web3.utils.toWei(amount, 'ether');
            console.log(convertedAmount);
        }
        else if(value==='Gwei') {
            convertedAmount = Web3.utils.toWei(amount, 'Gwei');
            console.log(convertedAmount);
        }
        else {
            convertedAmount = amount; 
            console.log(convertedAmount);        
        }
        return convertedAmount;
    }
    
    async function sendButtonClicked() {
        converterToEther();
        await getProviderAndSignerAndTranser();
        return;
    }

    return(
        <ThemeProvider theme={darkTheme}>
            <div>
                <div className={classes.transactionForm}>
                    <Typography variant='h3' style={{fontFamily: "Montserrat", marginBottom:35, alignSelf: 'center', display: "flex", flexDirection: "column", }}>Send Crypto</Typography>
                    <img src={image} className={classes.image}/>
                    <Typography variant='h7' style={{marginBottom: 15}}><u>Recipient's Address:</u></Typography>
                    <TextField 
                        inputProps={{style: { textAlign: 'center', color:'tomato', fontWeight:'bold' }}} 
                        variant="outlined" 
                        className={classes.transactionFormComponents}
                        onChange={(e) => setRecipient(e.target.value)}
                        value={recipient}    
                    >
                    </TextField>
                    <Typography variant='h7' style={{fontFamily: "Montserrat", marginBottom:15}}><u>Amount:</u></Typography>
                    <div className={classes.transactionFormComponentsDiv}>
                    <TextField inputProps={{style: { color:'tomato', textAlign: 'right', fontWeight:'bold', marginRight:'10%'}}} 
                        className={classes.AmountTextField}
                        variant="outlined" 
                        value={amount}
                        onChange={(event) => {
                            setAmount(event.target.value);
                        }}
                    >
                    </TextField>
                        <Select 
                            variant='outlined'
                            className={classes.Select}
                            labelId="Unit-select-label"
                            id="demo-simple-select"
                            value={value} 
                            onChange={updateSelectVal}
                            >
                            <MenuItem value={"Ether"}>Ether</MenuItem>
                            <MenuItem value={"Gwei"}>Gwei</MenuItem>
                            <MenuItem value={"Wei"}>Wei</MenuItem>
                        </Select>
                    </div>
                    <Button className={classes.button} onClick={sendButtonClicked}> Send </Button>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default SendTransactionForm;