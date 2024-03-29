import React from "react";
import styles from './OrderManagementPage.module.css';
import { CustomTheme } from "../../Config/Color";
import { Button } from "@mui/material";
import OrderListPage from "../OrderListPage/OrderListPage";
import CurentOrderPage from "../CurrentOrderPage/CurrentOrderPage";

export default class OrderManagementPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            OrderList: true,
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

    OrderView(){
        if (this.state.OrderList){
            
            //Edit Order Page
            return (
                <div className={styles.container}>
                    <OrderListPage />
                </div>
            );
        } else {

            //View Order Page
            return (
                <div className={styles.container}>
                    <CurentOrderPage/>
                </div>
            );
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.navBar}>
                    <Button style={this.state.OrderList? {...this.navButtonStyle, right: "50px"} : {...this.navButtonDisabledStyle, right: "50px"}} onClick={() => this.setState({OrderList: false})} disabled={this.state.OrderList !== true} >Food To Do</Button>
                    <Button style={this.state.OrderList? {...this.navButtonDisabledStyle, left: "50px"} : {...this.navButtonStyle, left: "50px"}} onClick={() => this.setState({OrderList: true}) } disabled={this.state.OrderList === true}>Order Management</Button>
                </div>
                <div style={{height: "75px"}} />              
                {this.OrderView()}
            </div>
        );
    }
}