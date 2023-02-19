import '../../assets/css/sidebar.css'
import {Button, ListGroup, ListGroupItem, Row} from "reactstrap";
import admin from '../../assets/img/admin.png';
import {Link} from "react-router-dom";

const SideBar = () => {
    return (
        <div className={'sidebar-section'} id={'sidebar-section'}>
            <div className={'container-fluid'}>
                <Row className={'justify-content-center text-center'}>
                    <div className={'col-4 mt-4'}>
                        <img src={admin} className={'user-profile'} alt="" width={'70px'} height={'70px'}/>
                    </div>
                    <p className={'mt-2'}>محمد عزیزی</p>
                    <div className={'row justify-content-between'}>
                        <div className="col-6 pt-2">
                            <span>موجودی :120$</span>
                        </div>
                        <div className="col-6">
                            <Button className={'btn btn-success'}>شارژ کیف پول</Button>
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
                            <ListGroupItem className={'menu-item'}>
                                ایجاد اتاق جدید
                            </ListGroupItem>
                            <ListGroupItem className={'menu-item'}>
                                خروج
                            </ListGroupItem>
                        </ListGroup>
                    </Row>
                </Row>
            </div>
        </div>
    )

}

export default SideBar;