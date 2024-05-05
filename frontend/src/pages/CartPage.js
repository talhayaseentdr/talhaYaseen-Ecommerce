import React, { useState, useEffect } from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/Cartcontext'
import { useAuth } from '../context/authcontext'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';

const CartPage = () => {
    const [auth, setauth] = useAuth()
    const [cart, setcart] = useCart()
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false)


    const navigate = useNavigate();


    //total price calculator
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((item) => {
                total = total + item.price;
            })
            return total;
        } catch (error) {
            console.log(error)
        }
    }
    //remove item from cart
    const removeCartItem = (pid) => {
        try {
            let mycart = [...cart] //getting cart items as it is before removing any item
            let index = mycart.findIndex(item => item._id === pid) //checking if id of selected item is equivlant with index of it.
            mycart.splice(index, 1) //removing item by using of splice with index of 1 if id is matched. 
            setcart(mycart);
            localStorage.setItem("cart", JSON.stringify(mycart))
        } catch (error) {
            console.log(error)
        }
    }

    //    get payment gateway token 
    const getToken = async () => {
        try {
            const { data } = await axios.get('/api/product/braintree/token')
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
            toast.error('error in getting payment token request')
        }
    }
    useEffect(() => {
        getToken();
    }, [])

    //make payment function
    const handlePayment = async () => {
        try {
            setLoading(true)
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post('/api/product/braintree/payment', {
                nonce, cart
            })
            setLoading(false)
            localStorage.removeItem("cart");
            setcart([]);
            navigate('/dashboard/user/orders')
         
        
    }
        catch (error) {
            setLoading(false)
            console.log(error)
            toast.error('Please provide payment details')
        }
    }
    return (
        <Layout title={"Cart - Fastshop"}>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`Hi ${auth?.token && auth?.user?.firstname}`}
                        </h1>
                        <h5 className='text-center  p-2'>
                            {!auth?.token ?
                                <button className='btn btn-outline-warning' onClick={() => navigate("/login",
                                    { state: "/cart" })}>
                                    Login To Go To Cart Page
                                </button>
                                : `you have ${cart?.length} items in your cart`
                            }
                        </h5>
                    </div>
                    <div className='row'>
                        <div className='col-md-8'>
                            {auth?.token ? cart?.map((p) => (
                                <div className='row'>
                                    <div className='col-md-4'>
                                        <img src={`/api/product/get-productpic/${p._id}`} className="card-img-top" alt={p.name} />
                                    </div>
                                    <div className='col-md-8'>
                                        <h4>{p.name}</h4>
                                        <h6>Category : {p?.category?.name}</h6>
                                        <h6>Price : {p.price} Rs</h6>
                                        <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            )) : " "}
                        </div>
                        {auth?.token && auth?.user?.address && clientToken && cart?.length ?
                            <div className='col-md-4 text-center'>
                                <h2>Cart Summary</h2>
                                <p>Total | Checkout | Payment</p>
                                <hr />
                                <h4>Total : {totalPrice()} Rs </h4>
                                <div className='mb-3'>
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button className='btn btn-outline-warning'
                                        onClick={() => navigate('/dashboard/user/profile')}>
                                        Update Address
                                    </button>
                                </div>
                            <div className='mt-2'>
                                    <DropIn
                                        options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: 'vault'
                                            }
                                        }}
                                        onInstance={(instance) => setInstance(instance)}
                                    />
                                    <button className='btn btn-primary' onClick={handlePayment} >
                                        Make Payment
                                    </button>
                                </div>
                            </div>
                            : " "
                        }
                       
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
