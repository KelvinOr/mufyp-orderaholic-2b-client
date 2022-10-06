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
        var interval = setInterval(() => {
        counter--;
        if(isLogin() === true){
            this.setState({isLoading: false});
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