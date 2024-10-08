import React, { useState, useEffect } from 'react'
import Layout from "../components/layout/Layout"
import axios from 'axios'
import toast from 'react-hot-toast'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'
import {useNavigate} from 'react-router-dom'
import { useCart } from '../context/Cartcontext'

const Homepage = () => {
    const [cart,setcart] = useCart();
    const [products, setproducts] = useState([])
    const [categories, setcategories] = useState([])
    const [checked, setchecked] = useState([])
    const [radio, setradio] = useState([])
    const navigate = useNavigate();
    //get all categories
    const getallcategories = async () => {
        try {
            const { data } = await axios.get('/api/category/all-category') //destructuring response of axios in which we get {data} so we directly called it.
            if (data?.success) {
                setcategories(data?.allcategory) //allcategory is from backend
            }

        } catch (error) {
            console.log(error)
            toast.error('something went wrong in getting all categories')
        }
    }

    useEffect(() => {
        getallcategories();
    }, [])

    //getting all products
    const getallproducts = async () => {
        try {
            const { data } = await axios.get('/api/product/get-allproducts')
            if (data.success) {
                setproducts(data.allproducts)
            }
        } catch (error) {
            console.log(error)
            toast.error('error in get all products request')
        }
    }
    useEffect(() => {
        if (!checked.length || !radio.length) {
            getallproducts();
        }
    }, [checked.length,radio.length])

    useEffect(() => {
        if (checked.length > 0 || radio.length) {
            filteredProducts();
        }
    }, [checked, radio])

    //filter by category
    const handlefilter = (value, id) => {
        let all = [...checked]          //categories checked will be stored in this array
        if (value) {
            all.push(id) //pushing id of category in all array
        }
        else {
            all = all.filter((c) => c !== id)  //filtering all array by category id
        }
        setchecked(all) //assigning filtered array to setchecked
    }

    //get filtered products
    const filteredProducts = async () => {
        try {
            const { data } = await axios.post('/api/product/product-filters', { checked, radio })
            setproducts(data?.filterProducts)
        } catch (error) {
            console.log(error)
            toast.error('error to get filterd products')
        }
    }
    return (
        <Layout title={"Home - FastShop"}>
            <div className='container-fluid row mt-3'>
                <div className='col-md-2'>
                    <h4 className='text-center'>Filter by Category</h4>
                    <div className='d-flex flex-column'>
                        {categories?.map((c) => (
                            <Checkbox key={c._id} onChange={(e) => handlefilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    <h4 className='text-center'>Filter by Price</h4>
                    <div className='d-flex flex-column'>
                        <Radio.Group onChange={e => setradio(e.target.value)}>
                            {Prices?.map(p => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>

                    </div>
                    <div className='d-flex flex-column'>
                        <button className='btn btn-danger mt-3' onClick={() => window.location.reload()}>Reset Filters</button>
                    </div>
                </div>


                <div className='col-md-10'>
                    <h1 className='text-center'>All Products</h1>
                    <div className='d-flex flex-wrap'>
                        {products?.map((p) => (
                            <div className="card m-2" style={{ width: '18rem' }} >
                                <img src={`/api/product/get-productpic/${p._id}`} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <p className="card-text">Rs {p.price}</p>
                                    <button className='btn btn-primary ms-1' onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button className='btn btn-secondary ms-1' onClick={()=> {
                                        setcart([...cart,p])
                                        localStorage.setItem("cart", JSON.stringify([...cart,p])) //saving cartitems to localstorage
                                        toast.success('item added to cart')
                                    } }>Add To Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </Layout>
    );
}

export default Homepage;