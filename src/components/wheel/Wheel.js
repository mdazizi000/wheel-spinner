import React, {Fragment, useEffect, useState} from "react";
import "../../assets/css/wheel.css"
import {Button, Row} from "reactstrap";

const Wheel = () => {

    const [rotate, setRotate] = useState(0)
    const [easeOut, setEaseOut] = useState(0)
    const [angle, setAngle] = useState(0)
    const [defaultRadius, setDefaultRadius] = useState(75)
    const [spinning, setSpinning] = useState(false)
    const [result, setResult] = useState(null)
    const [net, setNet] = useState(null)
    const [offset, setOffset] = useState(null)
    const [top, setTop] = useState(null)
    const list = [
        {id:1,name:"محمد"},
        {id:2,name:"حسین"},
        {id:3,name:"علی"},
        {id:4,name:"رضا"},
        {id:5,name:"احسان"},
        {id:6,name:"میلاد"},
        {id:7,name:"محسن"}
    ];

    const [colors, setColors] = useState([
        '#F1C40F',
        '#F39C12',
        '#1ABC9C',
        '#7F8C8D',
        '#34495E',
        '#E74C3C',
        '#DFFF00',
        '#9B59B6',
        '#6495ED',
        '#40E0D0',
        '#C0392B',
        '#229954',
        '#8E44AD',
        '#2980B9',
        '#2ECC71',
        '#3498DB',
        '#16A085',

    ])
    const [counter, setCounter] = React.useState(8);

    useEffect(() => {

        renderWheel()
        if (counter > 0){
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
        else {
            spin()
            setResult(4)
            document.getElementById("title").innerText="شروع شد.."
        }
    }, [counter])
    const getResult = spin => {
//         // find net rotation and add to offset angle
//         // repeat substraction of inner angle amount from total distance traversed
//         // use count as an index to find value of result from state list
        let netRotation = ((spin % 360) * Math.PI) / 180; // RADIANS
        let travel = netRotation + offset;
        let count = top + 1;
        while (travel > 0) {
            travel = travel - angle;
            count--;
        }
        // let spinResult;
        // if (count >= 0) {
        //     spinResult = count;
        // } else {
        //     spinResult = list.length + count;
        // }
        setNet(netRotation);
        // setResult(spinResult)
        // set state variable to display result

    };
    const renderWheel = () => {
        // determine number/size of sectors that need to created
        let numOptions = list.length;
        let arcSize = (2 * Math.PI) / numOptions;
        setAngle(arcSize)


        // get index of starting position of selector
        topPosition(numOptions, arcSize);

        // dynamically generate sectors from state list
        let angle = 0;
        for (let i = 0; i < numOptions; i++) {
            let text = list[i].name;
            renderSector(i + 1, text, angle, arcSize, colors[i]);
            angle += arcSize;
        }
    }

    const topPosition = (num, angle) => {
        // set starting index and angle offset based on list length
        // works upto 9 options
        let topSpot = null;
        let degreesOff = null;
        if (num === 9) {
            topSpot = 7;
            degreesOff = Math.PI / 2 - angle * 2;
        } else if (num === 8) {
            topSpot = 6;
            degreesOff = 0;
        } else if (num <= 7 && num > 4) {
            topSpot = num - 1;
            degreesOff = Math.PI / 2 - angle;
        } else if (num === 4) {
            topSpot = num - 1;
            degreesOff = 0;
        } else if (num <= 3) {
            topSpot = num;
            degreesOff = Math.PI / 2;
        }
        setTop(topSpot - 1);
        setOffset(degreesOff)

    };

    function renderSector(index, text, start, arc, color) {
        // create canvas arc for each list element
        let canvas = document.getElementById("wheel");
        let ctx = canvas.getContext("2d");
        let x = canvas.width / 2;
        let y = canvas.height / 2;
        let radius = 125;
        let startAngle = start;
        let endAngle = start + arc;
        let angle = index * arc;
        let baseSize = radius * 3.33;
        let textRadius = baseSize - 190;

        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle, false);
        ctx.lineWidth = radius * 2;
        ctx.strokeStyle = color;
        ctx.font = "18px IRANSans";
        ctx.fillStyle = "black";
        ctx.stroke();

        ctx.save();
        ctx.translate(
            baseSize + Math.cos(angle - arc / 3.7) * textRadius,
            baseSize + Math.sin(angle - arc / 3.7) * textRadius
        );
        ctx.rotate(angle - arc / 2 + Math.PI / 2);
        ctx.fillText(text, 10, 0);
        ctx.restore();
    }

    const spin = () => {
        // set random spin degree and ease out time
        // set state variables to initiate animation
        let randomSpin = Math.floor(50 * 900) + 500;
        setRotate(randomSpin)
        setEaseOut(2)
        setSpinning(true)

        // // calcalute result after wheel stops spinning
        // setTimeout(() => {
        //     getResult(1);
        // }, 2000);
    }
    return (<Fragment>
        {/*<div className={"spinner"}>*/}
        <h1 id={"title"}>{counter} ثانیه تا شروع ....</h1>

        <div className={"col-12"}>
            <canvas
                id={"wheel"}
                width={700}
                height={700}
                style={{
                    WebkitTransform: `rotate(${rotate}deg)`,
                    WebkitTransition: `-webkit-transform ${
                        easeOut
                    }s ease-out`
                }}
            />
        </div>
        <Row>
                  <span className={"col-12 winner-name"}>
                  برنده:{"  "}
                                  <span id={"result"}>{list[result]?.name}</span>
                </span>
        </Row>

        {/*</div>*/}
    </Fragment>)
}

export default Wheel;
