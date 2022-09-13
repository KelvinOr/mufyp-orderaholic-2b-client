import React from 'react';
import '../GlobalStyle.css';
import "./SelectLoginPage.css";
import { InputBase } from '@mui/material';

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
                        
                        <div className='input'>
                            <InputBase style={{color: "#ffffff"}} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectLoginPage;