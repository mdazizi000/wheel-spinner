import {Outlet} from 'react-router-dom'
import SideBar from "../components/sidebar/Sidebar";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import React, {Fragment, useEffect, useState} from "react";
import "../assets/css/navbar.css"

const RootLayout = () =>{
    const [isShow,setIsShow] =useState(false);

    const showNavbar = () => {
      if (isShow ===true){
          document.getElementById('sidebar').style.display='none';
          document.getElementById('sidebar-section').style.right='-300px';
          document.getElementById('navbar-i').style.marginRight='0';

          setIsShow(!isShow);
      }
      else {
          document.getElementById('sidebar').style.display='block';
          document.getElementById('sidebar-section').style.right='0';
          document.getElementById('navbar-i').style.marginRight='300px';
          setIsShow(!isShow);
      }
    }

    return (

            <div className={'container-fluid'}>
            {/*<Navbar/>*/}
            <Row className={'header'}>
                <div className="col-12 mb-4 ">
                    <button className={'btn'} id={'navbar-i'} onClick={showNavbar}> <i className={isShow ? "fa fa-arrow-right navbar-i" : "fa fa-bars navbar-i"}></i></button>
                </div>
            </Row>
            <Row className={'justify-content-around'}>
                <div className="col-md-4 col-lg-5 col-xl-2 side "  id={'sidebar'} >

                    <SideBar/>
                </div>
                <div className="col-xs-12 col-lg-12 col-xl-9 mt-5 content">
                    <Outlet/>
                </div>
            </Row>

        </div>

    )
}

export default RootLayout;