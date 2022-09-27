import React from "react";
import "../GlobalStyle.css";
import styles from "./CreateInfoPage.module.css";
import { CustomTheme } from '../../Config/Color';
import { Button, InputBase, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileToBase64 from "../../Functions/FileToBase64";

export default class CreateInfoPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          imageIsUpdate: false,

        };

        this.CreateInfoForm = {
          Image: "https://protkd.com/wp-content/uploads/2017/04/default-image.jpg",
          Name: "",
        };

        this.buttonPrimaryColor = {
          background: CustomTheme.primary,
          color: "#ffffff",          
          height: "40px",
      }

      this.InputPrimaryColor = {
        background: CustomTheme.primary,
        width: "100%",
      }

    }

    btn_UploadImage(event) {
      const file = event.target.files[0];
      FileToBase64(file).then((result) => {
        this.CreateInfoForm.defaultImage = result;
        console.log(this.CreateInfoForm.defaultImage);
        this.setState({imageIsUpdate: true});
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
          <div className={styles.gridRow}>

            <div>
              {this.state.imageIsUpdate?  <img src={this.CreateInfoForm.Image} className={styles.image} alt="Restaurant"/>: <img src={this.CreateInfoForm.Image} className={styles.image} alt="Restaurant"/>}
              <br/><br/>
              <div className={styles.text} >This image is using to show restaurant.</div>
            </div>

            <div style={{height: "100%", width:"fit-content", display: "flex", alignItems: "center"}}>
                <Button variant="contained" component="Label" style={this.buttonPrimaryColor} >
                    <FileUploadIcon/>
                    &nbsp;
                    Upload Image
                    &nbsp;
                  <input hidden accept="image/*" multiple type="file" onChange={(event) => this.btn_UploadImage(event)} />
                </Button>
            </div>

            <div style={{height: "100%", width:"40%", display: "flex", alignItems: "center"}}>
              <div style={{display: "flex", flexDirection:"column", width: "100%"}}>
                <div className={styles.text} >
                  Restaurant Name:
                </div>
                <Paper style={this.InputPrimaryColor} >
                  <InputBase size='large' placeholder="Input Resturant Name" sx={{p: '5px'}} style={{ color: "#ffffff"}} onChange={(event) => {this.CreateInfoForm.Name = event.target.value;}}/>
                </Paper><br/>
                <div className={styles.text} >
                  Restaurant Type:
                </div>
                <FormControl style={{
                  border: "none",
                }}>
                  <InputLabel>Resturant Type</InputLabel>
                  <Select>
                    <MenuItem value={1}>Jan</MenuItem>
                  </Select>
                </FormControl>

              </div>
            </div>

            <div>
              
            </div>

          </div>

        </div>
      </div>
    );
    
  }
}

