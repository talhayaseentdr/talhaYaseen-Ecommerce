import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <>
            
                <div className='text-center'>
                    <div className="list-group">
                        <h4>Admin Panel</h4>
                        <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">
                            Create Categories</NavLink>
                        <NavLink to="/dashboard/admin/add-product" className="list-group-item list-group-item-action">
                            Add Products</NavLink>
                         <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">
                            Orders</NavLink>
                        <NavLink to="/dashboard/admin/allproducts" className="list-group-item list-group-item-action">All Products</NavLink>
                            
                    </div>
                    </div >
            

        


        </>
    )
}

export default AdminMenu
