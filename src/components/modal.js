import { Button } from '@material-ui/core';
import React, { Component, useEffect } from 'react'
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

function ResultModel({goTo}){
    return (
        <Modal
          isOpen={true}
          onAfterOpen={()=>5}
          onRequestClose={()=>5}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <div style={{backgroundColor:'white',width:600,height:300,display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
          <h1>During exam you are not<br/> allow to move anywhere</h1>
          <Button
          variant="contained"
          style={{backgroundColor:'red',width:"100%"}}
          onClick={goTo}
          >
            Ok
          </Button>
          </div>
        </Modal>
    )
}

export default ResultModel
