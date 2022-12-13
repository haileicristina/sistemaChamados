
import {Routes, Route} from 'react-router-dom';
import RouteWrapper from './Route'
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Customers from '../pages/Customers';
import  NewCadastro from '../pages/NewCadastro';


export default function RoutesInfo(){
   
    return(
        <Routes>

        <Route path='/' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<SignIn />}/>} /> 

        <Route path='/dashboard' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<SignIn />} isPrivate />}/>

        <Route path='/signin' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<SignIn />} />} />

        <Route path='/register' element={<RouteWrapper loggedComponent={<Dashboard />} defaultComponent={<SignUp />} />} />

        <Route path='/profile' element={<RouteWrapper loggedComponent={<Profile />} defaultComponent={<SignIn />} isPrivate />}/>

        <Route path='/customers' element={<RouteWrapper loggedComponent={<Customers />} defaultComponent={<SignIn />} isPrivate />}/>

        <Route path='/new' element={<RouteWrapper loggedComponent={<NewCadastro />} defaultComponent={<SignIn />} isPrivate />}/>

        <Route path='/new/:id' element={<RouteWrapper loggedComponent={<NewCadastro />} defaultComponent={<SignIn />} isPrivate />}/>



</Routes>
    )
}
