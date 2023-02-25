import {Row, Spinner} from "reactstrap";


const Loader = () => {
  return (
      <Row className={'justify-content-center text-center mt-5'}>
          <Spinner/>
      </Row>
  )
}

export default Loader