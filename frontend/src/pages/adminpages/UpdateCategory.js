import React,{useState, useEffect,} from 'react'
import Layout from '../../components/layout/Layout'
import { NavLink , useNavigate, useParams} from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import Categoryform from '../../components/form/Categoryform'
const UpdateCategory = () => {
const {id:categoryId} = useParams();
const [updatedName,setupdatedName] = useState('')

const navigate = useNavigate();
    useEffect(()=>{
        const fetchCategoryDetails = async() => {
            try {
                const {data} = await axios.get(`/api/category/single-category/${categoryId}`)
                if(data.success){
                    setupdatedName(data.singlecategory.name);           
                }  
                else toast.error('error to fetch category details')
            } catch (error) {
                console.log(error)
                toast.error('error in fetch request')
            }
        }
        fetchCategoryDetails();
    },[categoryId]);

const handleupdate = async (e) => {
    e.preventDefault()
    try {
        const {data} = await axios.put(`/api/category/update-category/${categoryId}`, {name:updatedName})
        if(data.success){
           toast.success('category name updated successfully')
            navigate('/dashboard/admin/create-category')
        }else{
            toast.error('error to update ')
        }

    } catch (error) {
        console.log(error);
        toast.error('something went wrong to update category');
    }
}

    return (
        <Layout title={"Dashboard - Update Category"}>
            <div className='container flud m-3 p-3'>
                <div className='row' >
                    <div className='col-md-3'>
                        <NavLink to={"/dashboard/admin/create-category"} >Go Back</NavLink>
                    </div> 

                    <div className='p-3 w-50'>
                        <Categoryform value={updatedName} setvalue={setupdatedName} handlesubmit={handleupdate}/>
                 </div>
                  
                   
                </div>
            </div>
        </Layout>
    )
}

export default UpdateCategory
