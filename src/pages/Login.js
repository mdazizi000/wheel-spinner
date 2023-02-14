import {Button, Form, FormFeedback, FormGroup, FormText, Input, Label, Row} from "reactstrap";
import {Fragment, useEffect, useState} from "react";
import "../assets/css/homeStyle.css"
import "../assets/css/sliderStyle.css";
import sliderOne from "../assets/img/slide-1.png"
import sliderTwo from "../assets/img/slide-2.png"
import sliderTree from "../assets/img/slide-3.png"
import Carousel from "../components/sliders/slider";
import {Link} from "react-router-dom";
const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    return <Fragment >
        <div className={'container container-box'}>
            <Row className={'justify-content-center text-center'}>
                <div className={'col-12 col-lg-5 login-box'}>
                    <Row className={'mt-5 mb-100 justify-content-center'}>
                        <h2 className={'mb-3'}><b>ورود</b></h2>
                        <Form className={'login-form p-2 pb-4'}>

                            <FormGroup className="position-relative">
                                <Label for="exampleEmail">
                                    ایمیل
                                </Label>
                                <Input placeholder={'ایمیل خود را وارد کنید'} onChange={(e)=>setEmail(e.target.value)} type={'email'} valid={email !== ''} invalid={email === ''}/>
                                <FormFeedback
                                    valid
                                >
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup className="position-relative">
                                <Label for="examplePassword">
                                    رمز عبور
                                </Label>
                                <Input placeholder={'رمز عبور  خود را وارد کنید'} type={'password'} onChange={(e)=>setPassword(e.target.value)}  valid={password !== ''} invalid={password === ''} />
                            </FormGroup>

                            <button className={'btn btn-success'} disabled={email === ''  || password === ''}>ورود</button>
                        </Form>

                        <Link className={'link'} to={'/register'} >هنوز ثبت نام نکرده اید؟ ثبت نام</Link>
                    </Row>

                </div>
            </Row>
        </div>


    </Fragment>
}

export default Login;