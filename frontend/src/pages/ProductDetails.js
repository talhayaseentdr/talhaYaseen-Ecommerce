import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/Layout'
import axios from 'axios'
import {useParams,useNavigate} from 'react-router-dom';

const ProductDetails = () => {
    const [product,setproduct] = useState([])
    const params = useParams();
    const navigate = useNavigate();
// getting single product 
    const getsingleproduct = async () => {
        try {
            const {data} = await axios.get(`/api/product/get-singleproduct/${params.slug}`)
            if(data?.success){
                setproduct(data?.singleproduct);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
      if(params?.slug)  getsingleproduct();

    },[params?.slug])
  return (
    <Layout title={"Product Details - FastShop"}>
        <div className='row container mt-2'>
            <div className='col-md-6'> 
            <img src={`/api/product/get-productpic/${product._id}`} className="card-img-top" alt={product.name} />
            </div>
            <div className='col-md-6'> 
            <h1 className='text-center'>Product Details</h1>
            <h6> Name : {product.name}</h6>
            <h6>Price : Rs {product.price}</h6>
            {product.category && <h6>Category : {product.category.name}</h6> }  {/* it means it will show the category name after it get the products.category */}
            <h6>Description: {product.description}</h6>
            <h6>Quantity : {product.quantity}</h6>
            <button className='btn btn-secondary ms-1' onClick={()=> navigate('/cart')}>Add To Cart</button>

            
            </div>


        </div>
    </Layout>
  )
}

export default ProductDetails
