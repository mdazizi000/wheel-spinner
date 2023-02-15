import {Fragment, useEffect, useRef, useState} from "react";
import {Row} from "reactstrap";
import Wheel from "../components/wheel/Wheel";


const Spinning = () => {
    const canvasRef = useRef(null);
    const [rotate, setRotate] = useState(0);
    const [spinning, setSpinning] = useState(false);
    const [winner, setWinner] = useState("");
    const slices = ["Slice 1", "Slice 2", "Slice 3", "Slice 4", "Slice 5", "Slice 6"];
    const sliceColors = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3"];
    const sliceDeg = 360 / slices.length;

    useEffect(() => {
        if (spinning) {
            const timeoutId = setTimeout(() => {
                setRotate(rotate + 10);
            }, 20);
            return () => clearTimeout(timeoutId);
        }
    }, [spinning, rotate]);

    const handleSpinClick = () => {
        setSpinning(true);
        setTimeout(() => {
            setSpinning(false);
            const winnerSlice = Math.floor(Math.random() * slices.length);
            setWinner(`Winner: Slice ${winnerSlice + 1}`);

        }, 2000);
    };

    const drawWheel = (ctx, canvas) => {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.lineWidth = 2;
        ctx.font = "bold 20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        for (let i = 0; i < slices.length; i++) {
            const startAngle = i * sliceDeg * (Math.PI / 180);
            const endAngle = (i + 1) * sliceDeg * (Math.PI / 180);

            // Draw the slice
            ctx.beginPath();
            ctx.fillStyle = sliceColors[i];
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, canvas.width / 2, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();

            // Draw the text in the middle of the slice
            ctx.fillStyle = "#FFFFFF";
            const textAngle = startAngle + (endAngle - startAngle) / 2;
            const textX = centerX + Math.cos(textAngle) * (canvas.width / 3);
            const textY = centerY + Math.sin(textAngle) * (canvas.height / 3);
            ctx.fillText(slices[i], textX, textY);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        drawWheel(ctx, canvas);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotate * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);

        drawWheel(ctx, canvas);

        ctx.restore();
    }, [rotate]);
    return(
      <Fragment>
          <div className={"container"}>
              <Row className={'justify-content-center text-center'}>
                  <Row className={'justify-content-center text-center'}>
                      <i className={'fa fa-arrow-down'}></i>
                  </Row>
                  <div>
                      <canvas
                          ref={canvasRef}
                          width={700}
                          height={700}
                          style={{ border: "none" }}
                      ></canvas>
                      <button onClick={handleSpinClick} disabled={spinning}>
                          {spinning ? "Spinning..." : "Spin!"}
                      </button>
                      <h1>{winner}</h1>
                  </div>
              </Row>
          </div>
      </Fragment>
  )
}

export default Spinning