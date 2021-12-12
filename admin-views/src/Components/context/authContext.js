import { createContext,useReducer } from "react";

const initialState = {
    user:{
    }
}
initialState.user = localStorage.getItem("user");

//create context
const AuthContext = createContext({
    user: null,
    login: (usrData) =>{},
    logout: () => {}
});

//creating the reducer
const authReducer = (state, action)=>{
    switch(action.type){
        case "LOGIN": return{
            ...state,
            user: action.payload
        }
        case "LOGOUT":{
            return {
                ...state,
                user: null
            }
        }
        default: return state;
    }
}

//create State provider
const AuthProvider = (props) =>{
    const [state, dispatch] = useReducer(authReducer, initialState);
    const login = (userdata) =>{
        localStorage.setItem("user", JSON.stringify(userdata));
        dispatch ({
            type: "LOGIN",
            payload: userdata
        });
    }
    const logout = ()=>{
        localStorage.removeItem("user");
        dispatch({
            type: "LOGOUT"
        });

    }
    return (<AuthContext.Provider value={{user:state.user, login, logout}} {...props} />)
}

export {AuthContext, AuthProvider}