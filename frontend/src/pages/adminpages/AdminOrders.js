import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/authcontext'
import {Select} from 'antd'


const {Option} = Select;
const AdminOrders = () => {
  const [status, setStatus] = useState(["Verifying Details", "Shipping", "Delivered", "Canceled"])
  const [changeStatus, setChangeStatus] = useState("")

  const [orders, setOrders] = useState([]);
  const [auth, setauth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/user/all-orders')
      setOrders(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token])

 //function to change the status of order
 const handleChange = async (OrderId, value) => {
  try {
    const {data} = await axios.put(`/api/user/order-status/${OrderId}`, {status:value})
    getOrders();
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div>
      <Layout title={"Admin Dashboard - All Orders"}>
        <div className='container-fluid m-3 p-3'>

          <div className="row p-3 ">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-6">
              <h2 className='text-center'>Admin Orders</h2>
              {orders?.map((o, i) => {
                return (
                  <div className='border shadow'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>#</th>
                          <th scope='col'>Status</th>
                          <th scope='col'>Buyer</th>
                          <th scope='col'>Order Placing Date</th>
                          <th scope='col'>Payment</th>
                          <th scope='col'>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>
                          <Select bordered="false" onChange={(value)=> handleChange(o._id,value)} defaultValue={o?.status}>
                            {status.map((s,i)=> (
                              <Option key={i} value={s}>
                                {s}</Option>
                            ))}
                          </Select>
                          </td>
                          <td>{o?.buyer?.firstname}</td>
                          <td>{o?.createdAt}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='container'>
                      {o?.products?.map((p, i) => (
                        <div className='row'>
                          <div className='col-md-4'>
                            <img src={`/api/product/get-productpic/${p._id}`}
                              className="card-img-top" alt={p.name} />
                          </div>
                          <div className='col-md-8'>
                            <h4>{p.name}</h4>
                            <h6>Price : {p.price} Rs</h6>
                            <h6>Description: {p.description}</h6>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default AdminOrders
