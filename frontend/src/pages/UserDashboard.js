import React from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/authcontext';
import UserMenu from '../components/layout/UserMenu';
const UserDashboard = () => {
    const [auth] = useAuth();
  return (
    <Layout title={"UserDashboard - FastShop"}>
            <div className='container-fluid m-3 p-3'> 
            <div className='row'>
                <div className='col-md-3'>
                    <UserMenu/>

                </div>
                <div className='col-md-9'>
                    <div className="card w-75 p-3">
                        <h4>Welcome {auth?.user?.firstname}</h4>
                    </div>
                </div>
            </div>
            </div>
        </Layout>
  )
}

export default UserDashboard
