import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/authcontext';
import { Outlet, useNavigate, useLocation } from 'react-router-dom' //used for nested routing.allows u to render child routes within parent components.
import axios from 'axios';
import Spinner from '../Spinner';
import toast from 'react-hot-toast';

const UserPrivateRoute = () => {

    const [ok, setok] = useState(false) //useState for user route
    const [auth, setauth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        const authcheck = async () => { // this function will only be executed if we get the token from the server.
         try {
            const resp = await axios.get('/api/user/user-route')
            if (resp.data.ok) {
                setok(true);
            }
         } catch (error) {
            console.error(error)
            navigate('/')
            toast.error('error in user dashboard request', {duration:10000})
         }
            
        

    }
        if (auth?.token) { //this will check the token in authcontext.js file. and after that, authcheck() will be executed.
        authcheck()
    }



}, [auth?.token, navigate, location]) //useEffect function re-runs when the values in dependency changes.



return ok ? <Outlet /> : <Spinner />;
  
}

export default UserPrivateRoute
