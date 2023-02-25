import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Spinner
} from "reactstrap";
import {Fragment, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";


const TransactionModal = (props) => {
    const [closeAll,setCloseAll]=useState(false);
    const [price, setPrice] = useState(0)
    const [link, setLink] = useState('')
    const [modalLoader, setModalLoader] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [gatewayModal, setGatewayModal] = useState(false)

    function toggle() {
        props.setModal(!props.modal)
    }

    function toggleGatewayModal() {
        setGatewayModal(!gatewayModal)
    }

    function chargeWallet (e){
        e.preventDefault()
        setModalLoader(true)
        const data = new FormData();
        data.append('price',price)
        axios.post('/charge-wallet',data)
            .then((res) => {
                if (res.data.success === true) {
                    setModalLoader(false)
                    setIsLoading(false)
                    setGatewayModal(true)
                    props.setModal(false)
                    setLink(res.data?.data?.gateway_link)
                }

            })
            .catch((err) => {


                setIsLoading(false)
                props.setChange(!props.change)
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
    }

    function withdraw (e){
        e.preventDefault()
        setModalLoader(true)
        const data = new FormData();
        data.append('price',price)
        axios.post('/withdraw',data)
            .then((res) => {
                if (res.data.success === true) {
                    setModalLoader(false)
                    setIsLoading(false)
                    props.setModal(false)
                    props.setChange(!props.change)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${res.data.message}`,
                        showConfirmButton: false,
                        timer: 4000
                    })
                }
                else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: `${res.data.message}`,
                        showConfirmButton: false,
                        timer: 4000
                    })
                    props.setChange(!props.change)
                    setPrice(0)
                    setModalLoader(false)
                    setIsLoading(false)
                }

            })
            .catch((err) => {


                setModalLoader(false)
                props.setChange(!props.change)
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
    }
    return(
        <Fragment>
            <Modal isOpen={gatewayModal} toggle={toggleGatewayModal} >
                <ModalHeader toggle={toggleGatewayModal}>رفتن به درگاه</ModalHeader>
                <ModalBody>
                            <Row className={'justify-content-around'}>
                                <a href={link} className={'col-12 col-md-4 btn btn-warning'}  disabled={price === 0 || link === '' } onClick={(e)=>{
                                    setIsLoading(true)
                                    setModalLoader(true)
                                    setGatewayModal(false)
                                }} >
                                    {isLoading ? <Spinner/> : 'پرداخت'}
                                </a>
                                <Button  className={'col-12 col-md-4'}  color="danger" onClick={toggle}>لغو</Button>
                            </Row>
                </ModalBody>

            </Modal>
            <Modal isOpen={props.modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>{props.type == 0 ? 'شارژ کیف پول': 'برداشت از کیف پول'}</ModalHeader>
                <ModalBody>
                    {modalLoader ? <Spinner/> :
                        <Form className={'col-12 p-2 pb-4 '}>
                            <Row className={'justify-content-start'}>
                                <FormGroup className="col-12  position-relative">
                                    <Label for="link">
                                        مبلغ تراکنش (دلار)
                                    </Label>
                                    <Input placeholder={'مبلغ مورد نظر را وارد کنید'} onChange={(e) => setPrice(e.target.value)}
                                           type={'text'}/>
                                </FormGroup>
                            </Row>
                        </Form>
                    }

                </ModalBody>
                <ModalFooter className={'justify-content-start'}>
                    <Button color="success" disabled={price === 0 } onClick={(e)=>{
                        setIsLoading(true)
                        setModalLoader(true)
                        if (props.type === 0 ){
                            chargeWallet(e)
                        }
                        else {
                            withdraw(e)
                        }

                    }} >
                        {isLoading ? <Spinner/> : 'ثبت'}
                    </Button>
                    <Button color="danger" onClick={toggle}>لغو</Button>
                </ModalFooter>
            </Modal>
        </Fragment>

)
}


export default TransactionModal;