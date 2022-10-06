import React from "react";
import DecodeAnimation from "react-decode-animation";


export default class LoadingPage extends React.Component {

    constructor(props) {
        super(props);
        this.textStyle = {
            color: "#ffffff",
            paddingTop: "20px",
            FontFamily: "Tahoma",
            fontSize: "50px",
        }
    }

    render(){
        return(
            <div className="main-background">
                <div className="logo">
                    Orderaholic
                </div>
                <div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center",  alignContent: "center", flexWrap: "wrap"}}>
                    <DecodeAnimation autoplay text="Loading..." style={this.textStyle} interval={170}/>
                </div>
                
            </div>
        )
    };
}