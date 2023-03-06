import React, {Fragment, useEffect, useRef, useState, useCallback} from "react";
import Swal from 'sweetalert2'
import "../assets/css/spinner.css"
import Confetti from "react-confetti";
import {useNavigate, useParams} from "react-router-dom";
import {Row} from "reactstrap";
import axios from "axios";
import Loader from "../components/loader/Loader";


export function Spinner() {
    const {id} = useParams();
    const [lists, setLists] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [change, setChange] = useState(true);
    const [counter, setCounter] = React.useState(undefined);
    const [winner, setWinner] = useState(0);
    const [start,setStart] = useState(false)
    const navigate = useNavigate();
    const [randomName, setRandomName] = useState('کی برنده میشه..؟!');
    const intervalRef = useRef(null);

    useEffect(() => {
        if (counter === undefined) {
            clearInterval(intervalRef.current);
 
            axios.get(`/live/${id}/game`)
                .then((res) => {
                    setIsLoading(false)
                    if (res.data.success === true) {
                        // setCounter(res?.data?.data?.seconds)
                        setLists(res?.data?.data?.players)
                       infoSet(res?.data?.data?.seconds,res?.data?.data?.winner_id,res?.data?.data?.players)
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: `${res.data.message}`,
                            showConfirmButton: false,
                            timer: 4000
                        })
                    }
                })
                .catch((err) => {
                    setIsLoading(false)
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


                })
        }



    }, [change]);

    const startTimer = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
           setCounter((prevCounter) => {
                if (prevCounter <= 0) {
                    clearInterval(intervalRef.current);
                    endCounter()
                    return 0;
                } else {
                    return prevCounter - 1;
                }
            })
        }, 1000);

    }

    function infoSet(counter,winner2,list) {
        setCounter(10)
        // setWinner(winner)
        // setLists(list)

        startTimer()
        console.log(lists)
    }

    function endCounter(){
        document.getElementById("title").innerText = "شروع شد.."
        const filteredItem = lists.filter((item) => item.winner === true);


        setSelectedItem(filteredItem)
        console.log(filteredItem)
        // const interval = setInterval(() => {
        //     const randomIndex = Math.floor(Math.random() * lists.length);
        //     const randomName = lists[randomIndex].text;
        //     setRandomName(randomName);
        // }, 80);


        setTimeout(() => {
            // clearInterval(interval);
            setRandomName("");
            // startConfetis({type: 'show'})
            setStart(true)
            Swal.fire({
                title: `${lists[1].text}`,
                text: 'برنده بازی!',
                icon: 'success',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: 'باشه'
            }).then((result) => {
                if (result.isConfirmed) {
                    // startConfetis({type: 'hidden'})
                    setStart(false)
                    navigate(-1);

                }

            });
            // return () => clearInterval(interval);
        }, 20000);
    }

    const wheelVars = {
        "--nb-item": lists.length,
        "--selected-item": selectedItem
    };
    const spinning = selectedItem !== null ? "spinning" : "";
    // const counterFinished = counter === 0 ? endCounter() : '';

    return (
        <Fragment>
            {start && <Confetti numberOfPieces={1000} width={window.innerWidth} height={window.innerHeight * 2}/>}


            <div className={"container"}>
                {isLoading ? <Row className={'justify-content-center text-center'}><Loader/></Row> :
                    <div className={'row text-center pt-4'}>
                        <h1 className={'pb-5'} id={'title'}>{counter} ثانیه تا شروع بازی...</h1>
                        <div className="wheel-container">
                            <div
                                className={`wheel ${spinning}`}
                                style={wheelVars}
                            >
                                {lists.map((item, index) => (
                                    <div
                                        className="wheel-item"
                                        key={index}
                                        style={{"--item-nb": index}}
                                    >
                                        {item.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Row className={' justify-content-center mt-5'}>
                            <div className="col-12 col-md-6 col-lg-4 rectangle text-center">{randomName}</div>
                        </Row>
                    </div>
                }
            </div>


        </Fragment>

    );
}

export default Spinner
