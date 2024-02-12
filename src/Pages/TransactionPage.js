    import React from 'react';
    import WalletCard from '../components/UserWalletInfo'
    import SendTransactionForm from '../components/SendTransactionForm';
    import { createTheme, ThemeProvider } from '@material-ui/core';

    const TransactionPage = () => {
        return(
            <div>
                <WalletCard/>
                <SendTransactionForm/>
            </div>
        )
    }

    export default TransactionPage;