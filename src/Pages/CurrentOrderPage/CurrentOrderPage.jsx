import React from "react";
import styles from "./CurrentOrderPage.module.css";
import { CustomTheme } from "../../Config/Color";
import { GetOrder } from "../../Functions/RealTimeDBController"
import {
    Card,
    CardContent,
    Typography,
    Box,
    CardActions,
} from "@mui/material";

export default class CurrentOrderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            OrderList: [],
            isFirstget: true,
        }

        //Style
        this.PaperStyle = {
            background: CustomTheme.primary,
            width: "100%",
        }
    }

    getItem = async () => {
        var item = [];

        await GetOrder().then((value) => {
            for (var orderlist in value.val()){
                if(value.val()[orderlist]["Item"] !== undefined){
                    for (var orderitem in value.val()[orderlist]["Item"]){
                        if(value.val()[orderlist]["Item"][orderitem]["state"].toString() === "Prepare"){
                            item.push(value.val()[orderlist]["Item"][orderitem]);
                            item[orderitem]["OrderDiscription"] = value.val()[orderlist]["OrderDiscription"]
                        }
                    }
                }
            }
        });

        //时間排序
        item.reverse(function(a,b){return b['time'] - a['time'] });
        this.setState({OrderList: item});
        console.log(this.state.OrderList);


    }

    orderCard() {
        if (this.state.OrderList.length === 0){
            return (
                <div className={styles.text} style={{color: CustomTheme.text}}>No Order</div>
            );
        } else {
            return Object.keys(this.state.OrderList).map((item) => {
                return (
                    <div>
                        <Card sx={{dispaly: 'flex', flexDirection: 'row'}} variant='none' style={this.PaperStyle}> 
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <CardContent style={{paddingBottom: "0px"}}>
                                    <Typography>
                                        <div className={styles.text}>Order Discription: {this.state.OrderList[item].OrderDiscription}</div>
                                        <div className={styles.text}>Item Name: {this.state.OrderList[item].name}</div>
                                        <div className={styles.text}>Item Quantity: {this.state.OrderList[item].time}</div>
                                    </Typography>
                                </CardContent>
                                <CardActions>

                                </CardActions>
                            </Box>
                        </Card>
                    </div> 
                );
            });
        }
    }


    render(){


        //lock
        if (this.state.isFirstget === true){
            this.getItem();
            this.setState({isFirstget: false});
        }
        
        //run program
        while(true){
            setTimeout(this.getItem, 5000);
            return (
                <div className={styles.mainContainer}>
                    <h1 style={{color: "#ffffff"}}>Order waiting to handling</h1>
                    <div className={styles.wapper} style={{background: CustomTheme.secondary, borderRadius: "25px"}}>
                        {this.orderCard()}
    
                    </div>
                </div>
            )
        }
    }
}