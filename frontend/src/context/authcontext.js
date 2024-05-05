import {useState, useContext, useEffect, createContext} from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setauth] = useState({
        user: null,
        token: ""
    })
    axios.defaults.headers.common['Authorization'] = auth?.token; //this will include the Authorization header in every request axios made.

    useEffect(()=> {
        const data = localStorage.getItem('auth'); //creating localstorage named as 'auth'. 
        if(data){
            const parsedata = JSON.parse(data);
            setauth({
                ...auth,
                user: parsedata.User,
                token: parsedata.token
            })
        }//below comment is to stop continous processing of data in console.
        //eslint-disable-next-line-
    },[])
    return(
        <AuthContext.Provider value={[auth,setauth]}>
        {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider}