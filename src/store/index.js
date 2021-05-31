import ReduxThunk from "redux-thunk"
import {combineReducers,applyMiddleware, createStore} from "redux"
import users from "./reducers/users"
import exist from "./reducers/exist"
const reducers=combineReducers({
    user:users,
    exist
})

export  const store=createStore(reducers,applyMiddleware(ReduxThunk))
