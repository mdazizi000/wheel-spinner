import {Fragment, useState} from "react";
import {Button, Row} from "reactstrap";
import "../assets/css/games.css"
import GameDetailsModal from "../components/modals/GameDetailsModal";

const Games = () => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})
    function details() {
        setOpen(!open)
    }
    return (
        <Fragment>

            {open === true ?   <GameDetailsModal setOpen={setOpen} open={open} data={data}/>: <Fragment/>}
            <div className={"container"}>
                <Row className={'justify-content-around games-box'}>
                    <h2 className={'mb-5'}>بازی های در حال برگزاری...</h2>
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
            </div>
        </Fragment>
    )

}

export default Games;