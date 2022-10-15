import React from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import styles from "./ViewMenuPage.module.css";
import { getMenu } from "../../Functions/FireStoreController";

export default class ViewMenuPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            CheckMenu: false,
            breakfast: [],
            lunch: [],
            dinner: [],
        }
    }

    render(){
        
        if(this.state.CheckMenu === false){

            const menudata = getMenu();
            menudata.then((data) => {
                if(data.menu === undefined){
                    this.setState({
                        CheckMenu: true,
                    })
                } else {
                    this.setState({
                        breakfast: data.menu.breakfast,
                        lunch: data.menu.lunch,
                        dinner: data.menu.dinner,
                        CheckMenu: true,
                    })
                    console.log(data.menu.breakfast);
                }
            })
            
            return <LoadingPage/>;

        } else {

            return(
                <div className={styles.mainBackground}>

                </div>
            )

        }

    }
}