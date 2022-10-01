import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { CustomTheme } from "../../Config/Color";



export default class LoadingPage extends React.Component {

    constructor(props) {
        super(props);
        this.textStyle = {
            color: "#ffffff",
            paddingTop: "20px",
            FontFamily: "Tahoma",
            fontSize: "20px",
        }
    }

    render(){
        return(
            <div className="main-background">
                <div className="logo">
                    Orderaholic
                </div>
                <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center",  alignContent: "center", flexWrap: "wrap"}}>
                    <CircularProgress  style={{color: CustomTheme.secondary }}/>
                    <div style={{width: "30px"}}/>
                    <div style={this.textStyle}>Loading...</div>
                </div>
            </div>
        )
    };
}