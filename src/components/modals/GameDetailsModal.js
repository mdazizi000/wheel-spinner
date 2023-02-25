import {Fragment, useEffect, useState} from "react";
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

const GameDetailsModal = (props) => {
    const[data,setData]=useState({})
    const[walletPay,setPayWallet]=useState(false)
    const[link,setLink]=useState('')
    const[id,setId]=useState('')
    const [isLoading, setIsLoading] = useState(true)

  function close (){
    props.setOpen(false);
  }

    useEffect(()=>{
        if (props.id){
            setId(props.id)
            axios.get(`/game/${props.id}/details`)
                .then((res) => {
                    if (res.data.success === true) {

                        setIsLoading(false)
                        setData(res.data?.data)
                        setPayWallet(res.data?.data?.pay_wallet)
                        setLink(res.data?.data?.link)

                    }
                    else {
                        setIsLoading(false)
                        close()
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
                    close()
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
        else {
            setIsLoading(false)
            setData(props.data)
            setPayWallet(props.data?.pay_wallet)
            setLink(props.data?.link)
            setId(props?.data?.game?.id)
        }

    },[])
    function join (){
        axios.post(`/game/${id}/join`)
            .then((res) => {
                close()
                if (res.data.success === true) {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title:`${res.data.message}`,
                        showConfirmButton: false,
                        timer: 4000
                    })
                    setIsLoading(false)
                    props.setChange(!props.change)
                    props.setChange(!props.change)

                    window.location.replace('/dashboard/my-games')
                }
                else {
                    setIsLoading(false)
                    close()
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
                close()
                setIsLoading(false)
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


            })
    }
  return(
      <Modal isOpen={props.open} toggle={close}>
          <ModalHeader toggle={close}>جزئیات بازی</ModalHeader>
          <Row  className={'justify-content-center text-center'}>
              {isLoading ? <Spinner/> :<Fragment>

                  <ModalBody>
                      <Row className={'justify-content-center text-end'}>
                          <div className="col-12">
                              <Label for="name">
                                  نام بازی :
                              </Label>
                              <span>{data?.game?.name}</span>
                          </div>

                          <div className="col-12">
                              <Label for="name">
                                  مبلغ بازی :
                              </Label>
                              <span>{data?.game?.price}</span>
                          </div>

                          <div className="col-12">
                              <Label for="name">
                                  ظرفیت کل :
                              </Label>
                              <span>{data?.game?.count}</span>
                          </div>

                          <div className="col-12">
                              <Label for="name">
                                  ظرفیت باقی مانده :
                              </Label>
                              <span>{data?.game?.capacity}</span>
                          </div>
                          <div className="col-12">
                              <Label for="name">
                                  جایزه کل :
                              </Label>
                              <span>{data?.game?.count * data?.game?.price}</span>
                          </div>
                      </Row>
                  </ModalBody>
                  <ModalFooter className={'justify-content-start'}>
                      <Button color="primary" disabled={data?.game?.capacity <= 0  || isLoading || walletPay}  onClick={(e)=>{join()}}>پرداخت با کیف پول </Button>
                      <a href={link} className={'btn btn-warning'}  disabled={data?.game?.capacity <= 0  || isLoading} >پرداخت با درگاه  </a>
                      <Button color="secondary" onClick={close}>لغو</Button>
                  </ModalFooter>
              </Fragment>}
          </Row>



      </Modal>
  )
}
export default GameDetailsModal;