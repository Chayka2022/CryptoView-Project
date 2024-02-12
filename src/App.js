import { BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import Header from './components/header';
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "@mui/styles";
import TransactionPage from "./Pages/TransactionPage";
import web3 from './web3';

const useStyles = makeStyles({
  App: {
    background: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
});

function App() {
  
  console.log(web3.version);

  const classes = useStyles()

  return (
    <BrowserRouter> 
      <div className={classes.App}> 
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage/>} exact/>
          <Route path="/coins/:id" element={<CoinPage/>}/> 
          <Route path="/transactionpage" element={<TransactionPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
