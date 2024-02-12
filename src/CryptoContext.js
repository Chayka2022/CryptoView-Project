import React, {  createContext, useEffect, useState, useContext } from 'react'

const Crypto = createContext();

const CryptoContext = ({ children }) => {

    const [currency, setCurrency] = useState("EUR");
    const [symbol, setSymbol] = useState("€");

    useEffect(() => {
        if(currency === "EUR") setSymbol("€");
        else if(currency === "USD") setSymbol("$");
        else if(currency === "RUB") setSymbol("₽");
    }, [currency]);


    return (
        <Crypto.Provider value={{currency,symbol,setCurrency}}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext;

export const CryptoState = () => {
    return useContext(Crypto);
}