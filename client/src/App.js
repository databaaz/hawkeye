import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

import ReactLoading from 'react-loading';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import UploaderCard from './components/UploaderCard.jsx'

import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import style from './styles.js';
import InferenceCard from './components/InferenceCard.jsx';



function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            imageFile: null,
            imgURL: "",
            fetched: false,
            img_res: "",
            ftype: "",
            fsize: "",
            objects_detected: {},
            loading: false,
            snackMessage: '',
            snackOpen: false,
            snackType: '',

        }
    }
    handleFileChange = (ev)=>{
        console.log(ev.target.files);
        if (ev.target.files.length===0){
            return
        }
        let img_file = ev.target.files[0]
        if (img_file.type!=='image/png' && img_file.type!=='image/jpeg'){
            console.log("Invalid file type: ",img_file.type)
            this.setState({
                snackOpen: true,
                snackMessage: "Invalid file type: " + img_file.type.split('/')[1],
                snackType: 'error',
            })
            return
        }
        else if (img_file.size > 5000000){
            console.log("Invalid file size: ",img_file.size)
            this.setState({
                snackOpen: true,
                snackMessage: "File size exceeds 5MB limit ",
                snackType: 'error',
            })
            return
        }
        let _URL = window.URL || window.webkitURL
        let img_url = _URL.createObjectURL(img_file);
        this.setState({
            imageFile: img_file,
            imgURL: img_url
        });
        console.log(this.state)
        
    }
    handleCloseSnack = ()=>{
        this.setState({
            snackOpen: false,
            snackMessage: ""
        })
    }
    handleSubmit = ()=>{
        if (this.state.fetched){
            this.setState({
                imageFile: null,
                imgURL: "",
                fetched: false,                
            })
            return
        }
        let img_file = this.state.imageFile
        if (!this.state.imageFile)
        {
            console.log("No image selected");
            this.setState({
                snackOpen: true,
                snackMessage: "No File Selected ! ",
                snackType: 'error',
            })
            return
        }
        this.setState({
          loading: true  
        })
        let formData = new FormData();
        formData.append('img', img_file);
        fetch("http://52.66.209.249:5000/inference", {
            method: "POST",
            body: formData,
          })
          .then(response => response.json())
          .then(response => {
            console.log(response);
            if(response.status === 'failure'){
                this.setState({
                    fetched: false,
                    loading: false,
                    snackOpen: true,
                    snackMessage: "Model Still Loading...Please try after some time",
                    snackType: 'info',
                })
                return
            }
            let obj_counter = {};
            let predictions = response.pred;
            
            let img = new Image();
            img.src = this.state.imgURL;
            const canvas = document.createElement("canvas");
            img.onload = ()=>{
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                const font = "16px sans-serif";
                ctx.font = font;
                ctx.textBaseline = "top";
                ctx.drawImage(img, 0, 0);
                predictions.forEach(prediction=>{
                    if (obj_counter[prediction.class])
                        obj_counter[prediction.class] += 1;
                    else
                        obj_counter[prediction.class] = 1
                    let x = prediction.bbox[0]
                    let y = prediction.bbox[1]
                    let width = prediction.bbox[2]
                    let height = prediction.bbox[3]
                    
                    ctx.strokeStyle = "#00FFFF";
                    ctx.lineWidth = 4;
                    ctx.strokeRect(x,y,width,height);

                    ctx.fillStyle = "#00FFFF";
                    const textWidth = ctx.measureText(prediction.class).width;
                    const textHeight = parseInt(font, 10); // base 10
                    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
                    
                }); 
                // Draw the text 
                predictions.forEach(prediction => {
                    const x = prediction.bbox[0];
                    const y = prediction.bbox[1];
                    
                    ctx.fillStyle = "#000000";
                    ctx.fillText(prediction.class, x, y);
                });
                this.setState({
                    loading: false,
                    imgURL: canvas.toDataURL("image/png"),
                    ftype: response.ftype,
                    fsize: response.fsize,
                    img_res: response.fres,
                    objects_detected:obj_counter,
                    fetched: true,
                })   
            };
            
            
          })
          .catch((err)=>{
            this.setState({
                loading: false,
                snackOpen: true,
                fetched: false,
                snackMessage: "Backend is non-responsive !",
                snackType: 'error',
            })    

          });
        
        

        
        
        //console.log("Objects Detected:",obj_detected)
    }
    handleCloseImage=()=>{
        this.setState({
            imageFile: null,
            imgURL: "",
        });   
        console.log(this.state)
    }
    render(){
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.titleHeader}>
                    <Typography variant="h2" className={classes.title}>
                        HawkEye
                    </Typography>
                    <Typography variant="body2">
                        Upload an image and let our Neural Network identify objects of 90 different kinds from it !
                    </Typography>
                </div>
                {!this.state.fetched &&
                <UploaderCard 
                imgURL = {this.state.imgURL}
                handleCloseImage = {this.handleCloseImage}
                handleFileChange = {this.handleFileChange}
                />}
                
                {this.state.fetched &&
                <InferenceCard
                imgURL = {this.state.imgURL}
                img_res = {this.state.img_res} 
                ftype = {this.state.ftype}
                fsize = {this.state.fsize}
                objects_detected = {this.state.objects_detected}
                />}

                <Grid container>
                    
                    <Grid item xs={12}>
                        <div className={classes.submitContainer}>
                        <Button variant="contained" color="secondary" 
                        onClick={this.handleSubmit} className={classes.button}
                        disabled = {this.state.loading}>
                            {!this.state.fetched && 'Submit'}
                            {this.state.fetched && 'Reset'}
                        </Button><br/>
                        {this.state.loading && 
                        <ReactLoading className = {classes.loader} type='bubbles' color='rgb(169, 11, 67)'  />}
                        </div>
                        
                    </Grid>
                    
                </Grid>
                <Snackbar
                    className = {classes.snackbar}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                    autoHideDuration={6000}
                    open={this.state.snackOpen}
                    onClose={this.handleCloseSnack}
                    TransitionComponent={TransitionUp}
                    >

                    
                    <SnackbarContent
                        className={clsx(classes[this.state.snackType])}
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" className={classes.snackMessage}>
                            {this.state.snackType=='error' &&
                                <ErrorIcon className={clsx(classes.icon)} />}
                            {this.state.snackType=='info' &&
                                <InfoIcon className={clsx(classes.icon)} />}
                            
                            {this.state.snackMessage}
                            </span>
                        }
                        action={[
                            <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleCloseSnack}>
                            <CloseIcon className={classes.snackIcon} />
                            </IconButton>,
                        ]}
                        
                        />
                </Snackbar>
            </div>
        );
    }
}


export default withStyles(style)(App);