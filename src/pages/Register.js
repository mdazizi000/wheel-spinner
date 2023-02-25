import {Fragment, useEffect, useState} from "react";
import {Form, FormFeedback, FormGroup, Input, Label, Row, Spinner} from "reactstrap";
import "../assets/css/homeStyle.css"
import {Link} from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import Swal from 'sweetalert2'


const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [iban, setIban] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const user = useDispatch();
    const notify = () => {
        toast("Default Notification !");

        toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER
        });

        toast.error("Error Notification !", {
            position: toast.POSITION.TOP_LEFT
        });

        toast.warn("Warning Notification !", {
            position: toast.POSITION.BOTTOM_LEFT
        });

        toast.info("Info Notification !", {
            position: toast.POSITION.BOTTOM_CENTER
        });

        toast("Custom Style Notification with css class!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'foo-bar'
        });
    };

    function register(e) {
        e.preventDefault()
        const data = new FormData();

        data.append('first_name', firstName)
        data.append('last_name', lastName)
        data.append('email', email)
        data.append('mobile', phone)
        data.append('wallet', iban)
        data.append('password', password)

        axios.post('/register', data, {})
            .then((res) => {
            if (res.data.success === true) {
                user({type: 'setUser', data: JSON.stringify(res.data?.data?.user), token: res.data?.data?.token,balance :res.data?.data?.user.game_wallet.balance })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'ثبت نام با موفقیت انجام شد',
                    showConfirmButton: false,
                    timer: 4000
                })

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

    return <Fragment>

        <div className={'container container-box'}>
            <Row className={'justify-content-center text-center'}>
                <div className={'col-12 col-lg-5 login-box'}>
                    <Row className={'mt-5 mb-100 justify-content-center'}>
                        <h2 className={'mb-3'}><b>ثبت نام</b></h2>
                        <Form className={'login-form p-2 pb-4'}>

                            <FormGroup className="position-relative">
                                <Label for="first_name">
                                    نام
                                </Label>
                                <Input placeholder={'نام خود را وارد کنید'}
                                       onChange={(e) => setFirstName(e.target.value)}
                                       type={'text'} value={firstName} valid={firstName !== ''}
                                       invalid={firstName === ''}/>
                                <FormFeedback
                                    valid
                                >
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup className="position-relative">
                                <Label for="last_name">
                                    نام خانوادگی
                                </Label>
                                <Input placeholder={'نام خانوادگی خود را وارد کنید'}
                                       onChange={(e) => setLastName(e.target.value)}
                                       type={'text'} value={lastName} valid={lastName !== ''}
                                       invalid={lastName === ''}/>
                                <FormFeedback
                                    valid
                                >
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup className="position-relative">
                                <Label for="phone">
                                    شماره همراه
                                </Label>
                                <Input placeholder={'شماره همراه خود را وارد کنید'}
                                       onChange={(e) => setPhone(e.target.value)}
                                       type={'text'} value={phone} valid={phone !== ''} invalid={phone === ''}/>
                                <FormFeedback
                                    valid
                                >
                                </FormFeedback>
                            </FormGroup>

                            <FormGroup className="position-relative">
                                <Label for="iban">
                                    شماره شبا
                                </Label>
                                <Input placeholder={'شماره شبا خود را وارد کنید'}
                                       onChange={(e) => setIban(e.target.value)}
                                       type={'text'} value={iban} valid={iban !== ''} invalid={iban === ''}/>
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
                                       type={'email'} value={email} valid={email !== ''} invalid={email === ''}/>
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
                                       onChange={(e) => setPassword(e.target.value)} value={password}
                                       valid={password !== ''}
                                       invalid={password === ''}/>
                            </FormGroup>

                            <button className={'btn btn-success'} onClick={(e) => {
                                setIsLoading(true)
                                register(e)
                            }}
                                    disabled={email === '' || password === '' || password.length < 8 || firstName === '' || lastName === '' || phone === '' || phone === '' || iban === '' || isLoading}>
                                {isLoading ? <Spinner size="sm"/> : 'ثبت نام'}
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