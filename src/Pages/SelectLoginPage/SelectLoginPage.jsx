import React from 'react';
import '../GlobalStyle.css';
import "./SelectLoginPage.css";
import { Paper, InputBase, ThemeProvider } from '@mui/material';
import CustomTheme from '../../Functions/CustomTheme';

class SelectLoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="main-background">
                <div className="backgorund-card"/>
                <div className="logo">
                    Orderaholic
                </div>
                <div className="main">
                    <div className="JoinUs">
                        <ThemeProvider theme={CustomTheme}>
                        <Paper>
                            <InputBase />
                        </Paper>
                        </ ThemeProvider>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectLoginPage;