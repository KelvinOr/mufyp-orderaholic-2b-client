import React from "react";
import styles from "./OrderListPage.module.css";
import { CustomTheme } from "../../Config/Color";
import { 
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import QRCode from "react-qr-code";
import { InsertOrder, GetOrder } from "../../Functions/RealTimeDBController"

export default class OrderListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            OrderList: [],
            DialogOpen: false,
            NewOrderDiscription: "",
        };

        //Style
        this.PaperStyle = {
            background: CustomTheme.primary,
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

        this.buttonBase ={
            color: "#ffffff",
            width: "100%",
            height: "40px",
        }

        this.buttonSecondaryStyle = {
            ...this.buttonBase,
            background: CustomTheme.secondary,
        }
    }

    btn_newOrder_onClick(){
        this.setState({
            DialogOpen: true,
        });
    }

    btn_Dialog_NewOrder_onClick(){

        console.log(this.state.NewOrderDiscription);
        
        InsertOrder({
            OrderDiscription: this.state.NewOrderDiscription,
        })

        this.setState({
            DialogOpen: false,
            NewOrderDiscription: "",
        });
    }

    OrderListItem(){

        var value = ["test", "test1"]

        if (this.state.OrderList.length === 0){
            return (
                <div className={styles.text} style={{color: CustomTheme.text}}>No Order</div>
            );
        } 
        // else {
       
        //     Object.keys(this.state.OrderList).map((item) => {
        //         return (
        //             <div>
        //                 <Card sx={{dispaly: 'flex', flexDirection: 'row'}} variant='none' style={this.PaperStyle}>
        //                     <Box sx={{display: 'flex', flexDirection: 'column'}}>
        //                         <CardContent>
        //                             <Typography>
        //                                 Order ID: {this.state.OrderList[item].OrderDiscription}
        //                             </Typography>
        //                         </CardContent>
        //                     </Box>
        //                     <QRCode
        //                         value={this.state.OrderList[item].OrderID}
        //                         size={128}
        //                     />  
        //                 </Card>
        //             </div>
        //         )
        //     });
        // }

        value.map((item) => {
            return (
                <div>
                    <Card sx={{dispaly: 'flex', flexDirection: 'row'}} variant='none' style={this.PaperStyle}>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <CardContent>
                                <Typography>
                                    Order ID: {item}
                                </Typography>
                            </CardContent>
                        </Box>
                        <QRCode
                            value={value}
                            size={128}
                        />  
                    </Card>
                </div>
            )
        });

        
    }
    
    render() {

        GetOrder().then((data) => {
            if (data.exists()){
                this.setState({
                    OrderList: data.val(),
                });
            } else {
                console.log("No data available");
            }
        });


        return (
            <div className={styles.mainContainer}>
                <Dialog open={this.state.DialogOpen} PaperProps={{ style: { backgroundColor: CustomTheme.primary, width: "50%" }}}>

                    <DialogTitle>
                        <div className={styles.text} style={{fontSize: "24px"}}><b>New Order</b></div>
                    </DialogTitle>

                    <DialogContent>

                        <DialogContentText>
                            <div className={styles.text}>Order Discriptioin:</div>
                        </DialogContentText> 

                        <TextField fullWidth
                                variant="standard"
                                value={this.state.NewOrderDiscription}
                                onChange={(e) => {
                                    this.setState({ NewOrderDiscription: e.target.value });
                                }}
                                sx={this.textFileStyle} />

                    </DialogContent>

                    <DialogActions>
                        <Button 
                             style={this.buttonSecondaryStyle}
                            onClick={() => {
                                this.setState({ DialogOpen: false, NewOrderDiscription: "" });
                            }}>
                                Cancel
                        </Button>

                        <Button 
                            style={this.buttonSecondaryStyle}
                            onClick={() => this.btn_Dialog_NewOrder_onClick()}>
                                Create
                        </Button>
                    </DialogActions>

                </Dialog>

                <div className={styles.wapper} style={{background: CustomTheme.secondary, borderRadius: "25px"}}>
                    {this.OrderListItem()}
                </div>
                <div style={{height: "20px"}} />
                <div>
                    <Button style={{...this.buttonSecondaryStyle, width: "100%"}} onClick={() => this.btn_newOrder_onClick()} >New Order</Button>
                </div>

            </div>
        );
    }
    }