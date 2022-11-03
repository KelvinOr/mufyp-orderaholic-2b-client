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
} from "@mui/material";
import { Box } from "@mui/system";
import QRCode from "react-qr-code";

export default class OrderListPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            OrderList: [],
            DialogOpen: false,

        };

        //Style
        this.PaperStyle = {
            background: CustomTheme.primary,
            width: "100%",
        }
    }

    OrderListItem(){

        var value = JSON.stringify({
            test: 'test',
        });

        return (
            <div>
                <Card sx={{dispaly: 'flex', flexDirection: 'row'}} variant='none' style={this.PaperStyle}>
                    <Box sx={{display: 'flex', flexDirection: 'column'}}>
                        <CardContent>
                            <Typography>
                                Order ID:
                            </Typography>
                        </CardContent>
                    </Box>
                    <QRCode
                        value={value}
                        size={128}
                    />  
                </Card>
            </div>
        );
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

                <div className={styles.wapper} style={{background: CustomTheme.secondary, borderRadius: "25px"}}>
                    {this.OrderListItem()}
                </div>
                <div style={{height: "10px"}} />
                <div>
                    <Button style={{...this.buttonSecondaryStyle, width: "100%"}} onClick={() => this.btn_SaveMenu_onClicked()} >Save</Button>
                </div>

            </div>
        );
    }
    }