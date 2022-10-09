import React from "react";
import styles from "./EditMenuPage.module.css";
import { CustomTheme } from "../../Config/Color";
import LoadingPage from "../LoadingPage/LoadingPage";
import { getMenu } from "../../Functions/FireStoreController";
import { Paper } from "@mui/material";


export default class EditMenuPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            CheckMenu: false,
            breakfast: [],
            lunch: [],
            dinner: [],
        }

        //Form
        this.menuForm = {
            menu: {
                breakfast: [],
                lunch: [],
                dinner: [],
            }
        }

        //Style
        this.PaperStyle = {
            background: CustomTheme.primary,
            width: "100%",
        }

    }

    render() {


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
                }
            })

            return <LoadingPage/>;

        } else {

            return (
                <div className={styles.mainContainer}>
                    <Paper >
                        
                    </Paper>
                </div>
            );

        }   
    }
}