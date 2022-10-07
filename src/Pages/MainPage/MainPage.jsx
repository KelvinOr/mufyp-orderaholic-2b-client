import React from "react";
import styles from "./MainPage.module.css";
import { isLogin, Signout, GetUserInfo } from "../../Functions/FirebaseAuth";
import { newRestaurantData, getRestaurantData } from "../../Functions/FireStoreController";
import LoadingPage from "../LoadingPage/LoadingPage";
import { CustomTheme } from "../../Config/Color";
import { Button } from "@mui/material";
import MenuManagementPage from "../MenuManagementPage/MenuManagementPage";


export default class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            Page: "Menu Management",
        }

        //Form

        //Style
        this.buttonPrimaryColor = {
            background: CustomTheme.primary,
            color: "#ffffff",          
            height: "40px",
            width: "100%",
        }

        this.buttonDisabledColor = {
            background: CustomTheme.disabled,
            color: "#ffffff",
            height: "40px",
            width: "100%",
        }
    }

    btn_SignOut_onClick(){
        Signout();
        window.location.href = "/";
    }

    switchPage(){
            
            switch(this.state.Page) {
                case "Menu Management":
                    return <MenuManagementPage />;
                case "Order Management":
                    console.log("Order Management");
                    return;
                
                default:
                    return;   
            }
    
    }

    render() {


        if(this.state.isLoading) {

            var counter = 20;
            //Check Login && First Login
            var interval = setInterval(() => {
                counter--;
                if(isLogin() === true){
                if(GetUserInfo() !== null) {
                    getRestaurantData(GetUserInfo().uid).then((result) => {
                    if(result.exists()) {
                        this.setState({isLoading: false});
                    } else{
                        window.location.href = "/create-info";
                    }
                    });
                }
                    clearInterval(interval);
                }
                if (counter === 0) {
                    clearInterval(interval);
                    window.location.href = "/";
                }
            }, 200);

        }

        if(this.state.isLoading) {

            return <LoadingPage />;

        } else{

            return (

                <div className={styles.mainBackground}>

                    <div className={styles.logo}>Orderaholic</div>
                    <div className={styles.navBar}>
                        <Button style={ this.state.Page === "Menu Management"? this.buttonDisabledColor : this.buttonPrimaryColor } onClick={() => {this.setState({Page: "Menu Management"})}} disabled={this.state.Page === "Menu Management"}>
                            Menu Management
                        </Button>
                        <div className={styles.navBarSpace}></div>
                        <Button style={ this.state.Page === "Order Management"? this.buttonDisabledColor : this.buttonPrimaryColor } onClick={() => {this.setState({Page: "Order Management"})}} disabled={this.state.Page === "Order Management"}>
                            Order Management
                        </Button>

                        <Button style={{...this.buttonPrimaryColor, position: "absolute", bottom: "20px"}} onClick={() => this.btn_SignOut_onClick()}>
                            Sign Out
                        </Button>
                    </div>
                    <div className={styles.container}>
                        <div style={{margin: "20px" , width: "97%", height: "97%"}}>
                            {this.switchPage()}
                        </div>
                    </div>
                </div>

            );
            
        }

    }
}