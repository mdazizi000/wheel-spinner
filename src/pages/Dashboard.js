import {Fragment,useState} from "react";
import {
    Button,
    Card,
    CardBody,
    Form, FormFeedback,
    FormGroup, Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import '../assets/css/dashboard.css'
import wheel from "../assets/img/wheel-3.png"
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {toast} from "react-toastify";
import CreateGameModal from "../components/modals/CreateGameModal";

const Dashboard = () => {
    const [open,setOpen] =useState(false);
    const [balance,setBalance]=useState(0);


    const user = useDispatch();
    useEffect(()=>{
        axios.get('/profile')
            .then((res) => {
                if (res.data.success === true) {
                    user({type: 'updateUser', data: JSON.stringify(res.data?.data?.user) })
                    setBalance(res.data?.data?.user.game_wallet.balance)
                }

            })

    },[])



  return <Fragment>
      <CreateGameModal open={open} setOpen={setOpen}/>
     <div className={'container'}>
         <Row className={'justify-content-center text-center'}>
             <Card className={'col-12'}>
                 <CardBody className={'text-center'}>
                     <Row className={'justify-content-center'}>
                         <div className="col-12 col-md-4 col-lg-3 info-box">
                             <i className="fa fa-gamepad"></i>
                             <h5>بازی های باز</h5>
                             <span><b>5</b> عدد</span>

                         </div>
                         <div className="col-12 col-md-4 col-lg-3 info-box">
                             <i className="fa fa-ban"></i>
                             <h5>بازی های بسته شده</h5>
                             <span><b>15</b> عدد</span>

                         </div>
                         <div className="col-12 col-md-4 col-lg-3 info-box">
                             <i className="fa fa-dollar-sign"></i>
                             <h5>درآمد</h5>
                             <span><b>148</b> دلار </span>

                         </div>
                     </Row>
                     <Row className={'justify-content-center'}>
                         <div className="col-8 create-box" onClick={(e)=>{setOpen(true)}}>
                                <h2><b>ساخت بازی جدید</b></h2>
                         </div>
                     </Row>
                 </CardBody>

             </Card>
         </Row>
     </div>

      <div className={'container-fluid footer'}>
         <Row className={' justify-content-center '}>
             <div className="col-12  col-xl-6 text-center  text-xl-end ">
                 <img src={wheel} className={'wheel-gif'}/>
             </div>
             <div className="col-6  text-start wheelTwo">
                 <img src={wheel} className={'wheel-gif'}/>
             </div>


         </Row>
     </div>
  </Fragment>
}

export  default Dashboard;