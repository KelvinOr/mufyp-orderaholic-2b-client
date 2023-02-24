import styles from './ResturantInfoPage.module.css';
import { CustomTheme } from '../../Config/Color';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import React from 'react';
import { getRestaurantData } from '../../Functions/FireStoreController';
import FileToBase64 from "../../Functions/FileToBase64";
import { GetUserInfo } from '../../Functions/FirebaseAuth';
import { 
    Button,
    Chip,
    NativeSelect,
    Paper,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Snackbar,
    Alert,
    InputBase } from '@mui/material';

export default class ResturantInfoPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            imageIsUpdate: true,
            NotificationIsShowed: false,
            NotificationType: "",
            NotificationMessage: "",
            isLoading: true,
            DialogOpen: false,
            DialogType: "",
            ImagePreView: "",
            ImageTitle: "",
            ImageIndex: null,
        }

        this.CreateInfoForm = {
            Image: [],
            Name: "",
            Type: "Chinese Restaurant",
            ContectNumber: "",
            Location: "",
            Discription: "",
            menu: {
              breakfast: [],
              lunch: [],
              dinner: [],
            },
        };

        this.DialogForm = {
            Title: "",
            Content: "",
        };

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

        this.InputSecoundryColor = {
            background: CustomTheme.secondary,
            width: "100%",
        }
    }

    btn_DeleteImage_onClick(e, value) {
        this.CreateInfoForm.Image.splice(value, 1);
        console.log(this.CreateInfoForm.Image);
    }

    btn_ChipImage_onClick(e, value) {
        this.setState({ImagePreView: this.CreateInfoForm.Image[value].source, ImageTitle: this.CreateInfoForm.Image[value].name, DialogOpen: true, DialogType: "ImageUpload", ImageIndex: value});
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
            ImagePreView: "",
            ImageTitle: "",
        });
    }

    btn_UploadImage_onClick(event) {
        const file = event.target.files[0];
        FileToBase64(file).then((result) => {
          this.setState({ImagePreView: result});
        });
    }

    async init(){
        
        if(GetUserInfo() !== null) {
            getRestaurantData(GetUserInfo().uid).then((result) => {
                if(result.exists()) {
                    this.CreateInfoForm = result.data();
                    this.setState({isLoading: false});
                    console.log(this.CreateInfoForm);
                } 
            });
        }
        
    }

    render(){
        
        const vertical = "top";
        const horizontal = "center";

        while (this.state.isLoading) {
            this.init();
            return(
                <div className={styles.mainContainer}>
                    <div className={styles.loadingPage}>
                        <div className={styles.loadingPageContent}>
                            <div className={styles.loadingPageContentText}>
                                Loading...
                            </div>
                        </div>
                    </div>
                </div>
            );
        } 

        return(
            <div className={styles.mainContainer}>

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

                
                <div style={{height: "17%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                    <h1 style={{color: "white"}}>Resturant Info</h1>
                    <div style={{height: "20px"}} />
                </div>
                

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
                                    <Chip label={item.name} sx={{ bgcolor: CustomTheme.secondary, color: "white" }} onDelete={(e) => this.btn_DeleteImage_onClick(e, index)} onClick={(e) => this.btn_ChipImage_onClick(e, index)}/>
                                    <div style={{padding: "5px"}}/>
                                </div>
                                );
                            })
                            }                  
                        </div>
                    </div>

                    <div style={{height: "100%", width:"fit-content", display: "flex", alignItems: "center", justifyItems: "center"}}>
                        <Button variant="contained" component="Label" style={this.buttonSecoundryColor} startIcon={ <FileUploadIcon/> } onClick={() => this.btn_showUploadDialog_onClick()}>
                        Add Image
                        </Button>
                    </div>

                    <div style={{height: "100%", width:"100%", display: "flex", alignItems: "center", flexDirection: "row"}}>

                        <div style={{display: "flex", flexDirection:"column", width: "100%", alignItems: "center"}}>
                            <div className={styles.text} >
                            Restaurant Name:
                            </div>
                            <Paper style={{...this.InputSecoundryColor, width: "70%"}} >
                                <InputBase size='large' placeholder="Input Resturant Name" sx={{p: '5px'}} style={{ color: "#ffffff" , width: "100%"}} onChange={(event) => {this.CreateInfoForm.Name = event.target.value}} defaultValue={this.CreateInfoForm.Name}/>
                            </Paper>
                            <div style={{height: "20px"}} />
                            <div className={styles.text} >
                                Restaurant Type:
                            </div>

                            <Paper style={{...this.InputSecoundryColor, width: "68%", padding: "5px"}}>
                                <NativeSelect style={{width: "100%", color: "#ffffff", backgroundColor: CustomTheme.secondary }} disableUnderline value={this.CreateInfoForm.Type} onChange={(e) => { this.CreateInfoForm.Type = e.target.value; } } sx={{'& option': { color: 'black' },}}>
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

                <div style={{height: "20px"}} />

                <div className={styles.gridRow2}>

                    <div style={{height: "100%", width:"100%", display: "flex", flexDirection:"column", alignItems: "center"}}>
                        <div style={{display: "flex", flexDirection:"column", width: "68%"}}>
                        <div className={styles.text}>
                            Contect Number:
                        </div>
                        <Paper style={this.InputSecoundryColor}>
                            <InputBase size='large' placeholder="Input Contect Number" sx={{p: '5px'}} style={{ color: "#ffffff" , width: "100%"}} type="number" onChange={(event) => {this.CreateInfoForm.ContectNumber = event.target.value}} defaultValue={this.CreateInfoForm.ContectNumber}/>
                        </Paper>
                        <div style={{height: "20px"}} />
                        <div className={styles.text}>
                            Restaurant Location:
                        </div>
                        <Paper style={this.InputSecoundryColor}>
                            <InputBase size='large' placeholder="Input Restaurant Location" sx={{p: '5px'}} style={{ color: "#ffffff" , width: "100%"}} onChange={(event) => {this.CreateInfoForm.Location = event.target.value}} defaultValue={this.CreateInfoForm.Location}/>
                        </Paper>
                        </div>
                    </div>

                    <div style={{height: "100%", width:"100%", display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <div style={{display: "flex", flexDirection:"column", width: "68%", height: "100%"}}>
                        <div className={styles.text}>
                            Discription:
                        </div>
                        <Paper style={{...this.InputSecoundryColor, height: "100%"}}>
                            <InputBase size='large' placeholder="Input Restaurant Discription" sx={{p: '5px'}} style={{ color: "#ffffff" , width: "100%"}} rows={6} multiline fullWidth onChange={(event) => {this.CreateInfoForm.Discription = event.target.value}} defaultValue={this.CreateInfoForm.Discription}/>
                        </Paper>
                        </div>
                    </div>

                </div>

                
            </div>
        );
    }
}