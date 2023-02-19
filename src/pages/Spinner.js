import React, {Fragment, useEffect, useRef, useState} from "react";
import Swal from 'sweetalert2'
import "../assets/css/spinner.css"
import Confetti from "react-confetti";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate} from "react-router-dom";
import {Row} from "reactstrap";


const places = [
    { id: 1, text: "محمد", enabled: true },
    { id: 2, text: "مسعود", enabled: true },
    { id: 3, text: "اکو", enabled: true },
    { id: 4, text: "سینا", enabled: true },
    { id: 5, text: "نوید", enabled: true },
    { id: 6, text: "جوزی", enabled: true },
    { id: 7, text: "حسین", enabled: true },

];

export function Spinner() {
    const [lists, setLists] = useState(places);
    const [selectedItem, setSelectedItem] = useState(null);
    const [spinAfter, setSpinAfter] = useState(null);
    const [counter, setCounter] = React.useState(5);
    const [winner, setWinner] = React.useState({});
    const startConfetis=useDispatch()
    const start = useSelector(state => state.start)
    const navigate = useNavigate();
    const [randomName, setRandomName] = useState('');
    useEffect(() => {

        setSpinAfter(10000)
        if (counter > 0){
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
        else {

            document.getElementById("title").innerText="شروع شد.."
            setSelectedItem(1)
            const interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * lists.length);
                const randomName = lists[randomIndex].text;
                setRandomName(randomName);
            }, 80);


            setTimeout(() => {
                clearInterval(interval);
                setRandomName("");
                startConfetis({type:'show'})
                Swal.fire({
                    title: 'برنده بازی!',
                    text: `${lists[1].text}`,
                    icon: 'success',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonText: 'باشه'
                }).then((result) => {
                    if (result.isConfirmed) {
                        startConfetis({type:'hidden'})
                        navigate(-1);

                    }

                });
                return () => clearInterval(interval);
            }, 20000);

        }

    }, [counter]);

    // const selectItem = () => {
    //
    //     if (selectedItem === null) {
    //         const selectedItem = selectedItem;
    //         if (lists.onSelectItem) {
    //             lists.onSelectItem(selectedItem);
    //         }
    //         setSelectedItem(selectedItem);
    //     } else {
    //         setSelectedItem(null);
    //         setTimeout(selectItem, 2000);
    //     }
    // }

    const items = lists.filter((i) => i.enabled);
    const wheelVars = {
        "--nb-item": items.length,
        "--selected-item": selectedItem
    };
    const spinning = selectedItem !== null ? "spinning" : "";

    return (
        <Fragment>
            {start && <Confetti numberOfPieces={1000} width={window.innerWidth} height={window.innerHeight * 2}/>}

            <div className={"container"} >

                <div className={'row text-center pt-4'} >
                    <h1 className={'pb-5'} id={'title'}>{counter} ثانیه تا شروع بازی...</h1>
                    <div className="wheel-container" >
                        <div
                            className={`wheel ${spinning}`}
                            style={wheelVars}
                        >
                            {items.map((item, index) => (
                                <div
                                    className="wheel-item"
                                    key={index}
                                    style={{ "--item-nb": index }}
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

            </div>
        </Fragment>

    );
}

export default Spinner
