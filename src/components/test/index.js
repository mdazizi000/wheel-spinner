import React, {useEffect, useState} from "react";

import "./index.css";


const Wheel = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [spinAfter, setSpinAfter] = useState(null);
  // const [counter, setCounter] = React.useState(8);


  useEffect(() => {
    setSelectedItem(3)
    setSpinAfter(3000)
    // if (counter > 0){
    //   counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    // }
    // else {
    //   if (selectedItem !== null && spinAfter !== null){
    //     document.getElementById("title").innerText="شروع شد.."
    //     setTimeout(selectItem, +spinAfter);
    //   }
    // }

  }, []);

  const selectItem = () => {
    if (selectedItem === null) {
      const selectedItem = selectedItem;
      if (props.onSelectItem) {
        props.onSelectItem(selectedItem);
      }
      setSelectedItem(selectedItem);
    } else {
      setSelectedItem(null);
      setTimeout(selectItem, 2000);
    }
  }

  const items = props.items.filter((i) => i.enabled);
  const wheelVars = {
    "--nb-item": items.length,
    "--selected-item": selectedItem
  };
  const spinning = selectedItem !== null ? "spinning" : "";

  return (
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
  );
}

export default Wheel;

// export default class Wheel extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedItem: null,
//       spinAfter: null
//     };
//     this.selectItem = this.selectItem.bind(this);
//   }
//   componentDidMount() {
//     setTimeout(this.selectItem, 2000);
//   }
//
//   selectItem() {
//     if (this.state.selectedItem === null) {
//       const selectedItem = 2;
//       if (this.props.onSelectItem) {
//         this.props.onSelectItem(selectedItem);
//       }
//       this.setState({ selectedItem });
//     } else {
//       this.setState({ selectedItem: null });
//       setTimeout(this.selectItem, 2000);
//     }
//   }
//
//   render() {
//     const { selectedItem } = this.state;
//     const items = this.props.items.filter((i) => i.enabled);
//     const wheelVars = {
//       "--nb-item": items.length,
//       "--selected-item": selectedItem
//     };
//     const spinning = selectedItem !== null ? "spinning" : "";
//
//     return (
//       <div className="wheel-container">
//         <div
//           className={`wheel ${spinning}`}
//           style={wheelVars}
//         >
//           {items.map((item, index) => (
//             <div
//               className="wheel-item"
//               key={index}
//               style={{ "--item-nb": index }}
//             >
//               {item.text}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }
