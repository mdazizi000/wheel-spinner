import {Button, Form, FormFeedback, FormGroup, FormText, Input, Label, Row, Spinner} from "reactstrap";
import {Fragment, useEffect, useState} from "react";
import "../assets/css/homeStyle.css"
import "../assets/css/sliderStyle.css";
import sliderOne from "../assets/img/slide-1.png"
import sliderTwo from "../assets/img/slide-2.png"
import sliderTree from "../assets/img/slide-3.png"
import Carousel from "../components/sliders/slider";
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";
const Login = () => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [isLoading, setIsLoading] = useState(false)
    const user = useDispatch();
    function login(e) {
        e.preventDefault()
        const data = new FormData();


        data.append('email', email)
        data.append('password', password)

        axios.post('/login', data, {}).then((res) => {
            if (res.data.success === true) {
                user({type: 'setUser', data: JSON.stringify(res.data?.data?.user), token: res.data?.data?.token,balanace :res.data?.data?.user.game_wallet.balance })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'ورود با موفقیت انجام شد',
                    showConfirmButton: false,
                    timer: 4000
                })
                setIsLoading(false)
                setTimeout(() => {
                    window.location.replace('/dashboard/profile')
                }, 2000)
            }

        })
            .catch((err) => {

                // setFirstName('');
                // setLastName('');
                // setIban('');
                // setEmail('');
                // setPhone('');
                // setPassword('');
                setIsLoading(false)

                if (err.code !== "ERR_CANCELED" && !err.response?.status)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: 'خطا در ارتباط با سرور! لطفا اتصال اینترنت خود را بررسی کنید.',
                        showConfirmButton: false,
                        timer: 4000
                    })
                else {
                    switch (err.response.status) {
                        // Unauthorized
                        case 401:
                            localStorage.removeItem("token");
                            localStorage.removeItem("user");
                            axios.defaults.headers.common.Authorization = undefined;
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'توکن شما منقضی شده است! لطفا دوباره وارد شوید.',
                                showConfirmButton: false,
                                timer: 4000
                            })
                            window.location.replace('/')

                            break;

                        // Unauthenticated

                        // Not found
                        case 404:
                            window.location.replace('/')
                            break;

                        // Unprocessable content
                        case 422:
                            let errors = [];
                            for (let error in err.response.data.errors)
                                err.response.data.errors[error].forEach((item) =>
                                    errors.push(item)
                                );
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: `${errors[0]}`,
                                showConfirmButton: false,
                                timer: 4000
                            })


                            break;

                        // Too many requests
                        case 429:
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'تعداد درخواست‌های شما از حد مجاز عبور کرده است! لطفا بعدا تلاش کنید.',
                                showConfirmButton: false,
                                timer: 4000
                            })
                            toast.error(
                                ""
                            );
                            break;

                        // Server-side error
                        case 500:
                            Swal.fire({
                                position: 'top-end',
                                icon: 'error',
                                title: 'خطایی در سمت سرور پیش‌ آمده! لطفا بعدا تلاش کنید.',
                                showConfirmButton: false,
                                timer: 4000
                            })
                            break;

                        default:
                            break;
                    }
                }

            })

    }

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

                            <button className={'btn btn-success'} onClick={(e)=>{
                                setIsLoading(true)
                                login(e)
                            }} disabled={email === ''  || password === '' || isLoading}> {isLoading ? <Spinner size="sm"/> : 'ورود '}</button>
                        </Form>

                        <Link className={'link'} to={'/register'} >هنوز ثبت نام نکرده اید؟ ثبت نام</Link>
                    </Row>

                </div>
            </Row>
        </div>


    </Fragment>
}

export default Login;