import {Fragment, useEffect, useState} from "react";
import {
    Badge,
    Button,
    Card,
    CardBody,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Row,
    Spinner,
    Table
} from "reactstrap";
import "../assets/css/profile.css"
import TransactionModal from "../components/modals/TransactionModal";
import Swal from 'sweetalert2'
import axios from "axios";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";


const Profile = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [iban, setIban] = useState('')
    const [type, setType] = useState(0)
    const [balance, setBalance] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [change, setChange] = useState(false)
    const [profile, setProfile] = useState({})
    const [transactions, setTransactions] = useState([])
    const user = useDispatch();
    useEffect(()=>{
      setIsLoading(true)
      axios.get('/profile')
          .then((res) => {
              if (res.data.success === true) {
                  user({type: 'updateUser', data: JSON.stringify(res.data?.data?.user), token: res.data?.data?.token,balanace :res.data?.data?.user.game_wallet.balance })
                  setTransactions(res.data?.data?.transactions)
                  setProfile(res.data?.data?.user)
                  setFirstName(res.data.data.user.first_name)
                  setLastName(res.data.data.user.last_name)
                  setPhone(res.data.data.user.mobile)
                  setEmail(res.data.data.user.email)
                  setIban(res.data.data.user.wallet)
                  setBalance(res.data?.data?.user.game_wallet.balance)
                  setIsLoading(false)
              }

          })
          .catch((err) => {


              setIsLoading(false)
                setChange(!change)
              if (err.code !== "ERR_CANCELED" && !err.response?.status)
                  Swal.fire({
                      position: 'top-end',
                      icon: 'error',
                      title: '?????? ???? ???????????? ???? ????????! ???????? ?????????? ?????????????? ?????? ???? ?????????? ????????.',
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
                              title: '???????? ?????? ?????????? ?????? ??????! ???????? ???????????? ???????? ????????.',
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
                              title: '?????????? ??????????????????????? ?????? ???? ???? ???????? ???????? ???????? ??????! ???????? ???????? ???????? ????????.',
                              showConfirmButton: false,
                              timer: 4000
                          })

                          break;

                      // Server-side error
                      case 500:
                          Swal.fire({
                              position: 'top-end',
                              icon: 'error',
                              title: '?????????? ???? ?????? ???????? ????????? ????????! ???????? ???????? ???????? ????????.',
                              showConfirmButton: false,
                              timer: 4000
                          })
                          break;

                      default:
                          break;
                  }
              }

          })
    },[change])
    function openModal(type){
        if (type === 1 &&  balance === 0){
            Swal.fire({
                icon: 'error',
                title: '???????????? ???????? ????????...!!',
                text: '???????????? ???????? ?????? ???????? ????????',
                confirmButtonText: '????????????'
            })
        }
        else {
            setType(type)
            setModal(true)
        }


    }

    function updateProfile (e){
        setIsLoading(true)
        const  data =new FormData();
        data.append('_method','PUT')
        data.append('first_name',firstName)
        data.append('last_name',lastName)
        data.append('mobile',phone)
        data.append('wallet',iban)
        if (password !==  '') {
            data.append('password',password)
        }
        axios.post('/update/profile',data).then((res) => {
            if (res.data.success === true) {
                user({type: 'updateUser', data: JSON.stringify(res.data?.data?.user)})
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: '???????????? ???? ???????????? ?????????? ????',
                    showConfirmButton: false,
                    timer: 4000
                })

                setTimeout(() => {
                    window.location.replace('/dashboard/profile')
                }, 2000)
            }

        })
            .catch((err) => {

                setIsLoading(false)

                if (err.code !== "ERR_CANCELED" && !err.response?.status)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: '?????? ???? ???????????? ???? ????????! ???????? ?????????? ?????????????? ?????? ???? ?????????? ????????.',
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
                                title: '???????? ?????? ?????????? ?????? ??????! ???????? ???????????? ???????? ????????.',
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
                                title: '?????????? ??????????????????????? ?????? ???? ???? ???????? ???????? ???????? ??????! ???????? ???????? ???????? ????????.',
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
                                title: '?????????? ???? ?????? ???????? ????????? ????????! ???????? ???????? ???????? ????????.',
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
    return <Fragment>
        <TransactionModal modal={modal} setModal={setModal} type={type} change={change} setChange={setChange}/>
        <div className={"container"}>
            <Row className={'justify-content-center mt-lg-5 border border-dark border-opacity-25  form-container'}>
                <h2>??????????????</h2>
                {isLoading ? <Spinner/>  :
                    <Form className={'col-12 p-2 pb-4 '}>
                    <Row className={'justify-content-start'}>
                        <FormGroup className="col-12 col-md-6 col-lg-4 position-relative">
                            <Label for="name">
                                ??????
                            </Label>
                            <Input placeholder={'?????? ?????? ???? ???????? ????????'} value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                   type={'text'}/>
                        </FormGroup>
                        <FormGroup className="col-12 col-md-6 col-lg-4 position-relative">
                            <Label for="name">
                                ?????? ????????????????
                            </Label>
                            <Input placeholder={'?????? ???????????????? ?????? ???? ???????? ????????'} value={lastName} onChange={(e) => setLastName(e.target.value)}
                                   type={'text'}/>
                        </FormGroup>
                        <FormGroup className="col-12 col-md-6 col-lg-4 position-relative">
                            <Label for="phone">
                                ?????????? ??????????
                            </Label>
                            <Input placeholder={'?????????? ?????????? ?????? ???? ???????? ????????'} value={phone}
                                   onChange={(e) => setPhone(e.target.value)}
                                   type={'text'}/>
                        </FormGroup>

                        <FormGroup className="col-12 col-md-6 col-lg-4 position-relative">
                            <Label for="iban">
                                ?????????? ??????
                            </Label>
                            <Input placeholder={'?????????? ?????? ?????? ???? ???????? ????????'} value={iban} onChange={(e) => setIban(e.target.value)}
                                   type={'text'}/>
                        </FormGroup>
                        <FormGroup className="col-12 col-md-6 col-lg-4 position-relative">
                            <Label for="exampleEmail">
                                ??????????
                            </Label>
                            <Input value={email} type={'email'} disabled/>

                        </FormGroup>
                        <FormGroup className="col-12 col-md-6 col-lg-4 position-relative">
                            <Label for="examplePassword">
                                ?????? ????????
                            </Label>
                            <Input placeholder={'?????? ????????  ?????? ???? ???????? ????????'} type={'password'}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </FormGroup>
                    </Row>

                    <button className={'btn btn-warning mt-3'}
                            disabled={ firstName === '' ||lastName === '' || phone === ''|| isLoading || iban === ''} onClick={(e =>{
                                updateProfile(e)
                    } )}>
                        {isLoading ? <Spinner/> : "??????????????????"}
                    </button>
                </Form>
                }

            </Row>

            <Row className={'justify-content-center mt-lg-5 border border-dark border-opacity-25  form-container'}>
                <h2>?????? ??????</h2>
                {isLoading ? <Spinner/> :
                    <Fragment>
                        <Row className={"alert alert-info mt-3  justify-content-between"}>
                            <div className={"col-12 col-md-4"}>
                                <span className={'span'}>???????????? : {balance}$</span>
                            </div>
                            <div className={"col-12 col-md-4 text-start"}>
                                <Button className={'btn btn-success btn-2'} onClick={() => {openModal(0)}}>??????????</Button>
                                <Button className={'btn btn-danger btn-2'} onClick={() => {openModal(1)}}>????????????</Button>
                            </div>
                        </Row>
                        <hr/>
                        <Row>
                            <h4>???????????? ????</h4>

                            <Table hover responsive>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>????????(????????)</th>
                                    <th>??????</th>
                                    <th>??????????</th>
                                    <th>??????????</th>
                                </tr>
                                </thead>
                                <tbody>
                                {transactions.map((transaction,index)=>(
                                    <tr>
                                        <th scope="row">{index +1}</th>
                                        <td>{transaction.amount}</td>
                                        {transaction.type === 1 ?  <td><Badge className={'p-2'} color="success">??????????</Badge></td> :  <td><Badge className={'p-2'} color="danger">????????????</Badge></td> }
                                            {transaction.status === '1' ?  <td><Badge className={'p-2'} color="success">????????</Badge></td> : transaction.status === '3' ?  <td><Badge className={'p-2'} color="warning">???? ???????????? ??????????</Badge></td> :  <td><Badge className={'p-2'} color="danger">????????????</Badge></td> }
                                        <td>1400/11/15</td>
                                    </tr>
                                ))}



                                </tbody>
                            </Table>
                        </Row>
                    </Fragment>
                }

            </Row>
        </div>
    </Fragment>
}

export default Profile