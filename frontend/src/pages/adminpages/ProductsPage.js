import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

const ProductsPage = () => {
  const [products, setproducts] = useState([])

  //funtion to get all products
  const getallproducts = async () => {
    try {
      const { data } = await axios.get('/api/product/get-allproducts')
      if (data.success) {
        setproducts(data.allproducts)  //allproducts is from backend
      }
    } catch (error) {
      console.log(error)
      toast.error('error in getting all products')
    }
  }



  useEffect(() => {
    getallproducts();
  }, [])

  return (
    <Layout title={"Admin Dashboard - Products"}>
      <div className='container-fluid m-3 p-3'>
        <div className='row p-3'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1 className='text-center'>All Products</h1>
              <div className='d-flex flex-wrap'>
                {products?.map((p) => (
                  <Link 
                  key={p._id} 
                  to={`/dashboard/admin/singleProduct/${p.slug}`} 
                  className='product-link' >
                    <div className="card m-1" style={{ width: '18rem' }} >
                      <img src={`/api/product/get-productpic/${p._id}`} className="card-img-top" alt={p.name} />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                      </div>
                    </div>  
                  </Link>
                ))}
              </div>
          </div>
        </div>
        </div>

    </Layout>
  )
}

export default ProductsPage
