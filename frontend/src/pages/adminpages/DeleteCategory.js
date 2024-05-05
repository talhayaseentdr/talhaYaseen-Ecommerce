import React,{useState, useEffect} from 'react'
import Layout from '../../components/layout/Layout'
import { NavLink , useNavigate, useParams} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import Categoryform from '../../components/form/Categoryform'

const DeleteCategory = () => {
  return (
    <Layout>
    <div className='container flud m-3 p-3'>
    <div className='row' >
        <div className='col-md-3'>
            <NavLink to={"/dashboard/admin/create-category"} >Go Back</NavLink>
        </div> 

        <div className='p-3 w-50'>
            <Categoryform />
     </div>
      
       
    </div>
</div>
</Layout>
  )
}

export default DeleteCategory
