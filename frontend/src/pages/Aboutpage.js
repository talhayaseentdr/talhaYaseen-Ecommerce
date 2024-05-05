import React from 'react'
import Layout from "../components/layout/Layout";

const Aboutpage = () => {
    return ( 
        <Layout title={"About us - FastShop"}>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="/images/about.jpg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <h1>About Us</h1>
            <p>We invite you to join us on this exciting journey as we continue to learn, grow, and innovate in the world of computer science. Thank you for visiting our website, and we hope you enjoy exploring what we've built together</p>
          </div>
        </div>
      </Layout>
     );
}
 
export default Aboutpage;