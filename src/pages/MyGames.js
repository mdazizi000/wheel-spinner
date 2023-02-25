import {Fragment, useEffect, useState} from "react";
import {Button, Card, CardBody, CardFooter, CardHeader, Input, Row, Spinner, Tooltip} from "reactstrap";
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ReactPaginate from "react-paginate";
import "../assets/css/games.css"

const MyGames = () => {
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [tooltiptext, setTooltiptext] = useState('کپی کردن');
    const [myGames, setMyGames] = useState([]);
    const [joinedGames, setJoinedGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [secondCurrentPage, setSecondCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading2, setIsLoading2] = useState(true);
    const [change, setChange] = useState(true);
    const [query, setQuery] = useState(null);
    useEffect(() => {
        setIsLoading(true)
        setIsLoading2(true)
        axios.get(`/my-games?page=${currentPage}`,{
            params:{
                'query':query !== null ? query : undefined
            }
        })
            .then(response => {
            setMyGames(response.data.data.games);
            setCurrentPage(response?.data?.data?.games?.current_page);

            setIsLoading(false)

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
        axios.get(`/joined/games?page=${secondCurrentPage}`,{
            params:{
                'query':query !== null ? query : undefined
            }
        })
            .then(response => {
            setJoinedGames(response.data.data.games);
            setSecondCurrentPage(response?.data?.data?.games?.current_page);
            setIsLoading2(false)

        })
            .catch((err) => {
                setIsLoading2(false)
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
    }, [currentPage,secondCurrentPage,change])

    function toggle() {
        setTooltipOpen(!tooltipOpen)
    }

    return (
        <div className={"container"}>
            <Row className={'justify-content-center mb-4'}>
                <div className={"col-9 col-md-4"}>
                    <Input type={'text'} className={'input-group search-box'} placeholder={'نام بازی مورد نظر را وارد کنید...'} onChange={(e)=>setQuery(e.target.value)}/>
                </div>
                <div className={"col-2 col-md-1"}><Button className={'search-btn'} disabled={query === null || query === ''} onClick={(e)=>setChange(!change)}><i className={'fa fa-search'}></i></Button></div>
            </Row>
            <Row>
                <Card>
                    <CardHeader>
                        <h4>ایجاد شده توسط شما :</h4>
                    </CardHeader>
                    <CardBody>

                        {isLoading ? <Row className={'justify-content-center text-center'}><Spinner/></Row> :
                            myGames.data.length == 0 ?
                                <Row className={'justify-content-center text-center'}><strong>موردی یافت
                                    نشد</strong></Row> :
                                <Row className={'justify-content-around games-box'}>
                                    {myGames.data.map((game) => (
                                        <div className={"col-12 col-md-6 col-lg-3 game-item"}>
                                            {game.type === 'private' ? <i className={'fa fa-lock'}></i> :
                                                <i className={'fa fa-unlock'}></i>}
                                            <Row>
                                                <p className={'game-details'}>
                                                    <span>{game.name}</span><br/>
                                                    <span>{game.price} $</span><br/>
                                                    <span>ظرفیت {game.count}/{game.capacity}</span><br/>
                                                </p>
                                            </Row>
                                            {game.start_time === null ?
                                                <Row>
                                                    <Button className={'join-btn'}
                                                            style={{pointerEvents: "none"}}>{game.capacity}نفر تا
                                                        شروع</Button>
                                                    {game.type === 'private' &&
                                                        <>

                                                            <Button onClick={(e) => {
                                                                const link = `${game.code}`;
                                                                setTooltiptext('کپی شد')
                                                                navigator.clipboard.writeText(link);
                                                            }} className={'share-btn mt-2'} id="TooltipExample">کد
                                                                بازی</Button>

                                                            <Tooltip placement="right" isOpen={tooltipOpen}
                                                                     target="TooltipExample" toggle={toggle}>
                                                                {tooltiptext}
                                                            </Tooltip>
                                                        </>
                                                    }


                                                </Row> :
                                                <Row>
                                                    <Link to={'/dashboard/game/1'} className={'col-12 btn btn-success'}>مشاهده</Link>
                                                </Row>
                                            }

                                        </div>
                                    ))}

                                </Row>
                        }


                    </CardBody>
                    <CardFooter className={'justify-content-center text-center'}>
                        <ReactPaginate
                            nextLabel="بعدی >"
                            onPageChange={data => setCurrentPage(data.selected + 1)}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={myGames.last_page}
                            previousLabel="< قبلی"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </CardFooter>
                </Card>
            </Row>
            <Row className={'mt-5 mb-5'}>
                <Card>
                    <CardHeader>
                        <h4>عضو شده ها :</h4>
                    </CardHeader>
                    <CardBody>
                        {isLoading2 ? <Row className={'justify-content-center text-center'}><Spinner/></Row> :
                            joinedGames.data.length === 0 ?
                                <Row className={'justify-content-center text-center'}><strong>موردی یافت
                                    نشد</strong></Row> :
                                <Row className={'justify-content-around games-box'}>
                                    {joinedGames.data.map((game) => (
                                        <div className={"col-12 col-md-6 col-lg-3 game-item"}>
                                            {game.type === 'private' ? <i className={'fa fa-lock'}></i> :
                                                <i className={'fa fa-unlock'}></i>}
                                            <Row>
                                                <p className={'game-details'}>
                                                    <span>{game.name}</span><br/>
                                                    <span>{game.price} $</span><br/>
                                                    <span>ظرفیت {game.count}/{game.capacity}</span><br/>
                                                </p>
                                            </Row>
                                            {game.start_time === null ?
                                                <Row>
                                                    <Button className={'join-btn'}
                                                            style={{pointerEvents: "none"}}>{game.capacity}نفر تا
                                                        شروع</Button>
                                                    {game.type === 'private' &&
                                                        <>

                                                            <Button onClick={(e) => {
                                                                const link = `${game.code}`;
                                                                setTooltiptext('کپی شد')
                                                                navigator.clipboard.writeText(link);
                                                            }} className={'share-btn mt-2'} id="TooltipExample">کد
                                                                بازی</Button>

                                                            <Tooltip placement="right" isOpen={tooltipOpen}
                                                                     target="TooltipExample" toggle={toggle}>
                                                                {tooltiptext}
                                                            </Tooltip>
                                                        </>
                                                    }


                                                </Row> :
                                                <Row>
                                                    <Link to={`/dashboard/game/${game.id}`} className={'col-12 btn btn-success'}>مشاهده</Link>
                                                </Row>
                                            }

                                        </div>
                                    ))}
                                </Row>
                        }
                    </CardBody>
                    <CardFooter className={'justify-content-center text-center'}>
                        <ReactPaginate
                            nextLabel="بعدی >"
                            onPageChange={data => setSecondCurrentPage(data.selected + 1)}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={joinedGames.last_page}
                            previousLabel="< قبلی"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    </CardFooter>
                </Card>
            </Row>
        </div>
    )
}

export default MyGames;