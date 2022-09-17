import React from 'react';
import '../GlobalStyle.css';
import "./SelectLoginPage.css";
import { Input, Button } from '@douyinfe/semi-ui';
import { CustomTheme } from '../../Config/Color';
import { CreateUserWithEmailAndPassword } from '../../Functions/FirebaseAuth';

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
            color: "#ffffff",
        }

        this.InputPrimaryColor = {
            background: CustomTheme.primary,
            color: "#ffffff",
        }
    }

    btn_SignUp_onClick() {
        console.log(this.JoinUsForm);
        if(this.JoinUsForm.SignUpPassword === this.JoinUsForm.SignUpConfirmPassword){
            CreateUserWithEmailAndPassword(this.JoinUsForm.SignUpEmail, this.JoinUsForm.SignUpPassword).then((userCredential) => {
                console.log("Singup")
                console.log(userCredential);
            }).catch((error) => {
                console.log("Error")
                console.log(error);
            });
            
        } else {
            alert("Password not match");
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
                        <Button theme='solid' style={this.buttonSecoundryColor}  onClick={() => this.btn_SignUp_onClick()}>
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