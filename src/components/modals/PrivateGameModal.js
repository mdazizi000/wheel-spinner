import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "reactstrap";
import {useState} from "react";
import GameDetailsModal from "./GameDetailsModal";


const PrivateGameModal = (props) => {
    const [nestedModal,setNestedModal]=useState(false);
    const [closeAll,setCloseAll]=useState(false);
    const [link,setLink]=useState('');
    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})
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
  return (
      <Modal isOpen={props.modal} toggle={toggle} >
          <ModalHeader toggle={toggle}>جستوجوی بازی</ModalHeader>
          <ModalBody>
              <Form className={'col-12 p-2 pb-4 '}>
                  <Row className={'justify-content-start'}>
                      <FormGroup className="col-12  position-relative">
                          <Label for="link">
                             لینک بازی
                          </Label>
                          <Input placeholder={'لینک بازی را وارد کنید'} onChange={(e) => setLink(e.target.value)}
                                 type={'text'}/>
                      </FormGroup>
                  </Row>
              </Form>

              <br />
              <GameDetailsModal setOpen={setOpen} open={open} data={data}/>
          </ModalBody>
          <ModalFooter className={'justify-content-start'}>
              <Button color="warning" onClick={toggleNested}>یافتن</Button>
              <Button color="danger" onClick={toggle}>لغو</Button>
          </ModalFooter>
      </Modal>
  )
}

export default PrivateGameModal