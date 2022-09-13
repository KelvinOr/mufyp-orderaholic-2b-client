import React from 'react';
import '../GlobalStyle.css';
import "./SelectLoginPage.css";

class SelectLoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="main-background">
                <div className="backgorund-card"/>
                <div className="logo">
                    Orderaholic
                </div>
                <div className="main">
                    <div className="JoinUs">
                        <Paper></Paper>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectLoginPage;