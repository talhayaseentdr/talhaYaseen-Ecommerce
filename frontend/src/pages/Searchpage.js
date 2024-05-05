import React from 'react'
import Layout from '../components/layout/Layout'
import { useSearch } from '../context/Searchcontext'
import {useNavigate} from 'react-router-dom'

const Searchpage = () => {
    const navigate = useNavigate();
    const [values, setvalues] = useSearch();

    return (
        <Layout title={"Serach Results - FastShop"}>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Results</h1>
                    <div className='d-flex flex-wrap'>
                        {values?.results.length < 1 ? "no products found" :
                             values?.results.map((p) => (
                                <div className="card m-2" style={{ width: '18rem' }} >
                                    <img src={`/api/product/get-productpic/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <p className="card-text">Rs {p.price}</p>
                                        <button className='btn btn-primary ms-1'onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                                        <button className='btn btn-secondary ms-1'>Add To Cart</button>
                                    </div>
                                </div>
                            ))} 
                    </div>

                </div>

            </div>

        </Layout>
    )
}

export default Searchpage
