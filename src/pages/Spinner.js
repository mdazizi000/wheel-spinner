import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Confetti from "react-confetti";
import { Row } from "reactstrap";
import Loader from "../components/loader/Loader";
import "../assets/css/spinner.css";

export function Spinner() {
    // ** Hooks
    const { id } = useParams();
    const navigate = useNavigate();
    // ** States
    const [isLoading, setIsLoading] = useState(true);
    const [lists, setLists] = useState([]);
    const [data, setData] = useState({});
    const [winner, setWinner] = useState(null);
    const [countDown, setCountDown] = useState(undefined);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [selectedItem, setSelectedItem] = useState(false);
    const [randomName, setRandomName] = useState('کی برنده میشه..؟!');
    const user=JSON.parse(localStorage.getItem('user'))
    // ** Refs
    const timerRef = useRef(null);
    const spinnerRef = useRef(null);
    // ** Variables
    const foundWinner = lists.find((item) => item.winner);

    const getRandomIndex = () => {
        const randomIndex = Math.floor(Math.random() * lists.length);
        setRandomName(lists[randomIndex].text);
    };
    // ** Functions
    function startSpinner() {
        setWinner(data?.winner_id)
        const interval= setInterval(() => {
            getRandomIndex();
        }, 150); // set interval for 20 seconds
        spinnerRef.current = setTimeout(() => {
             clearInterval(interval);
             setRandomName(foundWinner.text)
            setIsFinished(true);
             const name=user.id === data.winner_id ?  'شما' : foundWinner.text
             const text=user.id === data.winner_id ?  'شما برنده بازی شدید' : 'برنده بازی شد!'
            Swal.fire({
                title: `${name}`,
                text: `${text}`,
                icon: "success",
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonText: "باشه",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(-1);
                }
            });


        }, 20000);
        setIsStarted(true);
    }
    // ** Effects
    useEffect(() => {
        if (countDown) {
            timerRef.current = setTimeout(() => {
                setCountDown((prevState) => prevState - 1);
            }, 1000);
        } else if (countDown === 0) {
            startSpinner();

        }
        return () => {
            clearTimeout(timerRef.current);
            clearTimeout(spinnerRef.current);
        };
    }, [countDown]);
    useEffect(() => {
        axios
            .get(`/live/${id}/game`)
            .then((res) => {
                if (res.data.success === true) {
                    setLists(res?.data?.data?.players);
                    setCountDown(5);
                    setData(res?.data?.data)
                    setSelectedItem(data.winner_index)
                    // setCountDown(res?.data?.data?.seconds);
                }
                else {
                    Swal.fire({
                        icon: "error",
                        title: `${res.data.message}`,
                        showConfirmButton: false,
                        timer: 4000,
                    });
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                switch (err.response.status) {
                    // Unauthorized
                    case 401:
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        axios.defaults.headers.common.Authorization = undefined;
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "توکن شما منقضی شده است! لطفا دوباره وارد شوید.",
                            showConfirmButton: false,
                            timer: 4000,
                        });
                        setTimeout(() => {
                            window.location.replace("/");
                        }, 4000);
                        break;

                    // Unauthenticated

                    // Not found
                    case 404:
                        window.location.replace("/");
                        break;

                    // Unprocessable content
                    case 422:
                        let errors = [];
                        for (let error in err.response.data.errors)
                            err.response.data.errors[error].forEach((item) =>
                                errors.push(item)
                            );
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: `${errors[0]}`,
                            showConfirmButton: false,
                            timer: 4000,
                        });
                        break;

                    // Too many requests
                    case 429:
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title:
                                "تعداد درخواست‌های شما از حد مجاز عبور کرده است! لطفا بعدا تلاش کنید.",
                            showConfirmButton: false,
                            timer: 4000,
                        });
                        break;

                    // Server-side error
                    case 500:
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "خطایی در سمت سرور پیش‌ آمده! لطفا بعدا تلاش کنید.",
                            showConfirmButton: false,
                            timer: 4000,
                        });
                        break;

                    default:
                        break;
                }
            });

        return () => clearTimeout(timerRef.current);
        // eslint-disable-next-line
    }, [id]);

    const spinnerSection =(data)=> {

        return(
    <div
        className={`wheel ${isStarted  ? "spinning" : ""}`}
        style={ {
            "--nb-item": lists.length,
            "--selected-item": data.winner_index,
        }}
    >
        {lists.map((item, index) => (
            <div
                className="wheel-item"
                key={index}
                style={{ "--item-nb": index }}
            >
                {item.text}
            </div>
        ))}
    </div>
        )
    }

    return (
        <>
            {isFinished && (
                <Confetti
                    numberOfPieces={1000}
                    width={window.innerWidth}
                    height={window.innerHeight * 2}
                />
            )}

            <div className={"container"}>
                {isLoading ? (
                    <Row className={"justify-content-center text-center"}>
                        <Loader />
                    </Row>
                ) : (
                    <div className={"row text-center pt-4"}>
                        <h1 className={"pb-5"} id={"title"}>
                            {isStarted ? "شروع شد..." : `${countDown} ثانیه تا شروع بازی...`}
                        </h1>
                        <div className="wheel-container">
                            {spinnerSection(data)}
                        </div>
                        <Row className={" justify-content-center mt-5"}>
                            <div className="col-12 col-md-6 col-lg-4 rectangle text-center">
                                {randomName}
                            </div>
                        </Row>
                    </div>
                )}
            </div>
        </>
    );
}

export default Spinner;
