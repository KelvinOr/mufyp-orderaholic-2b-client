import React from 'react';
import TextField from '@mui/material/TextField';
import '../GlobalStyle.css';
import "./SelectLoginPage.css";

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

            </div>
        );
    }
}

export default SelectLoginPage;