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
import axios from "axios";
import Swal from "sweetalert2";
import {toast} from "react-toastify";
import {Fragment, useState} from "react";


const CreateGameModal = (props) => {
    const [name,setName] =useState('');
    const [count,setCount] =useState('');
    const [price,setPrice] =useState(0);
    const [type,setType]=useState('public');
    const [paymentMethod,setPaymentMethod]=useState('gateway');
    const [isLoading,setIsLoading]=useState(false)
    const [gatewayModal, setGatewayModal] = useState(false)
    const [link, setLink] = useState('')

    function IsOpen (){
        props.setOpen(!props.open)
        setName('')
        setCount('')
        setPrice(0)
        setType('')
    }
    function toggleGatewayModal() {
        setGatewayModal(!gatewayModal)
    }

    function createGame (e){
        e.preventDefault()
        const  data=new FormData();
        data.append('name',name)
        data.append('count',count)
        data.append('price',price)
        data.append('type',type)
        data.append('payment_method',paymentMethod)

        axios.post('/create-game', data, {})
            .then((res) => {
                if (res.data.success === true) {
                    setIsLoading(false)

                    if (paymentMethod === 'gateway'){
                        setIsLoading(false)
                        setGatewayModal(true)
                        setLink(res.data?.data?.gateway_link)
                    }
                    else {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'عملیات با موفقیت انجام شد.',
                            showConfirmButton: false,
                            timer: 4000
                        })
                    }

                }
                else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: `${res?.data?.message}`,
                        showConfirmButton: false,
                        timer: 4000
                    })
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
                            window.location.replace('/')

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
                            toast.error(
                                ""
                            );
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
  return (
      <Fragment>
          <Modal isOpen={props.open} toggle={props.setOpen} className={'justify-content-between'}>
              <ModalHeader toggle={IsOpen}>ساخت بازی جدید</ModalHeader>
              <ModalBody>
                  {isLoading ? <Spinner/> :  <Form className={' p-2 pb-4'}>

                      <FormGroup className="position-relative">
                          <Label for="name">
                              نام بازی
                          </Label>
                          <Input id={'name'} onChange={(e)=> setName(e.target.value)}  placeholder={'نام بازی را وارد کنید'} name={'name'} type={"text"} />
                      </FormGroup>
                      <FormGroup className="position-relative">
                          <Label for="count">
                              تعدا نفرات
                          </Label>
                          <Input id={'count'} onChange={(e)=> setCount(e.target.value)} placeholder={'تعداد نفرات بازی را وارد کنید'} name={'count'} type={"number"} />
                      </FormGroup>

                      <FormGroup className="position-relative">
                          <Label for="price">
                              مبلغ(دلار)
                          </Label>
                          <Input id={'price'} onChange={(e)=> setPrice(e.target.value)} placeholder={'مبلغ بازی را مشخص کنید'} name={'price'} type={"number"} />
                      </FormGroup >
                      <FormGroup>
                          <Input type="checkbox" name="type" id="type" value={'private'} onChange={(e)=>setType(e.target.value)}/>
                          <Label for="type" style={{marginRight:9}}>بازی خصوصی</Label>
                      </FormGroup>

                      <FormGroup check className={'justify-content-start text-right'}>
                          <Label >روش پرداخت</Label><br/>
                          <Label check >
                              درگاه پرداخت
                              <Input type="radio" name="radio1" checked onChange={(e)=>setPaymentMethod('gateway')} />{' '}
                          </Label>
                          <Label check style={{marginRight:50}}>
                              کیف پول
                              <Input type="radio" name="radio1" onChange={(e)=>setPaymentMethod('wallet')}/>{' '}
                          </Label>
                      </FormGroup>

                  </Form>}

              </ModalBody>
              <ModalFooter className={'justify-content-start'}>
                  <Button color="success" onClick={(e)=>{
                      createGame(e)
                      setIsLoading(true)

                  }}>
                      {isLoading ? <Spinner/> : 'ایجاد'}
                  </Button>{' '}
                  <Button color="danger" onClick={IsOpen}>لغو</Button>
              </ModalFooter>
          </Modal>
          <Modal isOpen={gatewayModal} toggle={toggleGatewayModal} >
              <ModalHeader toggle={toggleGatewayModal}>رفتن به درگاه</ModalHeader>
              <ModalBody>
                  <Row className={'justify-content-around'}>
                      <a href={link} className={'col-12 col-md-4 btn btn-warning'}  disabled={price === 0 || link === '' } onClick={(e)=>{
                          setIsLoading(true)
                          setIsLoading(true)
                          setGatewayModal(false)
                      }} >
                          {isLoading ? <Spinner/> : 'پرداخت'}
                      </a>
                      <Button  className={'col-12 col-md-4'}  color="danger" onClick={IsOpen}>لغو</Button>
                  </Row>
              </ModalBody>

          </Modal>
      </Fragment>

  )
}

export default CreateGameModal