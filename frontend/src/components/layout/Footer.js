import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer">
            <h4 className="text-center">All Rights Reserved &copy; cs department awkum</h4>
            <h6 className='text-center'>For Any queries contact, talhayaseentdr@gmail.com</h6>
            <p className="text-center mt-3">
                <Link to="/about">About</Link>
                |
                <Link to="/contact">Contact</Link>
                |
                <Link to="/policy">Privacy Policy </Link>

            </p>
        </div>
      );
}
 
export default Footer;