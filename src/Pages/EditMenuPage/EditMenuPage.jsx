import React from "react";
import styles from "./EditMenuPage.module.css";
import { CustomTheme } from "../../Config/Color";
import LoadingPage from "../LoadingPage/LoadingPage";
import { getMenu, updateMenu } from "../../Functions/FireStoreController";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";


export default class EditMenuPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CheckMenu: false,
            time: "breakfast",
            DialogOpen: false,
            DialogType: "",
            DialogInputClasstifyName: "",
            menuList: [],
            breakfast: {},
            lunch: {},
            dinner: {},
        }

        //Form
        this.menuForm = {
            menu: {
                breakfast: {},
                lunch: {},
                dinner: {},
            }
        }

        this.DialogForm = {
            title: "",
            content: "",
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

    //Action
    btn_ClasstifityAdd_onClicked(){
        this.setState({ DialogOpen: true, DialogType: "classtify" });
    }

    btn_SaveMenu_onClicked(){
        updateMenu(this.menuForm.menu);
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
                            this.setState({ menuList: this.state.breakfast[result[index]] });
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

    menuList(){
        if (this.state.menuList.length !== 0) {
            return this.state.menuList.map((item, index) => {
                return (
                    <div>
                        <Button style={this.buttonSecondaryStyle} onClick={() => {
                            
                        }} >{item.name}</Button>
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
                    console.log(data.menu.breakfast);
                }
            })
            
            return <LoadingPage/>;

        } else {
            return (
                <div className={styles.mainContainer}>

                    <Dialog open={this.state.DialogOpen} PaperProps={{ style: { backgroundColor: CustomTheme.primary }}}>
                        <DialogTitle>
                            <div className={styles.text}>{this.DialogForm.title}</div>
                        </DialogTitle>
                        {this.state.DialogType === "classtify" ? <DialogContent>
                            <TextField fullWidth
                                variant="standard"
                                value={this.state.DialogInputClasstifyName}
                                onChange={(e) => {
                                    this.setState({ DialogInputClasstifyName: e.target.value });
                                }}
                                sx={{
                                '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                                '& .MuiInput-underline:after': { borderBottomColor: CustomTheme.secondary },
                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: CustomTheme.secondary },
                                '& .MuiInputBase-input': { color: 'white' },
                                '& .MuiInputLabel-root': { color: 'white' },
                                '& .MuiInputLabel-root.Mui-focused': { color: CustomTheme.secondary },
                                '& .MuiInputLabel-root.Mui-disabled': { color: 'white' }, 
                            }} />
                        </DialogContent> : null}
                        <DialogActions>
                            {this.state.DialogType === "classtify" ? <Button style={this.buttonSecondaryStyle} onClick={() => {
                                this.setState({ DialogOpen: false, });
                                switch (this.state.time) {
                                    case "breakfast":
                                        this.setState({ breakfast: { ...this.state.breakfast, [this.state.DialogInputClasstifyName]: {} } });
                                        break;

                                    default: 
                                        break;
                                }
                            } }>Add</Button> : null}
                            <Button style={this.buttonSecondaryStyle} onClick={() => { this.setState({ DialogOpen: false }) }}>Cancel</Button>
                        </DialogActions>
                    </Dialog>

                    <h1 style={{color: "#ffffff"}}>Edit Menu</h1>
                    <div className={styles.wapper} style={{background: CustomTheme.secondary, borderRadius: "25px"}}>

                        <div className={styles.Item} style={{background: CustomTheme.primary}}>
                            <Button style={this.state.time === "breakfast"? this.buttonDisabledStyle : this.buttonSecondaryStyle} disabled={this.state.time === "breakfast"} onClick={() => { this.setState({ time: "breakfast", menuList: [] })}} >breakfast</Button>
                            <div style={{height: "10px"}} />
                            <Button style={this.state.time === "lunch"? this.buttonDisabledStyle : this.buttonSecondaryStyle} disabled={this.state.time === "lunch"} onClick={() => this.setState({ time: "lunch", menuList: [] })} >lunch</Button>
                            <div style={{height: "10px"}} />
                            <Button style={this.state.time === "dinner"? this.buttonDisabledStyle : this.buttonSecondaryStyle} disabled={this.state.time === "dinner"} onClick={() => this.setState({ time: "dinner", menuList: [] })} >dinner</Button>
                        </div>

                        <div className={styles.Item} style={{background: CustomTheme.primary}}>
                            <div style={{width: "100%"}}>
                                {this.state.time === "breakfast"? this.breakfastClassify() : null}
                                {this.state.time === "lunch"? this.lunchClassify() : null}
                                {this.state.time === "dinner"? this.dinnerClassify() : null}
                            </div>
                            <Button style={{...this.buttonSecondaryStyle}} onClick={() => this.btn_ClasstifityAdd_onClicked()} >Add</Button>
                        </div>

                        <div className={styles.Item} style={{background: CustomTheme.primary}}>
                            <div style={{width: "100%"}}>
                                {this.menuList()}
                            </div>
                            <Button style={{...this.buttonSecondaryStyle}} >Add</Button>
                        </div>

                    </div>
                </div>
            );

        }   
    }
}