import React from "react";
import "../GlobalStyle.css";
import styles from "./CreateInfoPage.module.css";
import { CustomTheme } from '../../Config/Color';
import { Button, InputBase, Paper, NativeSelect, Snackbar, Alert } from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileToBase64 from "../../Functions/FileToBase64";
import { newRestaurantData } from "../../Functions/FireStoreController";
import { isLogin } from "../../Functions/FirebaseAuth";
import LoadingPage from "../LoadingPage/LoadingPage";

export default class CreateInfoPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          imageIsUpdate: false,
          NotificationIsShowed: false,
          NotificationType: "",
          NotificationMessage: "",
          isLoading: true,
        };

        this.CreateInfoForm = {
          Image: "https://protkd.com/wp-content/uploads/2017/04/default-image.jpg",
          Name: "",
          Type: "",
          ContectNumber: "",
          Location: "",
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

    btn_CreateInfo() {
      // newRestaurantData({test: "test"});

      if (this.CreateInfoForm.Name === "") {
        this.setState({
          NotificationIsShowed: true,
          NotificationType: "error",
          NotificationMessage: "Please enter the name of the restaurant.",
        });
        return;
      }

      if (this.CreateInfoForm.ContectNumber === "") {
        this.setState({
          NotificationIsShowed: true,
          NotificationType: "error",
          NotificationMessage: "Please enter the contect number of the restaurant.",
        });
        return;
      }

      if (this.CreateInfoForm.Location === "") {
        this.setState({
          NotificationIsShowed: true,
          NotificationType: "error",
          NotificationMessage: "Please enter the location of the restaurant.",
        });
        return;
      }

    }

  render() {

    const vertical = "top";
    const horizontal = "center";

    var counter = 20;
    var interval = setInterval(() => {
      counter--;
      if(isLogin() === true){
        this.setState({isLoading: false});
        clearInterval(interval);
      }
      if (counter === 0) {
        clearInterval(interval);
        window.location.href = "/";
      }
    }, 200);

    if(this.state.isLoading === true) {

      return (
        <LoadingPage />
      );

    } else{
    
      return (
        <div className="main-background">
          <Snackbar open={this.state.NotificationIsShowed} autoHideDuration={6000} onClose={() => { this.setState({ NotificationIsShowed: false }) }} message={this.state.NotificationMessage} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={() => { this.setState({ NotificationIsShowed: false }) }} severity={this.state.NotificationType} sx={{ width: '100%' }} variant="filled">
              {this.state.NotificationMessage}
            </Alert>
          </Snackbar>
          <div className="logo">
            Orderaholic
          </div>
          <div className={styles.backgroundCard} style={{background: CustomTheme.secondary}} />
          <div className={styles.main}>
            <div className={styles.gridRow1}>

              <div>
                {this.state.imageIsUpdate?  <img src={this.CreateInfoForm.Image} className={styles.image} alt="Restaurant"/>: <img src={this.CreateInfoForm.Image} className={styles.image} alt="Restaurant"/>}
                <div style={{height: "20px"}} />
                <div className={styles.text} >This image is using to show restaurant.</div>
              </div>

              <div style={{height: "100%", width:"fit-content", display: "flex", alignItems: "center", justifyItems: "center"}}>
                  <Button variant="contained" component="Label" style={this.buttonPrimaryColor} >
                      <FileUploadIcon/>
                      &nbsp;
                      Upload Image
                      &nbsp;
                    <input hidden accept="image/*" multiple type="file" onChange={(event) => this.btn_UploadImage(event)} />
                  </Button>
              </div>

              <div style={{height: "100%", width:"100%", display: "flex", alignItems: "center", flexDirection: "row"}}>
                <div style={{display: "flex", flexDirection:"column", width: "100%", alignItems: "center"}}>
                  <div className={styles.text} >
                    Restaurant Name:
                  </div>
                  <Paper style={{...this.InputPrimaryColor, width: "70%"}} >
                    <InputBase size='large' placeholder="Input Resturant Name" sx={{p: '5px'}} style={{ color: "#ffffff"}} onChange={(event) => {this.CreateInfoForm.Name = event.target.value;}}/>
                  </Paper>
                  <div style={{height: "20px"}} />
                  <div className={styles.text} >
                    Restaurant Type:
                  </div>

                  <Paper style={{...this.InputPrimaryColor, width: "68%", padding: "5px"}}>
                    <NativeSelect style={{width: "100%", color: "#ffffff", backgroundColor: CustomTheme.primary }} disableUnderline onChange={(event) => {this.CreateInfoForm.Type = event.target.value;}}>
                      <option value="Chinese Restaurant">Chinese Restaurant</option>
                      <option value="Western Restaurant">Western Restaurant</option>
                      <option value="Asian restaurant">Asian Restaurant</option>
                      <option value="Fast Food">Fast Food</option>
                      <option value="Bar">Bar</option>
                      <option value="Cafe">Cafe</option>
                      <option value="Other">Other</option>
                    </NativeSelect>
                  </Paper>

                </div>
              </div>

            </div>

            <div className={styles.gridRow2}>

              <div style={{height: "100%", width:"100%", display: "flex", flexDirection:"column", alignItems: "center"}}>
                <div style={{display: "flex", flexDirection:"column", width: "68%"}}>
                  <div className={styles.text}>
                    Contect Number:
                  </div>
                  <Paper style={this.InputPrimaryColor}>
                    <InputBase size='large' placeholder="Input Contect Number" sx={{p: '5px'}} style={{ color: "#ffffff"}} onChange={(event) => {this.CreateInfoForm.ContectNumber = event.target.value}}/>
                  </Paper>
                  <div style={{height: "20px"}} />
                  <div className={styles.text}>
                    Restaurant Location:
                  </div>
                  <Paper style={this.InputPrimaryColor}>
                    <InputBase size='large' placeholder="Input Restaurant Location" sx={{p: '5px'}} style={{ color: "#ffffff"}} onChange={(event) => {this.CreateInfoForm.Location = event.target.value}}/>
                  </Paper>
                </div>
              </div>

              <div style={{height: "100%", width:"100%", display: "flex", alignItems: "center", flexDirection: "column"}}>
                <div style={{display: "flex", flexDirection:"column", width: "68%", height: "100%"}}>
                  <div className={styles.text}>
                    Discription:
                  </div>
                  <Paper style={{...this.InputPrimaryColor, height: "100%"}}>
                    <InputBase size='large' placeholder="Input Restaurant Discription" sx={{p: '5px'}} style={{ color: "#ffffff"}} rows={6} multiline fullWidth onChange={(event) => {this.CreateInfoForm.Discription = event.target.value}}/>
                  </Paper>
                </div>
              </div>

            </div>

            <div style={{height: "50px"}} />

            <div className={styles.gridRow3}>

              <div style={{height: "100%", width:"100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Button variant="contained" style={this.buttonPrimaryColor} >
                  Cancel
                </Button>
              </div>

              <div style={{height: "100%", width:"100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Button variant="contained" style={this.buttonPrimaryColor} onClick={() => this.btn_CreateInfo()}>
                  Create
                </Button>
              </div>

            </div>

          </div>
        </div>
      );
    }
  }
}

