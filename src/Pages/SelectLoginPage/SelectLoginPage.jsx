import React from 'react';
import '../GlobalStyle.css';
import "./SelectLoginPage.css";
import { InputBase } from '@mui/material';
import { Input } from '@douyinfe/semi-ui';

class SelectLoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            JoinUsEmail: '',
        };
        this.customStyle = {
            background: "#1C3879",
            color: "#ffffff",
        }
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
                        <br/>
                        <Input style={this.customStyle}  onChange={(value, e) => {
                            this.setState({JoinUsEmail: value}); 
                        }}/> 
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectLoginPage;