import React from 'react';
import '../GlobalStyle.css';
import styles from './SelectLoginPage.module.css';
import { CustomTheme } from '../../Config/Color';
import { CreateUserWithEmailAndPassword, SignInWithEmail } from '../../Functions/FirebaseAuth';
import { getRestaurantData } from '../../Functions/FireStoreController';
import { Button, InputBase, Paper, Snackbar, Alert } from '@mui/material';

class SelectLoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            NotificationIsShowed: false,
            NotificationMessage: "",
            NotificationType: "",
        };

        // Form 
        this.JoinUsForm = {
            JoinUsEmail: '',
            JoinUsPassword: '',
            JoinUsConfirmPassword: '',
        }

        this.LoginForm = {
            LoginEmail: '',
            LoginPassword: '',
        }

        // Style
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
        
        this.InputbaseStyle = {
            width: "100%",
            color: "#ffffff",
        }
    }

    //button Click Action
    btn_SignUp_onClick() {
        if(this.JoinUsForm.JoinUsPassword === this.JoinUsForm.JoinUsConfirmPassword){
            CreateUserWithEmailAndPassword(this.JoinUsForm.JoinUsEmail, this.JoinUsForm.JoinUsPassword).then((userCredential) => {
                switch(userCredential){
                    
                }
            }).catch((error) => {
                console.log("Sign up Error:" + error.code);
                switch(error.code){
                    case "auth/email-already-in-use":
                        this.setState({
                            NotificationIsShowed: true,
                            NotificationMessage: "Email already in use.",
                            NotificationType: "warning",
                        });
                        break;

                    case "auth/invalid-email":
                        this.setState({
                            NotificationIsShowed: true,
                            NotificationMessage: "Invalid email.",
                            NotificationType: "warning",
                        });
                        break;

                    case "auth/weak-password":
                        this.setState({
                            NotificationIsShowed: true,
                            NotificationMessage: "Weak password.",
                            NotificationType: "warning",
                        });
                        break;

                    default:
                        this.setState({
                            NotificationIsShowed: true,
                            NotificationMessage: "Unknown error.",
                            NotificationType: "error",
                        });
                        break;
                }

            });
            
        } else {
            this.setState({
                NotificationIsShowed: true,
                NotificationMessage: "Passwords are not same.",
                NotificationType: "error",
            });
        }
    }

    btn_Login_onClick() {
        SignInWithEmail(this.LoginForm.LoginEmail, this.LoginForm.LoginPassword).then((userCredential) => {
            this.isFirstLogin(userCredential.user.uid);
        }).catch((error) => {
            console.log("Login Error:" + error.code);
            switch(error.code){
                case "auth/invalid-email":
                    this.setState({
                        NotificationIsShowed: true,
                        NotificationMessage: "Invalid email.",
                        NotificationType: "warning",
                    }); 
                    break;

                case "auth/user-disabled":
                    this.setState({
                        NotificationIsShowed: true,
                        NotificationMessage: "User disabled.",
                        NotificationType: "error",
                    });
                    break;

                case "auth/user-not-found":
                    this.setState({
                        NotificationIsShowed: true,
                        NotificationMessage: "User not found.",
                        NotificationType: "error",
                    });
                    break;
                
                case "auth/wrong-password":
                    this.setState({
                        NotificationIsShowed: true,
                        NotificationMessage: "Wrong password.",
                        NotificationType: "warning",
                    });
                    break;
                
                default:
                    this.setState({
                        NotificationIsShowed: true,
                        NotificationMessage: "Unknown error.",
                        NotificationType: "error",
                    }); 
                    break;
            }

        });
    }

    //function
    async isFirstLogin(restaurantId) {
        console.log("isFirstLogin is called");
        await getRestaurantData(restaurantId).then((data) => {
            if(data.exists()){
                //TODO
            } else {
                window.location.href = "create-info";
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    


    render() {

        const vertical = "top";
        const horizontal = "center";

        return (
            <div className="main-background">
                <Snackbar open={this.state.NotificationIsShowed} autoHideDuration={6000} onClose={() => { this.setState({ NotificationIsShowed: false }) }} message={this.state.NotificationMessage} anchorOrigin={{ vertical, horizontal }}>
                    <Alert onClose={() => { this.setState({ NotificationIsShowed: false }) }} severity={this.state.NotificationType} sx={{ width: '100%' }} variant="filled">
                        {this.state.NotificationMessage}
                    </Alert>
                </Snackbar>
                <div className={styles.backgroundCard} style={{background: CustomTheme.secondary}}/>
                <div className="logo">
                    Orderaholic
                </div>
                <div className={styles.main}>
                    <div className={styles.JoinUs}>
                        <font>Join Us</font>
                        <br/>
                        <div className={styles.text}>Input Your Email:</div>
                        <Paper variant='none' style={this.InputSecoundryColor}>
                            <InputBase size='large' placeholder="Input Your Email" sx={{p: '5px'}} style={this.InputbaseStyle} onChange={(event) => {this.JoinUsForm.JoinUsEmail = event.target.value}} />
                        </Paper>
                        <br/>
                        <div className={styles.text}>Input Your Password:</div>
                        <Paper variant='none' style={this.InputSecoundryColor}>
                            <InputBase size='large' placeholder="Input Your Password" sx={{p: '5px'}} style={this.InputbaseStyle} onChange={(event) => {this.JoinUsForm.JoinUsPassword = event.target.value}} />
                        </Paper>
                        <br/>
                        <div className={styles.text}>Confirm Your Password:</div>
                        <Paper variant='none' style={this.InputSecoundryColor}>
                            <InputBase size='large' placeholder="Confirm Your Password" sx={{p: '5px'}} style={this.InputbaseStyle} type="password" onChange={(event) => {this.JoinUsForm.JoinUsConfirmPassword = event.target.value;}}/>
                        </Paper>
                        <div style={{height: "25px"}}/>
                        <Button variant='contained' style={this.buttonSecoundryColor} onClick={() => this.btn_SignUp_onClick()}>
                            Join Us
                        </Button>
                    </div>

                    <div className={styles.SignIn}>
                        <font>Sign In</font>
                        <br/>
                        <div className={styles.text}>Input Your Email:</div>
                        <Paper variant='none' style={this.InputPrimaryColor}>
                            <InputBase size='large' placeholder="Input Your Email" sx={{p: '5px'}} style={this.InputbaseStyle} onChange={(event) => {this.LoginForm.LoginEmail = event.target.value}} />
                        </Paper>
                        <br/>
                        <div className={styles.text}>Input Your Password:</div>
                        <Paper variant='none' style={this.InputPrimaryColor}>
                            <InputBase size='large' placeholder="Input Your Password" sx={{p: '5px'}} style={this.InputbaseStyle} type="password" onChange={(event) => {this.LoginForm.LoginPassword = event.target.value}} />
                        </Paper>
                        <div style={{height: "25px"}}/>
                        <Button variant='contained' style={this.buttonPrimaryColor} onClick={() => this.btn_Login_onClick()}>
                            Login
                        </Button>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default SelectLoginPage;