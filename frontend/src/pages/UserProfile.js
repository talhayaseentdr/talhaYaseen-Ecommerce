import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import UserMenu from '../components/layout/UserMenu'
import { useAuth } from '../context/authcontext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
    const [email, setemail] = useState('')
    const [firstname, setfirstname] = useState('')
    const [lastname, setlastname] = useState('')
    const [password, setpassword] = useState('')
    const [address, setaddress] = useState('')
    const [phonenumber,setphonenumber] = useState('')
    const [auth, setauth] = useAuth();
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.put('/api/user/profile', { email, firstname, lastname, address, phonenumber,password });
            if(data?.error){
                toast.error(data?.error)
            }
            else{
                setauth({...auth,user:data?.updatedUser})
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls))
                toast.success('user profile updated successfully')
            }
        }
        catch (error) {
            toast.error('error updating user profile')
        }
    }
    useEffect(()=> {
        const {email,firstname,lastname,address,phonenumber} = auth?.user
        setemail(email)
        setfirstname(firstname)
        setaddress(address)
        setlastname(lastname)
        setphonenumber(phonenumber)
    },[auth?.user])
    return (
        <div>
            <Layout title={"Profile - FastShop"}>
                <div className='container-fluid m-3 p-3'>

                    <div className="row p-3 ">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                        <div className="col-md-9">
                            <div className="register">
                                <h1>User Profile</h1>
                                <form onSubmit={handlesubmit}>
                                    <div className="mb-3">
                                        <label>First Name :</label>
                                        <input
                                            type="text"
                                            value={firstname}
                                            onChange={(e) => setfirstname(e.target.value)}
                                            className="form-control"
                                            id="formGroupExampleInput"
                                            placeholder="Enter Your First Name"                          
                                        />
                                    </div>
                                    <div className='mb-3'>
                                    <label>Last Name :</label>
                                        <input
                                            type="text"
                                            value={lastname}
                                            onChange={(e) => setlastname(e.target.value)}
                                            className="form-control"
                                            id="formGroupExampleInput"
                                            placeholder="Enter Your Last Name"
                                        />
                                    </div>

                                    <div className='mb-3'>
                                    <label>Email :</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                            className="form-control"
                                            id="formGroupExampleInput"
                                            placeholder="Enter Your Email"
                                            disabled
                                        />
                                    </div>
                                    <div className='mb-3'>
                                    <label>Password :</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setpassword(e.target.value)}
                                            className="form-control"
                                            id="formGroupExampleInput"
                                            placeholder="Enter New Password"
                                            
                                        />
                                    </div>
                                    <div className='mb-3'>
                                    <label>Address :</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setaddress(e.target.value)}
                                            className="form-control"
                                            id="formGroupExampleInput"
                                            placeholder="Enter Your Address"
                                        />
                                    </div>
                                    <div className='mb-3'>
                                    <label>Mobile :</label>
                                        <input
                                            type="number"
                                            value={phonenumber}
                                            onChange={(e) => setphonenumber(e.target.value)}
                                            className="form-control"
                                            id="formGroupExampleInput"
                                            placeholder="Enter Your Phone Number"
                                        />
                                    </div>
                                    <button type='submit' className='btn btn-primary' >
                                        Update
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default UserProfile
