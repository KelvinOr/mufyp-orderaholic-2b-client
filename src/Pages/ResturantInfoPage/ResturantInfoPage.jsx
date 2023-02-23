import styles from './ResturantInfoPage.module.css';
import { CustomTheme } from '../../Config/Color';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import React from 'react';
import { 
    Button,
    Chip,
    NativeSelect,
    Paper,
    InputBase } from '@mui/material';

export default class ResturantInfoPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
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

    render(){
        return(
            <div className={styles.mainContainer}>
                
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
                            <InputBase size='large' placeholder="Input Resturant Name" sx={{p: '5px'}} style={{ color: "#ffffff" , width: "100%"}} onChange={(event) => {this.CreateInfoForm.Name = event.target.value}}/>
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
                            <InputBase size='large' placeholder="Input Contect Number" sx={{p: '5px'}} style={{ color: "#ffffff" , width: "100%"}} type="number" onChange={(event) => {this.CreateInfoForm.ContectNumber = event.target.value}}/>
                        </Paper>
                        <div style={{height: "20px"}} />
                        <div className={styles.text}>
                            Restaurant Location:
                        </div>
                        <Paper style={this.InputSecoundryColor}>
                            <InputBase size='large' placeholder="Input Restaurant Location" sx={{p: '5px'}} style={{ color: "#ffffff" , width: "100%"}} onChange={(event) => {this.CreateInfoForm.Location = event.target.value}}/>
                        </Paper>
                        </div>
                    </div>

                    <div style={{height: "100%", width:"100%", display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <div style={{display: "flex", flexDirection:"column", width: "68%", height: "100%"}}>
                        <div className={styles.text}>
                            Discription:
                        </div>
                        <Paper style={{...this.InputSecoundryColor, height: "100%"}}>
                            <InputBase size='large' placeholder="Input Restaurant Discription" sx={{p: '5px'}} style={{ color: "#ffffff" , width: "100%"}} rows={6} multiline fullWidth onChange={(event) => {this.CreateInfoForm.Discription = event.target.value}}/>
                        </Paper>
                        </div>
                    </div>

                </div>

                
            </div>
        );
    }
}