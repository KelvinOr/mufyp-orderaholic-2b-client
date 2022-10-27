import React from "react";
import styles from './OrderManagementPage.module.css';
import { Button } from "@mui/material";

export default class OrderManagementPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            OrderList: true,
        }
    }

    OrderView(){
        if (this.state.OrderList){
            
            //Edit Menu Page
            return (
                <div className={styles.container}>
                    
                </div>
            );
        } else {

            //View Menu Page
            return (
                <div className={styles.container}>
                    
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