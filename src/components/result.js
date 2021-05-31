import { Button } from '@material-ui/core';
import React, { Component } from 'react'
import Modal from 'react-modal';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

function Result({marks,goToBack,setComplete}){
    return (
        <Modal
        
          isOpen={true}
          onAfterOpen={()=>5}
          onRequestClose={()=>5}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <div style={{backgroundColor:'white',width:600,height:300,display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
          <h1>Result</h1>
          <h1>{marks}%</h1>
          </div>
          <Button 
          variant="contained" 
          style={{width:'100%'}}
          color="primary"
          onClick={()=>{
            setComplete()
            goToBack()
          }}
          >Ok</Button>
        </Modal>
    )
}

export default Result
