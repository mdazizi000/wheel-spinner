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

const Dashboard = () => {
    const [open,setOpen] =useState(false);
    const [name,setName] =useState('');
    const [count,setCount] =useState('');
    const [price,setPrice] =useState('');
    const [type,setType]=useState('');

    function IsOpen (){
        setOpen(!open)
        setName('')
        setCount('')
        setPrice('')
        setType('')
    }
  return <Fragment>
      <div>
          <Modal isOpen={open} toggle={IsOpen} className={'justify-content-between'}>
              <ModalHeader toggle={IsOpen}>ساخت بازی جدید</ModalHeader>
              <ModalBody>
                  <Form className={' p-2 pb-4'}>

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
                          <Label for="type">نوع بازی</Label>
                          <Input type="select" name="type" id="type" onChange={(e)=>setType(e.target.value)}>
                              <option selected={type === 'public'} value={'public'}>عمومی</option>
                              <option selected={type === 'private'} value={'private'}>خصوصی</option>
                          </Input>
                      </FormGroup>

                  </Form>
              </ModalBody>
              <ModalFooter className={'justify-content-start'}>
                  <Button color="success" onClick={IsOpen}>ایجاد</Button>{' '}
                  <Button color="danger" onClick={IsOpen}>لغو</Button>
              </ModalFooter>
          </Modal>
      </div>
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
                         <div className="col-8 create-box" onClick={IsOpen}>
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