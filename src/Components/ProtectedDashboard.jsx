import React from 'react'
import { useAuth } from '../Context/Contextfile'
import { Navigate } from 'react-router-dom'

function ProtectedDashboard({children}) {

let{condata:{isLogged,userdata}} = useAuth()

if(userdata===null && isLogged===false){
    return <Navigate to='/' />
}

  return children
}

export default ProtectedDashboard