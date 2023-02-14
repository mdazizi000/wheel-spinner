import {Fragment} from "react";
import {Button, Card, CardBody, CardHeader, Row} from "reactstrap";
import Wheel from "../components/wheel/Wheel";
import {Link} from "react-router-dom";


const MyGames = () => {
    return (
        <div className={"container"}>
            <Row>
                <Card>
                    <CardHeader>
                        <h4>ایجاد شده توسط شما :</h4>
                    </CardHeader>
                    <CardBody>
                        <Row className={'justify-content-around games-box'}>
                            <div className={"col-12 col-md-6 col-lg-3 game-item"}>
                                <i className={'fa fa-lock'}></i>
                                <Row>
                                    <p className={'game-details'}>
                                        <span>دورهمی</span><br/>
                                        <span>10 $</span><br/>
                                        <span>ظرفیت 7/4</span><br/>
                                    </p>
                                </Row>
                                <Row>
                                    <Button className={'join-btn'} >1نفر تا شروع</Button>
                                </Row>
                            </div>
                            <div className={"col-12 col-md-6 col-lg-3 game-item"}>
                                <i className={'fa fa-unlock'}></i>
                                <Row>
                                    <p className={'game-details'}>
                                        <span>دوستان خوب</span><br/>
                                        <span>13 $</span><br/>
                                        <span>ظرفیت 9/8</span><br/>
                                    </p>
                                </Row>
                                <Row>
                                    <Link to={'/dashboard/game/1'}><Button color={'success'} >مشاهده</Button></Link>
                                </Row>
                            </div>
                            <div className={"col-12 col-md-6 col-lg-3 game-item"}>
                                <i className={'fa fa-unlock'}></i>
                                <Row>
                                    <p className={'game-details'}>
                                        <span>کینگز</span><br/>
                                        <span>13 $</span><br/>
                                        <span>ظرفیت 9/8</span><br/>
                                    </p>
                                </Row>
                                <Row>
                                    <Button className={'join-btn'} >2نفر تا شروع</Button>
                                </Row>
                            </div>

                        </Row>
                    </CardBody>
                </Card>
            </Row>
            <Row className={'mt-5'}>
                <Card>
                    <CardHeader>
                        <h4>عضو شده ها :</h4>
                    </CardHeader>
                    <CardBody>
                        <Row className={'justify-content-around games-box'}>
                            <div className={"col-12 col-md-6 col-lg-3 game-item"}>
                                <i className={'fa fa-lock'}></i>
                                <Row>
                                    <p className={'game-details'}>
                                        <span>دورهمی</span><br/>
                                        <span>10 $</span><br/>
                                        <span>ظرفیت 7/4</span><br/>
                                    </p>
                                </Row>
                                <Row>
                                    <Link to={'/dashboard/game/1'} className={'join-btn'} >1نفر تا شروع</Link>
                                </Row>
                            </div>
                            <div className={"col-12 col-md-6 col-lg-3 game-item"}>
                                <i className={'fa fa-unlock'}></i>
                                <Row>
                                    <p className={'game-details'}>
                                        <span>دوستان خوب</span><br/>
                                        <span>13 $</span><br/>
                                        <span>ظرفیت 9/8</span><br/>
                                    </p>
                                </Row>
                                <Row>
                                    <Button color={'success'} >مشاهده</Button>
                                </Row>
                            </div>
                            <div className={"col-12 col-md-6 col-lg-3 game-item"}>
                                <i className={'fa fa-unlock'}></i>
                                <Row>
                                    <p className={'game-details'}>
                                        <span>کینگز</span><br/>
                                        <span>13 $</span><br/>
                                        <span>ظرفیت 9/8</span><br/>
                                    </p>
                                </Row>
                                <Row>
                                    <Button className={'join-btn'} >2نفر تا شروع</Button>
                                </Row>
                            </div>

                        </Row>
                    </CardBody>
                </Card>
            </Row>
        </div>
    )
}

export default MyGames;