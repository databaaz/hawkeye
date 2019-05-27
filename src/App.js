import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";

const style = {
    
    card: {
        minHeight: 250,
        height: "100%"
    },
    cardContent:{
        height: "100%"
    },
    imagePickerContainer: {
        width: "100%",
        height: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    submitContainer: {
      paddingTop: 30,
      textAlign: "center",      
    },
    input:{
        display: "none",
    },
    imgInnercard:{
        marginTop: 15,
        marginBottom:15,
        marginLeft: 20,
        marginRight: 20,
    
    },
    imgContainer:{
        textAlign: "center"
    },
    imgLabels:{
        color: "rgba(0,0,0,0.5)",
        fontSize: 14
      }
    

};

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
            objects_detected: [],

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
            // Nice little alert
            return
        }
        else if (img_file.size > 5000000){
            console.log("Invalid file size: ",img_file.size)
            // Nice little alert
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

    handleSubmit = ()=>{
        if (this.state.fetched){
            this.setState({
                fetched: false,                
            })
            return
        }
        let img_file = this.state.imageFile
        if (!this.state.imageFile)
        {
            console.log("No image selected");
            // Nice little alert
            return;
        }
        console.log('success'); //alert
        
        let f_type = img_file.type.split('/')[1];
        let f_size = img_file.size;
        let obj_detected = [];

        //Finding resolution
        
        let img = new Image();
        img.src = this.state.imgURL
        img.onload = ()=>{
            let img_width = img.width; 
            let img_height = img.height; 
            let res = img_width + 'x'+ img_height;
            this.setState({
                img_res: res
            })
            console.log("Resolution:",res);
        }
        this.setState({
            ftype: f_type,
            fsize: f_size + " bytes",
            fetched: true
        })
        
        //console.log("Objects Detected:",obj_detected)
    }
    render(){
        const {classes} = this.props;
        return (
            <div className={"root"}>
                {!this.state.fetched &&
                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                    <Card className={classes.card}>
                        
                        <CardContent className={classes.cardContent}>
                        <div className={classes.imagePickerContainer}>
                            <img src={this.state.imgURL} height='250px'/>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="image-file"
                            type="file"
                            onChange={this.handleFileChange}
                        />
                        {!this.state.imgURL &&
                        <label htmlFor="image-file">
                            <Button variant="outlined"component="span" className={classes.button}>
                                Choose an Image
                            </Button>
                        </label> }   
                        </div>    
                        </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                }
                {this.state.fetched &&
                <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardHeader
                                title="Inferences"
                            />
                            <CardContent>
                            <Grid container>
                            
                                <Grid container>
                                    <Grid item xs={0} md={3}></Grid>
                                    <Grid item xs={12} md={6} className={classes.imgContainer}>
                                        <img src={this.state.imgURL} height='250px'/>
                                    </Grid>
                                    <Grid item xs={0} md={3}></Grid>
                                </Grid>
                                <Grid container>
                                <Grid item xs={12} md={6}>
                                    <Card className={classes.imgInnercard}>
                                            <CardHeader
                                                subheader="Image Resolution"
                                            />
                                            <CardContent>
                                                <p>
                                                    <Typography>
                                                        {this.state.img_res}
                                                    </Typography>
                                                </p>

                                            </CardContent>
                                        </Card>  
                                </Grid>
                                <Grid item xs={12} md={6}>
                                        <Card className={classes.imgInnercard}>
                                            <CardHeader
                                                subheader="File Type"
                                            />
                                            <CardContent>
                                                <p>
                                                    <Typography>
                                                        {this.state.ftype}
                                                    </Typography>
                                                </p>

                                            </CardContent>
                                        </Card>  
                                </Grid>
                                
                                <Grid container>
                                    <Grid item xs={12} md={6}>
                                        <Card className={classes.imgInnercard}>
                                            <CardHeader
                                                    subheader="File Size"
                                                />
                                            <CardContent>
                                                <p>
                                                    <Typography>
                                                        {this.state.fsize}
                                                    </Typography>
                                                </p>

                                            </CardContent>
                                        </Card>  
                                    </Grid>
                                    
                                    
                                    <Grid item xs={12} md={6}>
                                        <Card className={classes.imgInnercard}>
                                            <CardHeader
                                                    subheader="Objects Detected"
                                                />
                                            <CardContent>
                                                <p>
                                                    <Typography>
                                                        2 cats, 1 Dog
                                                    </Typography>
                                                </p>

                                            </CardContent>
                                        </Card>  
                                    </Grid>
                                </Grid>


                                </Grid>                                
                            </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>}

                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.submitContainer}>
                        <Button variant="contained" color="secondary" 
                        onClick={this.handleSubmit} className={classes.button}>
                            {!this.state.fetched && 'Submit'}
                            {this.state.fetched && 'Reset'}
                        </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default withStyles(style)(App);