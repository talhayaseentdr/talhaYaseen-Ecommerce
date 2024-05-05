import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Select } from 'antd'
const { Option } = Select      //for dropdown menu

const AddProduct = () => {
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [photo, setphoto] = useState('')
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState('')
  const [quantity, setquantity] = useState('')
  const [shipping, setshipping] = useState('')

  const navigate = useNavigate();

  //create product
  const handleProduct = async (e) => {
    e.preventDefault();
    console.log(categories)
    try {
      const productData = new FormData() //using FormData because we have photo in product data
      productData.append("name",name)
      productData.append("description",description)
      productData.append("price",price)
      productData.append("quantity",quantity)
      productData.append("photo",photo)
      productData.append("category",category)
      productData.append("shipping",shipping)

      const { data } = await axios.post('/api/product/add-product', productData)
      if (data?.success) {
        toast.success('New Product Created Successfully')
        navigate('/dashboard/admin/allproducts')
      }
      else {
        toast.error('error in creating product')
      }
    } catch (error) {
      console.log(error)
      toast.error('error in create product request')
    }
  }

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
  return (
    <Layout title={"Admin Dashboard - Add Product"}>
      <div className='container-fluid m-3 p-3'>

        <div className="row p-3 ">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2>Add Product </h2>
              <div className='m-1 w-75' >
                <select value={category} onChange={(e) => setCategory(e.target.value)} className='form-select mb-3'>
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
                <div className='mb-3'>
                  <label className='btn btn-outline-secondary' >
                    {photo ? photo.name : 'upload photo'}
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
                  >
                    <Option value='no'>No</Option>
                    <Option value='yes'>Yes</Option>

                  </Select>
                </div>
                <div className='mb-3'>
                  <button onClick={handleProduct} className='btn btn-primary'>Create Product</button>
                </div>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AddProduct
