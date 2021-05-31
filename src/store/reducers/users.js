import {USERS} from "../actions/types"

export default function loginRed(state=[{
    testName:""
}],action){

    if(action.type===USERS){
        return action.payload
    }else{
        return state
    }
}