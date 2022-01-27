import React from "react";
import { useLocation } from "react-router-dom";
import { Fragment } from "react/cjs/react.production.min";
import { useLocationDetails } from "./CustomHook";
//import React, {Component} from "react";
import './Header.css';

const Header = function(props){

    const locationDetail = useLocationDetails();
    const {city, region, country_name} = locationDetail;
    return(
        <Fragment>
        {/* <div style={{textAlign: 'center', padding: 20, background: '#000', color: '#fff', textTransform: 'uppercase'}}> */}
        <div className="header">
            {props.heading}
        </div>
        <h4>Welcome User, You are form {city} , {region} on {country_name}</h4>
        </Fragment>
    )
}
// class Header extends Component{
//     render(){
//         return(
//             <div className="header">
//                 {this.props.heading}
//             </div>
//         )
//     }
// }
export default Header;