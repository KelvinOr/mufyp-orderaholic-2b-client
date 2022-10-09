import { Button } from "@mui/material";
import React from "react";
import styles from "./MenuManagementPage.module.css";
import { CustomTheme } from "../../Config/Color";
import EditMenuPage from "../EditMenuPage/EditMenuPage";

export default class MenuManagementPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
        }

  

        //Style
        this.buttonSecondaryColor = {
            background: CustomTheme.secondary,
            color: "#ffffff",
            height: "40px",
            width: "100px",
        }

        this.navButtonStyle = {
            ...this.buttonSecondaryColor,
            width: "46.5%",
            position: "absolute",
        }

        this.navButtonDisabledStyle = {
            background: CustomTheme.disabled,
            color: "#ffffff",
            height: "40px",
            width: "46.5%",
            position: "absolute",
        }
    }

    //Action

    //Function

    //Component
    EditorView(){

        if (this.state.isEdit){
            
            //Edit Menu Page
            return (
                <div className={styles.container}>
                    <EditMenuPage />
                </div>
            );
        } else {

            //View Menu Page
            return (
                <div className={styles.container}>
                    View
                </div>
            );
        }
    }

    render() {
        return (
            <div className={styles.container}>
                
                <div className={styles.navBar}>
                    <Button style={this.state.isEdit? {...this.navButtonStyle, right: "50px"} : {...this.navButtonDisabledStyle, right: "50px"}} onClick={() => this.setState({isEdit: false}) } >View Menu</Button>
                    <Button style={this.state.isEdit? {...this.navButtonDisabledStyle, left: "50px"} : {...this.navButtonStyle, left: "50px"}} onClick={() => this.setState({isEdit: true}) } >Edit Menu</Button>
                </div>
                <div style={{height: "75px"}} />              
                {this.EditorView()}
            </div>
        )
    }
}