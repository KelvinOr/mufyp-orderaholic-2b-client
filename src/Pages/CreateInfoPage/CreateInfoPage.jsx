import React from "react";
import "../GlobalStyle.css";
import styles from "./CreateInfoPage.module.css";
import { CustomTheme } from '../../Config/Color';
import { Button, Grid } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileToBase64 from "../../Functions/FileToBase64";

export default class CreateInfoPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };

        this.CreateInfoForm = {
          defaultImage: "https://protkd.com/wp-content/uploads/2017/04/default-image.jpg",
        };
    }

    btn_UploadImage(event) {
      const file = event.target.files[0];
      FileToBase64(file).then((result) => {
        this.CreateInfoForm.defaultImage = result;
        console.log(this.CreateInfoForm.defaultImage);
      });
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
              <Button variant="contained" component="label"> 
                Upload Image
                <input hidden accept="image/*" multiple type="file" onChange={(event) => this.btn_UploadImage(event)} />
              </Button>
            </Grid>
          </Grid>
          
        </div>
      </div>
    );
    
  }
}

