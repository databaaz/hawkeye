import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import style from '../styles.js';

class UploaderCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {classes} = this.props;
        return(
            <Grid container>
                    <Grid item xs={1} md={4}></Grid>
                    <Grid item xs={10} md={4}>
                    <Card className={classes.card} elevation={3} >
                        
                        {this.props.imgURL && 
                        
                        <IconButton 
                        color="secondary"
                        size="small"
                        className={classes.closeButton}
                        onClick={this.props.handleCloseImage}>
                            <Avatar className={classes.avatar}><CloseIcon/></Avatar>
                        </IconButton>}
                            
                            
                        
                        <CardContent className={classes.cardContent}>
                        <div className={classes.imagePickerContainer}>
                            <img src={this.props.imgURL} height='250px'/>
                        <input
                            accept="image/*"
                            className={classes.input}
                            key={this.props.imgURL}
                            id="image-file"
                            type="file"
                            onChange={this.props.handleFileChange}
                        />
                        {!this.props.imgURL &&
                        <label htmlFor="image-file">
                            <Button variant="outlined"component="span" >
                                Choose an Image
                            </Button>
                        </label> }   
                        </div>    
                        </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={1} md={4}></Grid>
                </Grid>
                
        );
    }
}

export default withStyles(style)(UploaderCard);