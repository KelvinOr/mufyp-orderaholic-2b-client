import React from "react";
import { isLogin } from "../../Functions/FirebaseAuth";
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

        if(this.state.isLoading === true) {

            return <LoadingPage />;

        } else{

            return (
                <div>
                    <h1>Main Page</h1>
                </div>
            );
            
        }

    }
}