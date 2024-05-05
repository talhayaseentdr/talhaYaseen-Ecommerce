import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { FaShoppingBag } from "react-icons/fa";
import { useAuth } from '../../context/authcontext'
import SearchInput from '../SearchInput';
import toast from 'react-hot-toast'
import { useCart } from '../../context/Cartcontext';

const Header = () => {
  const [auth, setauth] = useAuth();
  const [cart] = useCart()
  const handlelogout = () => {
    setauth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem('auth') //removing data from localstorage when user is logged out.
    toast.success('logged out successfully', { duration: 5000 });
  }
  return (

    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand" >
              <FaShoppingBag /> FASTSHOP
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <SearchInput></SearchInput>

              <li className="nav-item">
                <NavLink to="/" className="nav-link " >Home</NavLink>
              </li>
              {
                !auth?.user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/login" className="nav-link" >Login</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/register" className="nav-link" >Register</NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item dropdown">
                      <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth?.user?.firstname}
                      </NavLink>
                      <ul className="dropdown-menu">
                        <li><NavLink to={`/dashboard/${auth?.user?.isAdmin === true ? "admin" : "user"} `} className="dropdown-item" >Dashboard</NavLink></li>
                        <li>
                          <NavLink onClick={handlelogout} to="/login" className="dropdown-item" >Logout</NavLink>
                        </li>
                      </ul>
                    </li> 
                  </>
                )
              }
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link" >Cart {cart?.length} </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;