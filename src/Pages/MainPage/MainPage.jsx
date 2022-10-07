import React from "react";
import styles from "./MainPage.module.css";
import { isLogin, Signout, GetUserInfo } from "../../Functions/FirebaseAuth";
import { newRestaurantData, getRestaurantData } from "../../Functions/FireStoreController";
import LoadingPage from "../LoadingPage/LoadingPage";


export default class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            Page: "Menu Management",
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
                    <div className={styles.container}>

                    </div>
                </div>

            );
            
        }

    }
}