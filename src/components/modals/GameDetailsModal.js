import {Fragment} from "react";
import {Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";

const GameDetailsModal = (props) => {
  function close (){
    props.setOpen(false);
  }

    console.log(props)
  return(
      <Modal isOpen={props.open} toggle={close}>
        <ModalHeader toggle={close}>{props.data.title}</ModalHeader>
        <ModalBody>
            <Row className={'justify-content-center'}>
                <div className="col-12">
                    <Label for="name">
                          نام بازی :
                    </Label>
                    <span>{props.data.title}</span>
                </div>

                <div className="col-12">
                    <Label for="name">
                          مبلغ بازی :
                    </Label>
                    <span>{props.data.price}</span>
                </div>

                <div className="col-12">
                    <Label for="name">
                          ظرفیت کل :
                    </Label>
                    <span>{props.data.total_count}</span>
                </div>

                <div className="col-12">
                    <Label for="name">
                          ظرفیت باقی مانده :
                    </Label>
                    <span>{props.data.count}</span>
                </div>
            </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={props.data.count <= 0} >پرداخت</Button>
          <Button color="secondary" onClick={close}>لغو</Button>
        </ModalFooter>
      </Modal>
  )
}
export default GameDetailsModal;