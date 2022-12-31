import React from "react";
import styles from "./CurrentOrderPage.module.css";
import { CustomTheme } from "../../Config/Color";
import { GetOrder } from "../../Functions/RealTimeDBController"
import {
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";

export default class CurrentOrderPage extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            OrderList: [],
            
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
                        }
                    }
                }
            }
        });

        //时間排序
        item.reverse(function(a,b){return b['time'] - a['time'] });
        this.setState({OrderList: item});

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
                        <Card> 
                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                <CardContent style={{paddingBottom: "0px"}}>
                                    <Typography>
                                        <div className={styles.text}>Order ID: {this.state.OrderList[item].OrderDiscription}</div>
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </div> 
                );
            });
        }
    }


    render(){

        this.getItem();
        
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