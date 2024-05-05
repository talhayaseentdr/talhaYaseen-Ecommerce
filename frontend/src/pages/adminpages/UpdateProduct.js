import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Select } from 'antd'
const { Option } = Select      //for dropdown menu

const UpdataProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [photo, setphoto] = useState('')
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState('')
  const [quantity, setquantity] = useState('')
  const [shipping, setshipping] = useState('')
  const [id, setid] = useState(" ")

  //get single product
  const getsingleproduct = async () => {
    try {
      const { data } = await axios.get(`/api/product/get-singleproduct/${params.slug}`)
      setname(data.singleproduct.name)
      setCategory(data.singleproduct.category._id)
      setdescription(data.singleproduct.description)
      setprice(data.singleproduct.price)
      setshipping(data.singleproduct.shipping)
      setquantity(data.singleproduct.quantity)
      setid(data.singleproduct._id)

    } catch (error) {
      console.log(error)
      toast.error('error in getting single product')
    }
  }
  useEffect(() => {
    getsingleproduct();
    //eslint-disable-next-line
  },[])
  //get all categories
  const getallcategories = async () => {
    try {
      const { data } = await axios.get('/api/category/all-category') //destructuring response of axios in which we get {data} so we directly called it.
      if (data?.success) {
        setCategories(data?.allcategory) //allcategory is from backend
      }

    } catch (error) {
      console.log(error)
      toast.error('something went wrong in getting all categories')
    }
  }
  useEffect(() => {
    getallcategories();

  }, [])
  //update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData() //using FormData because we have photo in product data
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      photo && productData.append("photo", photo)  //it means if photo is recieved then we have to make changes 
      productData.append("category", category)

      const { data } = await axios.put(`/api/product/updateproduct/${id}`, productData)
      if (data?.success) {
        toast.success('Product Updated Successfully')
        navigate('/dashboard/admin/allproducts')
      }
    } catch (error) {
      console.log("Error: " , error)
      toast.error('error in update product request')
    }
  }

//delete product function
const handledelete = async () => {
  try {
    const {data} = await axios.delete(`/api/product/deleteproduct/${id}`)
    if(data.success){
      toast.success('product deleted successfully')
      navigate('/dashboard/admin/allproducts')
    }
  } catch (error) {
    console.log(error)
    toast.error('error in delete product request')
  }
}


  return (
    <Layout title={"Dashboard - Add Product"}>
      <div className='container-fluid m-3 p-3'>
        <div className="row p-3 ">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Update Product </h2>
            <div className='m-1 w-75' >
              <select onChange={(e) => setCategory(e.target.value)} value={category} className='form-select mb-3'>
                <option value="" >Select a category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}

              </select>
              <div className='mb-3'>
                <label className='btn btn-outline-secondary' >
                  {photo ? photo.name : 'upload another photo'}
                  <input
                    type='file'
                    name='photo'
                    accept='image/*'
                    onChange={(e) => setphoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className='mb-3'>
                <input type='String'
                  value={name}
                  placeholder='Name of Product'
                  className='form-control'
                  onChange={(e) => setname(e.target.value)} />
              </div>
              <div className='mb-3'>
                <input type='number'
                  placeholder='Quantity of Product'
                  value={quantity}
                  className='form-control'
                  onChange={(e) => setquantity(e.target.value)} />
              </div>
              <div className='mb-3'>
                <input type='number'
                  placeholder='Price'
                  className='form-control'
                  value={price}
                  onChange={(e) => setprice(e.target.value)} />
              </div>
              <div className='mb-3' >
                <textarea type='String'
                  className='form-control'
                  value={description}
                  placeholder='Description'
                  onChange={(e) => setdescription(e.target.value)} />
              </div>
              <div className='mb-3'>
                <Select
                  bordered={false}
                  placeholder='select shipping'
                  size='large'
                  showSearch
                  className='form-select mb-3'
                  onChange={(value) => { setshipping(value) }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value='no'>No</Option>
                  <Option value='yes'>Yes</Option>

                </Select>
              </div>
              <div className='mb-3'>
                <button onClick={handleUpdate} className='btn btn-primary'>Update Product</button>
              </div>
              <div className='mb-3'>
                <button onClick={handledelete} className='btn btn-danger'>Delete Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdataProduct
