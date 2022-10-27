import React from "react";
import styles from "./OrderListPage.module.css";

export default class OrderListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        isLoading: true,
        OrderList: [],
        };
    }
    
    render() {
        return (
        <div className={styles.mainContainer}>

        </div>
        );
    }
    }