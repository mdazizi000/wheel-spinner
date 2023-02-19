import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useState} from "react";


const TransactionModal = (props) => {
    const [closeAll,setCloseAll]=useState(false);
    const [price,setPrice]=useState('');
    function toggle() {
        props.setModal(!props.modal)
    }
  return(
      <Modal isOpen={props.modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>{props.type == 0 ? 'شارژ کیف پول': 'برداشت از کیف پول'}</ModalHeader>
          <ModalBody>
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
          </ModalBody>
          <ModalFooter className={'justify-content-start'}>
              <Button color="success" >ثبت</Button>
              <Button color="danger" onClick={toggle}>لغو</Button>
          </ModalFooter>
      </Modal>
  )
}

export default TransactionModal;