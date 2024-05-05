import React from 'react';
import Layout from '../components/layout/Layout'
import { BiMailSend, BiPhoneCall } from "react-icons/bi";

const Contactpage = () => {
    return ( 
        <Layout title={"Contact us - FastShop"}>
        <div className="row contactus ">
          <div className="col-md-6 ">
            <img
              src="/images/contactus.jpg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
            <p className="text-justify mt-2">
              for any query and info about any product feel free to call or email us any time. we are 24x7 available
            </p>
            <p className="mt-3">
              <BiMailSend /> : talhayaseentdr@gmail.com
            </p>
            <p className="mt-3">
              <BiPhoneCall /> : 0317-8502328
            </p>
          </div>
        </div>
      </Layout>

     );
}
 
export default Contactpage;