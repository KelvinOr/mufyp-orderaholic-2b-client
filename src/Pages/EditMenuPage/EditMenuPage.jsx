import React from "react";
import styles from "./EditMenuPage.module.css";
import { CustomTheme } from "../../Config/Color";
import LoadingPage from "../LoadingPage/LoadingPage";
import { getMenu } from "../../Functions/FireStoreController";
import { Button } from "@mui/material";


export default class EditMenuPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            CheckMenu: false,
            time: "breakfast",
            menuList: null,
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

        this.buttonBase ={
            color: "#ffffff",
            width: "100%",
            height: "40px",
        }

        this.buttonPrimaryStyle = {
            ...this.buttonBase,
            background: CustomTheme.primary,
        }

        this.buttonSecondaryStyle = {
            ...this.buttonBase,
            background: CustomTheme.secondary,
        }

        this.buttonDisabledStyle = {
            ...this.buttonBase,
            background: CustomTheme.disabled,
        }

    }

    //compoment
    breakfastClassify(){            

        var result = [];
        for(let x in this.state.breakfast){
            result.push(x);
        }

        if (result.length !== 0) {

            return result.map((item, index) => {
                return (
                    <div>
                        <Button style={this.buttonSecondaryStyle} onClick={() => {
                            this.setState({ menuList: this.state.breakfast[index] });
                        }} >{item}</Button>
                        <div style={{ height: "10px" }}></div>
                    </div>
                );    
            });

        } else {
            return <div className={styles.text}>No Menu</div>
        }
    }

    lunchClassify(){
        
        var result = [];
        for(let x in this.state.lunch){
            result.push(x);
        }

        if (result.length !== 0) {

            return result.map((item, index) => {
                return (
                    <div>
                        <Button style={this.buttonSecondaryStyle} onClick={() => {
                            this.setState({ menuList: this.state.lunch[index] });
                        }} >{item}</Button>
                        <div style={{ height: "10px" }}></div>
                    </div>
                )
            });

        } else {
            return <div className={styles.text}>No Menu</div>
        }
    }

    dinnerClassify(){

        var result = [];
        for(let x in this.state.dinner){
            result.push(x);
        }

        if (result.length !== 0) {

            return result.map((item, index) => {
                return (
                    <div>
                        <Button style={this.buttonSecondaryStyle} onClick={() => {
                            this.setState({ menuList: this.state.dinner[index] });
                        }} >{item}</Button>
                        <div style={{ height: "10px" }}></div>
                    </div>
                )
            });

        } else {
            return <div className={styles.text}>No Menu</div>
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
                    <h1 style={{color: "#ffffff"}}>Edit Menu</h1>
                    <div className={styles.wapper} style={{background: CustomTheme.secondary, borderRadius: "25px"}}>

                        <div className={styles.Item} style={{background: CustomTheme.primary}}>
                            <Button style={this.state.time === "breakfast"? this.buttonDisabledStyle : this.buttonSecondaryStyle} disabled={this.state.time === "breakfast"} onClick={() => { this.setState({ time: "breakfast" })}} >breakfast</Button>
                            <div style={{height: "10px"}} />
                            <Button style={this.state.time === "lunch"? this.buttonDisabledStyle : this.buttonSecondaryStyle} disabled={this.state.time === "lunch"} onClick={() => this.setState({ time: "lunch" })} >lunch</Button>
                            <div style={{height: "10px"}} />
                            <Button style={this.state.time === "dinner"? this.buttonDisabledStyle : this.buttonSecondaryStyle} disabled={this.state.time === "dinner"} onClick={() => this.setState({ time: "dinner" })} >dinner</Button>
                        </div>

                        <div className={styles.Item} style={{background: CustomTheme.primary}}>
                            <div style={{width: "100%"}}>
                                {this.state.time === "breakfast"? this.breakfastClassify() : null}
                                {this.state.time === "lunch"? this.lunchClassify() : null}
                                {this.state.time === "dinner"? this.dinnerClassify() : null}
                            </div>
                            <Button style={{...this.buttonSecondaryStyle}} onClick={() => this.setState({ isEdit: true })} >Edit</Button>
                        </div>

                        <div className={styles.menu}>

                        </div>

                    </div>
                </div>
            );

        }   
    }
}