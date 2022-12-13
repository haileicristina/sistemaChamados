import { useContext } from 'react';
import {  Navigate, Outlet} from "react-router-dom";
import { AuthContext } from '../contexts/auth';

export default function RouteWrapper({loggedComponent, defaultComponent, isPrivate}){
  const {signed} = useContext(AuthContext);

 

 if(!signed && isPrivate){
  return <Navigate to='/' />
  
}

else if(signed && !isPrivate){
  return <Navigate to="/dashboard" />
  
}

return signed ? loggedComponent : defaultComponent
 
 
 
}