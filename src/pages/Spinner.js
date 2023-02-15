
import React, {useEffect, useState} from "react";

import "../components/test/index.css"
const places = [
    { id: 1, text: "Brooks", enabled: true },
    { id: 2, text: "Matt", enabled: true },
    { id: 3, text: "Matthias", enabled: true },
    { id: 4, text: "Jared", enabled: true },
    { id: 5, text: "Evan", enabled: true },
    { id: 6, text: "Bryan", enabled: true },
    { id: 7, text: "Jatin", enabled: true },
    { id: 8, text: "Greg", enabled: true },
    { id: 9, text: "Alex", enabled: true },
    { id: 10, text: "Eric", enabled: true },
    { id: 11, text: "Archie", enabled: true },
    { id: 12, text: "Chris", enabled: true },
    { id: 13, text: "Patrick", enabled: true },
    { id: 14, text: "Jharwin", enabled: true },
    { id: 15, text: "Pete", enabled: true },
    { id: 16, text: "Lance", enabled: true },
    { id: 17, text: "Soheil", enabled: true }
];

export function Spinner() {
    const [lists, setLists] = useState(places);
    const [selectedItem, setSelectedItem] = useState(null);
    const [spinAfter, setSpinAfter] = useState(null);
    const [counter, setCounter] = React.useState(8);


    useEffect(() => {

        setSpinAfter(10000)
        if (counter > 0){
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
        else {
            setSelectedItem(3)
            if (selectedItem !== null && spinAfter !== null){
                document.getElementById("title").innerText="شروع شد.."
                setTimeout(selectItem, +spinAfter);
            }
        }

    }, [counter]);

    const selectItem = () => {
        if (selectedItem === null) {
            const selectedItem = selectedItem;
            if (lists.onSelectItem) {
                lists.onSelectItem(selectedItem);
            }
            setSelectedItem(selectedItem);
        } else {
            setSelectedItem(null);
            setTimeout(selectItem, 2000);
        }
    }

    const items = lists.filter((i) => i.enabled);
    const wheelVars = {
        "--nb-item": items.length,
        "--selected-item": selectedItem
    };
    const spinning = selectedItem !== null ? "spinning" : "";


    return (
        <div className={"container"}>

            <div className={'row text-center pt-4'} >
                <h1 className={'pb-5'} id={'title'}>{counter} ثانیه تا شروع بازی...</h1>
                <div className="wheel-container">
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
            </div>

        </div>
    );
}

export default Spinner
