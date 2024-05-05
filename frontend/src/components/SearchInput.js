import React from 'react'
import axios from 'axios'
import {useSearch} from '../context/Searchcontext'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
const SearchInput = () => {
    const [values,setvalues] = useSearch();
    const navigate = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault()
    try {
        const {data} = await axios.get(`/api/product/search/${values.keyword}`)
        setvalues({...values,results:data}) //fulfilling result array in Searchcontext.js from data
        navigate('/search')
    } catch (error) {
        console.log(error)
    }        
    } 
  return (
    <form className="d-flex" role="search" onSubmit={handlesubmit}>
  <input className="form-control me-2"
   type="search" 
   placeholder="Search" 
   aria-label="Search"
   value={values.keyword}
   onChange={(e)=> setvalues({ ...values, keyword:e.target.value})}
    />
  <button className="btn btn-outline-success" type="submit">Search</button>
</form>

  )
}

export default SearchInput;
