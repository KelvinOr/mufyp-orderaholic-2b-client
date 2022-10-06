import React from 'react';
import '../GlobalStyle.css';
import styles from './SelectLoginPage.module.css';
import { CustomTheme } from '../../Config/Color';
import { CreateUserWithEmailAndPassword, SignInWithEmail, SendResetPasswordEmail } from '../../Functions/FirebaseAuth';
import { getRestaurantData } from '../../Functions/FireStoreController';
import { Button, 
        InputBase, 
        Paper, 
        Snackbar, 
        Alert, 
        Dialog, 
        DialogTitle, 
        DialogContent, 
        DialogContentText, 
        DialogActions, 
        TextField, } from '@mui/material';

class SelectLoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            NotificationIsShowed: false,
            NotificationMessage: "",
            NotificationType: "",
            DialogOpen: false,
            DialogInputValue: "",
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

    //Action
    btn_SignUp_onClick() {
        if(this.JoinUsForm.JoinUsPassword === this.JoinUsForm.JoinUsConfirmPassword){
            CreateUserWithEmailAndPassword(this.JoinUsForm.JoinUsEmail, this.JoinUsForm.JoinUsPassword).then((userCredential) => {
                window.location.href = "/create-info";
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

    btn_ForgetPassword_onClick() {
        this.setState({
            DialogOpen: true,
            DialogInputValue: this.LoginForm.LoginEmail,
        })
    }

    btn_DialogOnClose_onClick() {
        this.setState({
            DialogOpen: false,
        })
    }

    btn_DialogOnSend_onClick() {
        SendResetPasswordEmail(this.state.DialogInputValue).then(() => {
            this.setState({
                NotificationIsShowed: true,
                NotificationMessage: "Reset password email sent.",
                NotificationType: "success",
                DialogOpen: false,
            });
        }).catch((error) => {
            console.log("Reset password error:" + error.code);
            switch(error.code){
                case "auth/invalid-email":
                    this.setState({
                        NotificationIsShowed: true,
                        NotificationMessage: "Invalid email.",
                        NotificationType: "warning",
                    }); 
                    break;

                case "auth/user-not-found":
                    this.setState({
                        NotificationIsShowed: true,
                        NotificationMessage: "User not found.",
                        NotificationType: "error",
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
                window.location.href = "/disboard";
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

                <Dialog open={this.state.DialogOpen} PaperProps={{ style: { backgroundColor: CustomTheme.primary }}}>
                    <DialogTitle>
                        <div className={styles.text}>
                            Forget Password
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div className={styles.text}>
                                Please enter your email address. We will send you a link to reset your password.
                            </div>
                        </DialogContentText>
                        <TextField
                            fullWidth
                            variant="standard"
                            label="Email"
                            sx={{
                                '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                                '& .MuiInput-underline:after': { borderBottomColor: CustomTheme.secondary },
                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: CustomTheme.secondary },
                                '& .MuiInputBase-input': { color: 'white' },
                                '& .MuiInputLabel-root': { color: 'white' },
                                '& .MuiInputLabel-root.Mui-focused': { color: CustomTheme.secondary },
                                '& .MuiInputLabel-root.Mui-disabled': { color: 'white' },
                            }}
                            onChange={(event) => { this.setState({ DialogInputValue: event.target.value }) }}
                        />
                        
                        <DialogActions>
                            <Button style={{...this.buttonSecoundryColor, width: "fit-contect"}} onClick={() => this.btn_DialogOnSend_onClick()}>Send</Button>
                            <Button style={{...this.buttonSecoundryColor, width: "fit-contect"}} onClick={() => this.btn_DialogOnClose_onClick()}>Cancel</Button>
                        </DialogActions>
                    </DialogContent>    
                </Dialog>

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
                            <InputBase size='large' placeholder="Input Your Password" sx={{p: '5px'}} style={this.InputbaseStyle} type="password" onChange={(event) => {this.JoinUsForm.JoinUsPassword = event.target.value}} />
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
                        <div style={{height: "10px"}} />
                        <button style={{color: "#FFFFFF", backgroundColor: "transparent", backgroundRepeat: "no-repeat", border: "none", cursor: "pointer"}} onClick={() => this.btn_ForgetPassword_onClick()}>
                            <u>Forget Password</u>
                        </button>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default SelectLoginPage;