import React, { useState } from 'react';
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'

const ForgotPassword = () => {
    const [email, setemail] = useState('');
    const [newPassword, setnewpassword] = useState('');
    const [answer,setnewanswer] = useState('');

    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const reset = await axios.post('/api/forgot-password', {email, newPassword,answer })
            if (reset.status === 200) {
                toast.success(' Password Changed Successfully ', { duration: 10000 });
                navigate('/login');

            }
            else {
                toast.error('login details are incorrect', { duration: 10000 })
            }


        }
        catch (error) {
            console.error('error in password reset request', error)
            toast.error('error in password reset request', { duration: 10000 })

        }
    }
    return ( 
        <Layout title="Forgot Password - FastShop" >
             <div className="login">
                <h1>RESET PASSWORD</h1>
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
                            type="text"
                            value={answer}
                            onChange={(e) => setnewanswer(e.target.value)}
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter your favorite sport"
                            required
                        />

                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setnewpassword(e.target.value)}
                            className="form-control"
                            id="formGroupExampleInput2"
                            placeholder="Enter Your New Password"
                            required
                        />
                    </div>

                    <button type='submit' className='btn btn-primary'>
                        Reset
                    </button>

                </form>

            </div>
        </Layout>
        
     );
}
 
export default ForgotPassword;