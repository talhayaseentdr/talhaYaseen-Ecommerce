import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import Categoryform from '../../components/form/Categoryform'
import { NavLink, useParams} from 'react-router-dom'

const CreateCategory = () => {
  const [categories, setcategories] = useState([])
  const [name, setname] = useState(""); 
  const {id:categoryId} = useParams();

    //get all categories
   const getallcategories = async () => {
    try {
      const { data } = await axios.get('/api/category/all-category') //destructuring response of axios in which we get {data} so we directly called it.
      if (data?.success) {
        setcategories(data?.allcategory)
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong in getting all categories')
    }
  }
  useEffect(() => {
    getallcategories();

  }, [])

  //create new category    
  const handlesubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/category/create-category', { name })
      if (data.success) {
        toast.success('New Category Created')
        getallcategories();
        setname('')
      } else toast.error(data.message)

    } catch (error) {
      console.log(error)
      toast.error('error in creating category')
    }

  }

  //delete category
  const handleDelete = async (categoryId) => {
     
    try {
      const {data} = await axios.delete(`/api/category/delete-category/${categoryId}`)
      if(data.success){
        toast.success('category deleted successfully')
        getallcategories();
      }
    } catch (error) {
      console.log(error);
      toast.error('error in delete category request')
    }
  }
  
  return (
    <Layout title={"Admin Dashboard - Create Category"}>
      <div className='container-fluid m-3 p-3'>

        <div className="row p-3">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Manage Categories </h2>
            <div className='p-3 w-50'>
              <Categoryform handlesubmit={handlesubmit} value={name} setvalue={setname} />
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td> 
                          <NavLink to={`/dashboard/admin/update-category/${c._id}`} className='btn btn-primary ms-2'>Edit</NavLink>
                          <button className='btn btn-danger ms-2' onClick={()=> handleDelete(c._id)}>Delete</button>                          
                        </td>
                      </tr>
                    </>
                    ))}                   
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory
