import React from 'react';
import Layout from "../components/layout/Layout";

const Policypage = () => {
    return (
        <Layout title={"Privacy Policy - FastShop"}>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/policy.jpg"
                        alt="contactus"
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="col-md-4">
                    <h1>Our Privacy Policy</h1>
                    <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personal Information may include:</p>
                    <p>Email address</p>
                    <p>First name and last name</p>
                    <p>Phone number</p>
                    <p>Address</p>
                </div>
            </div>
        </Layout>
    );
}

export default Policypage;