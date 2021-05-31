import {EXIST} from "../actions/types"

export default function exist(state="empty",action){

    if(action.type===EXIST){
        return action.payload
    }else{
        return state
    }
}