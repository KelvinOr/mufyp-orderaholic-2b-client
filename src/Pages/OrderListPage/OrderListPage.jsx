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
    CardActions,
    IconButton
} from "@mui/material";
import { Box } from "@mui/system";
import QRCode from "react-qr-code";
import { InsertOrder, GetOrder, DeleteOrder } from "../../Functions/RealTimeDBController"
import DeleteIcon from '@mui/icons-material/Delete';
import { async } from "@firebase/util";
import { addOrderHistoryToUserRecord } from "../../Functions/FireStoreController";

export default class OrderListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            OrderList: [],
            DialogNewOrderOpen: false,
            NewOrderDiscription: "",
            DislogOrderIsFinishOpen: false,
            DialogOrderHandlingID: "",
            isFirstget: true,
            forceUpdate: false,
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
            DialogNewOrderOpen: true,
        });
    }

    btn_Dialog_NewOrder_onClick(){

        console.log(this.state.NewOrderDiscription);
        
        InsertOrder({
            OrderDiscription: this.state.NewOrderDiscription,
        })


        this.setState({
            DialogNewOrderOpen: false,
            NewOrderDiscription: "",
            isFirstget: true,
        });
    }

    btn_Dialog_OrderIsFinish_onClick(OrderID){
        this.setState({
            DislogOrderIsFinishOpen: true,
            DialogOrderHandlingID: OrderID,
        });
    }

    OrderListItem(){

        if (this.state.OrderList.length === 0){
            return (
                <div className={styles.text} style={{color: CustomTheme.text}}>No Order</div>
            );
        } 
        else {
       
            return Object.keys(this.state.OrderList).map((item) => {

                var qrcodeValue = {
                    OrderID: item,
                    RestaurantID: this.state.OrderList[item].restaurantID,
                }
                return (
                    <div>
                        <Card sx={{dispaly: 'flex', flexDirection: 'row'}} variant='none' style={this.PaperStyle}>
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <CardContent style={{paddingBottom: "0px"}}>
                                    <Typography>
                                        <div className={styles.text}>Order ID: {this.state.OrderList[item].OrderID}</div>
                                        <div className={styles.text}>Order Discription: {this.state.OrderList[item].OrderDiscription}</div>
                                    </Typography>
                                    <QRCode
                                        value={JSON.stringify(qrcodeValue)}
                                        size={128}
                                    />  
                                </CardContent>
                            </Box>
                           
                            <CardActions style={{display: "flex", justifyContent: "flex-end"}}>
                                <IconButton onClick={() => {
                                    this.btn_Dialog_OrderIsFinish_onClick(item);
                                }}><DeleteIcon style={{color: "white"}}/></IconButton>
                            </CardActions>
                        </Card>
                    </div>
                )
            });
        }
        
    }
    
    getOrder = async () => {
        GetOrder().then((data) => {
            if (data.exists()){
                this.setState({
                    OrderList: data.val(),
                    isFirstget: false,
                });
                console.log(data.val());
            } else {
                console.log("No data available");
            }
        });
    }
    
    render() {

        if (this.state.isFirstget === true){ 
            this.getOrder();
        }
        

        while(true){
            if(this.state.forceUpdate){
                this.getOrder();
                this.setState({ forceUpdate: false });
            }

            setTimeout(this.getOrder(), 5000);
            return (
                <div className={styles.mainContainer}>
                    <Dialog open={this.state.DialogNewOrderOpen} PaperProps={{ style: { backgroundColor: CustomTheme.primary, width: "50%" }}}>
    
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
                                    this.setState({ DialogNewOrderOpen: false, NewOrderDiscription: "" });
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
    
                    <Dialog open={this.state.DislogOrderIsFinishOpen} PaperProps={{ style: { backgroundColor: CustomTheme.primary, width: "50%" }}}>
                        <DialogTitle>
                            <div className={styles.text} style={{fontSize: "24px"}}><b>Comfirm to finish</b></div>
                        </DialogTitle>
                        <DialogActions>
                            <Button
                                style={this.buttonSecondaryStyle}
                                onClick={() => {
                                    this.setState({ DislogOrderIsFinishOpen: false });
                                }}>
                                    Cancel
                            </Button>
                            <Button
                                style={this.buttonSecondaryStyle}
                                onClick={() => {
                                    if(this.state.OrderList[this.state.DialogOrderHandlingID]["CID"] !== undefined){
                                        var CID = this.state.OrderList[this.state.DialogOrderHandlingID]["CID"];
                                        addOrderHistoryToUserRecord(this.state.OrderList[this.state.DialogOrderHandlingID], CID);
                                    }
                                    DeleteOrder(this.state.DialogOrderHandlingID);
                                    this.setState({ DislogOrderIsFinishOpen: false, DialogOrderHandlingID: "", forceUpdate: true });
                                    
                                }}>
                                    Finish
                            </Button>
                        </DialogActions>
                    </Dialog>
    
                    <h1 style={{color: "#ffffff"}}>Order List</h1>
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
}