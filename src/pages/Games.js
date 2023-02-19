import {Fragment, useState} from "react";
import {Button, Card, CardBody, CardHeader, Row} from "reactstrap";
import "../assets/css/games.css"
import GameDetailsModal from "../components/modals/GameDetailsModal";
import PrivateGameModal from "../components/modals/PrivateGameModal";

const Games = () => {
    const [privateModal, setPrivateModal] = useState(false)
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})
    function details() {
        setOpen(!open)
    }
    return (
        <Fragment>

            {open === true ?   <GameDetailsModal setOpen={setOpen} open={open} data={data}/>: <Fragment/>}
            {privateModal === true ?   <PrivateGameModal setModal={setPrivateModal} modal={privateModal} />: <Fragment/>}

            <div className={"container"}>
                <Row className={'justify-content-around '}>
                    <Card>
                        <CardHeader>

                            <Row className={'justify-content-between'}>
                                <h3  className={'col-12 col-md-3'}>بازی های در حال برگزاری...</h3>
                                <Button className={'col-12 col-md-3'} color={'warning'} onClick={()=>{setPrivateModal(true)}}>عضویت در بازی خصوصی</Button>
                            </Row>
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
                                        <Button className={'join-btn'} onClick={e=>{
                                            setData({
                                                'id': 1,
                                                'title': "دورهمی",
                                                'total_count':'7',
                                                'count':'4',
                                                'price':'10'
                                            })
                                            details()
                                        }}>عضویت</Button>
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
                                        <Button className={'join-btn'} onClick={e=>{
                                            setData({
                                                'id': 2,
                                                'title': "دوستان خوب",
                                                'total_count':'9',
                                                'count':'8',
                                                'price':'13'
                                            })
                                            details()
                                        }}>عضویت</Button>
                                    </Row>
                                </div>
                                <div className={"col-12 col-md-6 col-lg-3 game-item"}>
                                    <i className={'fa fa-lock'}></i>
                                    <Row>
                                        <p className={'game-details'}>
                                            <span>برنده ها</span><br/>
                                            <span>4 $</span><br/>
                                            <span>ظرفیت 10/5</span><br/>
                                        </p>
                                    </Row>
                                    <Row>
                                        <Button className={'join-btn'} onClick={e=>{
                                            setData({
                                                'id': 3,
                                                'title': "برنده ها",
                                                'total_count':'10',
                                                'count':'45',
                                                'price':'4'
                                            })
                                            details()
                                        }}>عضویت</Button>
                                    </Row>
                                </div>
                                <div className={"col-12 col-md-6 col-lg-3 game-item"}>
                                    <i className={'fa fa-unlock'}></i>
                                    <Row>
                                        <p className={'game-details'}>
                                            <span>همکلاسیا</span><br/>
                                            <span>2 $</span><br/>
                                            <span>15/1</span><br/>
                                        </p>
                                    </Row>
                                    <Row>
                                        <Button className={'join-btn'} onClick={e=>{
                                            setData({
                                                'id': 4,
                                                'title': "همکلاسیا",
                                                'total_count':'15',
                                                'count':'1',
                                                'price':'2'
                                            })
                                            details()
                                        }}>عضویت</Button>
                                    </Row>
                                </div>
                            </Row>
                        </CardBody>
                    </Card>


                </Row>
            </div>
        </Fragment>
    )

}

export default Games;