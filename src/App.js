import React,{useEffect} from "react"
import Routes from "./routes"
import  VisibilitySensor from "react-visibility-sensor"
import { usePageVisibility } from 'react-page-visibility';

function App() {


  // const isVisible = usePageVisibility()

  // if(!isVisible){
  //   var a=1
  //   alert('not visilbe'+a+1)
  // }

  return (
        <Routes/>
  );
}


export default App;
