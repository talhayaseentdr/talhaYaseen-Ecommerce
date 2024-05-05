import { Routes, Route } from 'react-router-dom'

// pages and components
import Homepage from './pages/Homepage';
import Aboutpage from './pages/Aboutpage';
import Policypage from './pages/Policypage'
import Contactpage from './pages/Contactpage'
import Pagenotfound from './pages/Pagenotfound';
import Loginpage from './pages/Loginpage';
import Dashboard from './pages/adminpages/Dashboard';
import AdminPrivateRoute from './components/routes/AdminPrivateRoute';
import ForgotPassword from './pages/adminpages/ForgotPassword'
import CreateCategory from './pages/adminpages/CreateCategory';
import AddProduct from './pages/adminpages/AddProduct';
import AdminOrders from './pages/adminpages/AdminOrders';
import Registerpage from './pages/Registerpage';
import UserPrivateRoute from './components/routes/UserPrivateRoute';
import UserDashboard from './pages/UserDashboard';
import UserProfile from './pages/UserProfile';
import UserOrders from './pages/UserOrders';
import UpdateCategory from './pages/adminpages/UpdateCategory';
import DeleteCategory from './pages/adminpages/DeleteCategory';
import ProductsPage from './pages/adminpages/ProductsPage';
import UpdateProduct from './pages/adminpages/UpdateProduct';
import Searchpage from './pages/Searchpage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
function App() {
  return (
    <>
      <Routes>
        <Route path='/dashboard' element={<AdminPrivateRoute />}>

          <Route path="admin" element={<Dashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/update-category/:id' element={<UpdateCategory/>} />
          <Route path='admin/delete-category/:id' element={<DeleteCategory/>} />
          <Route path='admin/add-product' element={<AddProduct />} />
          <Route path='admin/allproducts' element={<ProductsPage/>} />
          <Route path='admin/singleProduct/:slug' element={<UpdateProduct/>} />
          <Route path='admin/orders' element={<AdminOrders />} />
        </Route>

        <Route path='/dashboard' element={<UserPrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path='user/profile' element={<UserProfile/>} />
          <Route path='user/orders' element={<UserOrders/>} />
        </Route>

        <Route path='/' element={<Homepage />} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path='/search' element={<Searchpage/>} />
        <Route path='/product/:slug' element={<ProductDetails/>} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/about' element={<Aboutpage />} />
        <Route path='/contact' element={<Contactpage />} />
        <Route path='/policy' element={<Policypage />} />
        <Route path='/login' element={<Loginpage />} />
        <Route path='/register' element={<Registerpage />} />
        <Route path='/*' element={<Pagenotfound />} />

      </Routes>
    </>
  );
}

export default App;
