import React from "react";
import styles from "./OrderListPage.module.css";
import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

export default class OrderListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            OrderList: [],
            DialogOpen: false,

        };
    }
    
    render() {
        return (
            <div className={styles.mainContainer}>
                <Dialog open={this.state.DialogOpen} PaperProps={{ style: { backgroundColor: CustomTheme.primary, width: "50%" }}}>

                    <DialogTitle>
                        <div className={styles.text}>New Order:</div>
                    </DialogTitle>

                    <DialogContent>

                        <DialogContentText>
                            
                        </DialogContentText> 

                    </DialogContent>

                    <DialogActions>
                        
                    </DialogActions>

                </Dialog>
            </div>
        );
    }
    }