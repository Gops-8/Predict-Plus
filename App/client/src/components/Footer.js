import React from 'react';
import './styles/FooterStyle.css'
import { Apple,Android} from '@material-ui/icons';

const Footer = () =>{
  return (
    <div>
         <div class="footer">
                  
                  <a className="li-footer" href="/about">All right reserved</a>                  
                  <a className="li-footer" href="/about">Privacy Policy</a>              
                  <a className="li-footer" href="/about">Terms and Condition</a>

          </div>
    </div>
  )
};

export default Footer;