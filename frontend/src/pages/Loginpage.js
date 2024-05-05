import React, { useState } from 'react';
import Layout from '../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, useLocation} from 'react-router-dom'
import { useAuth } from '../context/authcontext';

const LoginPage = () => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [auth, setauth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const login = await axios.post('/api/user/login', { email, password })
            if (login.status === 200) {
                toast.success(' User Logged in Successfully ', { duration: 10000 });
                setauth({
                    ...auth,
                    user: login.data.User,
                    token: login.data.token
                })
                localStorage.setItem('auth', JSON.stringify(login.data)) //storing login data in localstorage so that user is logged in even if page is refreshed or closed.
                navigate(location.state || '/');

            }
            else  {
                toast.error('login details are incorrect', { duration: 10000 })
            }


        }
        catch (error) {
            
            toast.error('error or login details are incorrect', { duration: 10000 })
           
        }
    }
    return (
        <Layout title='Login - FastShop'>
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setemail(e.target.value)}
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter Your Email"
                            required
                        />

                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            className="form-control"
                            id="formGroupExampleInput2"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>
                        Login
                    </button>
                    <div className="mb-3">
                        <button type='button' className='forgot-password' onClick={() => { navigate('/forgot-password') }}>
                            Forgot Password?
                        </button>
                    </div>

                </form>

            </div>

        </Layout>
    );
}

export default LoginPage