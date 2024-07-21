import { createContext, useContext, useState } from "react";



let AuthUser = createContext()

export const UserAuthProvider = ({children}) =>{

    let[condata,setcondata] = useState({
        isLogged:false,
        userid:null,
        userdata:null
    })
    console.log('contextfile says',condata);

let logout =()=>{
    setcondata({
        isLogged:false,
        userid:null,
        userdata:null
    })
}

    return <AuthUser.Provider value={{condata, setcondata,logout}}>
        {children}
    </AuthUser.Provider>
}

// use the context

export let useAuth = ()=>{
    return useContext(AuthUser)
}