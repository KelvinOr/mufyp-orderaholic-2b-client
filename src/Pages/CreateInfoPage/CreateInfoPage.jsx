import React from "react";
import "../GlobalStyle.css";
import styles from "./CreateInfoPage.module.css";
import { CustomTheme } from '../../Config/Color';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileToBase64 from "../../Functions/FileToBase64";
import { newRestaurantData, getRestaurantData } from "../../Functions/FireStoreController";
import { isLogin, Signout, GetUserInfo } from "../../Functions/FirebaseAuth";
import LoadingPage from "../LoadingPage/LoadingPage";
import { Button,
         InputBase,
         Paper, 
         NativeSelect, 
         Snackbar, 
         Alert,
         Dialog, 
         DialogTitle, 
         DialogContent, 
         DialogContentText, 
         DialogActions, 
         Chip,
         TextField,} from "@mui/material";

export default class CreateInfoPage extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
          imageIsUpdate: false,
          NotificationIsShowed: false,
          NotificationType: "",
          NotificationMessage: "",
          isLoading: true,
          DialogOpen: false,
          DialogType: "",
          ImagePreView: "",
          ImageTitle: "",
          ImageIndex: null,
        };

        //Form
        this.CreateInfoForm = {
          Image: [{name: "Default Image", source:"https://firebasestorage.googleapis.com/v0/b/orderaholic-f387d.appspot.com/o/DefaultImage%2FdefaultImage.jpg?alt=media&token=a46adb26-1142-4e76-94f5-e18f25109b85"}, ],
          Name: "",
          Type: "Chinese Restaurant",
          ContectNumber: "",
          Location: "",
        };

        this.DialogForm = {
          Title: "",
          Content: "",
        }

        //Style
        this.buttonPrimaryColor = {
          background: CustomTheme.primary,
          color: "#ffffff",          
          height: "40px",
        }

        this.buttonSecoundryColor = {
          background: CustomTheme.secondary,
          color: "#ffffff",
          width: "fit-content",
          height: "40px",
        }

        this.InputPrimaryColor = {
          background: CustomTheme.primary,
          width: "100%",
        }
    }


    //Action
    btn_UploadImage_onClick(event) {
      const file = event.target.files[0];
      FileToBase64(file).then((result) => {
        this.setState({ImagePreView: result});
      });
    }

    btn_OkToAddImage_onClick() {
      if(this.state.ImageTitle !== "" && this.state.ImagePreView !== "") {
        this.CreateInfoForm.Image.push({name: this.state.ImageTitle, source: this.state.ImagePreView});
      } 
      this.setState({DialogOpen: false, ImagePreView: "", ImageTitle: ""});
    }

    btn_CreateInfo_onClick() {

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

      newRestaurantData(this.CreateInfoForm).then((result) => {
        console.log(result);
        this.DialogForm.Title = "success";
        this.DialogForm.Content = "Restaurant information has been created successfully.";
        this.setState({DialogOpen: true, DialogType: "success"});
      }).catch((error) => {
        console.log(error);
      });


    }

    btn_Cencal_onClick() {
      Signout();
      window.location.href = "/";
    }

    btn_showUploadDialog_onClick() {

      if(this.CreateInfoForm.Image.length >= 5) {
        this.setState({
          NotificationIsShowed: true,
          NotificationType: "error",
          NotificationMessage: "The maximum number of images is 5.",
        });
        return;
      }

      this.DialogForm.Title = "Upload Image";
      this.DialogForm.Content = "Please select the image you want to upload.";
      
      this.setState({
        DialogOpen: true, 
        DialogType: "ImageUpload",
        ImageIndex: null,
      });
    }

    btn_DeleteImage_onClick(e, value) {
      this.CreateInfoForm.Image.splice(value, 1);
      console.log(this.CreateInfoForm.Image);
    }

    btn_ChipImage_onClick(e, value) {
      this.setState({ImagePreView: this.CreateInfoForm.Image[value].source, ImageTitle: this.CreateInfoForm.Image[value].name, DialogOpen: true, DialogType: "ImageUpload", ImageIndex: value});
    }

    btn_OkToUpdateImage_onClick() {
      if(this.state.ImageTitle !== "" && this.state.ImagePreView !== "") {
        this.CreateInfoForm.Image[this.state.ImageIndex] = {name: this.state.ImageTitle, source: this.state.ImagePreView};
      } 
      this.setState({DialogOpen: false, ImagePreView: "", ImageTitle: "", ImageIndex: null});
    }

  render() {

    const vertical = "top";
    const horizontal = "center";

    //Check Login && First Login
    if(this.state.isLoading) {

      var counter = 20;

      var interval = setInterval(() => {
        counter--;
        console.log("counter" + counter);
        if(isLogin() === true){
        if(GetUserInfo() !== null) {
            getRestaurantData(GetUserInfo().uid).then((result) => {
            if(result.exists()) { 
              window.location.href = "/disboard";
            } else{
              this.setState({isLoading: false});
            }
            });
        }
            clearInterval(interval);
        }
        if (counter === 0) {
            clearInterval(interval);
            window.location.href = "/";
        }
      }, 200);

    }

    if(this.state.isLoading) {

      return <LoadingPage />;

    } else{
    
      return (
        <div className="main-background">

          <Snackbar open={this.state.NotificationIsShowed} autoHideDuration={6000} onClose={() => { this.setState({ NotificationIsShowed: false }) }} message={this.state.NotificationMessage} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={() => { this.setState({ NotificationIsShowed: false }) }} severity={this.state.NotificationType} sx={{ width: '100%' }} variant="filled">
              {this.state.NotificationMessage}
            </Alert>
          </Snackbar>

          <Dialog open={this.state.DialogOpen} PaperProps={{ style: { backgroundColor: CustomTheme.primary, minWidth: "fit-contect", maxWidth: "50%" } }}>
            <DialogTitle><div className={styles.text}>{this.DialogForm.Title}</div></DialogTitle>
            <DialogContent>
              <DialogContentText><div className={styles.text}>{this.DialogForm.Content}</div></DialogContentText>
              {this.state.DialogType === "ImageUpload" ? 
                <div>
                  <TextField 
                    fullWidth
                    variant="standard"
                    label="Image Title"
                    sx={{
                      '& .MuiInput-underline:before': { borderBottomColor: 'white' },
                      '& .MuiInput-underline:after': { borderBottomColor: CustomTheme.secondary },
                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottomColor: CustomTheme.secondary },
                      '& .MuiInputBase-input': { color: 'white' },
                      '& .MuiInputLabel-root': { color: 'white' },
                      '& .MuiInputLabel-root.Mui-focused': { color: CustomTheme.secondary },
                      '& .MuiInputLabel-root.Mui-disabled': { color: 'white' }, 
                    }} 
                    value={this.state.ImageTitle}
                    onChange={(event) => { this.setState({ ImageTitle: event.target.value }) }} />
                  <div style={{padding: "10px"}}/>
                  <input type="file" accept="image/jpeg" onChange={(event) => { this.btn_UploadImage_onClick(event) }} />
                  <div style={{padding: "10px"}}/>
                  {
                    this.state.ImagePreView !== "" ?
                    <div>
                      <img src={this.state.ImagePreView} alt="preview"/>
                      <div style={{padding: "10px"}}/>
                    </div> : null
                  }
                  <div className={styles.text} style={{width: "100%"}}>There only one image can be uploaded each time. Only accept jpeg here.</div>
                </div>
              : null }
            </DialogContent>
            <DialogActions>
              {
                this.state.DialogType === "ImageUpload" && this.state.ImageIndex === null ?
                  <Button onClick={() => this.btn_OkToAddImage_onClick()} style={this.buttonSecoundryColor}>Upload</Button> : null
              }
              {
                this.state.ImageIndex !== null ? <Button onClick={() => this.btn_OkToUpdateImage_onClick()} style={this.buttonSecoundryColor}>Update</Button> : null
              }
              <Button onClick={() => { this.setState({ DialogOpen: false }); if(this.state.DialogType === "success"){ window.location.href = "/disboard" } }} style={this.buttonSecoundryColor}>{this.state.DialogType === "message" ? "OK" : "Cancel"}</Button>
            </DialogActions>
          </Dialog>

          <div className="logo">
            Orderaholic
          </div>
          <div className={styles.backgroundCard} style={{background: CustomTheme.secondary}} />
          <div className={styles.main}>
            <div className={styles.gridRow1}>

              <div>
                <div>
                  <div style={{height: "20px"}} />
                  <div className={styles.text} style={{ width: "100%" }} >This image is using to show the restaurant.</div>
                  <div style={{height: "5px"}} />
                  <div className={styles.text} >There already have {this.CreateInfoForm.Image.length}/5 image.</div>
                  <div style={{height: "20px"}} />
                  {
                    //TODO: Clip Display
                    this.CreateInfoForm.Image.map((item, index) => {
                      return(
                        <div>
                          <Chip label={item.name} sx={{ bgcolor: CustomTheme.primary, color: "white" }} onDelete={(e) => this.btn_DeleteImage_onClick(e, index)} onClick={(e) => this.btn_ChipImage_onClick(e, index)}/>
                          <div style={{padding: "5px"}}/>
                        </div>
                      );
                    })
                  }                  
                </div>
              </div>

              <div style={{height: "100%", width:"fit-content", display: "flex", alignItems: "center", justifyItems: "center"}}>
                  <Button variant="contained" component="Label" style={this.buttonPrimaryColor} startIcon={ <FileUploadIcon/> } onClick={() => this.btn_showUploadDialog_onClick()}>
                    Add Image
                  </Button>
              </div>

              <div style={{height: "100%", width:"100%", display: "flex", alignItems: "center", flexDirection: "row"}}>
                <div style={{display: "flex", flexDirection:"column", width: "100%", alignItems: "center"}}>
                  <div className={styles.text} >
                    Restaurant Name:
                  </div>
                  <Paper style={{...this.InputPrimaryColor, width: "70%"}} >
                    <InputBase size='large' placeholder="Input Resturant Name" sx={{p: '5px'}} style={{ color: "#ffffff" , width: "100%"}} onChange={(event) => {this.CreateInfoForm.Name = event.target.value}}/>
                  </Paper>
                  <div style={{height: "20px"}} />
                  <div className={styles.text} >
                    Restaurant Type:
                  </div>

                  <Paper style={{...this.InputPrimaryColor, width: "68%", padding: "5px"}}>
                    <NativeSelect style={{width: "100%", color: "#ffffff", backgroundColor: CustomTheme.primary }} disableUnderline value={this.CreateInfoForm.Type} onChange={(e) => { this.CreateInfoForm.Type = e.target.value; } } sx={{'& option': { color: 'black' },}}>
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
                    <InputBase size='large' placeholder="Input Contect Number" sx={{p: '5px'}} style={{ color: "#ffffff" , width: "100%"}} type="number" onChange={(event) => {this.CreateInfoForm.ContectNumber = event.target.value}}/>
                  </Paper>
                  <div style={{height: "20px"}} />
                  <div className={styles.text}>
                    Restaurant Location:
                  </div>
                  <Paper style={this.InputPrimaryColor}>
                    <InputBase size='large' placeholder="Input Restaurant Location" sx={{p: '5px'}} style={{ color: "#ffffff" , width: "100%"}} onChange={(event) => {this.CreateInfoForm.Location = event.target.value}}/>
                  </Paper>
                </div>
              </div>

              <div style={{height: "100%", width:"100%", display: "flex", alignItems: "center", flexDirection: "column"}}>
                <div style={{display: "flex", flexDirection:"column", width: "68%", height: "100%"}}>
                  <div className={styles.text}>
                    Discription:
                  </div>
                  <Paper style={{...this.InputPrimaryColor, height: "100%"}}>
                    <InputBase size='large' placeholder="Input Restaurant Discription" sx={{p: '5px'}} style={{ color: "#ffffff" , width: "100%"}} rows={6} multiline fullWidth onChange={(event) => {this.CreateInfoForm.Discription = event.target.value}}/>
                  </Paper>
                </div>
              </div>

            </div>

            <div style={{height: "50px"}} />

            <div className={styles.gridRow3}>

              <div style={{height: "100%", width:"100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Button variant="contained" style={this.buttonPrimaryColor} onClick={() => this.btn_Cencal_onClick()}>
                  Cancel
                </Button>
              </div>

              <div style={{height: "100%", width:"100%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Button variant="contained" style={this.buttonPrimaryColor} onClick={() => this.btn_CreateInfo_onClick()}>
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

