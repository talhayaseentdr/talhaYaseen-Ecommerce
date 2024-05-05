import React from 'react-router-dom'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu';
import { useAuth } from '../../context/authcontext';

const Dashboard = () => {
    const [auth] = useAuth();
    return ( 
        <Layout title={"Admin Dashboard - FastShop"}>
            <div className='container-fluid m-3 p-3'> 
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />
                </div>
                <div className='col-md-9'>
                    <div className="card w-75 p-3">
                        <h4>Welcome {auth?.user?.firstname}</h4>
                    </div>
                </div>
            </div>
            </div>
        </Layout>
     );
}
 
export default Dashboard;