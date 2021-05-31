import {EXIST, USERS} from "./types"
import firebase from "../../firebase"
import axios from "axios"

export const fetchUser=(userId,testId)=>async(dispatch)=>{
    firebase.database().ref(`users/${userId}/test/${testId}`).on('value',(snapShot)=>{

        dispatch({
            type:USERS,
            payload:snapShot.val()
        })
    })
}

export const submitForm=(userId,testId,id)=>async(dispatch)=>{

return new Promise((resolve,reject)=>{
    firebase.database().ref(`users/${userId}/test/${testId}/result`).on('value',(snapShot)=>{

        const key=Object.keys(snapShot.val())
        const values=Object.values(snapShot.val())
    
        const data=key.map((item,i)=>{
            return {...values[i],key:item}
         })
        const oneCollection=data.filter((item)=>item.id==id)
        dispatch({
            type:EXIST,
            payload:oneCollection.length>0?true:false
        })
     })
     resolve()
})


}


export const submitTest=(userId,testId,values)=>async(dispatch)=>{

        firebase.database().ref(`users/${userId}/test/${testId}/result`).push(values)

    
}


