import React from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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
        height: "100%",
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
    }
    

};

class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            imageFile: null,
        }
    }
    handleFileChange = (ev)=>{
        console.log(ev.target.files);
        if (ev.target.files.length==0){
            return
        }
        let img_file = ev.target.files[0]
        if (img_file.type!='image/png' || img_file.type!='image/jpeg'){
            //pass
        }
        else if (img_file.size > 5000000){
            //pass
        }
        this.setState({
            imageFile: img_file
        });
        console.log(this.state)
        
    }
    render(){
        const {classes} = this.props;
        return (
            <div className={"root"}>
                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={4}>
                    <Card className={classes.card}>
                        <CardContent className={classes.cardContent}>
                        <div className={classes.imagePickerContainer}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="image-file"
                            type="file"
                            onChange={this.handleFileChange}
                        />
                        <label htmlFor="image-file">
                            <Button variant="outlined"component="span" className={classes.button}>
                                Choose an Image
                            </Button>
                        </label>    
                        </div>    
                        </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.submitContainer}>
                        <Button variant="contained" color="secondary" className={classes.button}>
                            Submit
                        </Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


export default withStyles(style)(App);