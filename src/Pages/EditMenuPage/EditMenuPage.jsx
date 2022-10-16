import React from "react";
import styles from "./EditMenuPage.module.css";
import { CustomTheme } from "../../Config/Color";
import LoadingPage from "../LoadingPage/LoadingPage";
import { getMenu, updateMenu } from "../../Functions/FireStoreController";
import DeleteIcon from '@mui/icons-material/Delete';
import { Button,
         Dialog, 
         DialogActions, 
         DialogContent, 
         DialogTitle, 
         Card, 
         TextField, 
         CardContent, 
         Typography,
         CardActions, 
         IconButton,
         DialogContentText} from "@mui/material";


export default class EditMenuPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            CheckMenu: false,
            time: "breakfast",
            DialogOpen: false,
            DialogType: "",
            DialogInputName: "",
            DialogInputPrice: "",
            breakfast: [],
            lunch: [],
            dinner: [],
        }

        //Form
        this.menuForm = {
            breakfast: [],
            lunch: [],
            dinner: [],
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

        this.PaperStyle = {
            background: CustomTheme.secondary,
            width: "100%",
        }

        this.textFileStyle = {
            '& .MuiInput-underline:before': { borderBottomColor: 'white' },
            '& .MuiInput-underline:after': { borderBottomColor: CustomTheme.secondary },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: CustomTheme.secondary },
            '& .MuiInputBase-input': { color: 'white' },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiInputLabel-root.Mui-focused': { color: CustomTheme.secondary },
            '& .MuiInputLabel-root.Mui-disabled': { color: 'white' }, 
        }
    }

    //Action
    btn_ClasstifityAdd_onClicked(){
        this.setState({ DialogOpen: true, DialogType: "classtify" });
    }

    btn_SaveMenu_onClicked(){
        this.menuForm.breakfast = this.state.breakfast;
        this.menuForm.lunch = this.state.lunch;
        this.menuForm.dinner = this.state.dinner;
        updateMenu(this.menuForm);
    }

    //compoment
    breakfastClassify(){            

        if (this.state.breakfast.length !== 0) {

            return this.state.breakfast.map((item, index) => {
                
                return (
                    <div>
                        <Card variant='none' style={this.PaperStyle}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    <div className={styles.cardText}>{item.name}</div>
                                </Typography>
                                <Typography variant={{fontSize: 14}}>
                                    <div className={styles.cardText}>price: {item.price}</div>
                                </Typography>
                                <CardActions style={{display: "flex", justifyContent: "flex-end"}}>
                                    <IconButton onClick={() => {
                                        var temp = this.state.breakfast;
                                        temp.splice(index, 1);
                                        this.setState({ breakfast: temp });
                                    }}><DeleteIcon style={{color: "white"}}/></IconButton>
                                </CardActions>
                            </CardContent>
                        </Card>
                        <div style={{ height: "10px" }}/>
                    </div>
                );

            });

        } else {
            return <div className={styles.text}>No Menu</div>
        }

    }

    lunchClassify(){
        
        if (this.state.lunch.length !== 0) {

            return this.state.lunch.map((item, index) => {
                
                return (
                    <div>
                        <Card variant='none' style={this.PaperStyle}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    <div className={styles.cardText}>{item.name}</div>
                                </Typography>
                                <Typography variant={{fontSize: 14}}>
                                    <div className={styles.cardText}>price: {item.price}</div>
                                </Typography>
                                <CardActions style={{display: "flex", justifyContent: "flex-end"}}>
                                    <IconButton onClick={() => {
                                        var temp = this.state.lunch;
                                        temp.splice(index, 1);
                                        this.setState({ lunch: temp });
                                    }}><DeleteIcon style={{color: "white"}}/></IconButton>
                                </CardActions>
                            </CardContent>
                        </Card>
                        <div style={{ height: "10px" }}/>
                    </div>
                );

            });

        } else {
            return <div className={styles.text}>No Menu</div>
        }
        
    }

    dinnerClassify(){

        if (this.state.dinner.length !== 0) {

            return this.state.dinner.map((item, index) => {
                
                return (
                    <div>
                        <Card variant='none' style={this.PaperStyle}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    <div className={styles.cardText}>{item.name}</div>
                                </Typography>
                                <Typography variant={{fontSize: 14}}>
                                    <div className={styles.cardText}>price: {item.price}</div>
                                </Typography>
                                <CardActions style={{display: "flex", justifyContent: "flex-end"}}>
                                    <IconButton onClick={() => {
                                        var temp = this.state.dinner;
                                        temp.splice(index, 1);
                                        this.setState({ dinner: temp });
                                    }}><DeleteIcon style={{color: "white"}}/></IconButton>
                                </CardActions>
                            </CardContent>
                        </Card>
                        <div style={{ height: "10px" }}/>
                    </div>
                );

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

                    <Dialog open={this.state.DialogOpen} PaperProps={{ style: { backgroundColor: CustomTheme.primary, width: "50%" }}}>

                        <DialogTitle>
                            <div className={styles.text}>Add Item</div>
                        </DialogTitle>

                        <DialogContent>

                            <DialogContentText>
                                <div className={styles.text}>Item Name:</div>   
                            </DialogContentText> 

                            <TextField fullWidth
                                variant="standard"
                                value={this.state.DialogInputName}
                                onChange={(e) => {
                                    this.setState({ DialogInputName: e.target.value });
                                }}
                                sx={this.textFileStyle} />

                            <DialogContentText>
                                <div className={styles.text}>Item Price:</div>
                            </DialogContentText>

                            <TextField fullWidth
                                variant="standard"
                                value={this.state.DialogInputPrice}
                                onChange={(e) => {
                                    this.setState({ DialogInputPrice: e.target.value });
                                }}
                                type="number"
                                sx={this.textFileStyle} />

                        </DialogContent>

                        <DialogActions>
                            {this.state.DialogType === "classtify" ? <Button style={this.buttonSecondaryStyle} onClick={() => {
                                this.setState({ DialogOpen: false, });
                                switch (this.state.time) {
                                    case "breakfast":
                                        this.setState({ breakfast: [...this.state.breakfast, {name: this.state.DialogInputName, price: this.state.DialogInputPrice}] });
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

                    </div>
                    <div style={{height: "10px"}} />
                    <div>
                        <Button style={{...this.buttonSecondaryStyle, width: "100%"}} onClick={() => this.btn_SaveMenu_onClicked()} >Save</Button>
                    </div>

                </div>
            );

        }   
    }
}