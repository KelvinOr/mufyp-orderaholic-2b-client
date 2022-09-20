import React from "react";
import "../GlobalStyle.css";
import styles from "./CreateInfoPage.module.css";
import { CustomTheme } from '../../Config/Color';

export default class CreateInfoPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {

    return (
      <div className="main-background">
        <div className="logo">
          Orderaholic
        </div>
        <div className={styles.backgroundCard} style={{background: CustomTheme.secondary}} />
      </div>
    );
    
  }
}

