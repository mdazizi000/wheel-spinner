import {Button, Form, FormFeedback, FormGroup, FormText, Input, Label, Row} from "reactstrap";
import {Fragment, useEffect, useState} from "react";
import "../assets/css/homeStyle.css"
import "../assets/css/sliderStyle.css";
import sliderOne from "../assets/img/slide-1.png"
import sliderTwo from "../assets/img/slide-2.png"
import sliderTree from "../assets/img/slide-3.png"
import Carousel from "../components/sliders/slider";
import {Link} from "react-router-dom";
const HomePage = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    return <Fragment >
        <div className={'container container-box'}>
            <Row className={'justify-content-center text-center'}>
                <div className={'col-12 col-lg-5 login-box'}>
                    <Carousel >
                        <div className={'col-12'}>
                            <img src={sliderOne} className={'350'} height={'500'}/>
                        </div>
                        <div className={'col-12'}>
                            <img src={sliderTwo} className={'350'} height={'500'}/>
                        </div>
                        <div className={'col-12'}>
                            <img src={sliderTree} className={'350'} height={'500'}/>
                        </div>
                    </Carousel>
                    <Link to={'/login'} className={'btn btn-primary mt-100'} style={{marginTop:50}}>بزن بریم</Link>

                </div>
            </Row>
        </div>


    </Fragment>
  }

  export default HomePage;