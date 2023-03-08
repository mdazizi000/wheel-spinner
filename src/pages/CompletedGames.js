import {Fragment, useEffect, useState} from "react";
import {Badge, Card, CardBody, CardHeader, Spinner, Table} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";


const CompletedGames = () => {
    const [games,setGames]=useState([])
    const [myId,setMyId]=useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        axios.get('/closed/games')
            .then((res) => {
                if (res.data.success === true) {
                  setGames(res?.data?.data?.games)
                    setMyId(res?.data?.data?.my_id)
                    setIsLoading(false)
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
  return(
      <Fragment>
        <Card>
            <CardHeader>
                <h4>تاریخچه  بازی ها</h4>
            </CardHeader>
            <CardBody>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>نام بازی</th>
                        <th>مبلغ(دلار)</th>
                        <th>تعداد نفرات</th>
                        <th>تاریخ ایجاد</th>
                        <th>تاریخ اتمام</th>
                        <th>وضعیت</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isLoading ? <tr className={'justify-content-center text-center'}>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><Spinner/></td>
                            <td></td>
                            <td></td>
                            <td></td>

                    </tr> :
                        games.length <= 0 ?  <tr className={'justify-content-center text-center'}>
                            <td></td>
                            <td></td>
                            <td></td>
                                <td>بازی ای یافت نشد</td>
                            <td></td>
                            <td></td>
                            <td></td>
                    </tr> :

                            games.map((game,index)=>(
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{game.name}</td>
                                    <td>{game.count}</td>
                                    <td>{game.count} نفر</td>
                                    <td>{game.created_at}</td>
                                    <td>{game.end_time}</td>
                                    <td><Badge color={game.winner_id === myId? 'success':'danger'}  className={'p-2'}>{game.winner_id === myId?'برنده  نشده ایید':'برنده شده ایید'}</Badge></td>
                                </tr>
                            ))

                    }



                    </tbody>
                </Table>
            </CardBody>
        </Card>
      </Fragment>
  )
}

export  default CompletedGames