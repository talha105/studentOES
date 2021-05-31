import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import { Card, CardHeader } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import * as actions from "../store/actions";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { usePageVisibility } from 'react-page-visibility';
import CheatingModel from "./cheatingModel"
import {connect} from "react-redux"
import Result from './result';
import ResultModel from './modal';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width:'100%'
  },
  root2: {
    width:'70%',
    margin:'0 auto',
    marginTop:40,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',

  },
  heading:{
    margin:'0px auto'
},
tabs:{
    flexGrow:1
},
tabsBar:{
    flexGrow:1
},
btn:{
    width:'100%'
}
}));

function SimpleTabs({user,submitTest,userId,testId,values,goToBack,clear}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [questionNo,setQuestionNo]=useState(0);
  const [answere,setAnswere]=useState('');
  const [marks,setMarks]=useState(0);
  const [complete,setComplete]=useState(false)
  const [cheat,setCheat]=useState(0)
  const [move,setMove]=useState(false)

  function getValue(v){
    setAnswere(v)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function questions(){
    const question=Object.values(user.questions)
    return question
  }


  const radio1=useRef('')
  const radio2=useRef('')
  const radio3=useRef('')
  const radio4=useRef('')

  function setCompleteFunc(value){
    setComplete(value)
  }


  const isVisible = usePageVisibility()


  const usePageVisibilityMemo=useMemo(()=>{
    if(!isVisible){
      setCheat((pS)=>++pS)
      setMove(true)
      console.log("ss",cheat)
    }
  },[isVisible])

  return (
    <div className={classes.root}>
      {
        complete?(
          <Result
      marks={Math.round(((marks*100)/questions().length))}
      setComplete={()=>{
        setCompleteFunc(false)
        clear()
      }}
      goToBack={goToBack}
      />
        ):null
      }
      {
        move && !cheat<=4?(
          <ResultModel
          goTo={()=>setMove(false)}
          />
        ):null
      }
            {
        cheat>=4?(
          <CheatingModel
        goTo={()=>{
          goToBack()
          clear()
        }}
        call={()=>{
          submitTest(userId,testId,{score:Math.round(((marks*100)/questions().length))+"%",cheating:true,...values})
        }}
        />
        ):null
      }
        <AppBar position="static">
        <Toolbar>
        <Typography className={classes.heading} variant="h5">Online Exam Cheating Detection System</Typography>
        </Toolbar>
      </AppBar>
      <div>
          <h1 style={{textAlign:'center'}}>{user.testName?user.testName.toUpperCase():null}</h1>
          <p>{cheat}</p>
        </div>
      <div style={{display:'flex',flexDirection:'row'}}>
    <div style={{margin:30}}>
    <CountdownCircleTimer
    onComplete={()=>console.log("close")}
    size={130}
    strokeWidth={5}
    
    isPlaying
    duration={user.durationTime*60*60}
    colors={[
      ['#33b600', 0.75],
      ['#ff003c', 0.25],
    ]}
  >
    {({ remainingTime }) => `${Math.round(remainingTime/60)}`}
  </CountdownCircleTimer>
    </div>
  <div style={{width:'75%',justifyContent:'flex-start'}}>
  <Card className={classes.root2} variant="elevation">
        <CardHeader
        title={`Q.no ${questionNo+1} ${questions()[questionNo].question}`}
        />
        <CardContent className={classes.content}>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%'}}>
          <div><input name={questions()[questionNo].question} value={questions()[questionNo].optionA} type="radio" ref={radio1}  onChange={(v)=>getValue(v.target.value)}/></div>
          <div style={{marginLeft:20}}><p>{questions()[questionNo].optionA}</p></div>
          </div>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%'}}>
          <div><input name={questions()[questionNo].question} value={questions()[questionNo].optionB} type="radio" ref={radio2} onChange={(v)=>getValue(v.target.value)}/></div>
          <div style={{marginLeft:20}}><p>{questions()[questionNo].optionB}</p></div>
          </div>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%'}}>
          <div><input name={questions()[questionNo].question} value={questions()[questionNo].optionC} type="radio" ref={radio3} onChange={(v)=>getValue(v.target.value)}/></div>
          <div style={{marginLeft:20}}><p>{questions()[questionNo].optionC}</p></div>
          </div>
          <div style={{display:'flex',flexDirection:'row',alignItems:'center',width:'100%'}}>
          <div><input name={questions()[questionNo].question} value={questions()[questionNo].optionD} type="radio" ref={radio4} onChange={(v)=>getValue(v.target.value)}/></div>
          <div style={{marginLeft:20}}><p>{questions()[questionNo].optionD}</p></div>
          </div>
        </CardContent>
        <CardContent/>
        <CardActions className={classes.footer}>
          <Button 
          onClick={()=>{
            if(answere){
              if(answere==questions()[questionNo].answere){
                setMarks((ps)=>++ps)
              }
              if(questionNo>questions().length-2){
                
                submitTest(userId,testId,{score:Math.round(((marks*100)/questions().length))+"%",cheating:false,...values})
                setCompleteFunc(true)
              }else{
                console.log(answere)
                setQuestionNo((ps)=>++ps)
              }
              setAnswere('')
              radio1.current.checked=false
              radio2.current.checked=false
              radio3.current.checked=false
              radio4.current.checked=false
            }else{
              alert("please select question")
            }
          }}
          className={classes.btn} 
          variant="contained"
          color="primary"
          size="large">Next</Button>
          
      </CardActions>
      </Card>
  </div>
      </div>
    </div>
  );
}
function mapStateToProps({user}){
  return {user}
}

export default connect(mapStateToProps,actions)(SimpleTabs);