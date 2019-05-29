import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from "@material-ui/core/Typography";

import { withStyles } from '@material-ui/core/styles';
import style from '../styles.js';

class InferenceCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const {classes} = this.props;
        return(
            <Grid container>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8}>
                        <Card elevation={3}>
                            <CardHeader
                                title="Inferences"
                            />
                            <CardContent>
                            <Grid container>
                            
                                <Grid container>
                                    
                                    <Grid item xs={12} className={classes.imgContainer}>
                                        <img src={this.props.imgURL} className={classes.inferenceImage}/>
                                        
                                    </Grid>
                                    
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} md={4}>
                                        <Card className={classes.imgInnercard} elevation={2}>
                                                <CardHeader
                                                    subheader="Image Resolution"
                                                />
                                                <CardContent>
                                                        <Typography className={classes.cardText}>
                                                            {this.props.img_res}
                                                        </Typography>
                                                </CardContent>
                                            </Card>  
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                            <Card className={classes.imgInnercard} elevation={2}>
                                                <CardHeader
                                                    subheader="File Type"
                                                />
                                                <CardContent>
                                                        <Typography className={classes.cardText}>
                                                            {this.props.ftype}
                                                        </Typography>
                                                </CardContent>
                                            </Card>  
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                            <Card className={classes.imgInnercard} elevation={2}>
                                                <CardHeader
                                                        subheader="File Size"
                                                    />
                                                <CardContent>
                                                        <Typography className={classes.cardText}>
                                                            {this.props.fsize }
                                                        </Typography>
                                                </CardContent>
                                            </Card>  
                                    </Grid>
                                </Grid>
                                
                                <Grid container>
                                    <Grid item xs={12} md={12}>
                                        <Card className={classes.imgInnercard} elevation={2}>
                                            <CardHeader
                                                    subheader="Objects Detected"
                                                />
                                            <CardContent>
                                                    {Object.keys(this.props.objects_detected).map((x, i)=>{
                                                        return(
                                                        <Chip label={x} 
                                                        className={classes.chips}
                                                        avatar={<Avatar>{this.props.objects_detected[x]}</Avatar>}
                                                        color="primary"/>
                                                        );
                                                        })}
                                            </CardContent>
                                        </Card>  
                                    </Grid>
                                </Grid>


                            </Grid>                                
                            
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                
        )};
    }


export default withStyles(style)(InferenceCard);