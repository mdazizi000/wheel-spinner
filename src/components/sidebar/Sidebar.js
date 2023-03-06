import '../../assets/css/sidebar.css'
import {Button, ListGroup, ListGroupItem, Row} from "reactstrap";
import admin from '../../assets/img/admin.png';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import TransactionModal from "../modals/TransactionModal";
import {Fragment, useEffect, useState} from "react";
import CreateGameModal from "../modals/CreateGameModal";
import axios from "axios";
import Swal from "sweetalert2";

const SideBar = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [modal, setModal] = useState(false)
    const [change, setChange] = useState(false)
    const [open, setOpen] = useState(false);

    function logout() {
        axios.get('/logout')
            .then(response => {
               if (response.data.success === true){
                   localStorage.removeItem('token')
                   localStorage.removeItem('user')
                   window.location.replace('/login')
               }

            })
            .catch((err) => {
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
                            setTimeout(() => {
                                window.location.replace('/')
                            }, 4000)


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


    return (
        <Fragment>
            <TransactionModal modal={modal} setModal={setModal} type={0} change={change} setChange={setChange}/>
            <CreateGameModal open={open} setOpen={setOpen}/>
            <div className={'sidebar-section'} id={'sidebar-section'}>
                <div className={'container-fluid'}>
                    <Row className={'justify-content-center text-center'}>
                        <div className={'col-4 mt-4'}>
                            <img src={admin} className={'user-profile'} alt="" width={'70px'} height={'70px'}/>
                        </div>
                        <p className={'mt-2'}>{user.first_name + ' ' + user.last_name}</p>
                        <div className={'row justify-content-center'}>
                            <div className="col-12  pt-2">
                                <span>موجودی :{user.game_wallet.balance}$</span>
                            </div>
                        </div>
                        <div className={'row justify-content-center'}>
                            <div className="col-12 mt-4">
                                <Button className={'btn btn-success'} onClick={(e) => setModal(true)}>شارژ کیف
                                    پول</Button>
                            </div>
                        </div>

                        <Row className={'text-end mt-5 menu-row'}>

                            <ListGroup className={'menu'} flush>


                                <Link to={'/dashboard'} className={'menu-link'}>
                                    <ListGroupItem className={'menu-item'}>
                                        داشبورد
                                    </ListGroupItem>
                                </Link>

                                <Link to={'/dashboard/profile'} className={'menu-link'}>
                                    <ListGroupItem className={'menu-item'}>
                                        پروفایل
                                    </ListGroupItem>
                                </Link>

                                <Link to={'/dashboard/games'} className={'menu-link'}>
                                    <ListGroupItem className={'menu-item'}>
                                        همه ی بازی ها
                                    </ListGroupItem>
                                </Link>

                                <Link to={'/dashboard/my-games'} className={'menu-link'}>
                                    <ListGroupItem className={'menu-item'}>
                                        بازی های من
                                    </ListGroupItem>
                                </Link>

                                <Link to={'/dashboard/completed-games'} className={'menu-link'}>
                                    <ListGroupItem className={'menu-item'}>
                                        بازی های انجام شده
                                    </ListGroupItem>
                                </Link>
                                <ListGroupItem style={{cursor: "pointer"}} className={'menu-item'}
                                               onClick={(e) => setOpen(true)}>
                                    ایجاد اتاق جدید
                                </ListGroupItem>

                                <ListGroupItem style={{cursor: "pointer"}} className={'menu-item'}
                                               onClick={(e) => logout()}>
                                   خروج از حساب
                                </ListGroupItem>

                            </ListGroup>
                        </Row>
                    </Row>
                </div>
            </div>
        </Fragment>

    )

}

export default SideBar;