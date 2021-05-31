import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import CardHeader from '@material-ui/core/CardHeader';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {withRouter,useHistory, useParams} from "react-router-dom"
import axios from 'axios';
import Dashboard from "./dashboard"
import {connect} from "react-redux"
import * as actions from "../store/actions"
import ModalWarn from "./modal"
import ResultModel from "./result"

const useStyles = makeStyles({
  error:{
    color:'red'
  },
  root: {
    width:'35%',
    margin:'0 auto',
    marginTop:40,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems: 'center',

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  heading:{
      margin:'0px auto'
  },
  input:{
      width:'100%',
      marginTop:10,
      marginBottom:10
  },
  content:{
      width:'80%'
  },
  footer:{
      width:'80%',
      marginBottom:20
  },
  btn:{
      width:'100%'
  }
});

function Login({fetchUser,user,exist,submitForm}) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email:"",
    name:"",
    id:"",
  });
  const [disQue,setDisQue]=useState(false)
  const [error,setError]=useState("")

  const handleChange = (key,event) => {
    setValues((pS)=>{
      return{
        ...pS,
        [key]:event.target.value
      }
    });
  };
  const bull = <span className={classes.bullet}>•</span>;

  const {userId,testId}=useParams()
  useEffect(()=>{
    fetchUser(userId,testId)
  },[])

  function clear(){
    setError("")
  }
  const onSubmitMemo=useMemo(()=>{
    if(values.email && values.id && values.name){
      if(exist===true){
        setError("you have already take exam")
      }
      else if(exist===false){
        setDisQue(true)
      }
    }
  },[exist])

  function onSubmit(){
      if(values.email && values.id && values.name){
        submitForm(userId,testId,values.id).then(()=>onSubmitMemo)
      }else{
        alert("enter wrong password and email")
      }
  }

  function setDisQueFunc(){
    setDisQue(false)
  }

  if(!disQue){
    return (
      <>
        <AppBar position="static">
      <Toolbar>
      <Typography className={classes.heading} variant="h5">Online Exam Cheating Detection System</Typography>
      </Toolbar>
    </AppBar>
      <Card className={classes.root} variant="elevation">
          <CardHeader
          title="Student Panel"
      />
      <CardContent className={classes.content}>
          <TextField
              onChange={(e)=>handleChange("email",e)}
              id="email"
              label="email"
              variant="outlined"
              className={classes.input}
              />
              <br/>
              <TextField
              onChange={(e)=>handleChange("name",e)}
              id="name"
              label="name"
              variant="outlined"
              className={classes.input}
              />
              <br/>
          <TextField
          onChange={(e)=>handleChange("id",e)}
              id="id"
              label="id"
              variant="outlined"
              type="id"
              className={classes.input}
              />
              <Typography className={classes.error}>{error?error:null}</Typography>
      </CardContent>
      <CardActions className={classes.footer}>
          <Button 
          onClick={
            
            onSubmit
          }
          variant="contained" 
          color="primary"  
          className={classes.btn} 
          size="large">suBmit</Button>
          
      </CardActions>
      </Card>
      </>
);
  }else{
    return <Dashboard
    userId={userId}
    testId={testId}
    values={values}
    goToBack={setDisQueFunc}
    clear={clear}
          />
  }
}

function mapStateToProps({user,exist}){
  return {user,exist}
}

export default withRouter(connect(mapStateToProps,actions)(Login))