import {Fragment, useState} from "react";
import {Badge, Button, Card, CardBody, Form, FormFeedback, FormGroup, Input, Label, Row, Table} from "reactstrap";
import "../assets/css/profile.css"
import TransactionModal from "../components/modals/TransactionModal";
import Swal from 'sweetalert2'


const Profile = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [iban, setIban] = useState('')
    const [type, setType] = useState(0)
    const [balance, setBalance] = useState(0)
    const [modal, setModal] = useState(false)

    function openModal(type){
        if (type === 1 &&  balance === 0){
            Swal.fire({
                icon: 'error',
                title: 'موجودی کافی نیست...!!',
                text: 'موجودی حساب شما کافی نیست',
                confirmButtonText: 'فهمیدم'
            })
        }
        else {
            setType(type)
            setModal(true)
        }


    }
    return <Fragment>
        <TransactionModal modal={modal} setModal={setModal} type={type}/>
        <div className={"container"}>
            <Row className={'justify-content-center mt-lg-5 border border-dark border-opacity-25  form-container'}>
                <h2>پروفایل</h2>
                <Form className={'col-12 p-2 pb-4 '}>
                    <Row className={'justify-content-start'}>
                        <FormGroup className="col-12 col-md-6 col-lg-4 position-relative">
                            <Label for="name">
                                نام و نام خانوادگی
                            </Label>
                            <Input placeholder={'نام خود را وارد کنید'} onChange={(e) => setName(e.target.value)}
                                   type={'text'}/>
                        </FormGroup>
                        <FormGroup className="col-12 col-md-6 col-lg-4 position-relative">
                            <Label for="phone">
                                شماره همراه
                            </Label>
                            <Input placeholder={'شماره همراه خود را وارد کنید'}
                                   onChange={(e) => setPhone(e.target.value)}
                                   type={'text'}/>
                        </FormGroup>

                        <FormGroup className="col-12 col-md-6 col-lg-4 position-relative">
                            <Label for="iban">
                                شماره شبا
                            </Label>
                            <Input placeholder={'شماره شبا خود را وارد کنید'} onChange={(e) => setIban(e.target.value)}
                                   type={'text'}/>
                        </FormGroup>
                        <FormGroup className="col-12 col-md-6 col-lg-4 position-relative">
                            <Label for="exampleEmail">
                                ایمیل
                            </Label>
                            <Input value={email} type={'email'} disabled/>

                        </FormGroup>
                        <FormGroup className="col-12 col-md-6 col-lg-4 position-relative">
                            <Label for="examplePassword">
                                رمز عبور
                            </Label>
                            <Input placeholder={'رمز عبور  خود را وارد کنید'} type={'password'}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </FormGroup>
                    </Row>

                    <button className={'btn btn-warning mt-3'}
                            disabled={password === '' || name === '' || phone === '' || iban === ''}>بروزرسانی
                    </button>
                </Form>
            </Row>

            <Row className={'justify-content-center mt-lg-5 border border-dark border-opacity-25  form-container'}>
                <h2>کیف پول</h2>
                <Row className={"alert alert-info mt-3  justify-content-between"}>
                    <div className={"col-12 col-md-4"}>
                        <span className={'span'}>موجودی : 1350$</span>
                    </div>
                    <div className={"col-12 col-md-4 text-start"}>
                        <Button className={'btn btn-success btn-2'} onClick={() => {openModal(0)}}>واریز</Button>
                        <Button className={'btn btn-danger btn-2'} onClick={() => {openModal(1)}}>برداشت</Button>
                    </div>
                </Row>
                <hr/>
                <Row>
                    <h4>تراکنش ها</h4>

                    <Table hover responsive>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>مبلغ(دلار)</th>
                            <th>نوع</th>
                            <th>وضعیت</th>
                            <th>تاریخ</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>120</td>
                            <td><Badge className={'p-2'} color="success">واریز</Badge></td>
                            <td><Badge className={'p-2'} color="success">موفق</Badge></td>
                            <td>1400/11/15</td>
                        </tr>

                        <tr>
                            <th scope="row">1</th>
                            <td>500</td>
                            <td><Badge className={'p-2'} color="danger">برداشت</Badge></td>
                            <td><Badge className={'p-2'} color="warning">درانتظار تایید</Badge></td>
                            <td>1400/11/15</td>
                        </tr>

                        </tbody>
                    </Table>
                </Row>
            </Row>
        </div>
    </Fragment>
}

export default Profile