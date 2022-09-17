import React from 'react';
import '../GlobalStyle.css';
import "./SelectLoginPage.css";
import { CustomTheme } from '../../Config/Color';
import { CreateUserWithEmailAndPassword } from '../../Functions/FirebaseAuth';
import { Button, InputBase, Paper } from '@mui/material';

class SelectLoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            NotificationIsShowed: false,
            NotificationMessage: "",
            NotificationType: "",
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
            background: CustomTheme.primary,
            color: "#ffffff",
            width: "100%",
            height: "40px",
        }

        this.buttonSecoundryColor = {
            background: CustomTheme.secondary,
            color: "#ffffff",
            width: "100%",
            height: "40px",
        }

        this.InputSecoundryColor = {
            background: CustomTheme.secondary,
            width: "100%",
        }

        this.InputPrimaryColor = {
            background: CustomTheme.primary,
            width: "100%",
        }
    }

    btn_SignUp_onClick() {
        if(this.JoinUsForm.JoinUsPassword === this.JoinUsForm.JoinUsConfirmPassword){
            CreateUserWithEmailAndPassword(this.JoinUsForm.JoinUsEmail, this.JoinUsForm.JoinUsEmail).then((userCredential) => {
                switch(userCredential){
                    
                }
            }).catch((error) => {
                console.log("Error")
                console.log(error);
            });
            
        } else {
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
                        <Paper variant='none' style={this.InputSecoundryColor}>
                            <InputBase size='large' placeholder="Input Your Email" sx={{p: '5px'}} style={{ color: "#ffffff"}} onChange={(event) => {this.JoinUsForm.JoinUsEmail = event.target.value}} />
                        </Paper>
                        <br/>
                        <div className='text'>Input Your Password:</div>
                        <Paper variant='none' style={this.InputSecoundryColor}>
                            <InputBase size='large' placeholder="Input Your Password" sx={{p: '5px'}} style={{ color: "#ffffff"}} onChange={(event) => {this.JoinUsForm.JoinUsPassword = event.target.value}} />
                        </Paper>
                        <br/>
                        <div className='text'>Confirm Your Password:</div>
                        <Paper variant='none' style={this.InputSecoundryColor}>
                            <InputBase size='large' placeholder="Confirm Your Password" sx={{p: '5px'}} style={{ color: "#ffffff"}} onChange={(event) => {this.JoinUsForm.JoinUsConfirmPassword = event.target.value;}}/>
                        </Paper>
                        <br/><br/>
                        <Button variant='contained' style={this.buttonSecoundryColor} onClick={() => this.btn_SignUp_onClick()}>
                            Join Us
                        </Button>
                    </div>

                    <div className='SignIn'>
                        <font>Sign In</font>
                        <br/>
                        <div className='text'>Input Your Email:</div>
                        <Paper variant='none' style={this.InputPrimaryColor}>
                            <InputBase size='large' placeholder="Input Your Email" sx={{p: '5px'}} style={{ color: "#ffffff"}} onChange={(event) => {this.SignUpForm.SignUpEmail = event.target.value}} />
                        </Paper>
                        <br/>
                        <div className='text'>Input Your Password:</div>
                        <Paper variant='none' style={this.InputPrimaryColor}>
                            <InputBase size='large' placeholder="Input Your Password" sx={{p: '5px'}} style={{ color: "#ffffff"}} onChange={(event) => {this.SignUpForm.SignUpPassword = event.target.value}} />
                        </Paper>
                        <br/><br/>
                        <Button variant='contained' style={this.buttonPrimaryColor}>
                            Sign In
                        </Button>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default SelectLoginPage;