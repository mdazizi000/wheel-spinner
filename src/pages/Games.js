import {Fragment, useEffect, useState} from "react";
import {Button, Card, CardBody, CardHeader, Row, Spinner} from "reactstrap";
import "../assets/css/games.css"
import GameDetailsModal from "../components/modals/GameDetailsModal";
import PrivateGameModal from "../components/modals/PrivateGameModal";
import axios from "axios";
import Swal from "sweetalert2";

const Games = () => {
    const [privateModal, setPrivateModal] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [buttonLoading, setButtonLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [change, setChange] = useState(false)
    const [id, setId] = useState('')
    const [data, setData] = useState({})
    const [games,setGames]=useState([]);

    useEffect(()=>{
        axios.get('/games/explore')
            .then((res) => {
                if (res.data.success === true) {

                    setIsLoading(false)
                    setGames(res.data?.data?.games)
                }

            })
            .catch((err) => {
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
                            setTimeout(()=>{window.location.replace('/')},4000)


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
    },[])

    return (
        <Fragment>

            {open === true ?   <GameDetailsModal setOpen={setOpen} open={open} id={id} change={change} setChange={setChange} />: <Fragment/>}
            {privateModal === true ?   <PrivateGameModal setModal={setPrivateModal} modal={privateModal} />: <Fragment/>}

            <div className={"container"}>
                <Row className={'justify-content-around '}>
                    <Card>
                        <CardHeader>

                            <Row className={'justify-content-between'}>
                                <h3  className={'col-12 col-md-3'}>بازی های در حال برگزاری...</h3>
                                <Button type={'button'} className={'col-12 col-md-3'} color={'warning'} onClick={()=>{setPrivateModal(true)}}>عضویت در بازی خصوصی</Button>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <Row className={'justify-content-around games-box'}>
                                {isLoading ? <Spinner/> :
                                    games.length !== 0 ?
                                        games.map((game)=>(
                                            <div className={"col-12 col-md-6 col-lg-3 game-item"}>
                                                <i className={'fa fa-lock'}></i>
                                                <Row>
                                                    <p className={'game-details'}>
                                                        <span>{game.name}</span><br/>
                                                        <span>{game.price} $</span><br/>
                                                        <span>ظرفیت {game.count+'/'+game.capacity}</span><br/>
                                                    </p>
                                                </Row>
                                                <Row>
                                                    <Button className={'join-btn'} disabled={open} onClick={e=>{
                                                        setOpen(true)
                                                        setId(game.id)
                                                    }}>عضویت</Button>
                                                </Row>
                                            </div>
                                        ))
                                        : <h5>در حال حاضر بازی یافت نشد</h5>
                                }

                            </Row>
                        </CardBody>
                    </Card>


                </Row>
            </div>
        </Fragment>
    )

}

export default Games;