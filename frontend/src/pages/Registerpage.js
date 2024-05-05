import React, { useState } from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/authcontext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

const Registerpage = () => {
    const [email, setemail] = useState('')
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [password, setpassword] = useState('')
    const [answer, setanswer] = useState('')
    const [address, setaddress] = useState('')
    const [phonenumber,setphonenumber] = useState('')

    const location = useLocation()
    const navigate = useNavigate()

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const register = await axios.post('/api/user/register',{email,firstname,lastname,password,answer,address,phonenumber});
            if (register && register.data.success) {
                toast.success(register.data.message,{duration:10000})
                navigate('/login');
            } 
            else{
                toast.error(register.data.message)
            }
        }
        catch (error) {
            toast.error('error registering new user')
        }
    }
    return (
        <Layout title={'Register - FastShop'}>
            <div className="register">
                <h1>Register</h1>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            value={firstname}
                            onChange={(e) => setfirstname(e.target.value)}
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter Your First Name"
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            value={lastname}
                            onChange={(e) => setlastname(e.target.value)}
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter Your Last Name"
                            required
                        />
                    </div>

                    <div className='mb-3'>
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
                    <div className='mb-3'>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter Your Password"
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setaddress(e.target.value)}
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter Your Address"
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <input
                            type="number"
                            value={phonenumber}
                            onChange={(e) => setphonenumber(e.target.value)}
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter Your Phone Number"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            size={50}
                            value={answer}
                            onChange={(e) => setanswer(e.target.value)}
                            className="form-control"
                            id="formGroupExampleInput2"
                            placeholder="What is Your Favorite Pet Name"
                            required
                        />
                    </div>
                    <button type='submit' className='btn btn-primary'>
                        Register
                    </button>


                </form>

            </div>


        </Layout>
    )
}

export default Registerpage
