import React from 'react';
import '../GlobalStyle.css';
import "./SelectLoginPage.css";
import { Input, Button } from '@douyinfe/semi-ui';

class SelectLoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            
        };

        this.JoinUsForm = {
            JoinUsEmail: '',
            JoinUsPassword: '',
            JoinUsConfirmPassword: '',
        }

        this.SignUpForm = {
            SignUpEmail: '',
            SignUpPassword: '',
        }

        this.buttonPrimaryColor = {
            background: "#607EAA",
            color: "#ffffff",
            width: "100%",
            height: "40px",
        }

        this.buttonSecoundryColor = {
            background: "#1C3879",
            color: "#ffffff",
            width: "100%",
            height: "40px",
        }

        this.InputSecoundryColor = {
            background: "#1C3879",
            color: "#ffffff",
        }

        this.InputPrimaryColor = {
            background: '#607EAA',
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
                        <font>Join Us</font>
                        <br/>
                        <div className='text'>Input Your Email:</div>
                        <Input style={this.InputSecoundryColor} size='large' placeholder="Inpupt Your Email" onChange={(value, e) => {
                            this.JoinUsForm.JoinUsEmail = value;
                        }}/> 
                        <br/>
                        <div className='text'>Input Your Password:</div>
                        <Input style={this.InputSecoundryColor} size='large' placeholder="Inpupt Your Password" onChange={(value, e) => {
                            this.JoinUsForm.JoinUsPassword = value;
                        }}/>
                        <br/>
                        <div className='text'>Confirm Your Password:</div>
                        <Input style={this.InputSecoundryColor} size='large' placeholder="Confirm Your Password" onChange={(value, e) => {
                            this.JoinUsForm.JoinUsConfirmPassword = value;
                        }}/>
                        <br/><br/>
                        <Button theme='solid' style={this.buttonSecoundryColor}>
                            Join Us
                        </Button>
                    </div>

                    <div className='SignIn'>
                        <font>Sign In</font>
                        <br/>
                        <div className='text'>Input Your Email:</div>
                        <Input style={this.InputPrimaryColor} size='large' placeholder="Inpupt Your Email" onChange={(value, e) => {
                            this.SignUpForm.SignUpEmail = value;
                        }}/>
                        <br/>
                        <div className='text'>Input Your Password:</div>
                        <Input style={this.InputPrimaryColor} size='large' placeholder="Inpupt Your Password" onChange={(value, e) => {
                            this.SignUpForm.SignUpPassword = value;
                        }}/>
                        <br/><br/>
                        <Button theme='solid' style={this.buttonPrimaryColor}>
                            Login
                        </Button>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default SelectLoginPage;