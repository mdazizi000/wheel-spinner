import {Fragment, useEffect, useState} from "react";
import {Form, FormFeedback, FormGroup, Input, Label, Row} from "reactstrap";
import "../assets/css/homeStyle.css"
import {Link} from "react-router-dom";
import Carousel from "../components/sliders/slider";
import sliderOne from "../assets/img/slide-1.png";
import sliderTwo from "../assets/img/slide-2.png";
import sliderTree from "../assets/img/slide-3.png";


const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [iban, setIban] = useState('')
    return <Fragment>
        <div className={'container container-box'}>
            <Row className={'justify-content-center text-center'}>
                <div className={'col-12 col-lg-5 login-box'}>
                    <Row className={'mt-5 mb-100 justify-content-center'}>
                        <h2 className={'mb-3'}><b>ثبت نام</b></h2>
                        <Form className={'login-form p-2 pb-4'}>

                            <FormGroup className="position-relative">
                                <Label for="name">
                                    نام و نام خانوادگی
                                </Label>
                                <Input placeholder={'نام خود را وارد کنید'} onChange={(e) => setName(e.target.value)}
                                       type={'text'} valid={name !== ''} invalid={name === ''}/>
                                <FormFeedback
                                    valid
                                >
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup className="position-relative">
                                <Label for="phone">
                                    شماره همراه
                                </Label>
                                <Input placeholder={'شماره همراه خود را وارد کنید'} onChange={(e) => setPhone(e.target.value)}
                                       type={'text'} valid={phone !== ''} invalid={phone === ''}/>
                                <FormFeedback
                                    valid
                                >
                                </FormFeedback>
                            </FormGroup>

                            <FormGroup className="position-relative">
                                <Label for="iban">
                                    شماره شبا
                                </Label>
                                <Input placeholder={'شماره شبا خود را وارد کنید'} onChange={(e) => setIban(e.target.value)}
                                       type={'text'} valid={iban !== ''} invalid={iban === ''}/>
                                <FormFeedback
                                    valid
                                >
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup className="position-relative">
                                <Label for="exampleEmail">
                                    ایمیل
                                </Label>
                                <Input placeholder={'ایمیل خود را وارد کنید'} onChange={(e) => setEmail(e.target.value)}
                                       type={'email'} valid={email !== ''} invalid={email === ''}/>
                                <FormFeedback
                                    valid
                                >
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup className="position-relative">
                                <Label for="examplePassword">
                                    رمز عبور
                                </Label>
                                <Input placeholder={'رمز عبور  خود را وارد کنید'} type={'password'}
                                       onChange={(e) => setPassword(e.target.value)} valid={password !== ''}
                                       invalid={password === ''}/>
                            </FormGroup>

                            <button className={'btn btn-success'} disabled={email === '' || password === '' || name === '' || phone === ''|| phone === '' || iban === ''}>ثبت نام
                            </button>
                        </Form>

                        <Link className={'link'} to={'/login'}>قبلا ثبت نام کرده ایید؟ ورود</Link>
                    </Row>

                </div>
            </Row>
        </div>


    </Fragment>
}

export default Register;