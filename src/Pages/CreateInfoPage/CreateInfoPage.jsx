import React from "react";
import "../GlobalStyle.css";
import styles from "./CreateInfoPage.module.css";
import { CustomTheme } from '../../Config/Color';
import { Button, Grid } from "@mui/material";

export default class CreateInfoPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        this.CreateInfoForm = {
          defaultImage: "https://protkd.com/wp-content/uploads/2017/04/default-image.jpg",
        };
    }

  render() {

    return (
      <div className="main-background">
        <div className="logo">
          Orderaholic
        </div>
        <div className={styles.backgroundCard} style={{background: CustomTheme.secondary}} />
        <div className={styles.main}>
          <Grid container spacing={3} >
            <Grid item xs={4}>
              <img src={this.CreateInfoForm.defaultImage} className={styles.image}/><br/>
              <div className={styles.text} >This image is using to show restaurant.</div>
            </Grid>
            <Grid item xs={2}>
              <Button>test</Button>
            </Grid>
          </Grid>
          
        </div>
      </div>
    );
    
  }
}

