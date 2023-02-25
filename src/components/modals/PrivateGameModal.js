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
import {useState} from "react";
import GameDetailsModal from "./GameDetailsModal";
import axios from "axios";
import Swal from "sweetalert2";


const PrivateGameModal = (props) => {
    const [nestedModal,setNestedModal]=useState(false);
    const [closeAll,setCloseAll]=useState(false);
    const [code,setCode]=useState('');
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    function toggle() {
        props.setModal(!props.modal)
    }

    function toggleNested() {
        setOpen(!open)
        setData({
            'id': 1,
            'title': "دورهمی",
            'total_count':'7',
            'count':'4',
            'price':'10'
        })
        setCloseAll(false)
    }

    function toggleAll() {
        setNestedModal(!nestedModal)
        setCloseAll(true)
    }

    function  search (){
        axios.get('/game/private',{
            params:{'code':code}
        })
            .then((res) => {
                if (res.data.success === true) {

                    setIsLoading(false)
                    setData(res.data?.data)
                    setOpen(!open)
                }
                else {
                    setIsLoading(false)
                    props.setModal(false)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title:`${res.data.message}`,
                        showConfirmButton: false,
                        timer: 4000
                    })
                }

            })
            .catch((err) => {
                props.setModal(false)
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
  return (
      <Modal isOpen={props.modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>جستوجوی بازی</ModalHeader>
          <ModalBody>
              {isLoading ? <Row className={'justify-content-center text-center'}>
                      <Spinner/>
                  </Row>:
                  <Form className={'col-12 p-2 pb-4 '}>
                      <Row className={'justify-content-start'}>
                          <FormGroup className="col-12  position-relative">
                              <Label for="link">
                                  کد بازی
                              </Label>
                              <Input placeholder={'کد بازی را وارد کنید'} onChange={(e) => setCode(e.target.value)}
                                     type={'text'}/>
                          </FormGroup>
                      </Row>
                  </Form>
              }

              <br />
              {open && <GameDetailsModal setOpen={setOpen} open={open} data={data}/>}
          </ModalBody>
          <ModalFooter className={'justify-content-start'}>
              <Button color="warning" disabled={isLoading} onClick={()=>{
                  setIsLoading(true)
                  search()
              }}>جستو جو</Button>
              <Button color="danger" onClick={toggle}>لغو</Button>
          </ModalFooter>
      </Modal>
  )
}

export default PrivateGameModal